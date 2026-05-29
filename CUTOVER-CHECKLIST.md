# LAM Cutover Checklist — lamtechnology.com

**Target cutover: Friday May 29, 2026** · Branch: `feat/practices-restructure` → `main`
Generated 2026-05-25 from repo state + HANDOFF.md. Read-only audit; this file changes nothing else.

**Status legend:** `DONE` shipped on branch · `OUTSTANDING` not started / in progress · `BLOCKED` waiting on a dependency or person.

> **Execution rule:** work the phases in order. Phases A–C must complete before D (rewiring) because the rewire targets the post-move paths. F (redirects) and G (sitemap) must reflect the final paths. J (merge/DNS) is last.

---

## Phase 0 — Pre-cutover content/build state (what's actually done)

| Item | Status | Notes |
|---|---|---|
| 6 practice pages exist with real content | DONE | cybersecurity, infrastructure, mobility, customer-experience, ai-readiness, msp |
| All 6 periodic-table grids | DONE | cyber `f5b9e15`, mobility `9c05207`, MSP `71aa68f`, CX `136ec29`, infra `141034a`, AI `474e57f` |
| Homepage practice count (Five→Six) | DONE | `55e7f77` — headline "Six practices", receipt "6", 6-card grid; grep confirms no "five practice/lens/fifth" remain (only "Five minutes" false positive) |
| CX Mini-Check (questionnaire + results + CTA) | DONE | `642aba0` + `1bc74b6` + `6a94cef`. Findings copy + cost figures flagged **pending Diane Gray review** (content sign-off, not a build blocker) |
| MSP self-check relocation + discovery CTA | DONE | `f93e633` (move) + `109b117` (CTA) |
| Self-check CTA naming standardized (Mini-Check→Self-Check) | DONE | `6a94cef` |
| Cyber self-check | BLOCKED (Raj) | Does **not exist** on branch. Not in original cutover criteria — treat as post-launch unless Raj delivers + you choose to include. Not cutover-blocking. |
| internal/builder.html 6-practice taxonomy | OUTSTANDING (non-blocking) | 15× stale "Mobility & IoT"/"Infrastructure & MSP" (L402-403, L516, L540, L546-557). Internal tool, robots-disallowed, zero crawler exposure. HANDOFF #6: update post-cutover, NOT on cutover eve. |
| Assessment builder rating-color bug | BLOCKED (Raj) | Ship fix only if Raj confirms broken. Non-blocking. |

---

## Phase A — Content prerequisite (must run BEFORE any deletion)

- [ ] **Fold engagement-model content into About** — `OUTSTANDING`
  - **From:** `professional-services/index.html` — the 4-phase Insight/Strategy/Execution/Support body + the 6-card assessment grid.
  - **Into:** `about-lam/index.html`.
  - **Dependency:** MUST happen before Phase C deletes `professional-services/index.html`, or the content is lost.
  - **Watch:** the hub body still carries stale taxonomy in *visible copy* — "Infrastructure & MSP" (L214), "Mobility & IoT" (L228), "nine control domains" for cyber (now 15), "Twelve domains" for CX (now 10). **Do not carry the stale taxonomy into About** — update to canonical names while folding.

---

## Phase B — File moves (git mv) + internal self-reference fixes

Mirror the MSP self-check relocation pattern (`f93e633`): `git mv`, then fix every in-file self-reference (canonical, og:url, inline WebPage/Breadcrumb `@id`+`url`, results redirect, retake links), then schema partial + sitemap + redirects.

- [ ] **BB hub → top-level** — `OUTSTANDING`
  `git mv professional-services/billing-breakthrough/ billing-breakthrough/`
  Then in `billing-breakthrough/index.html` rewrite to `/billing-breakthrough/`:
  - L8 canonical, L13 og:url
  - inline schema L148/154/159/160/163/168/172/176 (`#service`, `#webpage`, `#breadcrumb`, url, about, breadcrumb item)
  - L245 self-check CTA → `/billing-breakthrough/self-check/`
  - breadcrumb parent (currently "Professional Services" → `/professional-services/`, which is being deleted) → repoint to a surviving parent (Home / Billing Breakthrough, or Home / Services-equivalent).
- [ ] **BB self-check → under BB** — `OUTSTANDING`
  `git mv professional-services/self-check/ billing-breakthrough/self-check/` (carries `/results/`)
  Fix self-refs:
  - `index.html` L10 canonical, L16 og:url, schema L151/152/160/164/168, results redirect L462 → `/billing-breakthrough/self-check/results/`
  - `results/index.html` L11 canonical, L17 og:url, empty-state CTA L329, retake L380 → `/billing-breakthrough/self-check/`
