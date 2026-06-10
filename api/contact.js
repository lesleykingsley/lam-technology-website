// api/contact.js
// Vercel Serverless Function: receives contact form submissions
// from /contact/ and emails them to LAM via Resend.
//
// Environment variables required (set in Vercel dashboard):
//   RESEND_API_KEY  - API key from https://resend.com
//   CONTACT_TO      - (optional) recipient email; defaults to info@lamtechnology.com
//   CONTACT_FROM    - (optional) verified sender; defaults to forms@lamtechnology.com

import { Resend } from 'resend';

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

  // Honeypot: silently succeed if a bot filled the hidden field
  if (honeypot) {
    return res.status(200).json({ ok: true });
  }

  // Origin allow-list: silently succeed if the request originates off-site.
  // We let missing/empty origins through (some privacy browsers strip the
  // header) and rely on the message-HTML check below to catch those.
  const origin = req.headers.origin || req.headers.referer || '';
  if (origin && !origin.startsWith('https://lamtechnology.com') && !origin.startsWith('https://www.lamtechnology.com')) {
    return res.status(200).json({ ok: true });
  }

  // Reject HTML/links in the message: real prospects submit plain text.
  // Bots sending <a href=...> link-spam get the same silent 200 as the honeypot.
  if (/<a[\s>]|href\s*=|<\/?(b|strong|i|em|p|div|span|script)\b/i.test(message)) {
    return res.status(200).json({ ok: true });
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

  const subject = `New contact from ${name}${company ? ' \u2014 ' + company : ''}`;

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
