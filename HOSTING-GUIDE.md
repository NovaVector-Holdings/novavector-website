# NovaVector Holdings Website - Hosting Guide

## Your Website Files
Your Coming Soon website is located at:
```
/Users/jeremypotts/Desktop/NovaVector Holdings LLC/novavector-website/
```

## Domain Hosting Options for novavectorholdings.com

### Option 1: Vercel (Recommended - FREE)
**Best for:** Quick deployment, automatic SSL, excellent performance
**Cost:** Free for static sites

**Steps:**
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Install Vercel CLI: `npm i -g vercel`
3. In your website folder, run: `vercel`
4. Follow prompts to deploy
5. Go to Project Settings → Domains → Add `novavectorholdings.com`
6. Update your domain's DNS at your registrar:
   - Add A Record: `76.76.21.21`
   - Add CNAME: `cname.vercel-dns.com`

---

### Option 2: Netlify (FREE)
**Best for:** Easy drag-and-drop deployment, forms integration
**Cost:** Free for static sites

**Steps:**
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag your `novavector-website` folder to the deploy area
3. Go to Domain Settings → Add custom domain → `novavectorholdings.com`
4. Update DNS at your registrar:
   - Add A Record: Netlify's load balancer IP
   - Or use Netlify DNS (recommended)

---

### Option 3: GitHub Pages (FREE)
**Best for:** Version control, collaboration
**Cost:** Free

**Steps:**
1. Create a GitHub repository
2. Push your website files to the repo
3. Go to Settings → Pages → Enable GitHub Pages
4. Add custom domain: `novavectorholdings.com`
5. Update DNS at your registrar:
   - Add A Records: 
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

---

### Option 4: Cloudflare Pages (FREE)
**Best for:** Global CDN, DDoS protection, excellent security
**Cost:** Free for static sites

**Steps:**
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository or upload directly
3. Add custom domain in Cloudflare dashboard
4. If domain is already on Cloudflare, it auto-configures

---

### Option 5: AWS S3 + CloudFront
**Best for:** Enterprise-grade, highly scalable
**Cost:** ~$1-5/month for low traffic

**Steps:**
1. Create S3 bucket named `novavectorholdings.com`
2. Enable static website hosting
3. Upload files
4. Create CloudFront distribution
5. Add SSL certificate via AWS Certificate Manager
6. Update Route 53 or your registrar's DNS

---

### Option 6: Squarespace Domains
**Best for:** If you already own the domain through Squarespace
**Cost:** Varies

**Steps:**
1. Log into Squarespace Domains
2. Either host on Squarespace or point DNS to another host

---

## Where to Register/Transfer Your Domain

If you haven't purchased `novavectorholdings.com` yet:

| Registrar | Annual Cost | Features |
|-----------|-------------|----------|
| **Cloudflare** | ~$10/year | At-cost pricing, free privacy |
| **Namecheap** | ~$12/year | Free WhoisGuard privacy |
| **Google Domains** | ~$12/year | Clean interface, easy DNS |
| **Porkbun** | ~$9/year | Low prices, free privacy |
| **GoDaddy** | ~$20/year | Popular but more expensive |

---

## Quick Start: Deploy to Vercel in 5 Minutes

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Navigate to your website folder
cd "/Users/jeremypotts/Desktop/NovaVector Holdings LLC/novavector-website"

# 3. Deploy
vercel

# 4. Follow the prompts, then add your custom domain in the Vercel dashboard
```

---

## DNS Configuration Checklist

When connecting `novavectorholdings.com` to your host:

1. **A Record** → Points to host's IP address
2. **CNAME (www)** → Points to main domain or host's CNAME
3. **SSL Certificate** → Most hosts provide free via Let's Encrypt
4. **Wait 24-48 hours** → DNS propagation can take time

---

## Recommended Setup for NovaVector

For a professional holding company website, I recommend:

**Primary:** Vercel + Cloudflare
- Vercel for hosting (free, fast, reliable)
- Cloudflare for DNS + CDN + DDoS protection (free tier)
- Domain from Cloudflare or Namecheap

This gives you:
- ✅ Free SSL (HTTPS)
- ✅ Global CDN (fast worldwide)
- ✅ DDoS protection
- ✅ 99.99% uptime
- ✅ Easy updates

---

## Email Setup (Optional)

For professional email like `info@novavectorholdings.com`:

| Service | Cost | Features |
|---------|------|----------|
| **Google Workspace** | $6/user/month | Gmail, Drive, Docs |
| **Microsoft 365** | $6/user/month | Outlook, OneDrive |
| **Zoho Mail** | Free (up to 5 users) | Professional email |
| **ProtonMail** | $4/user/month | Privacy-focused |

---

## Next Steps

1. **Choose a host** from the options above
2. **Deploy your website** following the steps
3. **Configure DNS** to point to your host
4. **Test everything** using https://novavectorholdings.com
5. **Set up email** (optional but recommended)

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Cloudflare Docs: https://developers.cloudflare.com

---

*Website created for NovaVector Holdings LLC - December 2025*

