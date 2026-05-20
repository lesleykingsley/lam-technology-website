LAM Redesign — Handoff Notes
Last updated: 2026-05-20
Working branch: feat/practices-restructure (off main)
Cache-buster: v=17 cybersecurity & infrastructure pages, v=15 practice-areas hub, v=14 most other pages
Target cutover: Friday May 22, 2026 (with Thursday May 21 6pm PT go/no-go checkpoint)
Where we are
Redesign promoted to main on May 12, 2026 (5-practice version, fully shipped). Active work since then on feat/practices-restructure branch — splitting 5 practices into 6, plus a parallel Vigilance Verification expansion that landed first (out of original scope but now shipped).
Production URL: lam-technology-website.vercel.app (5-practice site).
Preview URL pattern: lam-technology-website-{hash}-lam-technology.vercel.app per deployment.
The May 22 plan
Cutover to lamtechnology.com is targeted for Friday May 22. Go/no-go checkpoint Thursday May 21 at 6pm PT. All five criteria must be true to cut over:

All public pages reflect 6 practices (Infrastructure & Cloud, Mobility, MSP exist with real content)
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
SUPERSEDED May 19: MSP practice page was built at /practice-areas/msp/ (commit 71aa68f), NOT at /managed-services/. Grid replication strategy was locked first (cyber + Mobility periodic grids), then the MSP page was authored using the same 4-layer pattern. The "/managed-services/" path is abandoned. See May 19 log below.

Wednesday May 20

Nav and footer partials updated (6 practices + BB top-level)
Builder dropdown updated (add MSP, rename Infrastructure & Cloud, drop IoT from Mobility) — internal tool, robots-disallowed; NOT cutover-blocking; update when convenient, explicitly NOT on cutover eve.
✅ Schema re-propagation across all 25 inlined Org-schema copies (18 surviving + 7 doomed scrub); mobility per-page schema IoT drop; infrastructure per-page Vendor→Supplier; practice-areas hub crawler-facing layer scrubbed to "Mobility" (visible card scope label keeps "& IoT" per Option A). See Wed May 20 commit.
✅ Homepage "Five practices" → "Six practices" (DONE earlier May 20, commit 73a907d).

Thursday May 21 (morning)

File moves: BB hub out of /professional-services/ to /billing-breakthrough/; BB Self-Check to /billing-breakthrough/self-check/; MSP Self-Check to /practice-areas/msp/self-check/ (NOT named after MSP Microscope™ — preserves the trademark, separates lead-magnet from paid diagnostic; the /self-check/ slug establishes the repeatable per-practice pattern for future self-checks). See May 20 redirect decision below.
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

May 19, 2026 — End-of-session log

Commits shipped today (7, on feat/practices-restructure):

f5b9e15 — Cybersecurity 4-layer periodic grid (15 domains, new .svc-coverage component in lam-redesign.css; cyber CSS v=16→v=17). Replaced flat numbered list with grouped grid. Layers: Governance & Risk / Perimeter & Access / Endpoints & Workloads / Data & Cloud.
a519ac1 — Mobility IoT removal + domain [08] rename to "Connected Assets & M2M" (was "IoT & M2M"). Visible copy + title/meta/OG/Twitter only; mobility inlined schema IoT references deferred to May-20 re-propagation.
9c05207 — Mobility 4-layer periodic grid (12 domains, 4×3 layout via new .svc-coverage--3col scoped modifier; global CSS untouched). Layers: Commercial & Contracts / Inventory & Lifecycle / Operations & Optimization / Governance & Visibility.
71aa68f — NEW MSP practice page at /practice-areas/msp/ (Pass 1 skeleton from Mobility template; Pass 2 full body content swap). 4-layer periodic grid (12 domains). Diagnostic: MSP Microscope™; question: "Is my MSP managing my environment, or just managing tickets?" Layers: Foundations & Governance / Service Desk & Support / Operations & End User / Infrastructure & Security.
d4842b1 — Hub rewrite: cut Uncover/Operate/Steward pa-method section; tighten hero (5→6 lenses); add MSP card [03]; fix Cyber 9→15 domains + four layers, Infra rename to & Cloud (drop dual-lens), Mobility IoT drop from body; renumber cards [01]–[06].
cb0c4ab — Hub: remove redundant H2 above cards (hero already establishes the six lenses; eyebrow retained as section marker).
1e6f1a7 — Hub card hierarchy redesign: practice name promoted from meta line to display-serif h2 (36px desktop / 28px mobile); question shrunk to italic subtitle (22px / 20px; line-height 1.3, letter-spacing -0.005em); cleaned orphan .pa-lenses-headline CSS from the prior commit. Hub CSS v=14→v=15.

