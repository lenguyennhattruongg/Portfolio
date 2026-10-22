// =========================================================
// GROUP LANDING PAGE INTERACTIVE LOGIC
// Tech Stack: Vanilla JavaScript (ES6+), Bootstrap 5 Bundle
// =========================================================

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNavCollapse();
  initMemberSearch();
  initScrollToTop();
});

/**
 * 1. Navbar Scroll Effect:
 * Adds a solid shadow background when scrolling past 40px
 */
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Mobile Navbar Auto-Collapse:
 * Automatically closes the dropdown menu upon clicking a navigation link
 */
function initMobileNavCollapse() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .cta-button');
  const navbarCollapse = document.getElementById('navbarContent');

  if (!navbarCollapse) return;

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        // Trigger Bootstrap's collapse toggle if open
        const bsCollapse = window.bootstrap?.Collapse?.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
}

/**
 * 3. Live Member Search & Filter:
 * Allows evaluators and visitors to instantly filter members by name, slug, or role
 */
function initMemberSearch() {
  const searchInput = document.getElementById('memberSearchInput');
  const memberCols = document.querySelectorAll('.member-col');
  const resultCount = document.getElementById('searchResultCount');
  const noResultAlert = document.getElementById('noMemberFoundAlert');

  if (!searchInput || memberCols.length === 0) return;

  // Helper to remove Vietnamese diacritics for flexible fuzzy matching
  const normalizeText = (str) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'd');
  };

  const performFilter = () => {
    const query = normalizeText(searchInput.value.trim());
    let visibleCount = 0;

    memberCols.forEach((col) => {
      const name = col.getAttribute('data-name') || '';
      const slug = col.getAttribute('data-slug') || '';
      const role = col.getAttribute('data-role') || '';

      const normalizedData = normalizeText(`${name} ${slug} ${role}`);

      if (query === '' || normalizedData.includes(query)) {
        col.classList.remove('d-none');
        visibleCount++;
      } else {
        col.classList.add('d-none');
      }
    });

    // Update count display
    if (resultCount) {
      resultCount.textContent = `Hiển thị ${visibleCount} / ${memberCols.length} thành viên`;
    }

    // Toggle empty state alert
    if (noResultAlert) {
      if (visibleCount === 0) {
        noResultAlert.classList.remove('d-none');
      } else {
        noResultAlert.classList.add('d-none');
      }
    }
  };

  searchInput.addEventListener('input', performFilter);

  // Press ESC to clear search
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      performFilter();
    }
  });
}

/**
 * 4. Scroll To Top:
 * Smooth scroll to top on button click
 */
function initScrollToTop() {
  const btn = document.getElementById('scrollToTopBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
