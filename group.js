/**
 * group.js — Tương tác chính cho Concept A: Bảng nguyên tố (Digital Periodic Table)
 * Đồ án học phần Lập trình Web — Trường ĐH Giao thông Vận tải TP.HCM (UTH)
 * Hoạt động hoàn toàn bằng Vanilla JS ES6+ (Module), tuân thủ WCAG AA.
 */

import { MEMBERS, TAGS, normalizeText, getMemberHaystack } from './members.data.js';

// -------------------------------------------------------------
// 1. TRẠNG THÁI HỆ THỐNG (STATE)
// -------------------------------------------------------------
const state = {
  selectedId: null, // 'hieu' | 'truong' | 'nhu' | 'huynh' | 'chau' | 'thu' | null
  query: ''
};

// -------------------------------------------------------------
// 2. DOM CACHED ELEMENTS
// -------------------------------------------------------------
const dom = {
  tableArena: document.getElementById('tableArena'),
  profilePanel: document.getElementById('profilePanel'),
  panelCloseBtn: document.getElementById('panelCloseBtn'),
  panelMemberSeq: document.getElementById('panelMemberSeq'),
  panelAvatarImg: document.getElementById('panelAvatarImg'),
  panelMonogram: document.getElementById('panelMonogram'),
  panelMemberName: document.getElementById('panelMemberName'),
  panelMemberRole: document.getElementById('panelMemberRole'),
  panelMemberHeadline: document.getElementById('panelMemberHeadline'),
  panelSkillsBlock: document.getElementById('panelSkillsBlock'),
  panelTagsList: document.getElementById('panelTagsList'),
  panelPortfolioLink: document.getElementById('panelPortfolioLink'),
  panelGithubLink: document.getElementById('panelGithubLink'),
  searchInput: document.getElementById('searchInput'),
  searchClearBtn: document.getElementById('searchClearBtn'),
  searchStatus: document.getElementById('searchStatus'),
  searchEmptyState: document.getElementById('searchEmptyState'),
  resetSearchBtn: document.getElementById('resetSearchBtn'),
  mobileMenuBtn: document.getElementById('mobileMenuBtn'),
  mobileDrawer: document.getElementById('mobileDrawer')
};

let lastFocusedBox = null;

