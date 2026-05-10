# LAM Technology — SEO and GEO Playbook

_Drafted during the redesign session. Operational framework for ongoing search and AI-engine discovery work post-launch._

## Part 1: Concepts you should understand before implementing anything

### What SEO and GEO actually are

SEO (Search Engine Optimization) is the discipline of being found in Google, Bing, and other traditional search engines when someone types a query. The mechanic is simple: the search engine has a ranked list of results, and SEO is the work of being closer to the top.

GEO (Generative Engine Optimization) is a newer discipline — roughly 18 months old as a named practice — about being cited or quoted by AI answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews, Gemini). The mechanic is different: there's no ranked list. The AI either includes you in its answer or it doesn't.

For LAM specifically, both matter for different reasons. A CIO actively searching "MSP audit consultancy Texas" goes through Google. SEO finds them there. A CIO asking ChatGPT "what consultancies help mid-market companies evaluate their MSP relationships?" goes through an AI engine. GEO finds them there. The buyers are the same. The discovery layer is bifurcating.

### Why your existing content is already doing a lot of the work

Most consultancy websites are SEO-poor and GEO-invisible because they're full of generic marketing copy. "We deliver comprehensive solutions across the full spectrum of your IT needs."

The redesign isn't doing that. The reasons content already works for SEO and GEO:

1. Substantive depth — 850-950 words per practice page, 1,000+ words per insights article. Search engines reward depth. AI engines preferentially cite content with substance.

2. Distinctive language — phrases like "Am I secure where it matters, or just checking boxes?" are quotable. AI engines preferentially cite distinctive phrases over paraphrasable generic ones.

3. Named methodologies — Vigilance Verification, MSP Microscope, AI Readiness Radar. Trademarked names create unique strings in the indexable web. When someone searches for "Vigilance Verification," exactly one firm shows up.

4. Specific numbers — "30 executives have brought LAM with them when changing companies — 10 of those three times, 2 of those more than three times." That kind of specific claim with structured numbers is exactly what AI engines surface as evidence.

5. Editorial structure — headers, hairline rules, semantic HTML. Crawlers parse this as "high-quality reference material" rather than "marketing brochure."

The site is already 60% of the way to good SEO/GEO before adding a single line of structured data. The redesign did this without setting out to.

### The four things that turn good content into great SEO/GEO

These are the technical implementations that take you from "good content that mostly works" to "great content that systematically wins discovery":

#### 1. Structured data (JSON-LD)

The single biggest SEO/GEO improvement available. Crawlers and AI engines both parse JSON-LD blocks embedded in HTML to understand what kind of page they're looking at — service offering, article, organization profile, product.

Without JSON-LD, search engines have to infer what your page is from context. With JSON-LD, you tell them explicitly.

For LAM, structured data includes:
- Organization on every page (LAM Technology, founded 2002, location, etc.)
- Service on each practice area page
- Article on each insights article
- ProfessionalService on the homepage and contact page

#### 2. Sitemap.xml

A file at /sitemap.xml that lists every page on the site, when it was last modified, and how important it is. Search engines use it as a roadmap.

Without a sitemap, search engines crawl by following links. They might miss pages linked only from deep navigation, or might not realize which pages are most important. With a sitemap, they index everything faster and more completely.

