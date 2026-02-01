# Formspree Setup Guide

## What is Formspree?

Formspree is a free service that captures form submissions from static websites and forwards them to your email. Perfect for GitHub Pages!

**Website:** https://formspree.io  
**Free Tier:** Unlimited forms, 50 submissions/month (plenty for a photography inquiry form)

---

## Setup Steps (2 minutes)

### Step 1: Create Account
1. Go to https://formspree.io
2. Click "Sign Up"
3. Enter your email and create password
4. Verify email (check your inbox)

### Step 2: Create a Form
1. Click "New Form" or "Create Form"
2. Name it: "Scarlette Photography Contact"
3. Select your email address where to send submissions
4. Click "Create"

### Step 3: Get Your Form ID
After creating, you'll see your unique Form ID:
- It looks like: `f_abc123def456` or similar
- Copy this ID (you'll need it next)

### Step 4: Update ContactPage.js
In your code, find this line:

**File:** `frontend/src/pages/ContactPage.js`  
**Line:** 42

Currently says:
```javascript
const response = await fetch('https://formspree.io/f/xyzabcde', {
```

Replace `xyzabcde` with your Formspree ID:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_ACTUAL_ID_HERE', {
```

**Example with real ID:**
```javascript
const response = await fetch('https://formspree.io/f/mqkzdpvl', {
```

### Step 5: Save and Test
1. Save the file
2. Go back to your terminal
3. If already running `npm start`, it will auto-refresh
4. Navigate to Contact page
5. Fill out form and click "SEND MESSAGE"

---

## Testing the Form

### Local Test:
1. Open http://localhost:3000/#/contact
2. Fill in all fields (required: Name, Email)
3. Click "SEND MESSAGE"
4. Should see success toast: "Your message has been sent..."
5. Form should clear

### Verify in Formspree:
1. Log in to https://formspree.io
2. Go to your form
3. Click "Submissions" tab
4. Should see your test submission listed

### Email Verification:
1. Check your email inbox
2. Should have received the submission data
3. Can reply directly from email to contact the user

---

## Features You Get

✅ **Email Forwarding** - Submissions sent directly to your email  
✅ **No Backend Needed** - Works on static sites  
✅ **Automatic Replies** - Can set up auto-response emails  
✅ **Spam Protection** - Built-in spam filtering  
✅ **Export Data** - Download all submissions as CSV  
✅ **File Uploads** - (Premium) Users can attach photos  

---

## What Happens When Someone Submits

```
User fills form on your website
         ↓
Clicks "SEND MESSAGE"
         ↓
Data sent to Formspree (secure)
         ↓
Formspree forwards to your email
         ↓
You get email with all details
         ↓
You can reply directly
```

---

## Form Fields (What Gets Sent)

When someone submits, you'll receive:
- **Name** - Their name
- **Email** - Their email (so you can reply)
- **Phone** - Their phone number
- **Message** - Additional details/notes
- **Date** - When they submitted
- **Subject** - "New booking inquiry from [Name]"

---

## Email Example

When someone submits, you'll get an email like:

```
From: noreply@formspree.io
Subject: New booking inquiry from Jane Doe

Name: Jane Doe
Email: jane.doe@example.com
Phone: +33 6 12 34 56 78
Message: We'd love a photoshoot at the château next summer!

---
To reply to this submission, click here: [reply link]
```

---

## Advanced Options (Optional)

### Auto-Reply Email
Set up automatic response to users who submit:
1. In Formspree dashboard
2. Go to form settings
3. Enable "Auto-reply"
4. Write message like: "Thanks for your inquiry! I'll get back to you within 24 hours."

### Webhooks (Advanced)
If you want custom handling:
1. Formspree can send webhooks to services like Zapier, Discord, Slack
2. Could post notifications to your phone or Slack channel

### CAPTCHA Protection
Add verification to prevent spam bots:
1. In form settings, enable reCAPTCHA
2. Users must check "I'm not a robot"

---

## Troubleshooting

### Form Won't Submit
**Check:**
1. Form ID is correctly updated in ContactPage.js
2. ID doesn't have `f_` prefix twice (just `f_youridentifier`)
3. Internet connection works
4. Form is valid (Name and Email required)

### Not Receiving Emails
**Check:**
1. Verify email address in Formspree is correct
2. Check spam/junk folder
3. Enable "Allow Formspree emails" if getting prompt
4. Try adding noreply@formspree.io to contacts

### CORS Errors
**Usually means:**
- Form ID is incorrect
- Spelling mistake in fetch URL
- Typo in the domain

---

## Security Notes

✅ **Your email is hidden** - Not visible in source code (sent via Formspree)  
✅ **Form submissions are encrypted** - Formspree uses HTTPS  
✅ **Spam protected** - Basic protection included free  
✅ **No ads on your form** - Clean submission experience  

⚠️ **API Key visible** - The Formspree endpoint is visible in browser inspector, but that's OK - it's public data and rate-limited

---

## Alternatives to Formspree

If you prefer other services:

| Service | Price | Features | Setup |
|---------|-------|----------|-------|
| **Formspree** | Free/month | Email forward, simple | 2 min |
| **EmailJS** | Free/month | Client-side email | 5 min |
| **FormSubmit** | Free | Very simple | 1 min |
| **Brevo** | Free/month | Marketing + forms | 10 min |

For simplicity, **Formspree is recommended** for your use case.

---

## Next: Test & Deploy

Once Formspree is set up:

1. **Test locally:**
   ```bash
   cd frontend
   npm start
   # Go to http://localhost:3000/#/contact
   # Submit test form
   ```

2. **Deploy to GitHub Pages:**
   - See GITHUB_PAGES_MIGRATION.md for full deployment steps

3. **After deployment:**
   - Visit your GitHub Pages site
   - Try submitting form on live site
   - Should work exactly like local testing

---

## Support

- **Formspree Help:** https://formspree.io/help
- **Formspree Status:** https://status.formspree.io
- **Email Support:** support@formspree.io (free users get community support)

---

**Status:** Ready to set up  
**Time Needed:** 2 minutes  
**Next:** Update ContactPage.js line 42 with your Formspree ID