// -------------------------------------------------------------
// 3. ĐỒNG BỘ PANEL CHI TIẾT & CHUYỂN ĐỔI BẢNG NGUYÊN TỐ
// -------------------------------------------------------------
function selectMember(memberId, shouldFocusPanel = false) {
  const member = MEMBERS.find((m) => m.id === memberId);

  // Trường hợp đóng chi tiết / bỏ chọn
  if (!member) {
    state.selectedId = null;

    if (dom.tableArena) dom.tableArena.classList.remove('has-selection');
    if (dom.profilePanel) dom.profilePanel.hidden = true;

    // Reset trạng thái các ô nguyên tố
    document.querySelectorAll('.element-box').forEach((box) => {
      box.classList.remove('active-element');
      box.setAttribute('aria-pressed', 'false');
      box.style.setProperty('--tilt-x', '0deg');
      box.style.setProperty('--tilt-y', '0deg');
      box.style.setProperty('--tile-depth', '0px');
    });

    // Xóa hash trên URL một cách sạch sẽ
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Khôi phục focus cho ô nguyên tố trước đó nếu có
    if (lastFocusedBox) {
      try {
        lastFocusedBox.focus();
      } catch (err) {
        // bỏ qua nếu phần tử không khả dụng
      }
    }
    return;
  }

  // Trường hợp chọn một thành viên
  state.selectedId = member.id;

  // Cập nhật trạng thái ô nguyên tố
  document.querySelectorAll('.element-box').forEach((box) => {
    const isTarget = box.getAttribute('data-member-id') === member.id;
    box.classList.toggle('active-element', isTarget);
    box.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    box.style.setProperty('--tilt-x', '0deg');
    box.style.setProperty('--tilt-y', '0deg');
    box.style.setProperty('--tile-depth', '0px');
    if (isTarget) {
      lastFocusedBox = box;
    }
  });

  // Chuyển đổi đấu trường: Lưới co lại 1/3, panel mở ra 2/3
  if (dom.tableArena) dom.tableArena.classList.add('has-selection');
  if (dom.profilePanel) dom.profilePanel.hidden = false;

  // Cập nhật nội dung hồ sơ
  if (dom.panelMemberSeq) {
    dom.panelMemberSeq.textContent = `TRẠM ĐIỀU KHIỂN // NODE 0${member.order} // UTH`;
  }

  if (dom.panelMemberName) {
    dom.panelMemberName.textContent = member.name;
  }

  // Vai trò (Chỉ hiển thị nếu đã xác minh)
  if (dom.panelMemberRole) {
    if (member.role) {
      dom.panelMemberRole.textContent = member.role;
      dom.panelMemberRole.hidden = false;
    } else {
      dom.panelMemberRole.hidden = true;
      dom.panelMemberRole.textContent = '';
    }
  }

  // Headline định hướng (Chỉ hiển thị nếu đã xác minh)
  if (dom.panelMemberHeadline) {
    if (member.headline) {
      dom.panelMemberHeadline.textContent = member.headline;
      dom.panelMemberHeadline.hidden = false;
    } else {
      dom.panelMemberHeadline.hidden = true;
      dom.panelMemberHeadline.textContent = '';
    }
  }

  // Avatar hoặc Monogram
  if (dom.panelMonogram) {
    dom.panelMonogram.textContent = member.symbol;
  }
  if (member.avatar) {
    if (dom.panelAvatarImg) {
      dom.panelAvatarImg.src = member.avatar;
      dom.panelAvatarImg.alt = `Ảnh chân dung của ${member.name}`;
      dom.panelAvatarImg.hidden = false;
    }
    if (dom.panelMonogram) dom.panelMonogram.hidden = true;
  } else {
    if (dom.panelAvatarImg) dom.panelAvatarImg.hidden = true;
    if (dom.panelMonogram) dom.panelMonogram.hidden = false;
  }

  // Thế mạnh kỹ năng đã xác minh (Không có thanh %, không xếp hạng)
  if (dom.panelSkillsBlock && dom.panelTagsList) {
    dom.panelTagsList.innerHTML = '';
    if (member.tags && member.tags.length > 0) {
      member.tags.forEach((tagKey) => {
        const tag = TAGS[tagKey];
        if (tag) {
          const badge = document.createElement('span');
          badge.className = 'tag-badge font-mono';
          badge.textContent = tag.label;
          dom.panelTagsList.appendChild(badge);
        }
      });
      dom.panelSkillsBlock.hidden = false;
    } else {
      dom.panelSkillsBlock.hidden = true;
    }
  }

  // Liên kết portfolio cá nhân
  if (dom.panelPortfolioLink) {
    dom.panelPortfolioLink.href = member.portfolio;
    dom.panelPortfolioLink.textContent =
      member.portfolioStatus === 'live' ? 'Mở portfolio →' : 'Trang cá nhân (đang xây dựng) →';
  }

  // Liên kết GitHub cá nhân
  if (dom.panelGithubLink) {
    if (member.github) {
      dom.panelGithubLink.href = member.github;
      dom.panelGithubLink.hidden = false;
    } else {
      dom.panelGithubLink.hidden = true;
    }
  }

  // Cập nhật hash trên URL
  if (window.location.hash !== `#${member.id}`) {
    history.replaceState(null, '', `#${member.id}`);
  }

  // Chuyển focus đến nút Đóng panel nếu do người dùng kích hoạt
  if (shouldFocusPanel && dom.panelCloseBtn) {
    setTimeout(() => {
      try {
        dom.panelCloseBtn.focus();
      } catch (err) {
        // bỏ qua nếu không thể focus
      }
    }, 50);
  }
}

// -------------------------------------------------------------
// 4. BỘ LỌC TÌM KIẾM THEO TÊN (WCAG AA & TIẾNG VIỆT CHUẨN)
// -------------------------------------------------------------
let searchTimer = null;

function filterTable() {
  const raw = state.query.trim();
  const normalized = normalizeText(raw);
  const tokens = normalized.split(/\s+/).filter(Boolean);

  let matchCount = 0;

  MEMBERS.forEach((m) => {
    const elemBox = document.getElementById(`elem-${m.id}`);
    if (!elemBox) return;

    const haystack = getMemberHaystack(m);
    // AND giữa các token tìm kiếm
    const isMatch = tokens.length === 0 || tokens.every((token) => haystack.includes(token));

    if (isMatch) {
      matchCount += 1;
      elemBox.classList.remove('filtered-out');
      elemBox.removeAttribute('inert');
    } else {
      elemBox.classList.add('filtered-out');
      elemBox.setAttribute('inert', '');

      // Nếu ô đang chọn không khớp tìm kiếm, tự động đóng panel
      if (state.selectedId === m.id) {
        selectMember(null);
      }
    }
  });

  // Thông báo aria-live
  if (dom.searchStatus) {
    dom.searchStatus.textContent = `Hiển thị ${matchCount}/${MEMBERS.length} thành viên`;
  }

  // Empty state
  if (dom.searchEmptyState) {
    dom.searchEmptyState.hidden = matchCount > 0;
  }

  // Nút xóa chữ trong ô tìm kiếm
  if (dom.searchClearBtn) {
    dom.searchClearBtn.hidden = raw.length === 0;
  }
}

function onSearchInput(e) {
  state.query = e.target.value;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    filterTable();
  }, 250);
}

function clearSearch() {
  state.query = '';
  if (dom.searchInput) {
    dom.searchInput.value = '';
    dom.searchInput.focus();
  }
  filterTable();
}

