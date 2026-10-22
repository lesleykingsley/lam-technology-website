/* "Where this fits" map for assessment pages and Billing Breakthrough.
   Lens list and connections mirror assets/js/lens-map.js; update both together. */
(function () {
  var root = document.getElementById('lens-nav'); if (!root) return;
  var cur = root.getAttribute('data-lens'), TM = '™';
  var L = [
    ['infrastructure', 'Infrastructure Insight', 'Infrastructure & Cloud'],
    ['cybersecurity', 'Vigilance Verification', 'Cybersecurity & Resilience'],
    ['msp', 'MSP Microscope', 'MSP'],
    ['ai-readiness', 'AI Readiness Radar', 'AI Readiness'],
    ['mobility', 'Wireless Wisdom', 'Mobility & IoT'],
    ['customer-experience', 'Experience Examination', 'Customer Experience']
  ];
  var AREAS = [
    ['infrastructure', 'cybersecurity', 'mobility', 'msp'], ['infrastructure', 'cybersecurity', 'msp'], ['infrastructure', 'cybersecurity', 'msp'],
    ['infrastructure', 'msp', 'mobility', 'customer-experience', 'cybersecurity'], ['infrastructure', 'cybersecurity', 'mobility'],
    ['infrastructure', 'mobility', 'cybersecurity', 'ai-readiness'], ['infrastructure', 'msp', 'cybersecurity'], ['infrastructure', 'msp', 'ai-readiness'],
    ['cybersecurity', 'ai-readiness', 'msp']
  ];
  function linked(a, b) { return AREAS.some(function (s) { return s.indexOf(a) > -1 && s.indexOf(b) > -1; }); }
  var hubOn = cur === 'hub', curName = '';
  var items = L.map(function (l) {
    var url = '/practice-areas/' + l[0] + '/';
    if (l[0] === cur) { curName = l[1] + TM; return '<li class="lnav-item"><span class="lnav-cur" aria-current="page"><b>' + l[1] + TM + '</b><small>' + l[2] + '</small></span></li>'; }
    var rel = !hubOn && linked(cur, l[0]);
    return '<li class="lnav-item' + (rel ? ' rel' : '') + '"><a href="' + url + '"' + (rel ? ' title="Connects to ' + curName + '"' : '') + '><b>' + l[1] + TM + '</b><small>' + l[2] + '</small></a></li>';
  }).join('');
  var hub = hubOn
    ? '<span class="lnav-hub" aria-current="page"><strong>Billing Breakthrough' + TM + ' + Contract Clarifier' + TM + '</strong><span>You are here. Every engagement starts with this baseline.</span></span>'
    : '<a class="lnav-hub" href="/billing-breakthrough/"><strong>Billing Breakthrough' + TM + ' + Contract Clarifier' + TM + '</strong><span>Every engagement starts here</span></a>';
  var cap = hubOn ? 'Then the work goes where you need it. Pick a lens.' : '<i></i>Gold dot: connects to ' + (L.filter(function (l) { return l[0] === cur; })[0] || [0, ''])[1] + TM + '.';
  root.innerHTML = hub + '<ul class="lnav-row">' + items + '</ul><p class="lnav-cap">' + cap + '</p>';
})();
