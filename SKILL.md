---
name: dashboard-ux
description: UI/UX rules and a method for role-based dashboards (customer, vendor or seller, admin, ops) in any project, stack or brand colour. Use whenever designing, redesigning, reviewing or building a dashboard, overview, sidebar or phone bottom nav, list + detail page, filter row, multi-step flow page (orders, requests, applications, onboarding), empty/error/success state, money, fee or payment display, or when adding or replacing illustrations (including writing prompts to generate them in light and dark). Also use when the user shares a dashboard screenshot and asks how to improve, compact or rearrange it.
---

# Dashboard UX

This is a portable playbook for dashboards people use to get work done, distilled from shipping buyer, seller and admin dashboards. It works with any framework and any brand, because it discovers the project's own design system first and adapts to it. Pair it with general UX skills (such as `ux-design` and `ux-psychology`) if they're installed.

**The two-second test for any dashboard screen:** can the person see what needs them, what it will cost or earn them, and what to press next?

## Step 0: learn the project (once per project)

Look for `.claude/dashboard-ux.profile.md` in the repo. If it exists, read it and follow it. If it doesn't, discover these and write one (template in `references/profile-template.md`):

- **Stack and styling:** framework, CSS approach (Tailwind, CSS modules, CSS-in-JS), how the theme toggles (a `data-theme` or class on the root element, or `prefers-color-scheme`).
- **Tokens:** brand or primary colour, text and muted text, surfaces (page, card, panel), borders, and status colours (info, success, warning, error). Use tokens and never hard-code colours. If there are no tokens, propose a small set before building.
- **Kit:** existing card, button, badge, tabs, drawer, modal, popover, skeleton, toast, empty-state and list-row components. Reuse them before creating anything.
- **Roles:** who uses which dashboard, and what each role's main job is.
- **Rules modules:** where "what needs this person" and "what's the next step" are computed. If that logic is scattered, centralise it (see `references/patterns.md`).
- **House rules:** the repo's CLAUDE.md, lint rules, performance or GPU constraints, and how the repo ships (commit, push or deploy rules). Record them in the profile. Never guess a deploy.

## Workflow

1. **Inspect** the page, its components and its data. Treat the user's screenshots as evidence and read them before claiming anything.
2. **Name the person's job on this screen**, such as "pay the deposit" or "answer before the deadline", and put it first on the page.
3. **Reuse the project's kit and tokens.**
4. **Design the phone layout on purpose** (`references/layout-responsive.md`).
5. **Illustrations:** follow `references/illustrations.md`. Every piece gets a light and dark version, the palette comes from the brand colour, and nothing sits behind the art.
6. **Verify** with mocked screenshots in light and dark, at desktop width and 390px, and confirm there's no sideways scroll (`references/verification.md`). Then follow the profile's ship rules.

## Principles (defaults; the project's profile can override them)

- **Restraint:**
  - Show the active nav item with a soft tint of the brand colour and a heavier weight. Don't use a coloured bar, stripe or outline.
  - Keep scrollbars thin.
  - Put no background, plate, tile or tint behind illustrations. The art sits directly on the card.
- **Lists:** default filters to **All**, and show a count on each tab. Use one search box per screen; if the filter bar has search, the header doesn't.
- **Compactness:** a summary or top card shouldn't take more than about a third of the first screen. Put context where it's used, for example a conversation's participants in the chat header.
- **Copy:**
  - Use plain words that say what's happening and who acts next. Don't show internal status names.
  - Keep dashes and jargon out of UI copy.
  - Don't expose internal machinery to end users, such as automated review or moderation. Refer to it as "the platform" or the product name.
- **Consistency:** one set of rules drives the nav counts, overview, list rows and detail page, so their numbers never disagree.
- **Safety:** a destructive action explains what depends on the item and offers a reversible alternative ("turn off", "archive"). Deletion always asks for confirmation.
- **Money:** never show a figure without saying what's in it (see Money).

## Page anatomy

Top to bottom:

1. **Header.** A breadcrumb, the title, and one line on what the page is for. No duplicate search, and no action buttons the nav already has.
2. **Your next move.** One primary action taken from the rules module, with a deadline or countdown if there is one.
3. **Needs you**, then **waiting on others**. Each row has art or an icon, a title, one line on what's happening, and a due line.
4. **In progress.** Active items with labelled step progress. On phones this becomes a snap-scrolling strip.
5. **Stats.** Clickable tiles, each with a second line that says what to do ("2 need a reply").
6. **Recent activity.** At most 5 items, plus a "see all" link.
7. **Setup checklist.** Show it only while setup is incomplete, and never twice on the same screen (the nav card and the page card).

## List + detail

- **Desktop:** a list of about 40% width, next to a preview panel. The preview is a summary; the full logic stays behind "View full …".
- **Phone:** the list only. Tapping a row opens the full page.
- **Rows:**
  - a title;
  - one meta line: `#ID · amount + caption · quantity · counterpart · updated`;
  - a status line in plain words;
  - a small illustration for the step;
  - an unread count.
- **Detail pages:** collapsible sections. Open the one that needs action; each closed section shows a one-word summary in its header ("Signed", "All paid").

## Money

- **Headline:** the amount this viewer pays or receives, plus a caption. Use "incl. fees" once the fees are known, and "+ fees" before they're set.
- **Breakdown:** rows that add up to the total: base (quantity × unit), extras, each fee (with its %), then **Your total**.
- **Instalments:** show each one as "30% of goods X + fee Y" when fees aren't split by percentage. Work in integer minor units (cents). The last instalment takes the rounding remainder, so instalments always equal the total.
- **Roles:** each role sees its own side. The payer sees fees; the payee sees what they receive.

## States and guidance

- **Designed states:** skeletons for loading, an empty state (art, one sentence, one action), an error (what failed, plus retry), and a success moment followed by the next step.
- **Teach just in time:** one tip next to the current step, a popover for "what does this mean?", and dismissible "what's new" intros. No manuals.
- **Waiting states name who is acting:** "Waiting for the seller to confirm shipping."

## References

- `references/profile-template.md`: the per-project profile to create in Step 0.
- `references/illustrations.md`: style, palette derivation from any brand colour, light and dark prompt templates, naming, fitting, wiring, clean-up.
- `references/layout-responsive.md`: sidebar, phone bottom nav with a "More" sheet, breakpoints, sticky bars, the 390px rule, motion, mobile GPU safety.
- `references/patterns.md`: the building blocks to find or create, the rules modules, the money helper algorithm, copy patterns.
- `references/verification.md`: a mocked-API screenshot harness, the test matrix, checks before shipping.
- `scripts/fit-svg.js`: centre and fit delivered SVG art. `scripts/contact-sheet.js`: review every piece in light and dark.
