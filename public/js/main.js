(function() {
  const doc = document;
  const html = doc.documentElement;

  // Theme
  const themeToggle = doc.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(storedTheme);
  themeToggle && themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = theme === 'dark' ? '🌙' : '☀️';
    const btn = doc.getElementById('themeToggle');
    if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Dark mode' : 'Light mode');
    if (btn) btn.textContent = icon;
  }

  // Language switcher (default Arabic in HTML; English via dictionary)
  const langArBtn = doc.getElementById('langAr');
  const langEnBtn = doc.getElementById('langEn');
  const storedLang = localStorage.getItem('lang') || 'ar';
  let originals = {};

  const translations = {
    en: {
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.about': 'About',
      'nav.contact': 'Contact',

      'hero.tagline': 'Timeless elegance in henna, makeup, and glitter art',
      'hero.cta': 'Discover About Me',

      'about.title': 'About Me',
      'about.lead': '15 years of experience across all Jordanian cities, specializing in henna, makeup, and glitter for all occasions except children.',
      'about.point1': '15 years of refined beauty artistry',
      'about.point2': 'Serving all cities in Jordan',
      'about.point3': 'Henna, makeup, and glitter artistry',
      'about.point4': 'For all occasions (except children)',

      'services.title': 'Services',
      'services.henna.title': 'Henna',
      'services.henna.desc': 'Sophisticated henna designs inspired by heritage and elegance.',
      'services.makeup.title': 'Makeup',
      'services.makeup.desc': 'Flawless looks tailored to your occasion and style.',
      'services.glitter.title': 'Glitter',
      'services.glitter.desc': 'Delicate glitter touches for celebrations and photos.',
      'button.viewDetails': 'View Details',

      'pricing.title': 'Pricing Packages',
      'pricing.henna.title': 'Henna Packages',
      'pricing.henna.p1.title': 'Classic Henna',
      'pricing.henna.p1.desc': 'Elegant designs for hands with heritage motifs.',
      'pricing.henna.p2.title': 'Bridal Henna',
      'pricing.henna.p2.desc': 'Luxurious full-hand patterns with custom elements.',

      'pricing.makeup.title': 'Makeup Packages',
      'pricing.makeup.p1.title': 'Day Glam',
      'pricing.makeup.p1.desc': 'Soft glam for daytime events.',
      'pricing.makeup.p2.title': 'Evening Glam',
      'pricing.makeup.p2.desc': 'Bold, long-lasting evening look.',

      'pricing.glitter.title': 'Glitter Packages',
      'pricing.glitter.p1.title': 'Subtle Sparkle',
      'pricing.glitter.p1.desc': 'Minimal glitter accents for photos.',
      'pricing.glitter.p2.title': 'Event Sparkle',
      'pricing.glitter.p2.desc': 'Elevated glitter styling for events.',

      'gallery.title': 'Gallery',

      'contact.title': 'Contact',
      'contact.text': 'Reach out via Instagram or WhatsApp to book your session.',
      'contact.instagram': 'Instagram',
      'contact.whatsapp': 'WhatsApp',

      'footer.copy': '© 2025 Insami. All rights reserved.'
    }
  };

  function collectOriginals() {
    originals = {};
    doc.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      originals[key] = el.textContent.trim();
    });
  }

  function applyLanguage(lang) {
    if (!Object.keys(originals).length) collectOriginals();
    const isAr = lang === 'ar';
    doc.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (isAr) {
        el.textContent = originals[key] || el.textContent;
      } else {
        el.textContent = translations.en[key] || originals[key] || el.textContent;
      }
    });
    html.setAttribute('lang', lang);
    html.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    localStorage.setItem('lang', lang);
    if (langArBtn && langEnBtn) {
      langArBtn.classList.toggle('active', isAr);
      langEnBtn.classList.toggle('active', !isAr);
    }
  }

  langArBtn && langArBtn.addEventListener('click', () => applyLanguage('ar'));
  langEnBtn && langEnBtn.addEventListener('click', () => applyLanguage('en'));
  applyLanguage(storedLang);

  // Sticky navbar shadow on scroll
  const navbar = doc.querySelector('.navbar');
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 8) {
      navbar.style.boxShadow = '0 6px 30px rgba(0,0,0,0.12)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // AOS
  if (window.AOS) {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true });
  }

  // Lightbox
  const overlay = doc.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<div class="lightbox-content"><img alt="" /><button class="lightbox-close" aria-label="Close">✕</button></div>';
  doc.body.appendChild(overlay);
  const overlayImg = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function openLightbox(src) {
    overlayImg.src = src;
    overlay.classList.add('active');
  }
  function closeLightbox() {
    overlay.classList.remove('active');
    overlayImg.src = '';
  }
  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeLightbox(); });
  doc.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  doc.querySelectorAll('[data-lightbox]')?.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const src = link.getAttribute('href') || link.querySelector('img')?.src;
      if (src) openLightbox(src);
    });
  });
})();
