# Layout and responsiveness

## Desktop (about 1024px and up)

- **Sidebar**
  - The role's primary action button sits on top ("New request", "Add product").
  - Nav items carry counts from the rules module ("2 need you").
  - Settings and a Collapse toggle sit at the bottom; the collapsed state is remembered (browser storage is fine for this).
  - The active item gets a soft brand tint and medium weight. No bar or outline.
  - A setup card appears only while setup is incomplete, and hides on the page that shows the full checklist.
- **Content**
  - Cards come from the project's kit.
  - List and detail split about 40/60.
  - The preview panel is sticky when the list is long.
- **Density:** facts go in a two-column definition list. Card actions sit on the right on wide screens and stack below on narrow ones.

## Phone (under about 640px) and tablet

- **Bottom nav**
  - 4 or 5 destinations plus **More**, which opens a sheet with the rest.
  - Badge counts are the same numbers as the sidebar.
  - Respect the safe-area inset.
- **Primary action:** it goes in the page header or at the top of the More sheet. Avoid floating buttons that cover content.
- **The 390px rule:** `document.documentElement.scrollWidth === innerWidth`. Only these may scroll sideways:
  - filter tab rows;
  - a snap-scrolling cards strip;
  - wide tables inside their own scroll container.
- **Full-bleed sticky bars inside padded pages:** use negative margins that match the padding at every breakpoint, for example `-mx-3 sm:-mx-4` for `px-3 sm:px-4`. A single fixed value overflows on phones.
- **Order on phone:** next move, then needs you, then in progress (strip), then stats (compact 3-column), then activity.
- **Detail pages on phone:** Summary / Chat (or Activity) tabs. Chat fills the viewport height, and collapsible sections stack.
- **Decorative banners are hidden on phones;** the text stays.
- **Touch targets** are at least 44px. Hover-only information must also be reachable by tap.

## Motion

- Use short fades on data refresh, and a one-time pulse when a count goes up.
- Respect `prefers-reduced-motion`.
- No looping decoration, and nothing that delays a task.

## Mobile GPU safety (important for low-end Android)

- Don't combine `overflow: hidden` + a transform (hover scale or translate) + an absolutely positioned or fill image in the same card or image wrapper. On many Android GPUs this causes striped rendering corruption. For card hover, use a shadow change only.
- No `backdrop-filter` blur on fixed or sticky elements.
- No animated GIFs in fixed or sticky elements.
- Unmount hidden fixed panels instead of translating them offscreen.
- If the project has a lint for these, run it before UI commits and don't add new violations.
