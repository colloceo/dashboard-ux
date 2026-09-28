---
name: dashboard-ux
description: House UI/UX rules for role dashboards (buyer, seller, admin) as built across trade.more.co.ke (buyer/seller + admin) and more.co.ke (buyer/seller). Use whenever designing, redesigning, reviewing or building a dashboard screen, overview, sidebar/bottom nav, list + detail page, filter row, order/RFQ flow page, empty/error/success state, money or fee display, or when adding/replacing dashboard illustrations (including writing prompts to generate them in light and dark). Also use when the user shares a dashboard screenshot and asks how to improve, compact or rearrange it.
---

# Dashboard UX

These are the rules we settled on while building the trade buyer/seller dashboards, the trade admin, and the more.co.ke buyer/seller dashboards. Apply them together with `ux-design` / `ux-psychology`. This skill is the house style; those are the general method.

The one-line test for any dashboard screen: **can the person see, within two seconds, what needs them, what it will cost them, and what to press next?**

## Workflow

1. **Inspect first.** Open the page, its shared components, and the data it gets. Screenshots from the user are evidence; read them before claiming anything.
2. **Name the user's job on this screen.** Examples: "pay the deposit", "quote before the window closes", "review a held message". Put that job first on the page.
3. **Reuse the shared pieces** (see `references/patterns.md`) instead of new one-offs.
4. **Design the phone layout on purpose.** It is not a squeezed desktop (see `references/layout-responsive.md`).
5. **Illustrations:** use the house style, give every piece a dark version, and never put a background behind one (see `references/illustrations.md`).
6. **Verify.** Take mocked screenshots in light and dark, at desktop and 390px, and confirm no sideways scroll. Then follow the repo's ship rule (see `references/verification.md`).

## Non-negotiables (from user feedback, don't relitigate)

- **Visual restraint**
  - No orange outline, bar or left-edge stripe on the active sidebar item. Show active with a soft tint and weight only.
  - No chunky scrollbars. Use the thin-scroll styling.
  - No background, plate, tile, tint or well behind illustrations. The art sits straight on the card.
- **Lists and filters**
  - The filter defaults to **All**, on every list: orders, RFQs, KYC, KYB, inspections.
  - One search box per screen. If the filter bar has search, the page header doesn't.
- **Compactness**
  - Headers and top cards are compact. If a summary card takes more than about a third of the first screen, shrink it.
  - Context lives where it's used. Example: chat participants go in the conversation header, not in a card at the bottom.
- **Copy**
  - Use plain words. Explain what happens and who acts next, not internal status names.
  - No em dashes in UI copy.
  - Buyer and seller UI never mentions AI moderation. Say "the platform" instead.
- **Money**
  - Money shown to a payer always says what's included, and every breakdown adds up to the cent (see Money).
- **Destructive actions**
  - A risky delete explains what uses the item.
  - Offer "turn off" as the safe alternative to delete.

## Page anatomy

Top to bottom:

1. **Page header.** A breadcrumb, then the title and one line saying what this page is for. No second search, and no action buttons duplicated from the sidebar.
2. **Your next move.** One primary action, derived from the shared next-step rules. The same rules drive the sidebar counts, the list rows and the detail page, so they never disagree.
3. **Needs your attention** first, **waiting on others** second. Each row has an illustration or icon, a title, one line on what's happening, and a due or countdown line.
4. **Work in progress:** deals, orders or listings, with progress shown as labelled steps.
5. **Stats:** clickable tiles, each with a second line that says what to do ("2 need a quote").
6. **Recent activity:** at most 5 items, and a link to see all.

**Setup checklist:** show it only while setup is incomplete. On the seller overview it replaces the sidebar setup card, so it never appears twice.

## List + detail

- **Desktop:** a master list (about 40%) plus a preview panel. The preview is a summary; the full logic stays behind "View full …".
- **Phone:** the list only. Tapping opens the full page.
- **Rows:**
  - title;
  - one mono meta line: `#ID · money with caption · qty · party · updated`;
  - a status line in plain words;
  - a step illustration on the right;
  - an unread count if any.
- **Filter tabs show counts**, e.g. `All (4)`, `Awaiting payment (1)`. Default to All. On phones the filter bar scrolls sideways instead of wrapping into a wall.
- **Detail pages** use collapsible cards. Open the card that needs action; the rest stay closed and show a summary on the right of their header ("Fully signed", "All payments confirmed").

## Money

- **Headline:** the amount the viewer actually pays or receives, followed by a caption.
  - "incl. platform fee" once the fee is known.
  - "+ platform fee" before the fee is set.
- **Breakdown:** write out rows that sum to the total: Goods (qty × unit), Branding (if any), Platform fee (with %), then Your total.
- **Payments:** show each one as "30% of goods KES X + fee KES Y". The last payment takes the rounding remainder, so the payments equal the total exactly.
- **Rounding:** work in cents.
- **Role difference:** the fee belongs to the buyer's view. The seller sees their goods share only.

## Guides and teaching

- **Inline, just in time.** Put one tip for the current step next to the step, not a manual.
- **Explain once, then get out of the way.** Use dismissible intros (the "what's new" modal style) and a `Popover` for the "What does signing mean?" type of question.
- **Every state is designed:** loading (skeletons), empty (illustration + one sentence + one action), error (what failed, plus retry) and success (a short celebratory state, then the next step).
- **Waiting states name who is acting:** "Waiting for admin to assign an inspector."

## References

Load only what the task needs:

- `references/illustrations.md`: house style, colours, the light/dark prompt template, file naming, fitting, wiring (`StepIllustration`, `SellerIllustration`, `ThemedArt`).
- `references/layout-responsive.md`: sidebar, phone bottom nav with a "More" sheet, breakpoints, sticky bars, 390px rules, the GPU safety rules for more.co.ke.
- `references/patterns.md`: the shared components and helpers per repo, and the attention/next-step rules.
- `references/verification.md`: mocked screenshot harnesses, checks, and each repo's ship rule.
