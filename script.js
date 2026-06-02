const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

// Navigation scroll tracking using IntersectionObserver
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
  { threshold: 0.35 }
);

sections.forEach((section) => observer.observe(section));

// Projects Category Filtering Logic
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const projectCards = Array.from(document.querySelectorAll('.project-card'));

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Toggle active state on buttons
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter') || 'all';

    projectCards.forEach((card) => {
      const categories = card.getAttribute('data-categories') || '';
      const categoriesArray = categories.split(' ');

      if (filterValue === 'all' || categoriesArray.includes(filterValue)) {
        card.classList.remove('filtered-out');
      } else {
        card.classList.add('filtered-out');
      }
    });
  });
});

// Certificate Modal Logic
const certModal = document.getElementById('certificate-modal');
const certModalContent = document.getElementById('certificate-modal-content');
const certModalTitle = document.getElementById('certificate-modal-title');
const certModalClose = document.getElementById('certificate-modal-close');
const certTriggers = Array.from(document.querySelectorAll('.cert-trigger'));

function setModalContent(title, certificatePath) {
  if (!certModalContent || !certModalTitle) return;

  certModalTitle.textContent = `${title} Certificate`;
  certModalContent.innerHTML = '';

  if (!certificatePath) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'certificate-empty';
    emptyMessage.textContent = 'Preview not available yet. The certificate will be updated soon!';
    certModalContent.appendChild(emptyMessage);
    return;
  }

  const normalizedPath = certificatePath.toLowerCase();
  if (normalizedPath.endsWith('.pdf')) {
    const frame = document.createElement('iframe');
    frame.className = 'certificate-frame';
    frame.src = certificatePath;
    frame.title = `${title} certificate preview`;
    certModalContent.appendChild(frame);
    return;
  }

  const image = document.createElement('img');
  image.className = 'certificate-image';
  image.src = certificatePath;
  image.alt = `${title} certificate`;
  certModalContent.appendChild(image);
}

function openCertModal() {
  if (!certModal) return;
  certModal.setAttribute('aria-hidden', 'false');
}

function closeCertModal() {
  if (!certModal || !certModalContent) return;
  certModal.setAttribute('aria-hidden', 'true');
  certModalContent.innerHTML = '';
}

certTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const title = trigger.getAttribute('data-title') || 'Seminar';
    const certificatePath = trigger.getAttribute('data-certificate') || '';

    if (!certificatePath) {
      setModalContent(title, certificatePath);
      openCertModal();
      return;
    }

    window.open(certificatePath, '_blank', 'noopener,noreferrer');
  });
});

if (certModalClose) {
  certModalClose.addEventListener('click', closeCertModal);
}

if (certModal) {
  certModal.addEventListener('click', (event) => {
    if (event.target === certModal) {
      closeCertModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && certModal && certModal.getAttribute('aria-hidden') === 'false') {
    closeCertModal();
  }
});
