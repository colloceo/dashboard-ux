# Dashboard illustrations

## House style (trade, reused on more.co.ke)

- **Style:** flat vector line art. Even, rounded dark outlines. No gradients or textures. One accent colour, and a soft ground shadow ellipse under the object. No text in the art.
- **Light version**
  - outlines: `#2E3033`
  - fills: `#FFFFFF`, `#E6E7EA`, `#A7AAB1`
  - accent: `#F65016`
  - ground shadow: `#E3E4E7`
- **Dark version**
  - outlines: `#E4E6EA`
  - fills: `#3A3D44`, `#4B4F58`, `#6B707A`, `#5A5F69`
  - accent: the same `#F65016`
  - ground shadow: `#121316`
  - It's the same drawing redrawn for a dark card, not a colour-inverted copy.
- **Transparent background, always.** Nothing behind the object: no circle, no blob, no card. The page never adds one either.
- **Composition:** one clear subject, plus at most two supporting objects. The accent goes on the thing that matters (a pin, a check, a badge, a warning).
- **Formats:**
  - square pieces: 1:1 SVG, which is preferred (WebP is fine for step art);
  - banners: 2:1, with the art on the right and empty space on the left for the headline.

## Prompt template (give the user one per piece, light and dark)

```
Flat vector line illustration, transparent background, no text.
Subject: <one object + up to two supporting objects, e.g. "an open cardboard box with a small orange location pin above it">.
Style: even rounded outlines 2.5px in #2E3033, fills #FFFFFF / #E6E7EA / #A7AAB1, single accent #F65016 on <the key detail>, soft ground shadow ellipse #E3E4E7 under the object. No gradients, no textures, no background shapes, no people unless stated.
Framing: centred, square 1:1, subject fills ~80% of the frame, SVG.
```

For the dark twin, use the same prompt with the dark palette: outlines `#E4E6EA`, fills `#3A3D44`/`#4B4F58`/`#6B707A`/`#5A5F69`, accent `#F65016`, shadow `#121316`, and "drawn for a dark card".

When asked to "give me the prompts", write them as a numbered list, one per slot, each saying which screen and state it serves.

## Naming and files

- `<key>.svg` + `<key>-dark.svg` side by side. The dark file is always the light name plus `-dark`. Code derives it; it's never listed separately.
- **Trade:** `public/illustrations/{order-steps,overview,verification}/`.
- **more.co.ke:** `public/illustrations/dashboard/`.
- Name the key by state, not by picture: `feature-empty-orders`, `buyer-empty-cart`, `success-payment`, `error-load`.

## Fitting delivered art

Generated SVGs are often off-centre. Before wiring them in, fit each square piece's viewBox to the drawing's visible pixel bounds:
- render it;
- measure the alpha bounds, taking the union of the light and dark versions;
- set a square viewBox with 7% padding.

Copy banners as they are. The scratchpad script `fitsvg.js` did this for more.co.ke. After fitting, make a contact sheet of every piece on the real card colours (light `#ffffff`, dark `#1f2329`) and check that they're centred and similar in size.

## Wiring

- **Trade:** `StepIllustration name=… set="order-steps"|"overview"|"verification"`. It shows both versions and swaps them with `dark:hidden`, so there's no flash, and falls back to a lucide icon if the file fails.
- **more.co.ke:** `SellerIllustration slot=…` for registry slots (`dash("file")` in `SLOT_ASSETS`), and `ThemedArt src=…` for one-off images. The `surface` prop is a no-op; don't reintroduce plates.
- **Admin:** `Illustration` component.
- **Accessibility:** art is decorative next to a title (`alt=""`, `aria-hidden`), because the text carries the meaning.
- **Sizes:**
  - empty states: 120–160px;
  - list rows: about 32–44px;
  - step panels: about 140px;
  - banners: 200×100 on tablet (hidden on phone), 240×120 on desktop.

## Clean-up

After replacing a set, find files the change left unused. Compare HEAD's references with the working tree, and note any dynamic path building before deleting anything. Ask the user before deleting.
