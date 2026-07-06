# Brahma Vidya Mandir Platform

PayloadCMS + Next.js site for Brahma Vidya Mandir, an Advaita Vedanta ashram. Content is
block-based: pages are built from reusable blocks stored in a `layout` field, driven by
Payload collections/globals and rendered via `BlockRenderer`.

## Source of truth for design

`export/Brahma Vidya Mandir - Standalone.html` is a **Claude Design export** — a
self-unpacking single-file HTML bundle (fonts/images base64-encoded in a
`script[type="__bundler/manifest"]`, actual markup in a
`script[type="__bundler/template"]` as a JSON-encoded HTML string). It contains all 8
pages concatenated back-to-back, each ending at a `<footer class="bg-khadi-text w-full">`.

To re-extract the readable markup from it (e.g. if the design gets updated and exported
again):

```python
import re, json
with open('export/Brahma Vidya Mandir - Standalone.html', errors='ignore') as f:
    data = f.read()
m = re.search(r'<script type="__bundler/template">(.*?)</script>', data, re.S)
template_html = json.loads(m.group(1))  # this is the real page markup, ~200KB of HTML
```

Page order within that extracted HTML: Home → About Us → Classes → Contact Us →
Initiatives → Parampara → Acharya-ji → Publications.

## Architecture

- **Collections**: `pages` (block-based, one per route via `slug`), `classes`,
  `parampara-members`, `testimonials`, `publications`, plus `users`/`media`/`organizations`
  (existing/legacy) and `homepage-content` (legacy, superseded by `pages` slug `home`).
- **Globals**: `site-navigation` (nav links + CTA), `site-settings` (site name, tagline,
  `footerColumns` — categorized footer nav, NOT a flat link list).
- **Blocks** (`src/blocks/*.ts` config + `src/components/blocks/*.tsx` render): hero, about,
  parampara, acharya, classSchedule, classListing, milestonesTimeline, locations,
  contactForm, quoteDivider, video, reels, testimonials, lineageDisplay, team, ctaBanner,
  publicationsListing.
- **Seeding**: `src/seed.ts` is the fresh-install source of truth (run via `npm run seed`
  or a direct `tsx` invocation — creates everything from scratch, will fail/duplicate if
  already seeded). `src/app/(frontend)/api/seed/patch/route.ts` (`GET /api/seed/patch`) is
  the **idempotent** corrector — safe to re-run anytime, upserts pages/collections/globals
  to match the design without wiping existing data. Prefer the patch route when the DB is
  already seeded.

## Dev environment gotcha: interactive schema push

This project uses Payload's Postgres adapter in **push mode** (no migrations directory
configured). Whenever the block/collection/global schema changes shape, `next dev` will
pause on startup with an interactive `drizzle-kit`-style prompt in the terminal:

```
Is pages_blocks_team_members table created or renamed from another table?
❯ + pages_blocks_team_members    create table
  ~ site_settings_footer_links › pages_blocks_team_members    rename table
```

This is a **real TTY prompt** — plain `nohup ... &` or piping newlines via a regular shell
pipe does NOT work (readline requires a real pty). If running `npm run dev` headlessly
(e.g. from an agent/CI), drive it with `expect`:

```tcl
#!/usr/bin/expect -f
set timeout -1
spawn npm run dev
log_file /tmp/bvm-dev.log
expect {
  -re {Is .* table created or renamed} { send "\r"; exp_continue }
  -re {\(y/N\)} { send "y\r"; exp_continue }
  timeout { exp_continue }
}
```

Always accept the **first (`+ create`) option**, never the suggested "rename" — Payload's
push heuristic guesses renames from alphabetically-adjacent table names and is usually
wrong when you've actually restructured a field (e.g. it guessed
`site_settings_footer_links → pages_blocks_team_members`, which are unrelated).

## Known pre-existing bug fixed

`src/app/(frontend)/globals.css` had the Google Fonts `@import` listed *after*
`@import 'tailwindcss'`. Once Tailwind's `@import` expands into its full generated
stylesheet, the fonts import ends up buried after non-import rules, which violates CSS's
"`@import` must precede all other rules" requirement and crashes the whole site with a 500
on every route. Fixed by putting the fonts `@import` first. If this regresses, check import
order first.

## Content/design fidelity history

**2026-07-06 — Design comparison + fixes.** Deep-compared the Claude Design export against
the live implementation page-by-page. Found and fixed:

- **Critical bug**: Home + Parampara pages had a stale Gandhi/Vinoba Bhave lineage; design
  had since moved to Adi Shankara → Swami Dayandha Saraswathi → Swami Paramarthananda →
  Swami Brahmayogananda. Fixed in `seed.ts`, patch route, and `parampara-members` collection.
- About Us was missing 5 of 7 timeline milestones, and had no "Our Team" section at all
  (new `TeamBlock` created for this).
- Classes collection had 3 wrongly-titled classes and was missing 3 real ones
  (Vivekachudamani, Brahmasutra Bhashya, Mandukya Upanishad).
- Contact page hero heading was wrong ("Connect with the Sanctuary" vs design's literal
  "Connect with the Us"); contact form had wrong fields (had a stray Subject field, was
  missing Phone) — fixed field set + styling.
- Acharya-ji page was substantially stale: added 3rd bio paragraph, new
  teaching-philosophy quote, reel topic-filter pills (`ReelsBlock` gained `topic`/
  `duration`/`topics` fields), and a new "Learn Directly from Acharya-ji" CTA (new
  `CtaBannerBlock`). Removed the old milestones/testimonials sections that design no
  longer includes on this page.
- **Publications page didn't exist at all** — new `Publications` collection,
  `PublicationsListingBlock`, and `/publications` page created with all 6 books from the
  design.
- Footer was a flat link list; design has 3 categorized columns (Explore / Initiatives /
  Connect). `SiteSettings.footerLinks` replaced with `footerColumns` (array of
  `{heading, links[]}`); `Footer.tsx` updated to match. Nav links gained "Publications".

**Known gaps / left for a follow-up session:**

- **Initiatives page (`/initiatives`) is still wrong** — currently reuses About Us's hero +
  milestones blocks as a placeholder. The real design is a 7-category filterable/tabbed
  page (Classes, Chanting, Pooja, Camps, Yatras, Meditation & Yoga, BVM Yuva Kendra), but
  the design export only had 2 of the 7 tabs (Classes, Camps) active when it was captured,
  so 5 categories' content is unknown. **Needs a fresh Claude Design export with each
  filter tab opened before this page can be rebuilt properly.**
- **Authored, not design-sourced content** (flagged so it can be revisited/replaced):
  - The 4 lineage bios for Swami Dayandha Saraswathi / Swami Paramarthananda / Swami
    Brahmayogananda in `parampara-members` and the `lineageDisplay`/`parampara` blocks —
    the design only gave short role titles for these, not full paragraphs.
  - The 5 "Our Team" member bios on About Us — design only had names/roles, bios were
    template placeholders in the export (`{{ team1DescText }}` etc.), not real text.
- Several existing block components (e.g. `ParamparaBlock.tsx`) still use hardcoded hex
  colors instead of the site's Tailwind `@theme` tokens defined in `globals.css`
  (`--color-bvm-gold` etc. → utility classes `font-heading`, `.section-label`, etc., plus
  raw `[#hex]` arbitrary values elsewhere). This is consistent with the existing codebase
  convention, not a bug — just noting it's not using semantic design tokens.

## Running the patch route

Once the dev server is up and schema push (if any) has resolved:

```bash
curl http://localhost:3000/api/seed/patch
```

Returns `{"success":true,"patched":[...]}` listing what it touched. Safe to re-run.
