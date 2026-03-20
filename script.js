const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      navLinks.forEach((link) => {
        link.setAttribute('aria-current', link.getAttribute('href') === id ? 'page' : 'false');
      });
    });
  },
  { threshold: 0.45 }
);

sections.forEach((section) => observer.observe(section));