- [ ] Dependency: both moves must precede Phase D rewiring, Phase F redirects, Phase G sitemap.

---

## Phase C — Deletions (only after Phase A fold is committed)

- [ ] **Delete** `professional-services/index.html` (Pro Services hub) — `OUTSTANDING` (after fold)
- [ ] **Delete** `professional-services/support-scope/index.html` — `OUTSTANDING`
- [ ] After B + C, the entire `professional-services/` directory should be empty/removed. Verify nothing else remains.
- [ ] Orphaned canonical partials to delete or stop referencing: `partials/schema-professional-services.html`, `partials/schema-support-scope.html` (no surviving page consumes them).

---

## Phase D — Rewire every cross-site reference to the dead/old paths

These are **site-wide or cross-page** links that will 404 (or mislead) after B/C unless rewired. The doomed-hub's own internal links (`professional-services/index.html` L198/L316/L317) need no action — the file is deleted.

### D1 — Nav partial (`partials/nav-redesign.html`) — `OUTSTANDING` — **site-wide, high priority**
- L9 desktop `<a href="/professional-services/">Services</a>` → doomed path.
- L32 mobile `<a href="/professional-services/">Professional Services</a>` → doomed path.
- Per HANDOFF Chrome/IA: nav should show **6 practices + Billing Breakthrough top-level**. Currently it shows neither. Decide: restructure nav (add BB top-level, practices dropdown) vs. minimal repoint. A bare 301 of `/professional-services/`→`/about-lam/` (Phase F) stops the 404 but leaves a "Services" link landing on About — restructure is the real fix.

### D2 — Footer partial (`partials/footer-redesign.html`) — `OUTSTANDING` — **site-wide, high priority**
- L10 BB → `/professional-services/billing-breakthrough/` → **rewrite to `/billing-breakthrough/`**
- L11 self-check → `/professional-services/self-check/` → **rewrite to `/billing-breakthrough/self-check/`**
- HANDOFF wanted 6 practices listed in footer; currently not present (optional/IA decision).

### D3 — Homepage (`index.html`) — `OUTSTANDING`
- L1285 `Start Billing Breakthrough` → `/professional-services/billing-breakthrough/` → **`/billing-breakthrough/`**
- L1286 `Take the 5-Minute Self-Check` → `/professional-services/self-check/` → **`/billing-breakthrough/self-check/`**

### D4 — Practice-areas hub (`practice-areas/index.html`) — `OUTSTANDING`
- L281 `TAKE THE 5-MINUTE SELF-CHECK` → `/professional-services/self-check/` → **`/billing-breakthrough/self-check/`**

> After D, re-grep `"/professional-services/"` repo-wide — only HANDOFF.md, CUTOVER-CHECKLIST.md, and (intentionally) vercel.json redirect *sources* should remain.

---

## Phase E — Schema (canonical partials + permanent stale pages)

### E1 — BB schema partials path + "audit" fix — `OUTSTANDING`
- `partials/schema-billing-breakthrough.html`: all `@id`/`url` (L7/13/18/19/22/27/31/35) → `/billing-breakthrough/`. **Plus L9 `"serviceType": "Telecom and IT spend audit"` → "…review"** — the canonical partial still says "audit"; the inlined BB page was already fixed (`81ffab8`) but the partial was not. Dual-source out of sync.
- `partials/schema-bb-self-check.html`: all `@id`/`url` (L7/8/16/20/24) → `/billing-breakthrough/self-check/`; breadcrumb parent off `/professional-services/`.

