// Premium Energy Holdings — shared interactions

// Scroll-entry reveals
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  if (!el.style.getPropertyValue('--index')) {
    const siblings = el.parentElement
      ? [...el.parentElement.children].filter((c) => c.classList.contains('reveal'))
      : [el];
    el.style.setProperty('--index', siblings.indexOf(el));
  }
  observer.observe(el);
});

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Mark current page in nav
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach((a) => {
  if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
});

// Hero video: guarantee silent autoplay
const heroVideo = document.querySelector('.hero video');
if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.volume = 0;
  heroVideo.play().catch(() => {});
}

// Lightbox for gallery images and framed figures
const lightboxLinks = document.querySelectorAll('a[data-lightbox]');
if (lightboxLinks.length) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML =
    '<button class="lightbox-close" type="button">Close</button>' +
    '<img alt="">' +
    '<div class="lightbox-caption"></div>';
  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector('img');
  const overlayCap = overlay.querySelector('.lightbox-caption');

  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  lightboxLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      overlayImg.src = link.getAttribute('href');
      overlayImg.alt = link.dataset.lightbox || '';
      overlayCap.textContent = link.dataset.lightbox || '';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
