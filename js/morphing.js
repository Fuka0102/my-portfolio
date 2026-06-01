const MORPH_CONFIGS = [
  {
    color: '#5BC4E8',
    from: 'M8,30 C5,10 20,2 45,4 C70,6 96,8 98,38 C100,65 92,95 60,97 C28,99 5,90 4,65 C3,48 11,50 8,30 Z',
    to:   'M5,28 C8,8 25,0 50,3 C75,6 98,15 97,42 C96,68 85,98 55,97 C25,96 2,85 3,58 C4,38 2,48 5,28 Z',
  },
  {
    color: '#FFD166',
    from: 'M10,25 C12,5 30,0 55,3 C80,6 98,20 97,48 C96,72 80,98 50,97 C20,96 3,80 4,55 C5,35 8,45 10,25 Z',
    to:   'M7,22 C10,3 32,1 58,5 C82,9 100,22 98,50 C96,75 78,100 48,97 C18,94 1,75 3,50 C5,30 4,42 7,22 Z',
  },
  {
    color: '#7ED957',
    from: 'M12,28 C10,8 28,1 52,4 C76,7 98,18 97,45 C96,70 82,98 52,97 C22,96 3,82 4,56 C5,36 14,48 12,28 Z',
    to:   'M8,24 C11,4 30,0 55,4 C80,8 99,20 98,48 C97,73 83,99 53,97 C23,95 2,78 3,52 C4,32 5,44 8,24 Z',
  },
];

function extractNumbers(pathStr) {
  return pathStr.match(/-?[\d.]+/g).map(Number);
}

function buildPath(template, numbers) {
  let i = 0;
  return template.replace(/-?[\d.]+/g, () => numbers[i++].toFixed(2));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function initMorphing(cards) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cards.forEach((card, i) => {
    const svgEl = card.querySelector('.js-morph-svg');
    if (!svgEl) return;

    const cfg = MORPH_CONFIGS[i % MORPH_CONFIGS.length];
    const duration = (4 + i * 0.8) * 1000;

    svgEl.setAttribute('viewBox', '0 0 100 100');
    svgEl.setAttribute('preserveAspectRatio', 'none');
    svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('fill', cfg.color);
    pathEl.setAttribute('opacity', '0.75');
    pathEl.setAttribute('d', cfg.from);
    svgEl.appendChild(pathEl);

    const fromNums = extractNumbers(cfg.from);
    const toNums = extractNumbers(cfg.to);
    let startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % (duration * 2);
      const t = elapsed < duration
        ? elapsed / duration
        : (duration * 2 - elapsed) / duration;

      const nums = fromNums.map((from, j) => lerp(from, toNums[j], easeInOut(t)));
      pathEl.setAttribute('d', buildPath(cfg.from, nums));

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  });
}
