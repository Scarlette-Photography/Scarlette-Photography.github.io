# Phase 3: Deploy to GitHub Pages

## Two Deployment Options

Choose one of these methods to deploy your website to GitHub Pages.

---

## ✅ Option 1: Manual Deployment (Simple)

### Step 1: Build Your Project
```bash
cd /Users/lorettaperaldi/Desktop/code/frontend
npm run build
```

This creates a `build/` folder with optimized production files.

### Step 2: Create or Switch to gh-pages Branch
```bash
cd /Users/lorettaperaldi/Desktop/code

# Create a new gh-pages branch (if first time)
git checkout --orphan gh-pages

# Or switch to existing branch (if already created)
git checkout gh-pages
```

### Step 3: Copy Build Files to Root
```bash
# Copy all files from build folder to root
cp -r frontend/build/* ./

# Add all files
git add .

# Commit
git commit -m "Deploy to GitHub Pages"

# Push to GitHub
git push --set-upstream origin gh-pages
```

### Step 4: Configure GitHub Pages in Repository Settings
1. Go to your GitHub repository
2. Click **Settings** (gear icon, top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - **Source:** Select "Deploy from a branch"
   - **Branch:** Select `gh-pages`
   - **Folder:** Select `/ (root)`
5. Click **Save**

### Step 5: Wait for Deployment
- GitHub will deploy in a few seconds
- You'll see a green checkmark when ready
- Visit: `https://yourusername.github.io/repository-name`

---

## ✅ Option 2: Automatic Deployment (Recommended)

Uses GitHub Actions to deploy automatically when you push code.

### Step 1: Create GitHub Actions Workflow

Create file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: 'frontend/package-lock.json'
      
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci
      
      - name: Build project
        working-directory: ./frontend
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/build
          cname: scarlette-photography.com  # Remove if using default domain
```

### Step 2: Push to GitHub
```bash
cd /Users/lorettaperaldi/Desktop/code
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push
```

### Step 3: Check Deployment Status
1. Go to your GitHub repository
2. Click **Actions** tab
3. Watch the deployment workflow run
4. When complete (green checkmark), your site is live!

### Step 4: Configure GitHub Pages Settings
1. Go to **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
3. Your site will auto-deploy on every push!

---

## Custom Domain Setup (Optional)

If you have a custom domain like `scarlette-photography.com`:

### Step 1: Point Domain to GitHub
In your domain registrar (GoDaddy, Namecheap, etc.):
- Create CNAME record pointing to: `yourusername.github.io`

Or use GitHub's nameservers:
1. Go to GitHub repository **Settings** → **Pages**
2. Under "Custom domain", enter: `yourusername.github.io`
3. In your domain registrar, update nameservers to GitHub's

### Step 2: Enable HTTPS
In GitHub Pages settings:
- ✅ Check "Enforce HTTPS"
- Wait a few minutes for SSL certificate

### Step 3: Update GitHub Actions Workflow
If using GitHub Actions, add your domain to the deploy step:

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./frontend/build
    cname: your-custom-domain.com
```

---

## Troubleshooting

### "404 Page Not Found"
**Problem:** GitHub Pages returning 404  
**Solution:**
1. Check `.nojekyll` file exists in repository root
2. Verify build folder has `index.html`
3. Wait 2-3 minutes for DNS propagation

### "Page displays but styling is broken"
**Problem:** CSS/JS not loading  
**Solution:**
1. Verify `package.json` has `"homepage": "./"`
2. Rebuild: `npm run build`
3. Check browser console (F12) for 404 errors

### "Routing breaks (404 on internal links)"
**Problem:** Navigation shows 404  
**Solution:**
1. Make sure you're using `HashRouter` (check `App.js`)
2. URLs should show `/#/services` format
3. This is normal! Not a real 404.

### "Deployment workflow fails"
**Problem:** GitHub Actions shows red X  
**Solution:**
1. Click the failed action to see logs
2. Common issues:
   - Node version mismatch: Update to Node 18+
   - Missing dependencies: Run `npm ci`
   - Build errors: Check `npm run build` locally
3. Fix locally, then push again

---

## What Happens After Deployment

### Your Website Will:
- ✅ Be live at: `https://yourusername.github.io/repository-name`
- ✅ Have automatic HTTPS (free SSL)
- ✅ Update whenever you push code (if using GitHub Actions)
- ✅ Support all routes with `/#/` format
- ✅ Send contact form emails via Formspree

### Testing After Deployment:
1. Navigate to your GitHub Pages URL
2. Test all navigation links
3. Check contact form (submit test message)
4. Verify images and styling load
5. Check on mobile device

---

## Keeping Your Site Updated

### With GitHub Actions (Recommended):
```bash
# Make changes locally
# Edit files as needed

# Push to GitHub
git add .
git commit -m "Update content"
git push

# Automatic deployment happens!
# Check Actions tab to see progress
```

### Manual Updates:
```bash
# Rebuild
npm run build

# Copy to gh-pages branch
cp -r frontend/build/* ./
git add .
git commit -m "Update site"
git push origin gh-pages
```

---

## Repository Structure for GitHub Pages

```
your-repo/
├── .github/
│   └── workflows/
│       └── deploy.yml (if using GitHub Actions)
├── .nojekyll
├── frontend/
│   ├── src/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── package.json
│   ├── craco.config.js
│   └── ...
├── GITHUB_PAGES_MIGRATION.md
├── PHASE_1_COMPLETE.md
├── PHASE_2_COMPLETE.md
└── README.md
```

---

## Success Checklist

- [ ] Project builds locally: `npm run build` completes
- [ ] Build folder exists at `frontend/build/`
- [ ] `build/index.html` contains HashRouter routes
- [ ] `.nojekyll` file exists in repo root
- [ ] `package.json` has `"homepage": "./"`
- [ ] `frontend/public/manifest.json` exists
- [ ] Repository pushed to GitHub
- [ ] GitHub Pages settings configured
- [ ] Deployment completed (green checkmark)
- [ ] Site loads at GitHub Pages URL
- [ ] Navigation works with `/#/` URLs
- [ ] Contact form appears and works
- [ ] Images load correctly
- [ ] Styling displays properly

---

## Quick Reference

| Task | Command |
|------|---------|
| **Build locally** | `npm run build` |
| **Test production build** | `npx serve -s build` |
| **Deploy (manual)** | `cp -r build/* ../ && git push origin gh-pages` |
| **Deploy (auto)** | `git push` (if GitHub Actions configured) |
| **Check deployment** | Go to repository **Actions** tab |
| **Visit site** | `https://username.github.io/repo-name` |

---

## Support Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Create React App Deployment](https://create-react-app.dev/deployment/)
- [React Router with GitHub Pages](https://create-react-app.dev/deployment/#github-pages)

---

## Next Steps After Deployment

1. **Formspree Setup** (if not done)
   - See FORMSPREE_SETUP.md

2. **Test Everything**
   - Navigate to all pages
   - Test contact form
   - Check mobile responsiveness

3. **Share Your Site**
   - Your website is now live!
   - Share the URL with everyone

4. **Keep Updating**
   - Use Git to push new changes
   - Site automatically updates

---

**Status:** Ready to Deploy  
**Difficulty:** Easy (just run commands)  
**Time Required:** 5-10 minutes

Choose your deployment method above and get your site live! 🚀

