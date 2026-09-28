# Layout and responsiveness

## Desktop (lg and up)

- **Sidebar**
  - The primary action button sits on top ("Post an RFQ").
  - Nav items show counts ("2 need you") from the shared attention rules.
  - Settings and Collapse sit at the bottom; the collapsed state is remembered.
  - Active item: soft primary tint plus medium weight. **No orange bar or outline.**
  - A setup card sits in the sidebar only while setup is incomplete, and it hides on the page that already shows the full checklist.
- **Content**
  - Max width is comfortable; cards use `GlassCard`.
  - Master/detail list is about 40/60.
  - Preview panels are sticky if the list is long.
- **Density:** summary cards stay compact. Put facts in a two-column `dl`, and actions on the right of a card on large screens.

## Phone (under 640) and tablet

- **Bottom nav**
  - 4 or 5 destinations plus **More**, which opens a sheet (`NavMoreSheet` / admin `MobileNav`).
  - Badge counts are the same numbers as the sidebar.
  - The primary action becomes the first item in the More sheet or the page header, never a floating button that covers content.
- **Test at 390px width:** `document.documentElement.scrollWidth` must equal `innerWidth`. The only things allowed to scroll sideways are:
  - filter tab rows;
  - a deals or cards strip with scroll-snap;
  - wide tables inside their own scroll container.
- **Sticky bars inside padded pages** bleed to the edges with matching negative margins, e.g. `-mx-3 sm:-mx-4` to match `px-3 sm:px-4`. A fixed `-mx-4` caused overflow at 394px.
- **Order on phone:** next move, then the attention list, then work in progress, then stats in a compact 3-column grid, then activity.
- **Detail pages on phone** use Summary / Chat tabs. Chat fills the viewport (see `mobileChat` helpers). Collapsible cards stack.
- **Banners and greeting art** are hidden on phones (`hidden sm:block`); the text stays.

## Motion

- Short fades on refresh.
- A one-time pulse on a count that went up.
- All of it respects `prefers-reduced-motion`.
- No looping decoration.

## more.co.ke GPU safety (Android corruption bug), mandatory there

- Never combine `overflow-hidden` + a transform (`hover:scale`, `hover:-translate-y`, `group-hover:scale`) + an absolutely positioned or fill image in cards or image wrappers.
- Hover feedback on cards is `transition-shadow hover:shadow-md` only.
- No `backdrop-blur` on fixed or sticky elements unless guarded with `useGpuConservativeUi()`.
- No animated GIFs in files with fixed or sticky elements.
- Run `yarn lint:gpu` before any UI commit. A known existing violation is in `components/malls/MallPage.tsx`; don't add new ones.
