export function initMetaball(canvas, container) {
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  resize();
  canvas.style.opacity = '1';
  window.addEventListener('resize', resize);

  const blobs = [
    { x: 160,  y: 110,  r: 90,  vx: 0.28,  vy: 0.18  },
    { x: 680,  y: 80,   r: 72,  vx: -0.22, vy: 0.24  },
    { x: 80,   y: 380,  r: 55,  vx: 0.34,  vy: -0.15 },
    { x: 420,  y: 480,  r: 50,  vx: -0.18, vy: -0.28 },
    { x: 760,  y: 420,  r: 65,  vx: -0.26, vy: 0.20  },
    { x: 280,  y: 220,  r: 40,  vx: 0.42,  vy: 0.30  },
    { x: 580,  y: 260,  r: 45,  vx: -0.30, vy: -0.22 },
    { x: 480,  y: 100,  r: 35,  vx: 0.20,  vy: 0.36  },
  ];

  const MAX_SPEED = 0.55;
  const NOISE_AMP = 0.014;

  const offOuter  = document.createElement('canvas');
  const offOutCtx = offOuter.getContext('2d');
  const offscreen = document.createElement('canvas');
  const offCtx    = offscreen.getContext('2d');
  const tmpOuter  = document.createElement('canvas');
  const tmpOutCtx = tmpOuter.getContext('2d');
  const tmp       = document.createElement('canvas');
  const tmpCtx    = tmp.getContext('2d');

  function syncSize(c, W, H) {
    if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
  }

  function draw() {
    const W = canvas.width, H = canvas.height;
    syncSize(offOuter, W, H);
    syncSize(offscreen, W, H);
    syncSize(tmpOuter, W, H);
    syncSize(tmp, W, H);

    ctx.clearRect(0, 0, W, H);

    // 外側リング（薄い青・大きめ半径）
    offOutCtx.clearRect(0, 0, W, H);
    for (const b of blobs) {
      const g = offOutCtx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 1.72);
      g.addColorStop(0,   'rgba(255,255,255,1)');
      g.addColorStop(0.5, 'rgba(255,255,255,1)');
      g.addColorStop(1,   'rgba(255,255,255,0)');
      offOutCtx.fillStyle = g;
      offOutCtx.beginPath();
      offOutCtx.arc(b.x, b.y, b.r * 1.72, 0, Math.PI * 2);
      offOutCtx.fill();
    }
    const outerData = offOutCtx.getImageData(0, 0, W, H);
    const od = outerData.data;
    for (let i = 3; i < od.length; i += 4) {
      od[i] = od[i] > 128 ? 255 : 0;
    }
    offOutCtx.putImageData(outerData, 0, 0);

    tmpOutCtx.clearRect(0, 0, W, H);
    tmpOutCtx.globalCompositeOperation = 'source-over';
    tmpOutCtx.fillStyle = 'rgba(75,184,250, 0.30)';
    tmpOutCtx.fillRect(0, 0, W, H);
    tmpOutCtx.globalCompositeOperation = 'destination-in';
    tmpOutCtx.drawImage(offOuter, 0, 0);
    ctx.drawImage(tmpOuter, 0, 0);

    // 内側本体（濃い青・通常半径）
    offCtx.clearRect(0, 0, W, H);
    for (const b of blobs) {
      const g = offCtx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 1.45);
      g.addColorStop(0,   'rgba(255,255,255,1)');
      g.addColorStop(0.6, 'rgba(255,255,255,1)');
      g.addColorStop(1,   'rgba(255,255,255,0)');
      offCtx.fillStyle = g;
      offCtx.beginPath();
      offCtx.arc(b.x, b.y, b.r * 1.45, 0, Math.PI * 2);
      offCtx.fill();
    }
    const imgData = offCtx.getImageData(0, 0, W, H);
    const data    = imgData.data;
    for (let i = 3; i < data.length; i += 4) {
      data[i] = data[i] > 128 ? 255 : 0;
    }
    offCtx.putImageData(imgData, 0, 0);

    tmpCtx.clearRect(0, 0, W, H);
    tmpCtx.globalCompositeOperation = 'source-over';
    tmpCtx.fillStyle = 'rgba(75,184,250, 0.50)';
    tmpCtx.fillRect(0, 0, W, H);
    tmpCtx.globalCompositeOperation = 'destination-in';
    tmpCtx.drawImage(offscreen, 0, 0);
    ctx.drawImage(tmp, 0, 0);
  }

  function update() {
    const W = canvas.width, H = canvas.height;
    for (const b of blobs) {
      b.vx += (Math.random() - 0.5) * NOISE_AMP;
      b.vy += (Math.random() - 0.5) * NOISE_AMP;
      const sp = Math.hypot(b.vx, b.vy);
      if (sp > MAX_SPEED) { b.vx *= MAX_SPEED / sp; b.vy *= MAX_SPEED / sp; }
      b.x += b.vx;
      b.y += b.vy;
      const m = b.r * 0.4;
      if (b.x < m)     b.vx += 0.05;
      if (b.x > W - m) b.vx -= 0.05;
      if (b.y < m)     b.vy += 0.05;
      if (b.y > H - m) b.vy -= 0.05;
    }
  }

  function loop() { update(); draw(); requestAnimationFrame(loop); }
  loop();
}
