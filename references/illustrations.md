# Dashboard illustrations

## Style

- **Look:** flat vector line art with even, rounded outlines. No gradients, textures or text in the art.
- **Colour:** one accent (the brand colour), placed on the detail that matters (a pin, a check, a badge, a warning).
- **Ground:** a soft shadow ellipse under the object.
- **Composition:** one clear subject, plus at most two supporting objects.
- **Background:** transparent, always. Nothing goes behind the object (no circle, blob or card), and the page never adds a plate or tint either.
- **Formats:**
  - square pieces are 1:1 SVG (preferred; WebP works for detailed step art);
  - banners are 2:1, with the art on the right and empty space on the left for a headline.

## Palette from any brand colour

Start from the project's tokens. If the project has neutral greys, use them; otherwise use these defaults.

| Role | Light version | Dark version |
|---|---|---|
| Outline | near-black neutral, about `#2E3033` (or the text token) | light neutral, about `#E4E6EA` |
| Fill 1 (largest areas) | `#FFFFFF` | `#3A3D44` |
| Fill 2 | light grey, about `#E6E7EA` | `#4B4F58` |
| Fill 3 (shading) | mid grey, about `#A7AAB1` | `#6B707A` (plus `#5A5F69` if a 4th is needed) |
| Accent | **brand colour** | brand colour; lighten 10–15% if contrast against fill 1 is below 3:1 |
| Ground shadow | about `#E3E4E7` | about `#121316` |

- **Tinted brands:** if the brand's neutrals lean warm or cool, shift the greys the same way, so the art matches the UI's own greys.
- **Two-colour systems:** use a second accent sparingly, for status only: success green, or error red on error art.
- **Dark versions:** a dark version is the same drawing redrawn for a dark card, not an automatic colour inversion.

## Prompt templates

Write one prompt per slot, as a numbered list. For each, name the screen and state it serves (for example "Orders list, empty").

```
Flat vector line illustration, transparent background, no text.
Subject: <one object + up to two supporting objects, e.g. "an open cardboard box with a small location pin above it">.
Style: even rounded outlines ~2.5px in <OUTLINE>, fills <FILL1> / <FILL2> / <FILL3>, a single accent <ACCENT> on <the key detail>, soft ground shadow ellipse <SHADOW> under the object. No gradients, no textures, no background shapes, no people unless stated.
Framing: centred, square 1:1, subject fills ~80% of the frame. Deliver as SVG.
```

- **Dark version:** the same prompt with the dark palette, plus "drawn for a dark UI card, not an inverted copy".
- **Banner:** "2:1 wide, art in the right 40%, left side empty for a headline."
- **Sets:** state the size and style constraints once at the top, then list the subjects. That keeps a set of 20–70 pieces consistent.

## Which slots a dashboard needs

- **Empty states:** one per list, for each role.
- **Steps of each multi-step flow:** one per step, plus a success and an error version where they matter.
- **Overview and stats:** greeting or banner art, "all caught up", and one piece per stat.
- **Setup and onboarding:** one per setup step.
- **Errors:** load failed, action failed, and domain failures (declined, rejected).

Name keys by **state, not picture**: `empty-orders`, `step-payment`, `success-shipped`, `error-load`.

## Files and naming

- Put `<key>.svg` and `<key>-dark.svg` side by side, in one folder per set.
- Code derives the dark filename from the light one; it's never listed separately.
- If a dark file is missing or fails to load, fall back to the light file, and then to an icon. The slot must never vanish.

## Fitting delivered art

Generated SVGs are often off-centre or padded unevenly. For each square piece:
1. render the light and dark versions;
2. take the union of their visible pixel bounds;
3. set a square viewBox centred on the drawing, with about 7% padding.

`scripts/fit-svg.js` does this. Copy banners as they are.

Then run `scripts/contact-sheet.js`, which lays out every piece on the real card colours for light and dark. Check that the pieces are centred, similar in visual weight, and readable in dark mode.

## Wiring pattern

Use one component per set (or a slot registry mapping `slot → file`), and render both versions:

```tsx
<img src={`${dir}/${key}.svg`}      alt="" aria-hidden className={`${cls} dark:hidden`} />
<img src={`${dir}/${key}-dark.svg`} alt="" aria-hidden className={`${cls} hidden dark:inline-block`} />
```

- **Theme:** CSS-driven switching avoids a flash of the wrong version. Adapt `dark:` to the project's own theme mechanism.
- **Accessibility:** art next to a title is decorative (`alt=""`); the text carries the meaning. Give it real alt text only when it's the only content.
- **Sizes:**
  - empty states: 120–160px;
  - list rows: about 32–44px;
  - step panels: about 140px;
  - banners: 200×100 on tablet and 240×120 on desktop, hidden on phones.

## Clean-up after replacing a set

List the art files the change left unused by comparing references in HEAD with the working tree. Watch for runtime-built paths (template strings) before calling anything unused. Show the list and ask before deleting.
