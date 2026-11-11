# got tint? · Implementation Kickstart

Concept site for **Got Tint?** (9000A Edgeworth Dr, Capitol Heights, MD 20743), built by Lee Enterprises Unlimited as a spec demo for the owner. Front end only. One goal: every action leads to **Book My Tint** (the Tint Builder). Call or text (301) 828-6311 is the always-visible second path.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Framer Motion only in the hero tint wipe and the Shade Visualizer
- `lucide-react` icons, stroke 1.75
- `sharp` converts the owner's 24 job photos (`public/images/raw`) to `.webp` in `public/images` (`npm run images`)
- `@vercel/analytics` is the only script

## Design tokens: "Midnight Lime"

| Token | Value | Use |
|---|---|---|
| `--bg` | `#07090A` | Page background, tinted-glass black |
| `--surface` | `#111517` | Cards, smoked glass |
| `--line` | `#1F2629` | 1px borders |
| `--lime` | `#C8E62A` | CTAs, wordmark, key numbers, active states, visualizer handle |
| `--text` | `#F2F5F3` | Body text |
| `--muted` | `#8C9A9E` | Secondary text |
| Lime panel | lime at 6% over bg | One section only (the $99 offer band) |

- Glass card: gradient `#141A1C` to `#0E1213`, 1px `--line` border, 1px top highlight `rgba(255,255,255,0.06)`, radius 14px
- Buttons and chips: radius 999px. One soft lime glow on the primary button only
- Fonts: **Saira Condensed** 700/800 (display, wordmark, numbers), **Manrope** 400/500/600 (body)
- 8px grid. Section padding 112 to 128px desktop, 72px mobile
- Motion in 2 places only: hero tint wipe, Shade Visualizer. Gallery marquee is CSS-only and pauses on hover. Respect `prefers-reduced-motion`

## File map

```
app/                 layout (fonts, metadata, JSON-LD), page, contact/page, icons, OG image
components/sections/ one file per section
components/TintBuilder/      modal + steps + summary/SMS builder
components/ShadeVisualizer/  photo + traced window mask + slider + legal strip
components/ui/       Button, Wordmark, GlassCard, Placeholder, SectionHeading
lib/business.ts      every business fact (edit here)
lib/gallery.ts       photo map + gallery tags
lib/tintLaws.ts      MD / DC / VA limits with source URLs in comments
lib/shades.ts        the 5 VLT stops
```

No file over 500 lines.

## Copy rules

No em dashes or double hyphens. No hype words. No invented facts, prices, film brands, ratings, awards or "#1" claims. Anything assumed is marked `// DRAFT` in code or labelled "Sample" on the page.

## Build checklist

- [x] Phase 1: scaffold, design tokens, fonts, promo bar, nav, hero with the tint wipe, footer
- [ ] Phase 2: "3 ways to get tinted", Shade Visualizer with the traced window mask, legal strip (laws looked up and cited)
- [ ] Phase 3: services bento, Our Work gallery with filters, lightbox and marquee
- [ ] Phase 4: visit the shop, how it works, $99 offer band, sample reviews, FAQ, final CTA
- [ ] Phase 5: Tint Builder modal, every CTA wired with pre-selects, prefilled SMS, mobile sticky bar, `/contact`
- [ ] Phase 6: metadata, OG image, favicon, JSON-LD, noindex, image optimization, Lighthouse pass
- [ ] Phase 7: final review, commit, ready for GitHub and Vercel import

## Final review checklist

- [ ] The hero alone would sell the job. Tint wipe plays once and reads as film going on glass. Headline readable on mobile
- [ ] Shade Visualizer darkens only the windows, lines up with the glass, works with mouse, touch and keyboard
- [ ] Tint-law numbers sourced in code comments, with the "not legal advice" line
- [ ] Every "Book My Tint" opens the Builder with the right pre-selects. Phone, text and directions links work
- [ ] Zero em dashes, zero "--", zero stock or AI images, zero invented facts
- [ ] Sample reviews, $99 special, warranty wording and other drafts are labelled or commented
- [ ] Max 2 fonts, 3 colors plus text, motion in only 2 sections, no cursor effects or loading intro
- [ ] Mobile 375px: no overflow, burger works, sticky call/text/book bar works
- [ ] Footer on both pages with the concept line. noindex present
- [ ] Lighthouse 90+
