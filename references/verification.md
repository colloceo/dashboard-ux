# Verification and shipping

## Screenshot with mocked data (no real accounts needed)

- **Tooling:** puppeteer-core with the local Chrome (`C:/Program Files/Google/Chrome/Application/chrome.exe`) and request interception. Answer every API call with fixtures; unmatched calls get a 404. Seed the auth token into session storage with `evaluateOnNewDocument`, and set `localStorage.theme`.
- **Trade:**
  - dev server `npx next dev -p 3100`;
  - API `https://api.trade.more.co.ke`;
  - buyer tokens in `trade_portal_buyer_tokens`, seller tokens in `trade_portal_seller_tokens`.
- **Admin:** `adminmock.js`-style harness against vite on port 5180.
- **Git Bash:** run with `MSYS_NO_PATHCONV=1`, or `/buyer/...` paths get mangled. Write harness scripts to the scratchpad instead of inline `node -e` with backticks.
- **Matrix:** light and dark × 1366 and 390. Log `scrollWidth` vs `innerWidth` for each shot.
- **Fixtures** must cover the unhappy states: empty lists, fee not set, branded order, declined payment, long names, and large amounts (7+ digits).
- **Warm-up:** the first shot after a cold compile is often blank, so take a throwaway shot first.
- **Clicks:** clicking a collapsible header that's already open closes it. Check which card opens by default.

## Checks before shipping

- `npx tsc --noEmit` (trade), `npx tsc -b` and `npx vite build` (admin), `yarn lint:gpu` (more.co.ke).
- Lint the changed files.
- Money breakdowns sum exactly.
- Counts match between sidebar, bottom nav, overview and list tabs.
- Stop your own dev servers afterwards. On this machine, a leftover `next dev` (about 700 MB) makes `git push` or `git fetch` fail with "Out of memory".

## Ship rules per repo

| Repo | Rule |
|---|---|
| Trade frontend `E:/more/trade` | Commit, push `ui-landing-integration:test`, deploy with `docker compose build app` then `up -d app` |
| Admin `E:/more/trade-portal_frontend_demo` | Push to trade-admin `test2` only (rebase, never force). Never deploy |
| Backend `E:/more/trade-portal` | The teammate's. Push or deploy only when the user explicitly asks |
| more.co.ke `C:/more/more` | Never commit or push. Leave the changes for the user |

No AI co-author trailer on any commit.
