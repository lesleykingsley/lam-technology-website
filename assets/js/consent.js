/* LAM Technology consent banner with Google Consent Mode v2 + footer link injection */
(function () {
  'use strict';

  var STORAGE_KEY = 'lam_consent';
  var STORAGE_VERSION = '1';

  // Initialize gtag and set default-deny consent BEFORE the GA script fires.
  // This file must load BEFORE the GA gtag.js script in <head>.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var v = JSON.parse(raw);
      if (v && v.v === STORAGE_VERSION) return v;
      return null;
    } catch (e) { return null; }
  }

  function saveConsent(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        v: STORAGE_VERSION,
        analytics: !!state.analytics,
        ts: Date.now()
      }));
    } catch (e) {}
  }

  function applyConsent(state) {
    gtag('consent', 'update', {
      analytics_storage: state.analytics ? 'granted' : 'denied'
    });
  }

  // If user has previously chosen, apply silently and don't show banner.
  var existing = readConsent();
  if (existing) applyConsent(existing);

  function injectStyles() {
    if (document.getElementById('lam-cc-styles')) return;
    var s = document.createElement('style');
    s.id = 'lam-cc-styles';
    s.textContent = [
      '#lam-cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;background:#0b0e15;color:#e6e8ee;border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:20px 22px;box-shadow:0 20px 60px rgba(0,0,0,.45);font-family:inherit;font-size:14px;line-height:1.55}',
      '#lam-cc h2{margin:0 0 6px 0;font-size:15px;font-weight:700;letter-spacing:.01em}',
      '#lam-cc p{margin:0 0 14px 0;color:rgba(230,232,238,.78)}',
      '#lam-cc a{color:#d4b66a;text-decoration:underline}',
      '#lam-cc .lam-cc-row{display:flex;flex-wrap:wrap;gap:8px}',
      '#lam-cc button{appearance:none;border:1px solid rgba(255,255,255,.18);background:transparent;color:#e6e8ee;border-radius:100px;padding:8px 16px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}',
      '#lam-cc button.primary{background:#d4b66a;border-color:#d4b66a;color:#0b0e15}',
      '#lam-cc button:hover{filter:brightness(1.08)}',
      '@media(max-width:520px){#lam-cc{left:8px;right:8px;bottom:8px;padding:16px}}',
      '.lam-legal-links{display:flex;justify-content:center;gap:18px;flex-wrap:wrap;padding:18px 16px 24px;font-size:13px;color:rgba(255,255,255,.55);text-align:center}',
      '.lam-legal-links a{color:rgba(255,255,255,.7);text-decoration:none}',
      '.lam-legal-links a:hover{color:#d4b66a;text-decoration:underline}'
    ].join('\n');
    document.head.appendChild(s);
  }

  function injectFooterLinks() {
    if (document.querySelector('.lam-legal-links')) return;
    // If existing footer already has Privacy and Cookies links, skip.
    var existingPriv = document.querySelector('a[href="/privacy/"]');
    var existingCk = document.querySelector('a[href="/cookies/"]');
    if (existingPriv && existingCk) return;

    var row = document.createElement('div');
    row.className = 'lam-legal-links';
    row.innerHTML = [
      '<a href="/privacy/">Privacy Policy</a>',
      '<a href="/cookies/">Cookies Notice</a>',
      '<a href="#" id="lam-cc-reopen-link">Cookie preferences</a>'
    ].join('');

    var footer = document.querySelector('footer');
    if (footer && footer.parentNode) {
      footer.parentNode.insertBefore(row, footer.nextSibling);
    } else {
      document.body.appendChild(row);
    }

    var reopen = document.getElementById('lam-cc-reopen-link');
    if (reopen) reopen.addEventListener('click', function (e) {
      e.preventDefault();
      try { localStorage.removeItem(STORAGE_KEY); } catch (err) {}
      showBanner();
    });
  }

  function showBanner() {
    if (document.getElementById('lam-cc')) return;
    injectStyles();
    var box = document.createElement('div');
    box.id = 'lam-cc';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-live', 'polite');
    box.setAttribute('aria-label', 'Cookie consent');
    box.innerHTML = [
      '<h2>We value your privacy</h2>',
      '<p>We use a small number of cookies to make this site work and, with your permission, to understand how it is used. See our <a href="/privacy/">Privacy Policy</a> and <a href="/cookies/">Cookies Notice</a>.</p>',
      '<div class="lam-cc-row">',
        '<button type="button" class="primary" data-act="accept">Accept all</button>',
        '<button type="button" data-act="decline">Decline optional</button>',
      '</div>'
    ].join('');
    document.body.appendChild(box);
    box.addEventListener('click', function (e) {
      var act = e.target && e.target.getAttribute('data-act');
      if (!act) return;
      var state = { analytics: act === 'accept' };
      applyConsent(state);
      saveConsent(state);
      box.parentNode && box.parentNode.removeChild(box);
    });
  }

  // Expose so the cookies page can re-open the banner.
  window.__lamShowConsent = showBanner;

  function onReady() {
    injectStyles();
    injectFooterLinks();
    if (!existing) showBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
