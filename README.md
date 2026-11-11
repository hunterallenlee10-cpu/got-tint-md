# got tint? · Concept site

Spec demo for **Got Tint?**, 9000A Edgeworth Dr, Capitol Heights, MD 20743. Built by Lee Enterprises Unlimited to show the owner. Front end only, no backend.

Plan, design tokens and build checklist: [`implementation_kickstart.md`](implementation_kickstart.md).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production check: `npm run build && npm start`.

## Deploy (Vercel)

1. Push this repo to GitHub and import it in Vercel. Framework preset: Next.js. No settings needed.
2. Optional: set `NEXT_PUBLIC_SITE_URL` to the final preview URL so canonical and Open Graph links are absolute.
3. Leave `SITE_INDEXABLE` unset. The site ships with `noindex, nofollow` (meta tag and `X-Robots-Tag` header) so it never competes with gottintmd.com. Set `SITE_INDEXABLE=true` only when this becomes the owner's live site.

`@vercel/analytics` loads only when hosted on Vercel.

## Where to edit things

| What | File |
|---|---|
| Phone, address, hours, email, socials, warranty, $99 special | `lib/business.ts` |
| Gallery photos, vehicle names, filter tags | `lib/gallery.ts` |
| MD / DC / VA tint limits (sources in comments) | `lib/tintLaws.ts` |
| Shade stops and their one-liners | `lib/shades.ts` |
| Sample reviews | `components/sections/Reviews.tsx` |
| Jeep window mask for the Shade Visualizer | `components/ShadeVisualizer/JeepWindows.tsx` |

## Photos

All 24 photos are the owner's own job photos from his Facebook page (Drive folder "Got Tint - Website Demo Assets"). They were Facebook screenshots with a mouse pointer baked into the same spot on every image. That pointer was removed with a small inpaint. Nothing else about the photos was changed.

- `public/images/*.webp` are what the site uses (committed).
- `public/images/raw/` holds the cleaned JPGs and is git-ignored. To regenerate the webp files, drop JPGs in there and run `npm run images`.
- `scripts/generate-brand-assets.cjs` renders the OG image and the "g?" icons (needs Playwright: `NODE_PATH=$(npm root -g) node scripts/generate-brand-assets.cjs`).

No stock or AI images anywhere. Residential, Commercial and Marine use labelled placeholders until real photos come in.

## Owner needs to confirm or supply

Search the code for `DRAFT` and `TODO` to find each one.

1. **$99 Window Tint Special:** what it covers and whether it's still running.
2. **Warranty:** exact terms of the "manufacturer's lifetime warranty".
3. **Mobile service radius:** how far he travels in MD, DC and VA.
4. **(678) 365-5959:** a Georgia number on his old site. Left off. Keep or drop?
5. **Instagram:** confirm the URL for @gottint_.
6. **Reviews:** the three reviews are samples and are labelled as such. Replace with real Google reviews and the real Google review link.
7. **Photos:** home, storefront and boat jobs for the Residential, Commercial and Marine tiles. Original (non-screenshot) versions of the car photos would also be sharper.
8. **Reply method and timing:** the Builder's success message says "We'll text you to confirm your time."
9. **"Darker by tonight":** final CTA headline depends on availability. Swap to "this week" if he prefers.
10. **Tint laws:** checked against the MD, DC and VA statutes in November 2026. Shown as a general guide, not legal advice.
