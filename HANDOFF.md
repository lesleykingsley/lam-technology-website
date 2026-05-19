LAM Redesign — Handoff Notes
Last updated: 2026-05-19
Working branch: feat/practices-restructure (off main)
Cache-buster: v=17 cybersecurity page, v=14 most other pages
Target cutover: Friday May 22, 2026 (with Thursday May 21 6pm PT go/no-go checkpoint)
Where we are
Redesign promoted to main on May 12, 2026 (5-practice version, fully shipped). Active work since then on feat/practices-restructure branch — splitting 5 practices into 6, plus a parallel Vigilance Verification expansion that landed first (out of original scope but now shipped).
Production URL: lam-technology-website.vercel.app (5-practice site).
Preview URL pattern: lam-technology-website-{hash}-lam-technology.vercel.app per deployment.
The May 22 plan
Cutover to lamtechnology.com is targeted for Friday May 22. Go/no-go checkpoint Thursday May 21 at 6pm PT. All five criteria must be true to cut over:

All public pages reflect 6 practices (Infrastructure & Cloud, Mobility, Managed Services exist with real content)
Nav and footer show 6 practices + BB top-level
All 24 inlined schema copies are propagated (no "five IT advisory" or "Infrastructure & MSP" anywhere)
Homepage "Five practices" copy updated to "Six"
Preview URL passes 10-minute click-through test with no broken links or contradictory copy

If any criterion fails Thursday at 6pm, cutover slips to Friday May 29. No negotiating.
Work-back schedule (May 18–22)
Monday May 18 (today, remainder)

HANDOFF.md refresh (this commit)
Infrastructure & Cloud page rewrite: rename in titles/h1/meta, strip MSP content, refocus on networks/data centers/cloud/modernization

Tuesday May 19

DONE (inserted out of schedule): Cybersecurity coverage diagram redesigned — periodic-table grid, 15 domains in 4 layers. New .svc-coverage* CSS in lam-redesign.css, cyber page bumped v=16→v=17, builder.html intentionally NOT touched (its 15-domain list still matches by name/count; reordering an internal tool on cutover week deemed unnecessary risk — optional follow-up only if the generated deck should mirror the 4-layer order).
Copy fix shipped in same block: "Policies, frameworks & audit readiness" → "...& control evidence" (the word "audit" is forbidden per discipline rules; was a pre-existing live violation in the Risk & Compliance domain desc).
DONE (May 19): Mobility page IoT-removal pass — visible copy + title/meta/OG/Twitter only. "Mobility & IoT" → "Mobility" in title/og/twitter/eyebrow/body; "wireless and IoT footprint" → "wireless footprint"; "Wireless and IoT guidance" → "Wireless guidance"; IoT/M2M prose → "connected assets". Domain [08] "IoT & M2M" RENAMED → "Connected Assets & M2M" (Lesley-approved May 19; desc → "M2M lines, connected devices & data plans." to keep the carrier-bill anchor; kept count at 12). Mobility inlined JSON-LD still says "Mobility & IoT" (L113-114, 150-177) — DEFERRED to the May-20 schema re-propagation (canonical partial + 24 copies together; do NOT one-off). Committed & pushed May 19 on feat/practices-restructure. Cache-buster unchanged (no CSS/partial touched; mobility stays v=14).
NOT STARTED (intentionally, per Lesley): /practice-areas/managed-services/ page — 90-min copy session; grid replication strategy to be locked first.

Wednesday May 20

Nav and footer partials updated (6 practices + BB top-level)
Builder dropdown updated (add Managed Services, rename Infrastructure & Cloud, drop IoT from Mobility)
Schema re-propagation across all 24 inlined copies
Homepage "Five practices" → "Six practices"

Thursday May 21 (morning)

File moves: BB out of /professional-services/, BB Self-Check, MSP Self-Check → MSP Microscope
sitemap.xml rebuild with new URLs
vercel.json: 5+ 301 redirects for URL moves, plus 2 precautionary (infrastructure-msp, mobility-iot)
Delete /professional-services/ hub and support-scope (with 301 to about-lam)
Fold engagement-model content into about page

