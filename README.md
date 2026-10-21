# Sundus Guest House Skardu (Next.js + TypeScript)
Built by Asma Shahzadi.
Landing page for Sundus Guest House, Skardu, built for the Next.js Google Business profile assignment. Design follows the UNEET real-estate template (angular hero, card grid) with a pine green, cream and apricot palette.

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
Images in `public/images/`: `hero.jpg`, `about.jpg`, `contact.jpg`, `room-1..3.jpg`, `gallery-1..8.jpg`, and `place-1..4.jpg`. Video gallery is disabled until video media is available. No video files are required.

## Fill from Google Maps before submitting
Rating and review count (data file uses 4.9 and 70, which vary), real reviews, phone, email, reception hours, real room types and rates (rooms are placeholders, `verified:false`), and check the coordinates.

## Checklist
Conventional commits (`feat:`, `fix:`, `docs:`), deploy to Vercel, add the property in Google Search Console and submit `/sitemap.xml`, add laptop/tablet/mobile mockups here, and put the Stitch design link here.

## Logo and reviews
`public/images/logo.png` is cropped from the supplied logo mockup (circle, no colour changes). Replace it with a transparent PNG from the owner if available.
Reviews: put only real Google reviews in `reviews` (author, rating, text, date) and set `googleReviewsUrl` to the verified Google reviews link. Until then the site links to a Google Maps search.

## Data from the Google Maps profile
Phone, Open 24 hours, plus code, coordinates and 4 reviews were taken from the owner's Maps screenshots. Rating and review count are not shown until verified: set `rating`, `reviewCount` and `ratingVerified` in `data/business.json`. Review text is truncated exactly as Maps shows it.

## Design notes
Palette: navy `#10263F`, gold `#D4A15A`, bronze `#9A6434`, cream `#FBF7F0` (see `tailwind.config.ts`). Fonts: Playfair Display and DM Sans. Add `public/images/place-1..4.jpg` for the Explore section. The hero uses a fixed height (not aspect-ratio) so it never overflows narrow screens.