Decisions locked May 19:

SIX practice areas, not five. Canonical order/names: Cybersecurity & Resilience, Infrastructure & Cloud, MSP, Mobility & IoT, Customer Experience, AI Readiness.
Mobility & IoT label policy (Option A): the practice scope label retains "& IoT" on the hub card; the practice page itself is branded "Mobility" only. Deliberate, documented inconsistency — the hub card preserves canonical practice scope while the page reflects post-IoT-removal copy.
Periodic grid is the canonical visual pattern for practice diagnostics. Bullseye/wheel rejected (peer critique: target metaphor). Building blocks, honeycomb, and concentric arcs rejected per the May-19 visual-container study (Downloads/options-comparison.html). The .svc-coverage* component is the reusable pattern for every practice page with a domain framework — scales to any layer count via is-l1..is-lN tints, and to any cells-per-layer count via local .svc-coverage--Ncol scoped overrides.

Open follow-ups before May 22 cutover (fresh-session work, none blocking tonight):

1. Homepage L1471 sweep: "Five practices" → "Six practices."
2. HANDOFF redirect reconciliation: RESOLVED May 20. Move target locked: /practice-areas/msp/self-check/ (NOT /msp/msp-microscope/ — naming the lead magnet after the paid diagnostic dilutes the MSP Microscope™ trademark and confuses the value ladder; the /self-check/ slug establishes the repeatable per-practice pattern for future per-practice self-checks). 301 from /professional-services/msp-self-check/ → /practice-areas/msp/self-check/, implemented Thursday in vercel.json. Schema classification: NOT a makesOffer entry — funnel page, not a service line — do NOT add to Org schema makesOffer during today's re-propagation. Indexing: NOT in sitemap.xml — intended user flow is practice page ranks → visitor converts via self-check → routes to Microscope; we want the practice page to rank, not the quiz. Reconciliation applied to lines 13, 31, 42, 101, 107, 117, 131 below.
3. Infrastructure page stale crosslink: practice-areas/infrastructure/index.html L273 has <a href="/practice-areas/managed-services/"> — non-existent path. Repoint to /practice-areas/msp/. Same page's inlined Org schema (L131) also names the practice "Managed & Professional Services" at the stale path; that half is May-20 schema scope.
4. Engagement-model fold: /professional-services/index.html content (the 4-phase Insight/Strategy/Execution/Support body and the 6-card assessment grid) must fold into /about-lam/index.html before cutover deletes the /professional-services/ directory.
5. Org schema makesOffer re-propagation (May 20 scope): across all 24 inlined copies — add MSP entry, change "Infrastructure & MSP — Infrastructure Insight and MSP Microscope" (dual-lens) to "Infrastructure & Cloud — Infrastructure Insight" (single-lens). Plus drop "Mobility & IoT" → "Mobility" framing, remove "Telecom audit" from knowsAbout, and align all dateModified stamps. Verify timing — May 20 has to land before Thursday 6pm go/no-go to satisfy criterion #3 (all 24 inlined schema copies propagated). ✅ RESOLVED May 20 in this commit. 18 surviving + 7 doomed pages scrubbed. Canonical schema-org.html knowsAbout also rewritten to kill broker framing (removed "Vendor-neutral procurement", "IT contract negotiation", "Professional services partner sourcing"; renamed to "Supplier-neutral technology advisory"). MSP offer description rewritten: "Diagnostic for evaluating and managing managed service providers — LAM examines the MSP, never becomes one."