For LAM, the sitemap includes the homepage, About, Insights index plus 5 articles, Contact, Practice Areas hub plus 5 service pages, Professional Services hub plus BB destination page. Self-checks stay excluded (noindex'd).

#### 3. Robots.txt

A small text file at /robots.txt that tells crawlers which pages they can and can't index. Self-check pages are correctly marked noindex at the page level, but robots.txt is belt-and-suspenders — it tells crawlers not to visit at all, saving crawl budget.

#### 4. Meta tags audit

Title tags, meta descriptions, Open Graph tags, Twitter cards. These don't directly affect rankings much, but they affect:
- The snippet that appears in search results (drives click-through)
- The preview when someone shares a URL on LinkedIn or in Slack
- The context AI engines use when deciding whether to cite

Every redesigned page already has these tags, but they need a unified review pass — making sure each title is distinctive, each description is compelling, each OG image renders correctly.

### Why GEO requires its own tactics on top of SEO

Doing the four things above gets you to good SEO. GEO requires additional consideration because AI engines don't work like search engines.

SEO is about ranking. Get to position 1 for the query.

GEO is about being cited. Be the source the AI quotes when answering.

The difference matters because:
- AI engines paraphrase generic content but quote distinctive content directly
- AI engines preferentially cite content with named frameworks, specific numbers, and structured arguments
- AI engines look for content that "sounds authoritative" — declarative statements, specific claims, clear cause-effect
- AI engines weight Wikipedia, government sources, academic papers, and major publications heavily; smaller sites have to earn citations through distinctiveness

Practical implications:

1. Write declaratively, not hedgingly. "POTS lines cost on average $1,000 per line per month at retail rates" is more citable than "POTS lines can sometimes be more expensive than alternatives."

2. Make claims you can defend. Specific, defensible claims with numbers attached.

3. Use structured Q&A where appropriate. A FAQ section on the BB destination page or AI Readiness page would be highly citable.

4. Be the source, not the summary. Link to original research where you have it. Cite primary sources.

5. Earn third-party mentions over time. AI engines weight what others say about you, not just what you say about yourself.

## Part 2: Pre-launch foundation

The technical implementation work to be done before the redesigned site goes live to production.

### What gets implemented

**JSON-LD structured data on every page.** Each page gets a JSON-LD block in the head. Schema types vary by page type (Organization, ProfessionalService, AboutPage, Service, Article, ContactPage).

**Sitemap.xml at /sitemap.xml.** Auto-generated, includes all indexable pages with last-modified dates. Excludes self-check pages.

**Robots.txt at /robots.txt.** Allows everything except self-check pages. References sitemap location.

**Meta-tag audit and harmonization.** Pass through every redesigned page and verify titles are distinctive, descriptions are compelling, Open Graph tags render with usable images, canonical URLs all point correctly.

**Open Graph image.** A single 1200x630px image used as the default share preview when a LAM URL is shared on LinkedIn, Slack, etc. Should be branded, distinctive, and render the cream-paper-and-gold aesthetic. Needs to be designed/commissioned separately — not a developer task.

### Estimated effort

90 minutes of Claude Code time, possibly 2 commits if structured data and meta-tag audit are split.

### What does NOT get implemented pre-launch

- Tracking pixels for Facebook/LinkedIn/Twitter ads (not LAM's channel)
- Marketing automation (HubSpot, Marketo) integration
- Heatmap or session-recording tools (Hotjar, FullStory) — these are post-launch optimization
- Blog comment systems or community features

These are out of scope and probably never relevant for LAM's positioning.

## Part 3: Post-launch ongoing playbook

The work that compounds over time. Pre-launch foundation gets you to "discoverable." Ongoing work makes you "found often."

### Cadence framework

Each item has a target frequency and time cost. Stick to the cadence; depth beats sporadic intensity.

#### Daily (2 minutes)

- Check Google Search Console for any new errors. Specifically: indexing errors, security issues, manual actions. 99% of days nothing happens. The 1% catches issues fast.

#### Weekly (30-45 minutes)

- Review which queries are driving traffic. Search Console → Performance tab → Queries. Sort by impressions. Look for queries you weren't expecting — these often reveal new content opportunities.
- Check for new backlinks. Search Console → Links → Top linking sites. New links are positive signals.
- Skim AI engine citations. Manually search ChatGPT, Perplexity, Claude with 2-3 queries you'd expect LAM to be cited for. Track over time.

#### Monthly (3-4 hours)

- Publish one new insights article. Cadence matters more than perfection. Topics should come from actual client work, not generic SEO research. Write what you'd tell a client over coffee.
- Review one practice page for content updates. Are domain breakdowns still accurate? Are there new findings? Update with current language.
- Identify one external opportunity. A podcast to pitch. An industry publication accepting submissions. A partner directory not yet listed in. One per month, executed.

#### Quarterly (8-10 hours)

- Site-wide content audit. Read every page. Update or refresh what feels dated.
- Competitive scan. Look at 3-5 competitor websites. Steal what's good, ignore the rest.
- Search Console deep review. Pull a 90-day report. Identify top performing pages, pages with high impressions but low click-through, pages getting impressions for queries you can't actually serve well.
- Track GEO citations systematically. Use a tool like Brand24 or Mention, or manually search 10-15 queries quarterly across ChatGPT/Claude/Perplexity. Track citation rate over time.

#### Annually (1-2 days)

- Full SEO/GEO strategy review. Where did the site grow? Where is it stuck? What's next year's content focus? What's next year's third-party-presence goal?
- Consider whether you need a specialist. If LAM has grown past mid-market, or you've identified a specific competitive search niche where you're stuck, hire a specialist. Until then, save the money.

### What to track and what to ignore

Most SEO advice is about tracking everything. That's wrong for a firm LAM's size. Track few things, deeply. Ignore the rest.

**Track:**

1. Organic search traffic to the website (Google Analytics 4 → Acquisition → Traffic acquisition → Organic Search). The number that matters: month-over-month growth trend. Not absolute numbers.
2. Top 10 search queries driving traffic (Search Console). The query mix tells you what your site is actually known for.
3. Pages with rising impressions (Search Console). Pages getting more impressions month over month are gaining traction. Reinforce them.
4. Citation rate in AI engines for 10-15 target queries you check quarterly. Track over time.
5. Inbound contact form submissions that mention "found you online" or similar. The ultimate metric — discovery turning into pipeline.

**Ignore:**

- Domain Authority scores (proprietary to vendors who sell SEO tools, not actually meaningful)
- Keyword rankings for non-strategic queries
- Bounce rate, time on page, and other engagement metrics (mostly noise)
- Backlink count alone (quality matters far more than count)
- "SEO score" tools that grade your site 0-100

### Content principles that make SEO/GEO work for advisory firms

LAM-specific principles distilled from what works for premium B2B advisory positioning:

1. Write what only you can write. Generic best-practices content gets paraphrased and ignored by AI engines. Operational experience is what's distinctive.

2. Specifics beat generalities every time. "POTS lines at $1,000/month" beats "POTS lines are expensive." "30/10/2 metric" beats "we have repeat clients."

3. Don't chase every keyword. Most SEO consultancies push toward keyword-driven content (write 50 blog posts targeting 50 keywords). For premium positioning, this dilutes the brand. Quality over quantity.

4. Make claims you can defend. Every specific claim (numbers, percentages, sample sizes) increases citation likelihood — but only if defensible.

5. Update existing content rather than always adding new. Search engines and AI engines both reward fresh content, but freshness can come from updating an existing high-performing page with new examples and current data.

6. Internal linking is free SEO. Every insights article should link to relevant practice pages. Every practice page should link to relevant insights.

7. Don't optimize copy for AI engines specifically. People who write awkward Q&A sections explicitly designed to be cited by ChatGPT produce robotic content that gets ignored. Write for humans first; AI engines preferentially cite content humans actually engage with.

### What to outsource and what to do yourself

**Do yourself:**
- Insights content writing (your voice is the asset)
- Quarterly content audits
- Monthly review of Search Console and analytics
- AI engine citation checks
- Strategic decisions about content focus

**Consider outsourcing (only if you scale past current size):**
- Technical SEO audits (deep crawl analysis, schema validation, page speed optimization)
- Backlink outreach (industry publication submissions, podcast pitching)
- Specific competitive niche analysis if you decide to compete in a contested search territory

**Don't outsource even if budget allows:**
- Anything that touches the brand voice
- Content strategy direction
- Decisions about what's worth writing about
- Anything that requires understanding actual client work

### A note on AI engines specifically

You're going to hear a lot of noise about "GEO consultants" and "ChatGPT optimization" over the next 12-24 months. Most of it is repackaged SEO with new buzzwords.

The actual GEO discipline is younger and less mature than people pretend. The tactics that work are mostly the same tactics that work for SEO done well: distinctive content, structured data, clear claims, third-party mentions, technical foundation.

What's genuinely different:
- Citation rate is the new ranking
- Distinctive language matters more than keyword density
- Specific numbers and named frameworks get cited disproportionately
- The discoverability layer for B2B research is bifurcating, so monitoring both channels matters

But you don't need a specialist to do this. The work is just doing your work well. LAM's actual offering and positioning are GEO-friendly by design.

### The end-state goal

If this is done well, in 12 months expect:

- Steady month-over-month organic search traffic growth
- LAM cited in AI engine answers when someone asks about MSP relationship reviews, mid-market IT advisory, telecom billing audits, AI readiness assessments
- Inbound leads who say "I found you through [search engine] / [AI engine]"
- Specific search queries you're known for, that you can name
- A growing library of insights articles compounding authority
- Third-party mentions in industry publications

If those things don't happen in 12 months, adjust. But the foundation is durable. You're not chasing trends. You're building infrastructure.
