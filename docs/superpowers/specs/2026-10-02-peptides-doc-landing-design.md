# The Peptides Doc — Single-product landing mockup

Date: 2026-10-02

## Goal

A client-ready HTML/CSS/JS mockup: a **single-product marketing landing page** in The Peptides Doc navy/teal theme. Three layout samples of the **same product** so a client can pick a direction.

## Product (all samples)

- Brand: The Peptides Doc
- Product: BPC-157 + TB-500 + GHK-CU
- Flavor: Tropical Punch
- Specs: 30 ml · 10 mg/ml · 300 mg total · 30 servings
- CTAs: dummy “Shop Now” / “Add to protocol” (no checkout)

## Samples

| File | Layout |
| --- | --- |
| `index.html` | Presentation hub with three cards |
| `samples/a-store-matched.html` | Product left, copy + CTA right (closest to the live PDP) |
| `samples/b-centered.html` | Centered campaign hero |
| `samples/c-split.html` | Sticky product/buy column, scrolling narrative |

Shared theme: `css/theme.css`. Shared behavior: `js/main.js` (FAQ, mobile nav, quantity). Product art: `assets/product-box.svg`.

## Page sections (every sample)

1. Presenter strip (jump between A/B/C)
2. Header
3. Hero + primary CTA
4. Spec strip (30 ml / concentration / total / servings)
5. Formula — three peptide cards
6. Protocol — three steps
7. Label / facts
8. FAQ
9. Closing CTA
10. Footer + research disclaimer

## Visual

- Background: deep navy (`#07141f`)
- Cards: raised navy, hairline teal-white borders
- Text: near-white / muted slate
- Accent: mint teal
- Primary button: cream, dark text
- Type: Syne (display) + Outfit (UI)
- Responsive to ~375px

## Out of scope

Real payments, CMS, multiple SKUs, pixel-perfect clone of the Shopify PDP.
