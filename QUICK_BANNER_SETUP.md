# Quick Banner Setup (5 Minutes)

Your website needs a banner image to show when shared on social media (Twitter, Facebook, LinkedIn, WhatsApp, etc.)

## Current Status
- ✅ Meta tags are configured in `app/layout.tsx`
- ❌ Image file `public/og-image.png` is **MISSING**

## Fastest Solution (Choose One)

### Method 1: Canva (Recommended)
1. Go to https://www.canva.com (free account)
2. Click "Create a design" → "Custom size" → **1200 x 630 pixels**
3. Choose a template or create from scratch:
   - Background: Dark gradient or solid color
   - Add text: "MOTIVA"
   - Add subtitle: "Daily Motivation in Arabic & English"
   - Add: "تحفيز يومي بالعربية والإنجليزية"
4. Click "Share" → "Download" → PNG
5. Rename to **og-image.png**
6. Save in your **public** folder
7. Done! ✅

### Method 2: Use the HTML Template I Created
1. Open **create-og-image.html** in Chrome browser
2. You'll see a professional banner
3. Right-click on the banner → Inspect
4. In DevTools, right-click `<div class="og-image">` → "Capture node screenshot"
5. Save as **og-image.png** in **public** folder
6. Done! ✅

### Method 3: Quick Online Generator
1. Go to https://og-image.vercel.app
2. Type your text:
   - "MOTIVA"
   - "Daily Motivation"
3. Select "dark" theme
4. Download the image
5. Rename to **og-image.png**
6. Save in **public** folder
7. Done! ✅

### Method 4: Use AI (Fastest)
1. Go to https://www.bing.com/images/create (free)
2. Prompt: "Create a professional social media banner, 1200x630 pixels, dark gradient background, text 'MOTIVA - Daily Motivation in Arabic & English', modern minimal design"
3. Download the best result
4. Resize to exactly 1200x630 if needed
5. Save as **og-image.png** in **public** folder
6. Done! ✅

## Image Requirements
- **Size:** 1200 x 630 pixels (mandatory)
- **Format:** PNG or JPG
- **File name:** og-image.png
- **Location:** public/og-image.png
- **File size:** Under 1MB recommended

## What Should Be On The Banner?
- Your app name: "MOTIVA"
- Tagline: "Daily Motivation in Arabic & English"
- Optional: "2000+ Quotes | Bilingual | Free"
- Your brand colors (dark theme: #06070e, #29524a)
- Clean, professional design

## Test Your Banner
After creating and saving the image:

1. Start your dev server: `npm run dev`
2. Visit http://localhost:3000
3. View page source (Ctrl+U)
4. Look for `<meta property="og:image"` - should show `/og-image.png`
5. Use online tester: https://www.opengraph.xyz

## What Happens When You Share?
Before adding banner:
```
❌ Link shows: Just text, no image
```

After adding banner:
```
✅ Link shows: Beautiful image with your branding
```

## Need Help?
- Full guide: See `OG_IMAGE_GUIDE.md`
- Template: Use `create-og-image.html`
- SVG template: Use `og-image-template.svg`

---

**Bottom Line:** Create a 1200x630 image, save as `public/og-image.png`, and you're done!

