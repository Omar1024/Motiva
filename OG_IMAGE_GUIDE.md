# Creating Your Social Media Banner (OG Image)

Your website is already configured to show a banner when shared on social media, but the image file is missing. Here are easy ways to create it:

## Option 1: Use Online OG Image Generator (Recommended - 5 Minutes)

### Using Canva (Free)
1. Go to https://www.canva.com
2. Search for "Open Graph Image" or create custom size: 1200 x 630 pixels
3. Use this design:
   - Background: Dark gradient (#06070e to #29524a)
   - Text: "MOTIVA" (large, white, bold)
   - Subtitle: "Daily Motivation in Arabic & English"
   - Arabic text: "تحفيز يومي بالعربية والإنجليزية"
   - Features: "2000+ Quotes | 5 Categories | Bilingual"
4. Download as PNG
5. Rename to `og-image.png`
6. Save in `public` folder

### Using Figma (Free)
1. Go to https://www.figma.com
2. Create new file with frame: 1200 x 630 pixels
3. Copy the design from `create-og-image.html` (open in browser)
4. Export as PNG
5. Save as `public/og-image.png`

### Using og-image.vercel.app
1. Go to https://og-image.vercel.app
2. Enter:
   - Title: "MOTIVA"
   - Subtitle: "Daily Motivation in Arabic & English"
   - Theme: Dark
3. Download the generated image
4. Save as `public/og-image.png`

## Option 2: Use Existing Logo (Quick but Basic)

If you want a quick solution using your existing logo:

1. Copy your logo/brand image
2. Resize to 1200 x 630 pixels using:
   - https://www.iloveimg.com/resize-image
   - Or any image editor
3. Add text overlay if needed
4. Save as `public/og-image.png`

## Option 3: Screenshot the HTML Template

I've created a professional template for you in `create-og-image.html`:

1. Open `create-og-image.html` in Chrome
2. Right-click on the colored banner
3. Click "Inspect"
4. Right-click on `<div class="og-image">` in DevTools
5. Select "Capture node screenshot"
6. Save as `og-image.png`
7. Move to `public` folder

## Option 4: Hire a Designer (Professional)

For a custom professional banner:
- Fiverr: $5-20
- 99designs: $50+
- Specs: 1200 x 630 pixels, PNG format

## Verify It Works

After adding the image:

1. Go to https://www.opengraph.xyz
2. Enter your website URL
3. See the preview of your banner

## Design Specifications

Your OG image should include:
- **Size:** 1200 x 630 pixels (mandatory)
- **Format:** PNG or JPG
- **Colors:** Match your brand (#06070e, #29524a)
- **Text:** App name, tagline in both languages
- **File location:** `public/og-image.png`

## Current Meta Tags (Already Configured)

Your `app/layout.tsx` is already set up with:
```typescript
openGraph: {
  images: [
    {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Motiva - Daily Motivation',
    },
  ],
}
```

Just add the image file and you're done!

## Alternative: Use Different Social Media Images

If you want different images for different platforms:

**Twitter:** 1200 x 628 pixels (twitter-image.png)
**Facebook:** 1200 x 630 pixels (og-image.png)
**LinkedIn:** 1200 x 627 pixels (linkedin-image.png)

---

**Recommended:** Use Option 1 (Canva) for a professional result in 5 minutes.

