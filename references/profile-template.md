# Project profile template

Save this as `.claude/dashboard-ux.profile.md` in the project root. Fill it in from the codebase, and confirm the ship rules with the user. Keep it short and factual, and update it when something changes.

```markdown
# Dashboard profile: <project name>

## Stack
- Framework / styling: <e.g. Next 14 + Tailwind 3 | Vite + React + CSS modules>
- Theme switch: <e.g. data-theme="dark" on <html> + Tailwind `dark:` variant>

## Tokens (use these, never raw colours)
- Brand/primary: <token> = <#hex>
- Text / muted: <tokens>
- Surfaces: page <token>, card <token>, panel <token>, border <token>
- Status: info/success/warning/error <tokens>

## Illustration palette (derived, see illustrations.md)
- Light: outline <#>, fills <#,#,#>, accent <brand #>, shadow <#>
- Dark:  outline <#>, fills <#,#,#,#>, accent <#>, shadow <#>
- Folder + naming: <public/illustrations/<set>/<key>.svg + <key>-dark.svg>
- Component that renders them: <path, or "to create">

## Kit (reuse)
- Card <path>, Button, Badge, Tabs, Drawer, Modal, Popover, Skeleton, Toast, EmptyState, ListRow, FilterBar…

## Roles and their main job
- <role>: <job>, dashboard at <route>

## Rules modules
- Needs-you / counts: <path>
- Next step per item: <path>
- Money / fees: <path>

## Constraints
- <e.g. no transforms inside overflow-hidden cards (Android GPU bug); run `<lint cmd>` before UI commits>

## Verify
- Dev server: <cmd + port>. API base to mock: <url>. Auth storage key: <key>
- Checks: <typecheck cmd>, <lint cmd>, <build cmd>

## Ship rules (confirmed with the user)
- <e.g. commit + push to `test`, then deploy with …> | <never commit, the user does it> | <push only, never deploy>

## Overrides of the skill's defaults
- <anything this project does differently, and why>
```
