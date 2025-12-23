import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
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

    try {
        const { email } = req.body;

        // Validate email
        if (!email || !email.includes('@')) {
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
        const { data, error } = await supabase
            .from('subscribers')
            .upsert(
                { 
                    email: sanitizedEmail,
                    subscribed_at: new Date().toISOString(),
                    source: 'website'
                },
                { 
                    onConflict: 'email',
                    ignoreDuplicates: true 
                }
            );

        if (error) {
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
