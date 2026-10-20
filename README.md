# Sundus Guest House Skardu (Next.js + TypeScript)
Landing page for Sundus Guest House, Skardu, built for the Next.js Google Business profile assignment. Design follows the UNEET real-estate template (dark angular hero, gold accent, card grid).

## Run
```
npm install
npm run dev
```
Set `NEXT_PUBLIC_SITE_URL` to the live URL before deploying (used by metadata, sitemap and robots).

## How it works
- `data/business.json` holds the business data. Pages read it through API routes: `/api/rooms`, `/api/reviews`, `/api/timings`, `/api/contact` (POST).
- `app/page.tsx` has 11 sections: hero, about, stats, why us, video, rooms, gallery, reviews, location and timings, FAQ, contact.
- LD+JSON (`LodgingBusiness`) is injected in `app/page.tsx`. Test it at search.google.com/test/rich-results.

## Add your own media (from the Google Maps profile)
Images in `public/images/`: `hero.jpg`, `about.jpg`, `video-poster.jpg`, `contact.jpg`, `room-1..3.jpg`, `gallery-1..8.jpg`. Video: `public/videos/tour.mp4`. Missing files show a gradient instead.

## Fill from Google Maps before submitting
Rating and review count (data file uses 4.9 and 70, which vary), real reviews, phone, email, reception hours, real room types and rates (rooms are placeholders, `verified:false`), and check the coordinates.

## Checklist
Conventional commits (`feat:`, `fix:`, `docs:`), deploy to Vercel, add the property in Google Search Console and submit `/sitemap.xml`, add laptop/tablet/mobile mockups here, and put the Stitch design link here.
