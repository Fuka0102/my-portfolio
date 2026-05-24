function initBubbles(container) {
  const bubbles = [
    { size: 320, x: -80, y: -100, duration: 18, delay: 0 },
    { size: 200, x: 75, y: -60, duration: 22, delay: -5 },
    { size: 140, x: -40, y: 60, duration: 16, delay: -8 },
    { size: 260, x: 80, y: 70, duration: 20, delay: -12 },
    { size: 100, x: 40, y: -30, duration: 14, delay: -3 },
    { size: 180, x: -20, y: 30, duration: 25, delay: -9 },
  ];

  const isSp = window.innerWidth < 768;
  const scale = isSp ? 0.6 : 1;

  bubbles.forEach((b, i) => {
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      width: ${b.size * scale}px;
      height: ${b.size * scale}px;
      border-radius: 50%;
      background-color: #5BC4E8;
      opacity: 0.12;
      will-change: transform;
      animation: bubbleFloat${i} ${b.duration}s ease-in-out ${b.delay}s infinite alternate;
    `;

    const px = b.x >= 0 ? `${b.x}%` : 'auto';
    const pr = b.x < 0 ? `${Math.abs(b.x)}%` : 'auto';
    const pt = b.y >= 0 ? `${b.y}%` : 'auto';
    const pb = b.y < 0 ? `${Math.abs(b.y)}%` : 'auto';

    el.style.left = px;
    el.style.right = pr;
    el.style.top = pt;
    el.style.bottom = pb;

    const moveX = 20 + Math.random() * 30;
    const moveY = 20 + Math.random() * 30;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes bubbleFloat${i} {
        from { transform: translate(0, 0); }
        to { transform: translate(${moveX}px, ${moveY}px); }
      }
    `;
    document.head.appendChild(style);
    container.appendChild(el);
  });
}
