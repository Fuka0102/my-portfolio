const MORPH_PATHS = [
  {
    from: 'M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z',
    to:   'M50,5 C80,15 95,35 85,65 C75,90 25,90 15,65 C5,35 20,15 50,5 Z',
  },
  {
    from: 'M50,15 L85,35 L85,65 L50,85 L15,65 L15,35 Z',
    to:   'M50,8 L90,30 L80,75 L50,92 L20,75 L10,30 Z',
  },
  {
    from: 'M20,50 C20,30 35,15 50,15 C65,15 80,30 80,50 C80,70 65,85 50,85 C35,85 20,70 20,50 Z',
    to:   'M15,40 C20,20 40,10 60,15 C80,20 88,45 80,65 C72,85 45,88 28,78 C11,68 10,60 15,40 Z',
  },
];

const MORPH_COLORS = ['#5BC4E8', '#FF8C42', '#9B6DFF'];

function initMorphing(cards) {
  cards.forEach((card, i) => {
    const svgEl = card.querySelector('.js-morph-svg');
    if (!svgEl) return;

    const paths = MORPH_PATHS[i % MORPH_PATHS.length];
    const color = MORPH_COLORS[i % MORPH_COLORS.length];
    const duration = 4 + i * 0.8;

    svgEl.setAttribute('viewBox', '0 0 100 100');
    svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('fill', color);
    pathEl.setAttribute('opacity', '0.35');

    const styleId = `morph-style-${i}`;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes morph${i} {
        from { d: path("${paths.from}"); }
        to   { d: path("${paths.to}"); }
      }
      #morph-path-${i} {
        animation: morph${i} ${duration}s ease-in-out infinite alternate;
        will-change: d;
      }
    `;
    document.head.appendChild(style);

    pathEl.id = `morph-path-${i}`;
    pathEl.setAttribute('d', paths.from);
    svgEl.appendChild(pathEl);
  });
}
