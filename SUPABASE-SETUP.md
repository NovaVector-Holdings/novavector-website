# Supabase Database Setup for Email Collection

## 1. Create Supabase Account & Project

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click "New Project"
3. Choose your organization (or create one)
4. Enter project details:
   - **Name:** novavector-subscribers
   - **Database Password:** (save this somewhere secure)
   - **Region:** Choose closest to your users
5. Click "Create new project" (takes ~2 minutes)

---

## 2. Create the Subscribers Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Paste this SQL and click "Run":

```sql
-- Create subscribers table
CREATE TABLE subscribers (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    source TEXT DEFAULT 'website',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_subscribers_email ON subscribers(email);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from the API
CREATE POLICY "Allow anonymous inserts" ON subscribers
    FOR INSERT
    WITH CHECK (true);

-- Create policy to allow service role to read all
CREATE POLICY "Allow service role full access" ON subscribers
    FOR ALL
    USING (auth.role() = 'service_role');
```

---

## 3. Get Your API Keys

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (safe for frontend, but we use it server-side)

---

## 4. Add Environment Variables to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com)
2. Select the **novavector-website** project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Name | Value |
|------|-------|
| `SUPABASE_URL` | Your Project URL |
| `SUPABASE_ANON_KEY` | Your anon public key |

5. Click "Save" for each

---

## 5. Redeploy

After adding environment variables, redeploy:

```bash
cd "/Users/jeremypotts/Desktop/NovaVector Holdings LLC/novavector-website"
vercel --prod
```

---

## 6. View Your Subscribers

1. In Supabase dashboard, go to **Table Editor**
2. Click on **subscribers** table
3. You'll see all collected emails with timestamps

You can also export to CSV from this view.

---

## Security Features

✅ **Row Level Security (RLS)** - Only inserts allowed, no reads from frontend
✅ **Email validation** - Server validates email format
✅ **Duplicate prevention** - Same email won't be stored twice
✅ **Sanitization** - Emails are lowercased and trimmed
✅ **HTTPS** - All data encrypted in transit
✅ **Environment variables** - Keys not exposed in code

---

## Troubleshooting

**"Server configuration error"**
- Check that environment variables are set in Vercel
- Redeploy after adding variables

**"Failed to save subscription"**
- Check Supabase dashboard for any RLS policy issues
- Verify the table was created correctly

**Form not submitting**
- Check browser console for errors
- Verify the API endpoint is deployed (`/api/subscribe`)

---

*Setup guide for NovaVector Holdings LLC - December 2024*
