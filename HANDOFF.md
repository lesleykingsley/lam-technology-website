# LAM Redesign — Handoff Notes

**Last updated:** 2026-05-11
**Working branch:** `redesign`
**Cache-buster:** `v=12`

## Where we are

Redesign is ~80% shipped. 24 pages migrated. SEO/GEO foundation work in progress.

## SEO/GEO foundation — punch list status

### Tier 1 (must ship before production cutover)

- ✅ **#1: Organization JSON-LD** — all 24 pages, inline static HTML. Canonical source: `/partials/schema-org.html`. Validated in Google Rich Results Test. (Commits 555aed5, 6346cec)
- ✅ **#2: WebPage / Service / Article / Breadcrumb schema** — 22 indexable pages have page-specific schema. 2 results pages noindexed. Canonical sources: `/partials/schema-*.html`. (Commits 8739413, 4e76369)
- ⏳ **#3: Meta tag audit** — title, description, canonical, OG, Twitter Card across all 24 pages
- ⏳ **#4: OG image** — design + ship branded 1200×630 default
- ⏳ **#5: robots.txt** — explicit AI bot allowlist (OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot), disallow `/index-redesign.html` and preview paths
- ⏳ **#6: sitemap.xml** — all 24 canonical URLs, submit to Google Search Console and Bing Webmaster Tools at cutover

### Tier 2 (ship within 14 days of cutover)

- **#7: Google Search Console + Bing Webmaster Tools** verification
- **#8: FAQ blocks with FAQPage schema** on 5 practice pages + BB destination
- **#9: llms.txt** at site root
- **#10: Internal linking audit**

### Tier 3 (ongoing cadence)

- **#11: Author bylines + Person schema** on insights articles (will require updating Article schemas)
- **#12: Quarterly AI citation audit** — top 10 buyer queries through ChatGPT, Perplexity, Google AI Overviews

## Blockers still active

- **Resend / contact form:** still gated on MSP completing 3 DNS records (TXT resend._domainkey DKIM, MX send, TXT send SPF). When MSP finishes, Raj clicks Verify in Resend dashboard. Contact form returns "Email send failed" until verification completes.
- **info@lamtechnology.com:** declared in Organization schema. Send a test email to verify inbox is monitored before production cutover. If it bounces, either fix inbox or remove email field from `/partials/schema-org.html`.

## Production cutover prep (not yet started)

- Rename redesign-suffixed files to production paths (e.g. `index-redesign.html` → `index.html`)
- Set up redirects from old WordPress URLs to new paths where they differ
- Verify Resend DNS before merging to main
- Submit sitemap to Google Search Console + Bing Webmaster Tools
- Verify info@ inbox lives

## Architecture / discipline reminders

- **Cache-buster:** `/assets/*` immutable in `vercel.json`. Bump `?v=N` on CSS or partial changes. Currently `v=12`.
- **`--lam-*` CSS prefix is deprecated.** Use unprefixed tokens only.
- **Schema discipline:** every page has both Organization schema AND its page-specific schema. Canonical sources in `/partials/schema-*.html`, inlined into each page's `<head>` for static-HTML crawler visibility. Update both when changing.
- **Never call TSDs "suppliers"** on the website. Intelisys and Avant are Technology Services Distributors.
- **Never use the word "Audit"** on the site. LAM is an advisor, not an auditor. Practice diagnostics use "Radar, Verification, Examination, Insight, Wisdom."
- **Browser-based editing is forbidden** due to past corruption (markdown asterisks, CodeMirror autopair). Claude Code in terminal only.
