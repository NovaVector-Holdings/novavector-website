import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (anon key only — RLS insert-only policy applies)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// --- CORS: origin allowlist (was wildcard '*'; this endpoint is only called
// same-origin, so anything broader buys nothing and invites abuse) ---
const ALLOWED_ORIGINS = [
    'https://novavectorholdings.com',
    'https://www.novavectorholdings.com'
];
// Vercel preview deployments for THIS project only
const PREVIEW_ORIGIN = /^https:\/\/novavector-website-[a-z0-9-]+-novavector-holdings-llcs-projects\.vercel\.app$/;

function resolveOrigin(req) {
    const origin = req.headers.origin || '';
    if (ALLOWED_ORIGINS.includes(origin) || PREVIEW_ORIGIN.test(origin)) return origin;
    return null;
}

// --- Best-effort per-instance rate limiting ---
// Serverless instances don't share memory, so this is a burst brake per warm
// lambda, not a global guarantee. It stops naive loops and cuts abuse cost;
// platform-level (WAF) rate limiting remains the stronger control if enabled.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;         // per IP, per warm instance
const hits = new Map();           // ip -> [timestamps]

function rateLimited(ip) {
    const now = Date.now();
    const list = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
    if (list.length >= MAX_PER_WINDOW) { hits.set(ip, list); return true; }
    list.push(now);
    hits.set(ip, list);
    // Bound the map so a scan can't grow memory unbounded
    if (hits.size > 5000) hits.clear();
    return false;
}

// RFC-5321-conscious basic shape check + length cap
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMAIL_MAX = 254;

export default async function handler(req, res) {
    const origin = resolveOrigin(req);
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Cross-origin callers not on the allowlist get refused outright
    if (req.headers.origin && !origin) {
        return res.status(403).json({ error: 'Origin not allowed' });
    }

    try {
        // Body shape guard
        if (typeof req.body !== 'object' || req.body === null) {
            return res.status(400).json({ error: 'Valid email required' });
        }
        const { email, website } = req.body;

        // Honeypot: the visible form never fills "website"; bots do.
        // Pretend success so scripts don't adapt.
        if (typeof website === 'string' && website.length > 0) {
            return res.status(200).json({ success: true, message: 'Successfully subscribed!' });
        }

        // Rate limit (per IP, best-effort)
        const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
            || req.socket?.remoteAddress || 'unknown';
        if (rateLimited(ip)) {
            return res.status(429).json({ error: 'Too many requests — please try again later' });
        }

        // Validate email: string, bounded, plausible shape
        if (typeof email !== 'string' || email.length > EMAIL_MAX || !EMAIL_RE.test(email.trim())) {
            return res.status(400).json({ error: 'Valid email required' });
        }

        // Sanitize email
        const sanitizedEmail = email.toLowerCase().trim();

        // Check environment variables
        if (!supabaseUrl || !supabaseKey) {
            console.error('Missing Supabase credentials');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Initialize Supabase
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Insert email into database
        // Table lives in the budgetwise Supabase project (write-only for anon;
        // consolidated 2026-07-04 after novavector-subscribers free-tier pause).
        // Plain INSERT, not upsert: ON CONFLICT requires SELECT on the conflict
        // column, and anon deliberately has zero read access. A duplicate email
        // raises 23505, which we treat as success (idempotent, no info leak —
        // the response is identical either way).
        const { error } = await supabase
            .from('corporate_subscribers')
            .insert({
                email: sanitizedEmail,
                subscribed_at: new Date().toISOString(),
                source: 'website'
            });

        if (error && error.code !== '23505') {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Failed to save subscription' });
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully subscribed!'
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
