// api/contact.js
// Vercel Serverless Function: receives contact form submissions
// from /contact/ and emails them to LAM via Resend.
//
// Environment variables required (set in Vercel dashboard):
//   RESEND_API_KEY  - API key from https://resend.com
//   CONTACT_TO      - (optional) recipient email; defaults to info@lamtechnology.com
//   CONTACT_FROM    - (optional) verified sender; defaults to forms@lamtechnology.com
//
// Anti-spam layers (all drop silently with a 200 so bots learn nothing;
// each drop logs a reason visible in Vercel runtime logs):
//   1. honeypot   - hidden "website" field filled
//   2. origin     - request from an off-site origin
//   3. html       - HTML markup / anchor tags in message
//   4. url        - plain-text URLs incl. bare shorteners (is.gd/x, psee.io/x)
//   5. keyword    - cold-outreach + casino template phrases (from live samples)
//   6. mojibake   - broken-encoding artifacts from spam kits
//   7. company    - Company field is exactly "google" (bot tell)
//   8. botid      - Vercel BotID basic check classifies the session as a bot
//                   (fails open: a BotID error is logged and the message continues)

import { Resend } from 'resend';
import { checkBotId } from 'botid/server';

const TO = process.env.CONTACT_TO || 'info@lamtechnology.com';
const FROM = process.env.CONTACT_FROM || 'LAM Website <forms@lamtechnology.com>';

function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
}

function silentDrop(res, reason) {
    console.warn('contact-drop:', reason);
    return res.status(200).json({ ok: true });
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
          res.setHeader('Allow', 'POST');
          return res.status(405).json({ error: 'Method not allowed' });
    }

  if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set');
        return res.status(500).json({ error: 'Email service not configured' });
  }

  let body = req.body;
    if (typeof body === 'string') {
          try { body = JSON.parse(body); } catch (_) { body = {}; }
    }
    body = body || {};

  const name = (body.name || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const company = (body.company || '').toString().trim();
    const phone = (body.phone || '').toString().trim();
    const message = (body.message || '').toString().trim();
    const honeypot = (body.website || '').toString().trim();

  // Layer 1 - honeypot: silently succeed if a bot filled the hidden field
  if (honeypot) {
        return silentDrop(res, 'honeypot');
  }

  // Layer 2 - origin allow-list: silently succeed if the request originates
  // off-site. Missing/empty origins pass (some privacy browsers strip the
  // header); the content checks below catch those.
  // Preview deployments also accept their own deployment and branch URLs so
  // the form can be tested end to end. VERCEL_ENV is "production" on the live
  // site, so the production allow-list is unchanged.
  const origin = req.headers.origin || req.headers.referer || '';
  const previewOrigins = process.env.VERCEL_ENV === 'preview'
        ? [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL].filter(Boolean).map((h) => 'https://' + h)
        : [];
  const allowedOrigins = ['https://lamtechnology.com', 'https://www.lamtechnology.com', ...previewOrigins];
    if (origin && !allowedOrigins.some((a) => origin.startsWith(a))) {
          return silentDrop(res, 'origin');
    }

  // Layer 3 - HTML/links in the message: real prospects submit plain text.
  if (/<a[\s>]|href\s*=|<\/?(b|strong|i|em|p|div|span|script)\b/i.test(message)) {
        return silentDrop(res, 'html');
  }

  // Layer 4 - plain-text URLs. Genuine inquiries describe a problem; they
  // don't paste links. Catches protocol URLs, www. links, AND bare
  // shortener-style domains with a path (is.gd/OVeqG6, psee.io/8rke7y,
  // plu.sh/tb3m4) that carry no protocol at all.
  if (/\bhttps?:\/\/\S|\bwww\.[a-z0-9-]|\b[a-z0-9][a-z0-9-]{0,62}\.[a-z]{2,10}\/[a-z0-9]/i.test(message)) {
        return silentDrop(res, 'url');
  }

  // Layer 5 - template keyword screen. High-precision phrases taken from
  // live spam samples: web-design cold outreach + casino/sweepstakes kits +
  // the fake "ADNOC vendor registration" advance-fee scam (Oct 2026). Plain
  // "vendor questionnaire" is deliberately NOT listed: real cybersecurity
  // prospects ask about vendor security questionnaires.
  if (/\b(website design|web design|web development services|seo services|search engine optimi[sz]|backlinks?|google ranking|digital marketing|portfolio and pricing|spin to win|last spin|jackpot|casino|start winning|claim your prize|contractor partnership registration|vendor\/contractor partnership|vendor questionnaire and eoi)\b/i.test(message)) {
        return silentDrop(res, 'keyword');
  }

  // Layer 6 - mojibake: double-encoded punctuation artifacts (e.g. Cyrillic
  // "вЂ" or "â€" sequences) appear in spam-kit templates,
  // never in text typed by a real person on a real keyboard.
  if (/вЂ|â€/.test(message + name + company)) {
        return silentDrop(res, 'mojibake');
  }

  // Layer 7 - fake company: both observed spam families (casino kits and the
  // grief/suicide content-spam) set Company to exactly "google". No real
  // prospect writes that when contacting a Fort Worth IT advisory. Exact
  // match only, so a genuine "Google Cloud reseller" note in a longer
  // company string still gets through.
  if (company.trim().toLowerCase() === 'google') {
        return silentDrop(res, 'company');
  }

  // Layer 8 - Vercel BotID, basic check level (must match the contact page).
  // Runs last so the trial shows what it catches that layers 1-7 miss, and so
  // only submissions that passed every content layer cost a check. Fails open:
  // if BotID itself errors (service outage, OIDC disabled) the message goes
  // through, because a silent drop during an outage would lose real leads.
  // BOTID_DEV_BYPASS (HUMAN | BAD-BOT | GOOD-BOT) is honored only when
  // NODE_ENV is not "production", i.e. local tests; deployments ignore it.
  try {
        const verification = await checkBotId({
                advancedOptions: { checkLevel: 'basic', headers: req.headers },
                developmentOptions: { bypass: process.env.BOTID_DEV_BYPASS },
        });
        if (verification.isBot) {
                return silentDrop(res, 'botid');
        }
  } catch (err) {
        console.error('contact-botid-error:', err && err.message);
  }

  if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
  }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return res.status(400).json({ error: 'Invalid email address' });
    }
    if (message.length > 5000 || name.length > 200) {
          return res.status(400).json({ error: 'Field too long' });
    }

  const subject = `New contact from ${name}${company ? ' — ' + company : ''}`;

  const text = [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        phone ? `Phone: ${phone}` : null,
        '',
        'Message:',
        message,
      ].filter(Boolean).join('\n');

  const html = `
    <div style="font-family:Segoe UI,system-ui,sans-serif;color:#1a1a2e;">
        <h2 style="margin:0 0 12px;">New contact form submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                    ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
                        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
                            <p><strong>Message:</strong></p>
                                <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
                                  </div>
                                    `;

  try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
                from: FROM,
                to: TO,
                replyTo: email,
                subject,
                text,
                html,
        });
        if (error) {
                console.error('Resend error:', error);
                return res.status(502).json({ error: 'Email send failed' });
        }
        return res.status(200).json({ ok: true });
  } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Email send failed' });
  }
}
0
