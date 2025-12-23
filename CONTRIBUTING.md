# NovaVector Website - Development Workflow

## ⚠️ Critical: Zero-Downtime Deployment Protocol

**The live website must NEVER go down during updates.** Vercel's atomic deployment ensures this:

1. **Current version stays live** while new version builds
2. **New version deploys to a preview URL** for testing
3. **Only after successful build** does the new version go live
4. **Instant rollback** available if issues are discovered

**This means:**
- ✅ Visitors always see a working site
- ✅ No "under construction" or error pages
- ✅ Changes only go live after successful deployment
- ✅ Previous version remains available for rollback

---

## Required Steps for All Changes

**Every feature or change to the website MUST follow this workflow:**

### 1. Local Development & Testing
```bash
# Navigate to project
cd "/Users/jeremypotts/Desktop/NovaVector Holdings LLC/novavector-website"

# Start local server
python3 -m http.server 8080

# Test at http://localhost:8080
```

**Testing Checklist:**
- [ ] Page loads without errors
- [ ] All animations work correctly
- [ ] Responsive design (test mobile/tablet views)
- [ ] All links work (social links, email)
- [ ] Form submission works
- [ ] No console errors (check browser DevTools)

---

### 2. Commit to Git
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Brief description of changes

- Detail 1
- Detail 2"
```

**Commit Message Guidelines:**
- Start with action verb (Add, Update, Fix, Remove)
- Keep first line under 50 characters
- Add bullet points for multiple changes

---

### 3. Push to GitHub
```bash
# Ensure GitHub CLI is configured
gh auth setup-git

# Push to main branch
git push origin main
```

**Verify on GitHub:**
- [ ] Commit appears in repository
- [ ] Files updated correctly

---

### 4. Deploy to Vercel Production

```bash
# Deploy to production (atomic deployment - no downtime)
vercel --prod
```

**What happens during deployment:**
1. Current site remains live at https://novavectorholdings.com
2. New version builds on Vercel servers
3. Preview URL generated for new version
4. After successful build, traffic switches to new version
5. Old version kept for instant rollback if needed

**Verify Deployment:**
- [ ] Deployment completes successfully
- [ ] No build errors in terminal output
- [ ] "Aliased: https://novavectorholdings.com" appears

---

### 5. Production Testing

After deployment, verify on the live site:

- [ ] **https://novavectorholdings.com** loads correctly
- [ ] SSL certificate is valid (padlock icon)
- [ ] All content displays properly
- [ ] Animations and interactions work
- [ ] Mobile responsiveness
- [ ] Social links open correctly
- [ ] Email form functions

---

## Quick Deploy Script

For convenience, run the full deployment with:

```bash
cd "/Users/jeremypotts/Desktop/NovaVector Holdings LLC/novavector-website"

# Test locally first, then:
git add . && \
git commit -m "Your commit message" && \
gh auth setup-git && \
git push origin main && \
vercel --prod
```

---

## Rollback Procedure

If something goes wrong after deployment:

### Option 1: Revert via Git
```bash
# View recent commits
git log --oneline -5

# Revert to previous commit
git revert HEAD
git push origin main
vercel --prod
```

### Option 2: Instant Rollback via Vercel Dashboard
1. Go to https://vercel.com/novavector-holdings-llcs-projects/novavector-website
2. Click "Deployments"
3. Find the previous working deployment
4. Click "..." menu → "Promote to Production"

**Rollback is instant** - no rebuild required.

---

## Zero-Downtime Guarantee

Vercel provides these protections:

| Feature | Benefit |
|---------|---------|
| **Atomic Deployments** | New version only goes live after 100% ready |
| **Immutable Deployments** | Each deploy is a complete snapshot |
| **Instant Rollback** | Previous versions always available |
| **Global CDN** | Changes propagate worldwide in seconds |
| **Health Checks** | Failed builds never reach production |

**Never do these:**
- ❌ Delete production files manually
- ❌ Edit files directly on the server
- ❌ Push broken code without local testing
- ❌ Skip the deployment workflow

---

## Project Structure

```
novavector-website/
├── index.html          # Main website file
├── assets/             # Images, favicons
│   ├── logo.jpg
│   ├── logo-full.jpg
│   ├── favicon.ico
│   ├── favicon.png
│   └── apple-touch-icon.png
├── .vercel/            # Vercel project config
├── .git/               # Git repository
├── .gitignore          # Git ignore rules
├── HOSTING-GUIDE.md    # Hosting documentation
├── CONTRIBUTING.md     # This file
└── README.md           # Project overview
```

---

## Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| Local | http://localhost:8080 | Development & testing |
| Preview | *.vercel.app | PR previews (auto-generated) |
| Production | https://novavectorholdings.com | Live website |

---

## Contacts

- **Repository:** https://github.com/NovaVector-Holdings/novavector-website
- **Vercel Project:** novavector-website
- **Domain:** novavectorholdings.com

---

*Last updated: December 2024*
