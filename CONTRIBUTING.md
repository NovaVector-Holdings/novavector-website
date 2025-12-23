# NovaVector Website - Development Workflow

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
# Deploy to production
vercel --prod
```

**Verify Deployment:**
- [ ] Deployment completes successfully
- [ ] Site is live at https://novavectorholdings.com

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

If something goes wrong:

```bash
# View recent commits
git log --oneline -5

# Revert to previous commit
git revert HEAD
git push origin main
vercel --prod
```

Or redeploy a previous version from Vercel dashboard.

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
