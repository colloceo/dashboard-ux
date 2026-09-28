# Verification

## Mocked screenshots (no real accounts needed)

- **Tooling:** use a headless browser with request interception, such as Puppeteer or Playwright.
- **Mock every API call:** answer each call to the app's API base with fixtures, and send a 404 for anything unmatched, so gaps show up.
- **Before the page loads:** seed the auth session the app expects (storage key or cookie) and the theme preference.
- **Matrix:** light and dark × about 1366px and 390px. For each shot, log `scrollWidth` against `innerWidth`.
- **Fixtures for the unhappy paths:**
  - empty lists;
  - fees not set yet;
  - items with extras;
  - declined or failed steps;
  - long names;
  - large amounts (7+ digits).
- **Warm-up:** the first shot after a cold dev compile is often blank, so take a throwaway shot first.
- **Collapsible sections:** clicking a header that's already open closes it. Check which section opens by default.
- **Windows Git Bash:** set `MSYS_NO_PATHCONV=1` so route arguments like `/orders` aren't turned into file paths. Write harness scripts to files instead of inline `node -e` with backticks.

## Before shipping

- Run the project's typecheck, its lint on the changed files, and its build if it's quick.
- Money breakdowns sum exactly.
- Counts match across the nav, bottom nav, overview and tabs.
- Both themes are readable, and every illustration has its dark version.
- **Stop the dev servers you started.** Leftover dev servers can starve the machine of memory and make `git push` fail.
- **Follow the profile's ship rules exactly.** If there aren't any, ask before you commit, push or deploy.
- **Commit messages:** follow the project's conventions and the user's instructions for commit trailers.
