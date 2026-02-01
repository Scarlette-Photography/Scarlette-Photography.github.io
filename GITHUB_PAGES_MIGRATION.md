# GitHub Pages Migration Guide - Scarlette Photography

**Created:** February 1, 2026  
**Project:** Scarlette Photography (Fullstack React App → Static GitHub Pages)

---

## 📋 Executive Summary

This website was built using **Emergent** (a fullstack app builder with FastAPI backend + MongoDB). To work on GitHub Pages (static hosting), we need to:

1. **Remove backend dependencies** - GitHub Pages can't run Python/FastAPI servers
2. **Fix routing** - React Router needs HashRouter for proper client-side routing
3. **Remove Emergent-specific features** - Visual edits, health checks, and monitoring scripts
4. **Update external dependencies** - Some features depend on services that won't work statically
5. **Handle the contact form** - Currently has no backend submission mechanism

---

## 🔴 CRITICAL ISSUES

### 1. **Contact Form Has No Submission Handler**
- **Problem:** The contact form in `ContactPage.js` is a UI-only component with no backend integration
- **Current State:** Users can see the form, but there's no way to submit inquiries
- **Impact:** HIGH - Core functionality is broken
- **Solution Needed:**
  - Option A: Use Formspree.io (recommended for static sites)
  - Option B: Use EmailJS library for client-side email
  - Option C: Use GitHub Issues/Discussions as fallback

### 2. **React Router Not Configured for GitHub Pages**
- **Problem:** Using `BrowserRouter` from react-router-dom
- **Current State:** Works locally but will fail on GitHub Pages
- **Impact:** HIGH - All internal navigation will break
- **Solution:** Replace `BrowserRouter` with `HashRouter` in `App.js`

### 3. **Emergent-Specific Code in Index.html**
- **Problem:** Multiple external dependencies on Emergent services
  - `https://assets.emergent.sh/scripts/emergent-main.js`
  - `https://assets.emergent.sh/scripts/debug-monitor.js`
  - PostHog analytics integration
  - "Made with Emergent" badge
- **Current State:** These will break the site if URLs are unavailable
- **Impact:** MEDIUM - Functional but with broken external scripts
- **Solution:** Remove all Emergent-specific code

### 4. **Visual Edits Plugin Not Needed**
- **Problem:** `craco.config.js` loads visual-edits plugins
- **Current State:** These are dev-server only but add bloat
- **Impact:** LOW - Won't affect production
- **Solution:** Remove or conditionally disable

---

## 🟡 MEDIUM PRIORITY ISSUES

### 5. **Backend-Specific Configuration**
- **Files Affected:** `craco.config.js`, plugin files
- **Problem:** Webpack config includes health checks and visual edit endpoints
- **Solution:** Clean up craco config to remove unused plugins

### 6. **Missing Favicon & Manifest**
- **Problem:** `index.html` references manifest.json but it doesn't exist
- **Current State:** Will show warning in console
- **Impact:** LOW - Won't break functionality
- **Solution:** Create basic manifest.json or remove reference

### 7. **External Image URLs**
- **Status:** ✅ OK - Using Unsplash and external CDNs, which work fine
- **No action needed**

### 8. **Analytics & Tracking**
- **Problem:** PostHog analytics key is exposed in index.html
- **Impact:** LOW - But exposes API key
- **Solution:** Remove or disable PostHog

---

## 🟢 LOW PRIORITY ISSUES

### 9. **Placeholder Instagram Link**
- **Files:** `ContactPage.js`, `Footer.js`
- **Current:** `href="https://instagram.com"`
- **Solution:** Update with actual Instagram handle when ready

### 10. **Title & Meta Tags**
- **File:** `index.html`
- **Current:** Generic "Emergent | Fullstack App"
- **Solution:** Update to "Scarlette Photography - Fairytale Photography at Château de Fontainebleau"

---

## ✅ WHAT'S ALREADY GOOD

- ✅ Bilingual support (EN/FR) with context API
- ✅ Beautiful Tailwind CSS styling
- ✅ Responsive design
- ✅ Smooth scroll with Lenis
- ✅ Image galleries with proper lightbox
- ✅ Good page structure (Home, Services, Guide, Portfolio, Contact)
- ✅ All images using external CDNs (no local assets needed)
- ✅ No database calls
- ✅ No environment variables needed

---

## 📋 IMPLEMENTATION TODO LIST

### Phase 1: Critical Fixes (Do First)
- [ ] **Replace BrowserRouter with HashRouter** in `App.js`
  - File: [frontend/src/App.js](frontend/src/App.js)
  - Change: `import { BrowserRouter } from 'react-router-dom'` → `import { HashRouter } from 'react-router-dom'`
  - Change: `<BrowserRouter>` → `<HashRouter>`

- [ ] **Set up contact form submission** 
  - Choose service: Formspree, EmailJS, or email link
  - Update `ContactPage.js` with actual submission logic
  - File: [frontend/src/pages/ContactPage.js](frontend/src/pages/ContactPage.js)

