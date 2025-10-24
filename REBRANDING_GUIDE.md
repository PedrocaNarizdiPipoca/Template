# Video Editor Landing Page - Rebranding Guide

## Quick Rebrand Process

This template is designed for easy rebranding. Follow these steps for each new client:

### 1. Update Brand Configuration

Edit **`src/config/brandConfig.ts`** with the new client information:

```typescript
export const BRAND_CONFIG = {
  name: "CLIENT_NAME",
  logo: "/assets/Logo.png",
  profilePicture: "/assets/profile-picture.jpg",
  email: "contact@client.com",

  videos: [
    "/assets/video1.mp4",
    "/assets/video2.mp4",
    "/assets/video3.mp4",
    "/assets/video4.mp4",
    "/assets/video5.mp4",
    "/assets/video6.mp4"
  ],

  socialMedia: {
    twitter: "https://x.com/clienthandle",
    instagram: "https://instagram.com/clienthandle",
    youtube: "https://youtube.com/@clienthandle"
  }
};
```

### 2. Replace Assets

Place these files in `/public/assets/`:

- **Logo.png** - Client's logo
- **profile-picture.jpg** - Client's profile photo
- **video1.mp4** through **video6.mp4** - Portfolio videos

### 3. Build & Deploy

```bash
npm run build
```

That's it! The entire site will automatically update with the new brand.

## What Gets Updated Automatically

When you update `brandConfig.ts`, these elements change across the entire site:

- Brand name in navigation, footer, and page title
- Logo/profile picture in all locations
- Email address in contact section
- Social media links (Twitter, Instagram, YouTube)
- Portfolio video sources
- Meta tags and SEO information

## File Structure

```
src/
  config/
    brandConfig.ts          # Single source of truth for all branding
  components/
    Navigation.tsx           # Uses BRAND_CONFIG
    LoadingScreen.tsx        # Uses BRAND_CONFIG
    sections/
      HeroSection.tsx        # Uses BRAND_CONFIG
      AboutSection.tsx       # Uses BRAND_CONFIG
      PortfolioSection.tsx   # Uses BRAND_CONFIG
      ContactSection.tsx     # Uses BRAND_CONFIG
      FooterSection.tsx      # Uses BRAND_CONFIG
  pages/
    Portfolio.tsx            # Uses BRAND_CONFIG

public/
  assets/
    Logo.png                 # Replace per client
    profile-picture.jpg      # Replace per client
    video1.mp4              # Add per client
    video2.mp4              # Add per client
    video3.mp4              # Add per client
    video4.mp4              # Add per client
    video5.mp4              # Add per client
    video6.mp4              # Add per client
```

## Notes

- No manual find-and-replace needed
- All changes centralized in one config file
- Videos load automatically when added to `/public/assets/`
- Testimonials section has been removed from this template