Thursday May 21 (afternoon)

10-minute click-through QA on preview URL
6pm PT go/no-go decision

Friday May 22

Merge feat/practices-restructure → main
DNS cutover to lamtechnology.com
LinkedIn Post Inspector verification

What's already shipped on feat/practices-restructure
5 commits on branch (oldest → newest):

8bb4e7f (May 12) — Schema partials updated for 6-practice structure (canonical files in /partials/schema-*.html). NOT YET propagated to inlined copies.
f8023be (May 17) — Vigilance Verification 9 → 13 domains
99c827e (May 18) — Empty commit to trigger Vercel rebuild
33768f2 (May 18) — Vigilance Verification 13 → 15 domains on cybersecurity page (brought Governance + Perimeter Defense back as distinct from Risk & Compliance + Network Security)
12e610c (May 18) — Vigilance Verification 15 domains synced to internal/builder.html

Builder and public cybersecurity page now match at 15 domains.
What's still outstanding for May 22 (Commit 1b)
Page content

 Edit /practice-areas/infrastructure/ — rename to "Infrastructure & Cloud", strip MSP content
✅ Edit /practice-areas/mobility/ — drop IoT references everywhere (DONE May 19, visible copy + meta; schema IoT deferred to May-20 re-propagation; domain [08] renamed "Connected Assets & M2M" Lesley-approved; committed + pushed)
 Create /practice-areas/managed-services/index.html with real copy (LAM is not an MSP positioning)

URL moves

 git mv /professional-services/billing-breakthrough/ → /billing-breakthrough/
 git mv /professional-services/self-check/ → /billing-breakthrough/self-check/ (+ /results/)
 git mv /professional-services/msp-self-check/ → /practice-areas/managed-services/msp-microscope/ (+ /results/)

Deletions + content folds

 Fold engagement-model content from /professional-services/index.html into /about-lam/index.html
 Delete /professional-services/index.html (Pro Services hub)
 Delete /professional-services/support-scope/index.html (with 301 → /about-lam/)

Schema propagation

 Re-propagate Org schema to 24 inlined copies (currently still show old "Infrastructure & MSP" / "Mobility & IoT")
 Re-propagate practice-areas hub schema ("five" → "six")
 Re-propagate infrastructure schema ("Infrastructure & MSP" → "Infrastructure & Cloud")
 Re-propagate mobility schema (drop IoT)

Chrome / IA

 Update /partials/nav-redesign.html — 6 practices in dropdown, add Billing Breakthrough top-level
 Update /partials/footer-redesign.html — 6 practices listed, BB link
 Update internal/builder.html practice dropdown (lines 401–405): rename Infrastructure & Cloud, drop IoT from Mobility, add Managed & Professional Services entry
 Update internal/builder.html practices object: infrastructure-insight.practiceArea → "Infrastructure & Cloud", wireless-wisdom.practiceArea → "Mobility", create new msp-microscope block

Sitemap + redirects

 sitemap.xml: add managed-services, BB at root, BB Self-Check new URL, MSP Microscope new URL; remove /professional-services/, support-scope, old BB locations
 vercel.json: redirects per URL moves above + 2 precautionary

Content sweep

 Homepage L1471 "Five practices" → "Six practices"
 All other "five practice/lens" references from May 13 audit
 "audit" word-sweep: cybersecurity Org JSON-LD still contains "Telecom audit" (page L81, an inlined-schema entry). Forbidden-word rule says it must go. Handle in the schema re-propagation pass (fix canonical partial + all 24 inlined copies together — do NOT one-off edit a single copy). Sweep the rest of the site for "audit" at the same time.

Parked to post-launch (NOT shipping May 22)