- [ ] **Remove Emergent code from index.html**
  - Remove line: `<script src="https://assets.emergent.sh/scripts/emergent-main.js"></script>`
  - Remove the entire visual-edits script block (lines ~23-45)
  - Remove or update PostHog initialization (lines ~123-160)
  - Remove "Made with Emergent" badge (lines ~55-88)
  - File: [frontend/public/index.html](frontend/public/index.html)

### Phase 2: Config Cleanup (Important)
- [ ] **Clean up craco.config.js**
  - Remove visual-edits plugin loading
  - Remove health check plugin
  - Simplify webpack configuration
  - File: [frontend/craco.config.js](frontend/craco.config.js)

- [ ] **Delete unused plugin files** (optional)
  - `frontend/plugins/visual-edits/` (entire folder)
  - `frontend/plugins/health-check/` (entire folder)

### Phase 3: Polish (Nice to Have)
- [ ] **Update index.html metadata**
  - Title: "Scarlette Photography"
  - Description: "Fairytale Photography Sessions at Château de Fontainebleau"
  - Add proper favicon
  - File: [frontend/public/index.html](frontend/public/index.html)

- [ ] **Create/update manifest.json**
  - File: `frontend/public/manifest.json`

- [ ] **Update Instagram links**
  - Search for: `href="https://instagram.com"`
  - Replace with actual Instagram handle

- [ ] **Add .nojekyll file to root**
  - Prevents GitHub Pages from processing with Jekyll
  - Command: `touch .nojekyll`

- [ ] **Create GitHub Pages deployment config**
  - Add "homepage" to package.json
  - Create GitHub Actions workflow for auto-deployment

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Local Testing
```bash
cd frontend
npm install  # or yarn install
npm start    # Test locally
npm run build # Create production build
```

### Step 2: Prepare for GitHub Pages
```bash
# Add to package.json:
# "homepage": "https://username.github.io/repository-name"

# Create .nojekyll file:
touch .nojekyll

# Create gh-pages branch:
git checkout -b gh-pages
```

### Step 3: Deploy
```bash
# Option A: Manual deployment
npm run build
cp -r frontend/build/* ./
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# Option B: Automated with GitHub Actions
# (Create .github/workflows/deploy.yml)
```

### Step 4: GitHub Settings
1. Go to repository Settings
2. Navigate to Pages section
3. Set source to: `gh-pages` branch
4. Wait for deployment to complete
5. Visit: `https://username.github.io/repository-name`

---

## 📝 CONTACT FORM SOLUTIONS COMPARISON

| Solution | Pros | Cons | Cost |
|----------|------|------|------|
| **Formspree** | Easy setup, good free tier, email forwarding | Limited free submissions (50/month) | Free → $25/mo |
| **EmailJS** | Client-side, no backend needed | Exposes email to client | Free → $9/mo |
| **Email Link Only** | Simplest, no external dependencies | Poor UX, requires manual action | Free |
| **FormSubmit** | Very simple, free tier | Limited features | Free |

**Recommendation:** **Formspree** - It's specifically designed for static sites and has good free tier.

### Implementation Example (Formspree):
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  try {
    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      // Show success message
      toast.success('Message sent!');
    }
  } catch (error) {
    toast.error('Failed to send message');
  }
};
```

---

## 🔍 FILES TO REVIEW

**Critical Files:**
- [frontend/src/App.js](frontend/src/App.js) - Router configuration
- [frontend/public/index.html](frontend/public/index.html) - Emergent code
- [frontend/src/pages/ContactPage.js](frontend/src/pages/ContactPage.js) - Form handling
- [frontend/craco.config.js](frontend/craco.config.js) - Build configuration

**Config Files:**
- [frontend/package.json](frontend/package.json) - Dependencies & scripts
- [frontend/public/manifest.json](frontend/public/manifest.json) - Missing PWA manifest

**Deployment:**
- `.nojekyll` - Needs to be created
- `.github/workflows/` - Optional CI/CD

---

## ⚠️ WARNINGS

1. **PostHog API Key:** Currently exposed in `index.html`. Either remove or regenerate if it was a test key.
2. **Instagram URL:** Currently points to generic `instagram.com`. Update when ready.
3. **Base Path:** If deploying to non-root path (e.g., `github.io/repo-name`), update `package.json` homepage.
4. **Image Loading:** All images are external CDNs. Ensure CORS headers allow access.

---

## 📚 RESOURCES

- [React Router HashRouter Docs](https://reactrouter.com/en/main/router-components/hash-router)
- [GitHub Pages React Deployment](https://create-react-app.dev/deployment/#github-pages)
- [Formspree Documentation](https://formspree.io/docs/)
- [GitHub Actions for Deployment](https://github.com/peaceiris/actions-gh-pages)

---

## 📞 SUPPORT

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify all external CDN URLs are accessible
3. Test locally before deploying
4. Check GitHub Pages settings match your repository name

