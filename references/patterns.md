# Building blocks and rules

Find the project's version of each piece first; create one only if it's missing. Record the paths in the profile.

## Building blocks

| Block | What it must do |
|---|---|
| Card | Consistent padding and radius; a `bare` mode for use inside another card |
| Section label | Small uppercase heading with an optional status on the right |
| Badge | Status colour from tokens, plus a text label (never colour alone) |
| Tabs / filter bar | Counts per tab; defaults to All; optional single search; scrolls sideways on phones |
| List row | Title, one meta line, a plain status line, small art, an unread count, selected state |
| Preview panel | Summary of the selected row plus a "View full …" button |
| Collapsible section | Title, one-word summary when closed, attention style when it needs action |
| Step tracker | Labelled steps with done, current and upcoming states; short labels on phones |
| Next-step card | Art, "step N of M", what's happening, one action, one tip, what comes next |
| Empty state | Art, one sentence, one action |
| Drawer / modal | Drawer for view and edit; modal only for short confirmations |
| Popover | Answers "what does this mean?" in place |
| Skeleton / toast | Loading placeholders; a brief confirmation after an action |
| Money breakdown | Rows that add up, then a total (see below) |

## Rules modules (single source of truth)

Put these in plain functions, not in components:

- **`needsYou(items, role)`** returns the counts and items for the nav, bottom nav, overview and list tabs. If any of them computes its own count, they will disagree.
- **`nextStep(item, role)`** returns the actor, the action, the plain-language line, the due date and the illustration key. Every "what's happening / what's next" string comes from here.
- **`stepContent(phase, role)`** returns the tip, "coming next" and the success copy.

When a backend adds a state, update these modules once, and every surface follows.

## Money helper

Work in integer minor units:

```
charges(total, qty, unitPrice, fee?, feePct?):
  base    = qty × unitPrice              (only if it's below total; the rest is extras such as branding)
  extras  = total − base
  fee     = fee ?? null                  (null means "not set yet" → caption "+ fees")
  payable = total + (fee ?? 0)

instalments(baseTotal, fee, stages[{pct, feeShare}]):
  for every stage except the last: goods = round(baseTotal × pct / 100); feePart = stage.feeShare
  the last stage takes baseTotal − Σgoods and fee − ΣfeePart
  → the instalments sum exactly to baseTotal + fee
```

Show the payer the goods, extras, fee and total. Show the payee their share only.

## Copy patterns

| Situation | Pattern | Example |
|---|---|---|
| Waiting | who + what | "Waiting for the seller to confirm shipping." |
| Needs you | verb first | "Pay the deposit", "Review 2 offers" |
| Due | relative | "closes in 2 days", "due before shipment" |
| Empty | what + why + one action | "No orders yet. Orders appear once an offer is accepted." [Browse] |
| Error | what failed + retry | "Couldn't load your orders." [Try again] |
| Success | what happened + next | "Payment sent. We'll confirm it within a day." |
| Destructive | consequence + safer option | "3 products use this category. Turn it off instead?" |