Commit 2 — practice-areas hub redesign (6-card grid, kept-advisor proof block, page-end BB CTA). Current hub stays with text-only "Five → Six" sweep applied.
Practice area diagrams — Vigilance Verification radial ABANDONED (peer critique: target/bullseye metaphor). Replaced May 19 with a periodic-table grid grouping the 15 domains into 4 layers (Governance & Risk / Perimeter & Access / Endpoints & Workloads / Data & Cloud) — shipped on the cybersecurity page. Still outstanding: CX 4-item Experience Examination, plus diagrams for Infrastructure & Cloud, Mobility, Managed Services, AI Readiness (the periodic grid is the reusable pattern for these — .svc-coverage* classes scale to any count/group).
Brand rationale doc (/docs/brand-rationale.md) — not yet written
SEO/GEO playbook doc (/docs/seo-geo-playbook.md) — status uncertain; verify before referencing
Assessment builder rating color bug — Raj is verifying; ship fix only if confirmed broken

SEO/GEO foundation — punch list status (all Tier 1 complete)
Tier 1 — DONE (May 11–13)

✅ #1: Organization JSON-LD (commits 555aed5, 6346cec)
✅ #2: Page-specific schema across 22 indexable pages (commit 4e76369)
✅ #3: Meta tag audit (May 12, 6 commits/21 files)
✅ #4: OG image at /assets/og/og-default.png (May 13, recolored logo with red→gold on cream)
✅ #5: robots.txt with AI bot allowlist (GPTBot, ClaudeBot, PerplexityBot, etc.)
✅ #6: sitemap.xml with 22 canonical URLs (will need rebuild after URL moves above)

Tier 2 — post-cutover (within 14 days)

#7: Google Search Console + Bing Webmaster Tools verification
#8: FAQ blocks with FAQPage schema on practice pages + BB
#9: llms.txt at site root
#10: Internal linking audit

Tier 3 — ongoing

#11: Author bylines + Person schema on insights articles
#12: Quarterly AI citation audit (top 10 buyer queries through ChatGPT, Perplexity, Google AI Overviews)

Active blockers

None blocking cutover. Contact form working as of May 12 (Raj owns Resend account, API keys in Vercel env vars, MSP completed DNS records).
info@lamtechnology.com inbox — declared in Org schema. Verify monitored before cutover; otherwise remove email field.

Architecture / discipline reminders

Cache-buster: /assets/* immutable in vercel.json. Bump ?v=N on every CSS or partial change. Cybersecurity page currently v=17, most other pages v=14. (v=17 added the additive .svc-coverage* periodic-grid rules to lam-redesign.css — purely additive, so other pages stay v=14 with no visual change; only cyber consumes the new classes.)
--lam-* CSS prefix is deprecated. Use unprefixed tokens only.
Schema dual-source pattern: every page has Organization schema AND page-specific schema. Canonical sources in /partials/schema-*.html, inlined into each page's <head> for static-HTML crawler visibility. Update both when changing.
TSDs are NOT suppliers. Intelisys and Avant are Technology Services Distributors. Calling them suppliers anywhere on the site is a category error with real credibility implications.
The word "Audit" must NOT appear on the site. LAM is an advisor. Practice diagnostics use Radar, Verification, Examination, Insight, Wisdom, Microscope.
Browser-based editing is forbidden. Past corruption (markdown asterisks, CodeMirror autopair). Claude Code in terminal only.
LAM founded 2006, not 2002. Do not revert.
Empty commits to trigger Vercel rebuild are acceptable when webhook misfires. Leave them in history — rebasing public commits costs more than the line of clutter.

Vercel + auth notes

Vercel env vars are scoped to environments (Production, Preview, Development), not branches. Vars set for Production+Preview carry over automatically when a branch merges to main and becomes Production.
Deployments built before an env var was added do NOT pick it up retroactively. Must redeploy.
Resend API keys: managed by Raj in Vercel env vars, never in GitHub. If form breaks, escalate to Raj for key rotation in Vercel.

When picking this up

Read this entire file
git -C C:\Users\LesleyKingsley\lam-website pull origin feat/practices-restructure
First task is whatever Commit 1b item is next on the schedule above
End every session by updating this file's "Last updated" stamp and any newly-completed/added items
