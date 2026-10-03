// Portfolio interactions: mobile menu, scroll-reveal, active nav highlighting.
// Everything is progressive enhancement — the page works fully without JS.

// --- Mobile menu ---------------------------------------------------------
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

if (hamburger && menu) {
    const setMenu = (open) => {
        menu.classList.toggle('open', open);
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    hamburger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));

    // Close the menu after choosing a section on mobile
    menu.querySelectorAll('a').forEach((link) =>
        link.addEventListener('click', () => setMenu(false))
    );
}

// --- Scroll-reveal -------------------------------------------------------
// Sections and cards fade in the first time they enter the viewport.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll(
    'section > .offer, section > .s-text, #services-grid > div, .project-card, .contact-card'
);

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    // Small stagger so grid items don't animate in unison.
    document.querySelectorAll('#services-grid, #projects-grid, #contact-grid').forEach((grid) => {
        Array.from(grid.children).forEach((child, i) => {
            child.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
        });
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('visible');
                    // Drop the stagger delay once revealed so hover effects stay snappy.
                    el.addEventListener(
                        'transitionend',
                        () => { el.style.transitionDelay = ''; },
                        { once: true }
                    );
                    revealObserver.unobserve(el);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
}

// --- Active nav link -----------------------------------------------------
// Highlights the nav link of the section currently crossing mid-viewport.
const navLinks = document.querySelectorAll('#menu .links');
const sectionByLink = new Map();

navLinks.forEach((link) => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target) sectionByLink.set(target, link);
});

if ('IntersectionObserver' in window && sectionByLink.size) {
    const spy = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const active = sectionByLink.get(entry.target);
                    navLinks.forEach((l) => l.classList.toggle('active', l === active));
                }
            });
        },
        // A thin horizontal band around the middle of the viewport.
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sectionByLink.forEach((link, section) => spy.observe(section));
}

// --- Footer year ---------------------------------------------------------
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