### E2 — Canonical Org schema on permanent pages carrying stale (doomed-scrub) schema — `OUTSTANDING`
These pages were forbidden-string-scrubbed May 20 but never got the full canonical Org block (still old knowsAbout "Infrastructure modernization" / "IT contract negotiation", 6 offers, **no MSP offer**). They are **forbidden-string-clean** (pass cutover criterion #3) but **non-canonical**. Re-propagate the 7-offer canonical Org schema (from `partials/schema-org.html`) to:
  - `practice-areas/msp/self-check/index.html` — **permanent page**, stale Org schema
  - `practice-areas/msp/self-check/results/index.html` — permanent (noindex), stale Org schema
  - `billing-breakthrough/index.html` (post-move) — stale Org schema
  - `billing-breakthrough/self-check/index.html` + `results/` (post-move) — stale Org schema
- Status nuance: not strictly cutover-blocking (no forbidden strings), but these are permanent crawler-facing pages that should carry canonical schema. **Recommend before cutover.**
- CX self-check (`practice-areas/customer-experience/self-check/`) already has clean canonical Org schema — no action.

---

## Phase F — Redirects (`vercel.json`) — exhaustive

> **CRITICAL ORDERING TRAP:** vercel.json L16-17 currently has *temporary* forwards
> `/billing-breakthrough` + `/billing-breakthrough/` → `/professional-services/billing-breakthrough/` (`permanent:false`).
> Once BB physically moves to `/billing-breakthrough/`, these intercept the **new home** and send it to the **deleted old path → 404/loop**. They MUST be **deleted** as part of the move, and replaced with the reverse 301 below.

- [ ] **Remove** existing L16-17 temporary `/billing-breakthrough(/)` → `/professional-services/billing-breakthrough/` redirects — `OUTSTANDING`
- [ ] **Add** (all `permanent: true`, results-first then parent, both slash variants) — `OUTSTANDING`:
  - `/professional-services/billing-breakthrough/` (+ no-slash) → `/billing-breakthrough/`
  - `/professional-services/self-check/results` (+/) → `/billing-breakthrough/self-check/results/`
  - `/professional-services/self-check` (+/) → `/billing-breakthrough/self-check/`
  - `/professional-services/support-scope` (+/) → `/about-lam/`
  - `/professional-services` (+/) → `/about-lam/`  *(catches the nav "Services" link and the old hub)*
- [ ] **Already present (keep):** 4× `/professional-services/msp-self-check…` → `/practice-areas/msp/self-check…` (added `f93e633`).
- [ ] **Precautionary (optional, per HANDOFF):** `/practice-areas/infrastructure-msp` → `/practice-areas/infrastructure/`; `/practice-areas/mobility-iot` → `/practice-areas/mobility/`.
- [ ] Existing legacy redirects (cybersecurity.html, infrastructure-insight.html, wireless-wisdom.html, ai-readiness.html, support-scope.html, customer-experience-digital-engagement, insights/identity-management, insights/sase) — verify still valid, leave as-is.

---

## Phase G — sitemap.xml + robots.txt

### G1 — `sitemap.xml` — `OUTSTANDING`
- **ADD** `https://lamtechnology.com/practice-areas/msp/` — the MSP practice page is **missing from the sitemap** (all 5 other practices are listed; MSP is not). Indexable practice page — must be added.
- **UPDATE** L100 `/professional-services/billing-breakthrough/` → `/billing-breakthrough/`
- **UPDATE** L112 `/professional-services/self-check/` → `/billing-breakthrough/self-check/`
- **REMOVE** L94 `/professional-services/` (hub deleted)
- **REMOVE** L106 `/professional-services/support-scope/` (deleted)
- **DECISION FLAG — self-check questionnaires in sitemap:** L118 `/practice-areas/msp/self-check/` and L124 `/practice-areas/customer-experience/self-check/` are currently **listed (indexed)**. This **contradicts HANDOFF L137's stated intent** ("DO NOT ADD … intentionally non-indexed; funnel page, not service line; practice page ranks, quiz doesn't"). They got added during the MSP relocation + CX Pass 2. Decide: keep indexed (current state) or remove all three self-check questionnaires per the funnel-page intent. **Not a 404 risk either way** — pure indexing-strategy call. Results pages are correctly absent (noindex).

### G2 — `robots.txt` — `OUTSTANDING`
- L8 `Disallow: /professional-services/self-check/results/` → update to `/billing-breakthrough/self-check/results/` when the BB self-check moves (Phase B).
- L9 already points to `/practice-areas/msp/self-check/results/` (updated `f93e633`). ✓
- AI-bot allowlist (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) intact — no change.

---

## Phase H — Cache-buster verification (per-file)

`/assets/* immutable` in vercel.json → a returning visitor only re-fetches CSS when the `?v=N` changes. Pages that consume `.svc-coverage` (the grids) MUST be ≥ v=17.

| Page | Current | OK? |
|---|---|---|
| practice-areas/cybersecurity | v=17 | ✓ |
| practice-areas/infrastructure | v=17 | ✓ |
| practice-areas/mobility | v=17 | ✓ |
| practice-areas/customer-experience | v=17 | ✓ |
| practice-areas/ai-readiness | v=17 | ✓ |
| practice-areas/msp | v=17 | ✓ |
| customer-experience/self-check (index + results) | v=17 | ✓ |
| **msp/self-check (index + results)** | **v=14** | ⚠️ **STRAGGLER** |
| BB self-check (professional-services/self-check, moving) | v=14 | ⚠️ set to v=17 on move |
| practice-areas/ (hub) | v=15 | OK* |
| homepage, insights/*, about, contact, privacy, cookies, professional-services/* | v=14 | OK* |

- [ ] **Bump MSP self-check `index.html` + `results/index.html` v=14 → v=17** — `OUTSTANDING`. Functionally fine today (uses `.sc-*`, not `.svc-coverage`), but inconsistent with the CX self-check (v=17). Your stated standard is "all self-checks v=17."
- [ ] When BB self-check moves (Phase B), set it to v=17 too.
- *OK = does not consume `.svc-coverage`, so v=14/v=15 renders correctly. Bump only if you want uniformity (optional, not blocking).

---

## Phase I — Forbidden-word & integrity sweep (pre-merge)

- [ ] **"audit" sweep** — `OUTSTANDING` (one real fix):
  - `partials/schema-billing-breakthrough.html` L9 serviceType "audit" → "review" (covered in E1) — **the one LAM-service "audit" still live**.
  - Judgment calls (likely leave — not LAM-service framing): `privacy/index.html` L227 "…lawyers, accountants, and auditors…" (legal boilerplate, third-party advisors); `insights/contact-center-agents/index.html` L247 "…supervisors into developers instead of auditors" (generic prose metaphor). `practice-areas/msp/self-check/index.html` `no_audit` is an internal non-rendered JS value (leave; post-launch cleanup).
- [ ] **Forbidden practice-name strings** (`Infrastructure & MSP`, `Mobility & IoT`, `five IT advisory`, `Telecom audit`, `Managed & Professional`): **ZERO in user-facing pages** ✓ — only HANDOFF.md (log) and internal/builder.html (robots-disallowed, non-blocking). Cutover criterion #3 MET for public pages.
- [ ] Re-grep `"/professional-services/"` after Phase D — expect only HANDOFF/this checklist + vercel.json redirect sources.

---

## Phase J — Merge, DNS flip, smoke test

- [ ] **Pre-merge:** 10-minute click-through on the preview URL (`lam-technology-website-{hash}-lam-technology.vercel.app`): no broken links, no contradictory copy, all 6 practices reachable, BB + both self-checks reachable. — `OUTSTANDING`
- [ ] **Merge** `feat/practices-restructure` → `main`. — `OUTSTANDING`
- [ ] **DNS cutover** to lamtechnology.com. (Vercel env vars carry Production→Preview automatically; deployments built before an env var was added do NOT pick it up — redeploy if needed. Resend keys owned by Raj.) — `OUTSTANDING`
- [ ] **Post-cutover smoke test** — `OUTSTANDING`:
  - Contact form submits (Resend; escalate to Raj if broken).
  - `info@lamtechnology.com` inbox monitored (declared in Org schema; remove field if not).
  - Sample redirects 301 cleanly: `/professional-services/`, `/professional-services/billing-breakthrough/`, `/professional-services/self-check/`, `/professional-services/support-scope/`, `/professional-services/msp-self-check/`.
  - New homes load 200: `/billing-breakthrough/`, `/billing-breakthrough/self-check/`, `/practice-areas/msp/`, `/practice-areas/msp/self-check/`, `/practice-areas/customer-experience/self-check/`.
  - Schema validators (Google Rich Results / Schema.org) on homepage + one practice page + BB: Org schema valid, 7 offers incl. MSP, no "audit".
  - `sitemap.xml` fetches, all `<loc>` return 200 (no deleted/old URLs), MSP practice present.
  - `robots.txt` fetches; AI-bot allowlist intact; results-page disallows point at live paths.
  - LinkedIn Post Inspector on homepage (OG image `/assets/og/og-default.png` renders).
  - Spot-check all 6 practice grids render (CSS v=17 served).

---

## SEO/GEO Tier-1 integrity (what the dissolution could disturb)

| Tier-1 item | Risk from cutover | Mitigation (phase) |
|---|---|---|
| Organization JSON-LD | Permanent stale-schema pages (MSP self-check, moved BB) carry 6-offer/old knowsAbout | E2 re-propagate canonical |
| Page-specific schema | BB schema partials point at old path + "audit" | E1 |
| robots.txt AI allowlist | None (allowlist untouched); results disallow path drifts | G2 |
| sitemap.xml | Lists soon-to-be-deleted/moved URLs; MSP practice missing | G1 |
| OG image | None — `/assets/og/og-default.png` stable, immutable-cached | verify in J |
| Meta tags | None expected; verify moved BB pages keep canonical/og updated | B + J |
| No indexed page 404s | `/professional-services/*` deletions/moves | F redirects must be complete before DNS |

---

## One-line dependency summary

**A (fold) → B (move BB + BB self-check) → C (delete hub + support-scope) → D (rewire nav/footer/home/hub CTAs) → E (schema partials + canonical re-propagation) → F (redirects, delete the temp BB forward) → G (sitemap + robots) → H (bump MSP self-check v=17) → I (sweep) → J (merge + DNS + smoke test).**
