function initScrollAnimation(container) {
  if (!container) return;

  const targets = container.querySelectorAll('.js-fade');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '0px',
    }
  );

  targets.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) {
      // rAF で初期描画後に付与し、transition が確実に発火するようにする
      requestAnimationFrame(() => el.classList.add('is-visible'));
    } else {
      observer.observe(el);
    }
  });
}

export { initScrollAnimation };
