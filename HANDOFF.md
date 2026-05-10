# LAM Website Redesign — Handoff

_Updated end of day Saturday, May 9, 2026. Massive progress today. Picking up where we left off requires reading this entire doc plus the brand rationale and SEO/GEO playbook in /docs/._

## Current state — fully redesigned site live on preview branch

The redesign branch on GitHub has a fully clickable preview at:
https://lam-technology-website-git-redesign-lam-technology.vercel.app/index-redesign.html

Production lamtechnology.com is unchanged. The preview is publicly accessible, no Vercel deployment protection.

24 pages now live on the redesign system, all using lam-redesign.css and the partials-based nav/footer pattern:

- Homepage (/index-redesign.html — note: serves at /index-redesign.html, not /, until production cutover)
- About (/about-lam/)
- Insights index + 5 articles (security-tabletops, contact-center-agents, pots-lines, mobility-costs, penetration-testing)
- Contact (/contact/)
- Practice areas hub + 5 service pages (/practice-areas/cybersecurity/, /infrastructure/, /mobility/, /customer-experience/, /ai-readiness/)
- Professional Services hub + BB destination + Support Scope (/professional-services/, /billing-breakthrough/, /support-scope/)
- BB Self-Check + results (/professional-services/self-check/)
- MSP Self-Check + results (/professional-services/msp-self-check/)
- Privacy + Cookies (/privacy/, /cookies/)

22 redirects in vercel.json preserve SEO from the old URLs.

## Pending workstreams

1. **Resend / contact form** — gated on MSP completing DNS records. Form returns "Email send failed" until Resend domain verification completes. When MSP finishes, Raj clicks Verify in Resend, no further action needed on the website.

2. **Production cutover** — rename /index-redesign.html → /index.html and /about-lam/index-redesign.html → /about-lam/index.html. The nav logo currently points to /index-redesign.html as a temporary measure (TEMP comment in /partials/nav-redesign.html); revert to "/" during cutover.

3. **SEO/GEO foundation work** — JSON-LD structured data on every page, sitemap.xml at /sitemap.xml, robots.txt, meta-tag audit. About 90 minutes of Claude Code time. Documented in /docs/seo-geo-playbook.md (Part 2).

4. **OG image** — a 1200x630 branded image needs to be designed (cream paper, navy, gold, editorial style). Separate workstream from any code work. Until then, OG meta tags reference a placeholder.

5. **Terms of Service + Accessibility statement** — common compliance pages, currently absent. Drafting requires a lawyer for ToS and likely an accessibility audit firm for the statement. Future workstream.

6. **Executive feedback** — exec preview email sent end of day May 9. Capture responses out of inbox into a tracking doc. Don't change design while feedback comes in; batch responses and act on them after hearing from everyone.

## Governance docs in /docs/

- /docs/brand-rationale.md — 7-reason argument for the cream-navy-gold aesthetic. Reference when the question gets re-litigated.
- /docs/seo-geo-playbook.md — concepts, pre-launch foundation, post-launch ongoing playbook for search and AI-engine discovery work.

## Tooling

- All code work goes through Claude Code in PowerShell terminal. Type `claude` to launch.
- Never use Claude in Chrome / GitHub web editor / any browser-based code tools — they corrupt markdown asterisks and have CodeMirror autopair issues.
- Pattern: Strategy Claude (claude.ai conversation) for design and decisions, Claude Code for implementation.
- Cache-busting protocol: any CSS or partial change requires bumping ?v=N to ?v=N+1 across all redesigned pages. Currently at v=8.
- Brand tokens are unprefixed (--navy, --paper, --gold). The --lam-* prefix is deprecated.

## Known temporary states

- Nav logo links to /index-redesign.html instead of /. Revert during production cutover.
- The legacy /index.html still exists at root and serves at /. Will be replaced during cutover.
- The legacy /about-lam/index.html still exists. Will be replaced during cutover.
- Two lam-theme.css references remain in the repo, both on legacy index/about pages awaiting cutover.

## Recent commits

- 797e519 Quick fixes: nav logo to /index-redesign.html temporarily, smooth scroll on self-check question advance
- 94af170 Redesign Professional Services + utility pages
- 599e8bc Add SEO and GEO playbook doc
- a23f9c7 Redesign self-check pair
- 12aa9d9 Merge msp-self-check branch
- (earlier commits cover practice areas, brand rationale doc, contact form, insights, about, homepage, etc.)

## When picking up next time

Open a new chat in this Claude project. Paste:

> Picking up the LAM redesign. Read HANDOFF.md from the repo: https://github.com/lesleykingsley/lam-technology-website/blob/redesign/HANDOFF.md — ready to continue.

The memory system has the full project context. The handoff fills in the immediate state.
