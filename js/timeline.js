export function initTimeline(container) {
  const dots = container.querySelectorAll('.js-timeline-dot');
  dots.forEach((dot, i) => {
    dot.style.animationDelay = `${i * 0.4}s`;
  });
}
