# LAM Website Redesign — Handoff

_Paused mid-day Thursday May 7, 2026. Pick up from Step 1 below when ready._

## Current state — everything shipped and stable

The redesign branch on GitHub has a working preview at:
`https://lam-technology-website-git-redesign-lam-technology.vercel.app`

Production (`lamtechnology.com`) is **untouched**. No risk of anything built so far affecting the live site.

**Pages completed and styled to the new design system:**
- Homepage (`/index-redesign.html`) — desktop and mobile
- About (`/about-lam/index-redesign.html`)
- Insights index (`/insights/`) — "Notes from the floor"
- 5 articles under `/insights/` (security-tabletops, contact-center-agents, pots-lines, mobility-costs, penetration-testing)
- Contact (`/contact/`)
- Universal nav and footer (shared partials)

**Bugs fixed in last commit:**
- Homepage form was sending `msg` field but API expected `message` — fixed
- Homepage form had no submit handler (would have shown raw JSON) — fixed
- All 6 insights "Just Ask LAM" CTAs pointed to `/#cta` which doesn't exist on the new homepage — retargeted to `/contact/`
- Email address inconsistency (hello@ vs info@) — standardized to info@lamtechnology.com

## The blocker — Resend setup paused mid-DNS

The contact form on the redesign branch returns "Email service not configured" when submitted. The Vercel project has no `RESEND_API_KEY` env var set in any environment. Production form has likely been silently failing for an unknown period — destination is info@lamtechnology.com which is monitored by someone other than Lesley, so submission failures haven't been visible.

**Progress so far:**
1. Signed up for a fresh Resend account using lesleykingsley@lamtechnology.com (clean, owned, future-proof)
2. Verified the Resend account email
3. Added `lamtechnology.com` as a domain in Resend (Region: us-east-1, North Virginia)
4. Resend generated 3 DNS records to add (visible in Resend dashboard)
5. STOPPED HERE — needed to copy the 3 full DNS record values into Notepad, then open DreamHost in a new tab to add them

## Pickup sequence

### Step 1 — Open Resend
- Go to https://resend.com → sign in (lesleykingsley@lamtechnology.com)
- Left sidebar → Domains → click `lamtechnology.com`
- See "Not Started" status from where we left off
- Three records to add:
  - **TXT** with Name `resend._domainkey` and Content starting `p=MIGfMA0GCSqG...QIDAQAB`
  - **MX** with Name `send` and Content ending in `ses.com`, priority 10
  - **TXT** with Name `send` and Content `v=spf1 ... ~all`

### Step 2 — Get the FULL content values
- Each record's Content is truncated in the UI (shows `[...]` in the middle)
- Click each row or use the copy icon to get the full value
- Open Notepad and paste each one labeled:

DKIM TXT name: resend._domainkey
DKIM TXT value: [full content]

MX name: send
MX value: [full content]
MX priority: 10

SPF TXT name: send
SPF TXT value: [full content]

(End of the labeled-block example.)

### Step 3 — Open DreamHost
- New tab, go to https://panel.dreamhost.com, log in
- Left sidebar: Domains, then Manage Domains
- Find lamtechnology.com, click the DNS link in its row
- Take a screenshot of the DreamHost DNS page and send to Claude (strategy chat). Claude will write exact step-by-step instructions for adding each record. DreamHost has quirks about Name field handling that need careful attention.

### Step 4 — Add 3 DNS records, wait for propagation, verify in Resend
Claude will guide step-by-step from the screenshot.

### Step 5 — Generate API key in Resend
- Resend left sidebar: API Keys, then Create API Key
- Name it "lam-technology-website" or similar
- Permission: "Sending access" only (NOT full access)
- Copy the key and paste into Notepad immediately. This key is shown ONCE.

### Step 6 — Add API key to Vercel
- https://vercel.com/dashboard, then lam-technology-website project, then Settings, then Environment Variables
- Add new variable:
  - Name: RESEND_API_KEY
  - Value: paste the API key
  - Environments: check Production, Preview, AND Development (all three)
- Save

### Step 7 — Trigger a fresh deploy
- Vercel project, Deployments tab, find latest deployment on redesign branch
- Click the three-dot menu, then Redeploy
- Wait about 60 seconds for the deploy to finish

### Step 8 — Test the form
- Open https://lam-technology-website-git-redesign-lam-technology.vercel.app/contact/ in incognito
- Fill out the form with test data, submit
- Watch for "Thanks — we'll respond within one business day."
- Check info@lamtechnology.com (or have whoever monitors it check) within a couple minutes

## Pending pages still to redesign after Resend is fixed

In rough priority order:

1. Practice areas hub (next page Lesley said yes to before the contact pause)
2. 5 service pages — Cybersecurity, Customer Experience, Infrastructure, Mobility, AI Readiness (mechanical work after the practice-areas template lands)
3. Customer Experience subpage at /practice-areas/customer-experience-digital-engagement/
4. BB Self-Check assessment — content review needed first (questions/scoring)
5. MSP Microscope assessment — currently on a feature branch, needs merge into redesign + content review
6. Privacy and Cookies utility pages — light pass

## Tooling notes

- All code work goes through Claude Code in PowerShell terminal. Type `claude` to launch.
- Never use Claude in Chrome, GitHub web editor, or any browser-based code tools — they corrupt markdown asterisks and have CodeMirror autopair issues.
- Pattern: Strategy Claude (claude.ai conversation) for design and decisions, Claude Code for implementation.
- Cache-busting protocol: Any CSS or partial change requires bumping ?v=N to ?v=N+1 across all redesigned pages (currently at v=5). Source of truth is the comment at the top of lam-redesign.css.
- Brand tokens are unprefixed (--navy, --gold, etc.). The --lam-* prefix is deprecated.

## Estimated remaining work

- Resend setup pickup: 30-45 minutes (mostly DNS propagation wait)
- Practice areas hub: about 45 minutes
- 5 service pages: about 15 minutes each, 1 to 1.5 hours total
- Assessments: 1 to 2 hours each plus content review time
- Privacy and cookies: 15 minutes total
- Final merge to main and production deploy: 30 minutes

Realistic total to finish redesign: 4 to 6 working hours, ideally spread across 2 to 3 sessions.