6. internal/builder.html still uses 5-practice taxonomy: 13× "Mobility & IoT" + 2× "Infrastructure & MSP" across the practice dropdown (L402-403) and the JS data objects (L516, L540, L546-557). On the May-20 punch list ("Update internal/builder.html practice dropdown… rename Infrastructure & Cloud, drop IoT from Mobility, add MSP entry") but builder is internal, robots-disallowed, zero crawler exposure — NOT cutover-blocking. Update when convenient, explicitly NOT on cutover eve. Rename-only (not reorder) is lower risk per the May 19 ordering-risk note.

7. practice-areas/customer-experience/index.html L317 uses "vendor-neutral" and "No vendor bias" as LAM-positioning body copy: "CX guidance that is strategic, operational, and vendor-neutral. No vendor bias — we recommend what is right for your customers and your business." Missed by the May-20 schema scrub (which targeted schema-only). Supplier-swap candidate to match canonical schema-org.html knowsAbout "Supplier-neutral technology advisory" and the rest of the site. Body copy edit; check tone fit before swap. NOT a blocker. (All other lowercase "vendor" hits in body copy across insights/* and practice-areas/* are generic English usage — "vendor selection", "vendor demos" — and are not LAM-positioning. Leave them alone.)

8. POST-LAUNCH ARCHITECTURE DECISION — canonical partial vs inline schema sync. schema-practice-areas.html (canonical) uses order Infrastructure & Cloud, Cybersecurity & Resilience, Customer Experience, Mobility, MSP, AI Readiness. The inlined version in practice-areas/index.html L160 uses Cybersecurity & Resilience, Infrastructure & Cloud, MSP, Mobility, Customer Experience, AI Readiness. Different order. Both are clean of forbidden strings — structural drift, not a Phase-C failure. The "dual-source" pattern (canonical /partials/schema-*.html + inlined copies in each page <head>) treats inline as the propagation target, but if inline drifts from canonical, every schema re-propagation becomes a hand-coordination exercise like this May-20 commit was. POST-LAUNCH options to evaluate: (a) freeze inline as a "compiled artifact" of canonical, add pre-commit grep/CI check that fails on drift; (b) drop inlining and fetch-include the partial via JS at page load (loses static-HTML crawler visibility unless SSR/static-render via build step); (c) accept hand-propagation tax and document the canonical-first rule strictly. Do NOT lose this decision again — it's the single biggest recurring tax in this codebase right now.

What's still outstanding for May 22 (Commit 1b)
Page content

 Edit /practice-areas/infrastructure/ — rename to "Infrastructure & Cloud", strip MSP content
✅ Edit /practice-areas/mobility/ — drop IoT references everywhere (DONE May 19, visible copy + meta; schema IoT deferred to May-20 re-propagation; domain [08] renamed "Connected Assets & M2M" Lesley-approved; committed + pushed)
✅ MSP practice page (DONE May 19, commit 71aa68f) — built at /practice-areas/msp/ (NOT /managed-services/, per May 20 path decision). 4-layer periodic grid, 12 domains. LAM-is-not-an-MSP positioning preserved: page examines the client's MSP, doesn't deliver MSP services.

URL moves

 git mv /professional-services/billing-breakthrough/ → /billing-breakthrough/
 git mv /professional-services/self-check/ → /billing-breakthrough/self-check/ (+ /results/)
 git mv /professional-services/msp-self-check/ → /practice-areas/msp/self-check/ (+ /results/) [May 20 decision: lead-magnet path, NOT /msp/msp-microscope/ — preserves MSP Microscope™ trademark; /self-check/ slug = repeatable pattern]

Deletions + content folds

 Fold engagement-model content from /professional-services/index.html into /about-lam/index.html
 Delete /professional-services/index.html (Pro Services hub)
 Delete /professional-services/support-scope/index.html (with 301 → /about-lam/)

Schema propagation — ✅ DONE May 20 (see Wed May 20 commit)

✅ Org schema propagated to 18 surviving inlined pages + scrubbed in 7 doomed /professional-services/* pages (forbidden-string-only cleanup since they delete Thursday). 7-offer canonical: BB + Infrastructure & Cloud + Cybersecurity & Resilience + Customer Experience + Mobility + MSP + AI Readiness. Broker framing scrubbed from knowsAbout (Vendor-neutral procurement, IT contract negotiation, Professional services partner sourcing all removed; renamed "Supplier-neutral technology advisory"). MSP offer description: "Diagnostic for evaluating and managing managed service providers — LAM examines the MSP, never becomes one." The MSP self-check at /practice-areas/msp/self-check/ is NOT a makesOffer entry — funnel page, not service line. Confirmed NOT added.
✅ Practice-areas hub schema partial canonical updated ("Managed & Professional Services" → "MSP"). Inlined hub crawler-facing layer (meta description + og:description + twitter:description + inlined schema description) scrubbed "Mobility & IoT" → "Mobility". Visible card scope label keeps "& IoT" per Option A.
✅ Infrastructure schema partial canonical updated ("Vendor-neutral" → "Supplier-neutral"). Propagated to inlined infrastructure per-page schema. Org schema variant-B (intermediate 6-practice) swapped to canonical.
✅ Mobility per-page schema canonical was already clean; propagated to inlined mobility page (dropped "& IoT" from name, serviceType, description, breadcrumb, and HTML comment label).

Chrome / IA

 Update /partials/nav-redesign.html — 6 practices in dropdown, add Billing Breakthrough top-level
 Update /partials/footer-redesign.html — 6 practices listed, BB link
 Update internal/builder.html practice dropdown (lines 401–405): rename Infrastructure & Cloud, drop IoT from Mobility, add MSP entry
 Update internal/builder.html practices object: infrastructure-insight.practiceArea → "Infrastructure & Cloud", wireless-wisdom.practiceArea → "Mobility", create new msp-microscope block

Sitemap + redirects

 sitemap.xml: ADD /practice-areas/msp/ (NEW indexable MSP practice page); UPDATE BB URLs (hub now at /billing-breakthrough/, Self-Check at /billing-breakthrough/self-check/); REMOVE all /professional-services/* URLs (hub, support-scope, old BB locations, old /professional-services/msp-self-check/). DO NOT ADD /practice-areas/msp/self-check/ — intentionally non-indexed (funnel page, not service line; practice page ranks, quiz doesn't).
 vercel.json: redirects per URL moves above + 2 precautionary

Content sweep

 Homepage L1471 "Five practices" → "Six practices"
 All other "five practice/lens" references from May 13 audit
 "audit" word-sweep: cybersecurity Org JSON-LD still contains "Telecom audit" (page L81, an inlined-schema entry). Forbidden-word rule says it must go. Handle in the schema re-propagation pass (fix canonical partial + all 24 inlined copies together — do NOT one-off edit a single copy). Sweep the rest of the site for "audit" at the same time.

Parked to post-launch (NOT shipping May 22)

Commit 2 — practice-areas hub redesign (6-card grid, kept-advisor proof block, page-end BB CTA). Current hub stays with text-only "Five → Six" sweep applied.
Practice area diagrams — Vigilance Verification radial ABANDONED (peer critique: target/bullseye metaphor). Replaced May 19 with a periodic-table grid grouping the 15 domains into 4 layers (Governance & Risk / Perimeter & Access / Endpoints & Workloads / Data & Cloud) — shipped on the cybersecurity page. Still outstanding: CX 4-item Experience Examination, plus diagrams for Infrastructure & Cloud, Mobility, MSP, AI Readiness (the periodic grid is the reusable pattern for these — .svc-coverage* classes scale to any count/group).
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
