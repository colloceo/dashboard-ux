# dashboard-ux

This is a Claude skill for designing and building role-based dashboards (customer, vendor, admin, ops) in **any project, stack and brand colour**. It covers:

- page anatomy;
- list + detail;
- money and fee breakdowns that add up to the cent;
- empty, error and success states;
- phone layouts;
- a complete illustration method: a palette from your brand colour, light and dark prompt templates, and scripts to fit and review art.

On first use in a project, Claude discovers the design system (tokens, components, theme switch) and saves it to `.claude/dashboard-ux.profile.md`. Every later session follows that profile.

## Install

**Claude Code:**
```
git clone https://github.com/colloceo/dashboard-ux.git ~/.claude/skills/dashboard-ux
```

**claude.ai / desktop app:** download this repo as a zip and upload it under Settings › Capabilities › Skills.

## Contents

- `SKILL.md`: the method and default rules.
- `references/`:
  - `profile-template.md`
  - `illustrations.md`
  - `layout-responsive.md`
  - `patterns.md`
  - `verification.md`
- `scripts/`: `fit-svg.js` (centre and fit delivered SVGs) and `contact-sheet.js` (review a set in light and dark). Both need `npm i puppeteer-core` or `puppeteer`.
