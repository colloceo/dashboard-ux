# Shared pieces and rules

Always check that these still exist (grep) before recommending them.

## Trade buyer/seller (`E:/more/trade`, Next 14, Tailwind, react-query)

- **Tokens.** CSS vars only, never raw colours:
  - text and surfaces: `--text`, `--text-muted`, `--card-bg`, `--card-border`, `--panel-bg`, `--glass`, `--page-bg`;
  - alerts: `--alert-{info,success,warning,error}-{bg,text,border}`;
  - brand: `--primary #f65016`.
- **UI kit** (`components/ui`): `GlassCard`, `SectionLabel`, `Badge`, `Button`, `Tabs`, `Drawer`, `Modal`, `Popover`, `ConfirmDialog`, `Skeleton`, `EmptyState`, `Pagination`, `PageHeader`, `Breadcrumbs`, `MetaRow`, `StatusDot`, `Toast`.
- **Dashboard shell:** `DashboardSidebar` (items with count/meta/status, `action`, `setup`, `bottomItems`), `BottomNavShell` (badge, dot, onClick), `NavMoreSheet`, `SellerShell`/`BuyerShell`.
- **Attention rules:** `components/dashboard/navState.ts` (`useBuyerNavState`, `useSellerNavState`, `buyerRfqItem`, `sellerRfqItem`). Sidebar, bottom nav and Overview all read from this, so counts always match. Add new "needs you" logic here, never inline.
- **Next-step engine:** `lib/nextStep.ts` (`orderNextStep`, `stageIsDue`, `TRIGGER_DUE_LABEL`, `actorWaitingLabel`) plus `lib/orderStepContent.ts` (`stepVisual`, `stepTip`, `nextUp`, `SUCCESS`, `orderListSummary`). Every "what's happening / what's next" string comes from here.
- **Lists:** `RfqListRow` (title, meta, summary, image, unread, selected), `RfqListEmpty`, `RfqPreviewStatus`; `OrderPreviewPanel`/`RfqPreviewPanel` (buyer and seller variants).
- **Order page:** `CollapsibleCard`, `OrderProgressTracker`, `OrderProgressPanel`, `StepIllustration`, `AgreementCard`, `PaymentScheduleCard`, `OrderDetailsRows`.
- **Money:** `components/trade/OrderCharges.tsx`:
  - `orderCharges()` gives goods, branding, fee and total in cents;
  - `totalCaption()`;
  - `OrderChargesBreakdown`;
  - `paymentShares()` gives per-payment goods and fee, with the remainder on the last payment.

  Format with `orderMoney(currency, n)`.
- **Chat:** `MessagingPanel`. Participants go in the header. The sender's own pending, blocked and adjusted messages have their own states. Never say "AI".

## Trade admin (`E:/more/trade-portal_frontend_demo`, Vite, React 19, Tailwind 4)

- **Shared components:** `FilterBar` (search, tabs and a `className` prop; the default tab is All), `PhaseSteps`, `Illustration`, and `Drawer` in `components/ui.tsx` (body `thin-scroll p-4 sm:p-6`).
- **Layout:** `AdminLayout` with `MobileNav` bottom nav on phones.
- **Detail pages** (RFQ, business, inspection):
  - a compact top card with the actions on the right;
  - side panels for context;
  - drawers for view and edit.
- **Moderation:** `MessageModerationCard` (compact mode, held-reason banner) and `QuoteReview`.
- **Setup screens** (templates, forms, categories, schedules, banners):
  - one list plus an editor drawer;
  - a shared `FormBuilder` (`FormEditor`, `FormPreview`, `FormKit`);
  - "turn off" next to delete;
  - a delete explains what still uses the item.

## more.co.ke (`C:/more/more`, Next 14.0.0)

- **Illustrations:** `SellerIllustration` (slot registry, `dash()` helper, dark version derived from the filename), `ThemedArt`, and `SellerEmptyState` (also used as `BuyerEmptyState`).
- **Theme:** `data-theme` plus Tailwind `dark:`.
- **Repo rules:** GPU rules in CLAUDE.md. Never commit or push here; the user does.

## Copy patterns

| Situation | Pattern | Example |
|---|---|---|
| Waiting | who + what | "Waiting for admin to set the payment terms." |
| Needs you | verb first | "Pay the deposit", "Review 2 quotes" |
| Due | relative | "closes in 2 days", "due before shipment" |
| Empty | what + why + one action | "No orders yet. Orders appear once a negotiation is concluded." + button |
| Error | what failed + retry | "Couldn't load your orders." [Try again] |
