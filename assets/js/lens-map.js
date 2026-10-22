/* Interactive map of how the six lenses connect. Used on Home and Practice Areas. */
(function () {
  var DRAFT = false; // Lesley approved shipping the current connections on 10/21; set true to show the review banner
  var TM = '\u2122';
  var LENSES = [
    { id: 'infrastructure', a: 'Infrastructure Insight', n: 'Infrastructure & Cloud', s: 'Infrastructure', q: 'Is my infrastructure helping the business, or holding it back?', u: '/practice-areas/infrastructure/' },
    { id: 'cybersecurity', a: 'Vigilance Verification', n: 'Cybersecurity & Resilience', s: 'Cybersecurity', q: 'Am I secure where it matters, or just checking boxes?', u: '/practice-areas/cybersecurity/' },
    { id: 'msp', a: 'MSP Microscope', n: 'MSP', s: 'MSP', q: 'Is my MSP managing my environment, or just managing tickets?', u: '/practice-areas/msp/' },
    { id: 'ai-readiness', a: 'AI Readiness Radar', n: 'AI Readiness', s: 'AI Readiness', q: 'Are we actually positioned for AI, or just being asked to act like it?', u: '/practice-areas/ai-readiness/' },
    { id: 'mobility', a: 'Wireless Wisdom', n: 'Mobility & IoT', s: 'Mobility & IoT', q: 'What is wireless really costing us, in dollars and in capability?', u: '/practice-areas/mobility/' },
    { id: 'customer-experience', a: 'Experience Examination', n: 'Customer Experience', s: 'Experience', q: 'Where is our customer experience actually breaking?', u: '/practice-areas/customer-experience/' }
  ];
  // Areas of review from the working taxonomy, with names removed. Each entry lists the lenses
  // that area reaches. The eight Infrastructure areas also belong to Infrastructure Insight.
  var AREAS = [
    ['infrastructure', 'cybersecurity', 'mobility', 'msp'],
    ['infrastructure', 'cybersecurity', 'msp'],
    ['infrastructure', 'cybersecurity', 'msp'],
    ['infrastructure', 'msp', 'mobility', 'customer-experience', 'cybersecurity'],
    ['infrastructure', 'cybersecurity', 'mobility'],
    ['infrastructure', 'mobility', 'cybersecurity', 'ai-readiness'],
    ['infrastructure', 'msp', 'cybersecurity'],
    ['infrastructure', 'msp', 'ai-readiness'],
    ['cybersecurity', 'ai-readiness', 'msp'] // cross-cutting area with no single owner
  ];
  var W = {};
  AREAS.forEach(function (set) {
    for (var i = 0; i < set.length; i++) for (var j = i + 1; j < set.length; j++) {
      var k = [set[i], set[j]].sort().join('|'); W[k] = (W[k] || 0) + 1;
    }
  });
  function weight(a, b) { return W[[a, b].sort().join('|')] || 0; }

  var NS = 'http://www.w3.org/2000/svg', CX = 340, CY = 300, RX = 255, RY = 215, NW = 176, NH = 58;
  function el(t, at) { var e = document.createElementNS(NS, t); for (var k in at) e.setAttribute(k, at[k]); return e; }
  var svg = document.getElementById('pam-svg'), panel = document.getElementById('pam-panel'), chips = document.getElementById('pam-chips');
  var mini = !!(svg && svg.hasAttribute('data-mini')), cap = document.getElementById('pam-cap'), CUR = svg && svg.getAttribute('data-current');
  if (!svg || (!panel && !mini)) return;
  if (mini) { CX = 340; CY = 220; RX = 255; RY = 160; NW = 210; NH = 54; }
  if (DRAFT && document.getElementById('pam-draft')) document.getElementById('pam-draft').hidden = false;

  var pos = {};
  LENSES.forEach(function (l, i) {
    var ang = -Math.PI / 2 + i * 2 * Math.PI / LENSES.length;
    pos[l.id] = [CX + RX * Math.cos(ang), CY + RY * Math.sin(ang)];
  });

  var gS = el('g'), gL = el('g'), gN = el('g'); svg.appendChild(el('ellipse', { class: 'ring', cx: CX, cy: CY, rx: RX, ry: RY })); svg.appendChild(el('ellipse', { class: 'ring', cx: CX, cy: CY, rx: RX * 0.5, ry: RY * 0.5 })); svg.appendChild(gS); svg.appendChild(gL); svg.appendChild(gN);
  var links = [];
  var spokes = {};
  LENSES.forEach(function (l) { var p = pos[l.id]; spokes[l.id] = el('path', { class: 'spoke', d: 'M' + CX + ',' + CY + ' L' + p[0] + ',' + p[1] }); gS.appendChild(spokes[l.id]); });
  for (var i = 0; i < LENSES.length; i++) for (var j = i + 1; j < LENSES.length; j++) {
    var w = weight(LENSES[i].id, LENSES[j].id); if (!w) continue;
    var a = pos[LENSES[i].id], b = pos[LENSES[j].id], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    var cx = mx * 0.6 + CX * 0.4, cy = my * 0.6 + CY * 0.4;
    var cls = 'link ' + (w >= 5 ? 'w3' : w >= 3 ? 'w2' : 'w1');
    var path = el('path', { class: cls, pathLength: '1', style: 'transition-delay:' + (0.25 + links.length * 0.07) + 's', d: 'M' + a[0] + ',' + a[1] + ' Q' + cx + ',' + cy + ' ' + b[0] + ',' + b[1] });
    gL.appendChild(path); links.push({ a: LENSES[i].id, b: LENSES[j].id, el: path });
  }

  var nodes = {};
  function mk(id, x, y, w, h, l1, l2, cls) {
    var g = el('g', { class: cls, tabindex: '0', role: mini ? 'link' : 'button', 'aria-label': (mini ? (id === CUR ? 'You are here: ' : 'Go to ') : '') + l1 + (l2 ? ', ' + l2 : '') });
    if (!mini) g.setAttribute('aria-pressed', 'false');
    if (mini && id === CUR) g.setAttribute('aria-current', 'page');
    g.appendChild(el('rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: 6 }));
    var t1 = el('text', { x: x, y: l2 ? y - 3 : y + 6, class: 'n1' }); t1.textContent = l1; g.appendChild(t1);
    if (l2) { var t2 = el('text', { x: x, y: y + 15, class: 'n2' }); t2.textContent = l2; g.appendChild(t2); }
    g.addEventListener('click', function () { if (mini) go(id); else pick(id); });
    g.addEventListener('mouseenter', function () { preview(id, true); if (mini) say(id, true); });
    g.addEventListener('mouseleave', function () { preview(id, false); if (mini) say(id, false); });
    g.addEventListener('focus', function () { if (mini) say(id, true); });
    g.addEventListener('blur', function () { if (mini) say(id, false); });
    g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (mini) go(id); else pick(id); } });
    g.style.transitionDelay = (id === 'hub' ? 0.1 : 0.5 + Object.keys(nodes).length * 0.08) + 's'; gN.appendChild(g); nodes[id] = g; return g;
  }
  mk('hub', CX, CY, mini ? 230 : 200, mini ? 70 : 76, 'Billing Breakthrough' + TM, 'Contract Clarifier' + TM, 'hub');
  // hub label sits on two lines inside the hub; use display face via CSS class
  LENSES.forEach(function (l) { var p = pos[l.id]; mk(l.id, p[0], p[1], NW, NH, mini ? l.s : l.a + TM, mini ? '' : l.n, 'node'); });

  if (!mini) LENSES.forEach(function (l) {
    var b = document.createElement('button'); b.className = 'pam-chip'; b.type = 'button'; b.setAttribute('aria-pressed', 'false');
    b.dataset.id = l.id; b.textContent = l.a + TM; b.addEventListener('click', function () { pick(l.id); }); chips.appendChild(b);
  });
  var hubChip = mini ? null : document.createElement('button');
  if (!mini) { hubChip.setAttribute('aria-pressed', 'false'); hubChip.className = 'pam-chip'; hubChip.type = 'button'; hubChip.dataset.id = 'hub'; hubChip.textContent = 'Billing Breakthrough' + TM + ' + Contract Clarifier' + TM;
  hubChip.addEventListener('click', function () { pick('hub'); }); chips.insertBefore(hubChip, chips.firstChild); }

  function preview(id, on) {
    if (id === 'hub') return;
    links.forEach(function (lk) { lk.el.classList.toggle('hov', on && (lk.a === id || lk.b === id)); });
  }
  function byId(id) { return LENSES.filter(function (l) { return l.id === id; })[0]; }
  function pick(id) {
    var rel = [];
    if (id !== 'hub' && id !== null) LENSES.forEach(function (l) { if (l.id !== id && weight(id, l.id)) rel.push(l.id); });
    Object.keys(nodes).forEach(function (k) {
      var n = nodes[k], on = k === id, isRel = rel.indexOf(k) > -1;
      n.classList.toggle('sel', on); n.classList.toggle('rel', isRel);
      n.classList.toggle('dim', id && id !== 'hub' && !on && !isRel);
      if (!mini) n.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    links.forEach(function (lk) {
      var lit = id && id !== 'hub' && (lk.a === id || lk.b === id);
      lk.el.classList.toggle('lit', !!lit); lk.el.classList.toggle('dim', !!(id && id !== 'hub' && !lit));
    });
    LENSES.forEach(function (l) { spokes[l.id].classList.toggle('gold', id === 'hub' || id === l.id); });
    if (!mini) Array.prototype.forEach.call(chips.children, function (c) { c.setAttribute('aria-pressed', c.dataset.id === id ? 'true' : 'false'); });
    if (!mini) render(id, rel); else say(null, false);
  }
  function go(id) { if (id === CUR) return; location.href = id === 'hub' ? '/billing-breakthrough/' : byId(id).u; }
  function nm(id) { return id === 'hub' ? 'Billing Breakthrough' + TM + ' + Contract Clarifier' + TM : byId(id).a + TM; }
  function say(id, hover) {
    if (!cap) return;
    cap.textContent = hover && id !== CUR ? 'Go to ' + nm(id) : 'You are here: ' + nm(CUR) + '. Select another lens to go there.';
  }
  function render(id, rel) {
    var h = '';
    if (id === 'hub') {
      h = '<h3 class="pam-ptitle">Billing Breakthrough' + TM + ' and Contract Clarifier' + TM + '</h3>' +
          '<p class="pam-psub">Where every engagement starts</p>' +
          '<p class="pam-ptext">What you are paying for, and when you can change it. All six lenses build on this baseline.</p>' +
          '<p class="pam-ph">Not ready for the full engagement?</p>' +
          '<p class="pam-ptext" style="margin-bottom: 16px;">The 5-minute Self-Check gives you a free, directional read on whether material savings are sitting in your current bills.</p>' +
          '<p style="margin: 0 0 24px;"><a class="btn btn-primary" href="/billing-breakthrough/self-check/">Take the 5-minute Self-Check <span class="btn-arrow">&rarr;</span></a></p>' +
          '<a class="pam-plink" href="/billing-breakthrough/">Explore Billing Breakthrough</a>';
    } else if (id) {
      var l = byId(id);
      h = '<h3 class="pam-ptitle">' + l.a + TM + '</h3><p class="pam-psub">' + l.n + '</p>' +
          '<p class="pam-pq">\u201C' + l.q + '\u201D</p>' +
          '<button type="button" class="pam-bb" data-go="hub">Starts with Billing Breakthrough' + TM + ' + Contract Clarifier' + TM + '</button>' +
          '<p class="pam-ph">Also connects to</p><ul class="pam-rel">' +
          rel.map(function (r) { return '<li><button type="button" data-go="' + r + '">' + byId(r).a + TM + '</button></li>'; }).join('') + '</ul>' +
          '<a class="pam-plink" href="' + l.u + '">Explore ' + l.a + TM + '</a>';
    } else {
      h = '<h3 class="pam-ptitle">Pick a lens</h3><p class="pam-ptext">Each lens stands on its own. Select one to see where it overlaps with the others.</p>';
    }
    panel.innerHTML = h;
  }
  if (panel) panel.addEventListener('click', function (e) { var b = e.target.closest('[data-go]'); if (b) pick(b.dataset.go); });
  if (!mini) svg.addEventListener('click', function (e) { if (!e.target.closest('.node, .hub')) pick(null); });
  pick(mini ? CUR : null);
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Entrance delays must not linger, or they would also delay the highlight transitions.
  function clearDelays() { Object.keys(nodes).forEach(function (k) { nodes[k].style.transitionDelay = ''; }); links.forEach(function (lk) { lk.el.style.transitionDelay = ''; }); }
  if (reduce || !('IntersectionObserver' in window)) { svg.classList.add('in'); clearDelays(); }
  else { new IntersectionObserver(function (en, ob) { if (en[0].isIntersecting) { svg.classList.add('in'); ob.disconnect(); setTimeout(clearDelays, 2400); } }, { threshold: 0.25 }).observe(svg); }
})();