// -------------------------------------------------------------
// 5. THIẾT LẬP BẮT SỰ KIỆN (EVENT LISTENERS)
// -------------------------------------------------------------
function bindEventListeners() {
  // 1. Menu Mobile
  if (dom.mobileMenuBtn && dom.mobileDrawer) {
    dom.mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = dom.mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      dom.mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      dom.mobileDrawer.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
    });

    dom.mobileDrawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        dom.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        dom.mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // 2. Nhấp chọn các ô nguyên tố trong bảng
  document.querySelectorAll('.element-box').forEach((box) => {
    box.addEventListener('click', () => {
      const memberId = box.getAttribute('data-member-id');
      lastFocusedBox = box;
      if (state.selectedId === memberId) {
        selectMember(null);
      } else {
        selectMember(memberId, true);
      }
    });
  });

  // 3. Nút đóng Panel chi tiết
  if (dom.panelCloseBtn) {
    dom.panelCloseBtn.addEventListener('click', () => {
      selectMember(null);
    });
  }

  // 3b. Fallback khi ảnh avatar tải lỗi: ẩn ảnh lỗi và hiện monogram
  if (dom.panelAvatarImg) {
    dom.panelAvatarImg.addEventListener('error', () => {
      dom.panelAvatarImg.hidden = true;
      if (dom.panelMonogram) {
        dom.panelMonogram.hidden = false;
      }
    });
  }

  // 4. Tìm kiếm
  if (dom.searchInput) {
    dom.searchInput.addEventListener('input', onSearchInput);
  }
  if (dom.searchClearBtn) {
    dom.searchClearBtn.addEventListener('click', clearSearch);
  }
  if (dom.resetSearchBtn) {
    dom.resetSearchBtn.addEventListener('click', clearSearch);
  }

  // 5. Phím Escape đóng panel
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.selectedId) {
      selectMember(null);
    }
  });

  // 6. Lắng nghe thay đổi hash
  window.addEventListener('hashchange', () => {
    const rawHash = window.location.hash.replace('#', '').trim();
    if (rawHash && MEMBERS.some((m) => m.id === rawHash)) {
      selectMember(rawHash);
    } else {
      selectMember(null);
    }
  });

  // 7. Click liên kết ở Footer
  document.querySelectorAll('.footer-index-list a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const match = href.match(/#elem-(.+)/);
      if (match) {
        selectMember(match[1], true);
      }
    });
  });
}

// -------------------------------------------------------------
// 6. KHỞI TẠO HỆ THỐNG
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  bindEventListeners();
  initElement3DTilt();

  // Kiểm tra hash trên URL khi tải trang
  const initialHash = window.location.hash.replace('#', '').trim();
  if (initialHash && MEMBERS.some((m) => m.id === initialHash)) {
    selectMember(initialHash);
  } else {
    // Khởi tạo mặc định: chưa chọn ai (F18)
    selectMember(null);
  }

  console.info('Hệ thống Lõi Dữ Liệu Không Gian 3D (Nhóm 06) đã khởi tạo thành công.');
});

/**
 * Khởi tạo tương tác 3D chọn lọc cho 6 Cyber Node (Master Prompt 3D)
 * Áp dụng viền nổi và góc nghiêng ±6° theo con trỏ chuột, tôn trọng WCAG AA & prefers-reduced-motion
 */
function initElement3DTilt() {
  const tiles = document.querySelectorAll('.element-box');
  if (!tiles.length) return;

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

  const resetTile = (tile) => {
    tile.style.setProperty('--tilt-x', '0deg');
    tile.style.setProperty('--tilt-y', '0deg');
    tile.style.setProperty('--tile-depth', '0px');
  };

  const disableAll = () => {
    tiles.forEach(resetTile);
  };

  if (reducedMotionQuery.matches || !finePointerQuery.matches) {
    disableAll();
    return;
  }

  const maxTilt = 6; // Góc nghiêng tối đa ±6 độ giữ nguyên tính chất kỹ thuật

  tiles.forEach((tile) => {
    if (tile.dataset.tiltInitialized) return;
    tile.dataset.tiltInitialized = 'true';

    tile.addEventListener('pointermove', (event) => {
      if (
        tile.classList.contains('active-element') ||
        reducedMotionQuery.matches ||
        !finePointerQuery.matches ||
        event.pointerType !== 'mouse'
      ) {
        resetTile(tile);
        return;
      }

      const rect = tile.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;

      const normalizedX = (relativeX / rect.width) * 2 - 1;
      const normalizedY = (relativeY / rect.height) * 2 - 1;

      const rotateY = normalizedX * maxTilt;
      const rotateX = normalizedY * -maxTilt;

      tile.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
      tile.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
      tile.style.setProperty('--tile-depth', '8px');
    }, { passive: true });

    tile.addEventListener('pointerleave', () => resetTile(tile));
    tile.addEventListener('pointercancel', () => resetTile(tile));
    tile.addEventListener('focus', () => resetTile(tile));
  });

  const handlePreferenceChange = () => {
    if (reducedMotionQuery.matches || !finePointerQuery.matches) {
      disableAll();
    }
  };

  if (typeof reducedMotionQuery.addEventListener === 'function') {
    reducedMotionQuery.addEventListener('change', handlePreferenceChange);
    finePointerQuery.addEventListener('change', handlePreferenceChange);
  }
}
