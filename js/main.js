import { initMetaball } from './metaball.js';
import { initMorphing } from './morphing.js';
import { initTimeline } from './timeline.js';
import { initScrollAnimation } from './scroll-animation.js';

function initHeader() {
  const header = document.querySelector('.js-header');
  if (!header) return;

  const isSp = () => window.innerWidth < 768;

  let scrollTimer = null;
  let lastScrollY = window.scrollY;

  const hero = document.querySelector('.js-hero');
  const heroBottom = () => hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;

  function updateHeaderVisibility() {
    if (!isSp()) {
      header.classList.remove('is-hidden');
      return;
    }

    const pastHero = window.scrollY > heroBottom() - 80;
    if (!pastHero) {
      header.classList.remove('is-hidden');
      return;
    }

    const isScrolling = lastScrollY !== window.scrollY;
    lastScrollY = window.scrollY;

    if (isScrolling) {
      header.classList.add('is-hidden');
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        header.classList.remove('is-hidden');
      }, 300);
    }
  }

  window.addEventListener('scroll', updateHeaderVisibility, { passive: true });
  window.addEventListener('resize', updateHeaderVisibility);
  updateHeaderVisibility();
}

function initAll() {
  initHeader();

  const metaballCanvas = document.querySelector('.js-metaball-canvas');
  const heroSection    = document.querySelector('.js-hero');
  if (metaballCanvas && heroSection) initMetaball(metaballCanvas, heroSection);

  const contactCanvas  = document.querySelector('.js-contact-canvas');
  const contactSection = contactCanvas ? contactCanvas.closest('section') : null;
  if (contactCanvas && contactSection) initMetaball(contactCanvas, contactSection);

  const worksCanvas = document.querySelector('.js-works-canvas');
  if (worksCanvas) {
    const viewportProxy = {
      get offsetWidth()  { return window.innerWidth; },
      get offsetHeight() { return window.innerHeight; },
    };
    initMetaball(worksCanvas, viewportProxy);
  }

  const morphCards = document.querySelectorAll('.js-morph-card');
  if (morphCards.length) initMorphing(Array.from(morphCards));

  const timelineContainer = document.querySelector('.js-timeline');
  if (timelineContainer) initTimeline(timelineContainer);

  initScrollAnimation(document.body);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
