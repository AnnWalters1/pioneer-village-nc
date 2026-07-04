// Shared site behavior: icons, nav, and common scroll reveals.
lucide.createIcons();
gsap.registerPlugin(ScrollTrigger);

// Nav pill glass-on-scroll
(function () {
  const navPill = document.getElementById('nav-pill');
  const navBrand = document.getElementById('nav-brand');
  const navBrandSub = document.getElementById('nav-brand-sub');
  const navLinks = document.getElementById('nav-links');
  if (!navPill) return;

  function syncNav() {
    const scrolled = window.scrollY > 40;
    navPill.className = 'flex items-center justify-between rounded-full px-5 sm:px-6 py-3 transition-all duration-300 ' +
      (scrolled ? 'glass shadow-lg' : '');
    const lightText = scrolled ? 'text-ink' : 'text-white';
    navBrand.className = 'font-display font-bold text-lg tracking-tight ' + lightText;
    navBrandSub.className = 'font-mono text-[10px] uppercase tracking-[0.18em] ' + (scrolled ? 'text-primary-dark' : 'text-white/70');
    navLinks.className = 'hidden lg:flex items-center gap-8 font-medium text-sm ' + lightText;
  }
  window.addEventListener('scroll', syncNav);
  syncNav();

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  }
})();

// Generic scroll reveal for any element with class "reveal"
gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    y: 30, opacity: 0, duration: .7, ease: 'power3.out',
  });
});

// Grouped stagger reveal for any container with class "reveal-group" (animates direct children)
gsap.utils.toArray('.reveal-group').forEach((group) => {
  gsap.from(group.children, {
    scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    y: 30, opacity: 0, duration: .7, stagger: .1, ease: 'power3.out',
  });
});

setTimeout(() => ScrollTrigger.refresh(), 300);
