# Security & Public Files Guide

## Understanding Public Files

In web applications, certain files MUST be publicly accessible for the site to function properly. This is not a security issue - it's by design.

---

## ✅ Files That MUST Remain Public

### 1. **og-image.png** (Social Media Banner)
**URL:** `https://motiva.obl.ee/og-image.png`

**Why it's public:**
- Twitter, Facebook, LinkedIn, WhatsApp need to download this image
- When someone shares your link, these platforms fetch the image from your server
- If blocked, your social media previews won't work

**Security:** ✅ Safe - It's just a branding image with no sensitive data

**Can I block it?** ❌ No - Your Twitter card will break

---

### 2. **favicon.ico, logo.png, icons**
**URLs:** `/favicon.ico`, `/logo.png`, `/icon-*.svg`

**Why they're public:**
- Browsers load favicons for tabs
- PWA installation requires icons
- Standard web functionality

**Security:** ✅ Safe - Just branding images

---

### 3. **manifest.json**
**URL:** `https://motiva.obl.ee/manifest.json`

**Why it's public:**
- Required for Progressive Web App (PWA)
- Tells browsers how to install your app
- Defines app name, colors, icons

**Security:** ✅ Safe - No sensitive data

---

### 4. **sitemap.xml**
**URL:** `https://motiva.obl.ee/sitemap.xml`

**Why it's public:**
- Google, Bing, search engines need to read this
- Helps with SEO
- Lists your public pages

**Security:** ✅ Safe - Only lists public URLs

---

### 5. **robots.txt**
**URL:** `https://motiva.obl.ee/robots.txt`

**Why it's public:**
- Search engine crawlers read this first
- Standard web practice
- Defines crawling rules

**Security:** ✅ Safe - Just crawler instructions

---

### 6. **sw.js** (Service Worker)
**URL:** `https://motiva.obl.ee/sw.js`

**Why it's public:**
- Browsers need to load this for offline functionality
- Required for PWA features
- Standard web technology

**Security:** ✅ Safe - Just caching logic

---

## 🔒 What I've Done for Security

### 1. Enhanced Security Headers
```javascript
✅ X-Frame-Options: SAMEORIGIN (prevents clickjacking)
✅ X-Content-Type-Options: nosniff (prevents MIME attacks)
✅ X-XSS-Protection: enabled
✅ Strict-Transport-Security: HTTPS only
✅ Referrer-Policy: limited data sharing
✅ Permissions-Policy: camera/mic/location disabled
```

### 2. Proper Caching for OG Image
```javascript
✅ Cache-Control: public, max-age=31536000
   (Tells social media platforms to cache the image)
```

### 3. Removed Sensitive Headers
```javascript
✅ poweredByHeader: false (hides Next.js version)
```

### 4. Updated Domain References
```javascript
✅ robots.txt → motiva.obl.ee
✅ sitemap.xml → motiva.obl.ee
✅ OG image URLs → absolute URLs
```

---

## ❌ Files That Are NOT Public

These files are automatically protected by Next.js:

| File | Protected By | Status |
|------|--------------|--------|
| `.env` files | Never deployed | ✅ Safe |
| `node_modules/` | Ignored by git | ✅ Safe |
| Source code (`.tsx`, `.ts`) | Only deployed as compiled JS | ✅ Safe |
| `next.config.js` | Build-time only | ✅ Safe |
| Database files | Client-side only (IndexedDB) | ✅ Safe |

---

## 🚫 Common Misconceptions

### "Anyone can see my OG image!"
**Answer:** Yes, and that's the point! It's your public branding. Like your logo on a billboard.

### "People can download my images!"
**Answer:** Yes, but that's normal for websites. If someone can see it in their browser, they can save it. This is not a security flaw - it's how the web works.

### "Can hackers exploit public files?"
**Answer:** No. Your public files contain:
- Images (branding)
- Manifests (app metadata)
- Sitemaps (public page lists)
- No passwords, no API keys, no user data

---

## 🛡️ Real Security Threats (That You Don't Have)

These would be actual security issues:

❌ **Exposed .env files** → You don't have this
❌ **Public API keys** → You don't have this
❌ **Unprotected admin panels** → You don't have this
❌ **SQL injection vulnerabilities** → No database
❌ **Exposed user data** → Everything is client-side
❌ **Weak authentication** → No authentication needed

**Your app is secure!**

---

## 📊 What Data is Stored?

### Server (motiva.obl.ee):
- ✅ Static files (HTML, CSS, JS)
- ✅ Images (OG image, icons, logos)
- ✅ Quote data (hardcoded, public)
- ❌ No user data
- ❌ No passwords
- ❌ No API keys

### Client (User's browser):
- ✅ Favorites (IndexedDB - local only)
- ✅ Ratings (IndexedDB - local only)
- ✅ Language preference (localStorage)
- ✅ This data never leaves the user's device

---

## 🔐 Additional Security Options (If Needed)

If you want EXTRA security (not necessary, but available):

### 1. Rate Limiting
Limit how many times someone can access files:
- Prevents bandwidth theft
- Requires server-side configuration
- Not needed for small sites

### 2. Hotlink Protection
Prevent other sites from embedding your images:
- Server-level configuration
- Not recommended for OG images (breaks sharing)

### 3. Content Security Policy
Already partially implemented via headers:
```javascript
✅ X-Frame-Options: SAMEORIGIN
```

### 4. DDoS Protection
Use services like:
- Cloudflare (free)
- AWS CloudFront
- Your hosting provider may include this

---

## ✅ Bottom Line

**Your website is secure.**

All publicly accessible files are:
1. Intentionally public
2. Contain no sensitive data
3. Required for functionality
4. Industry-standard practice

The OG image at `https://motiva.obl.ee/og-image.png` **MUST remain public** for Twitter/social media to work.

---

## 📝 Summary of Changes Made

✅ Updated robots.txt domain
✅ Updated sitemap.xml domain
✅ Enhanced security headers
✅ Optimized OG image caching
✅ Removed server fingerprinting

**Your site is now properly configured and secure!**

---

## Questions?

**Q: Can I password-protect the OG image?**
A: No - Twitter won't be able to access it

**Q: Should I hide the OG image URL?**
A: No - It needs to be discoverable by social platforms

**Q: Is my user data safe?**
A: Yes - All user data stays in their browser (IndexedDB)

**Q: Can someone steal my quotes?**
A: The quotes are intentionally public content meant to be shared

**Q: What about GDPR/privacy?**
A: You're compliant - no server-side tracking, no cookies, no personal data collection

