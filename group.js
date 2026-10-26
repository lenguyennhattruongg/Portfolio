/**
 * group.js — Tương tác chính cho Mysterious Cosmic Universe × 3D Constellation
 * Đồ án học phần Lập trình Web — Trường ĐH Giao thông Vận tải TP.HCM (UTH)
 * Tích hợp: Canvas 3D Starfield & Constellation Engine (60 FPS RAF)
 * Hoạt động hoàn toàn bằng Vanilla JS ES6+ (Module), tuân thủ WCAG AA.
 */

import { MEMBERS, TAGS, normalizeText, getMemberHaystack } from './members.data.js';

// -------------------------------------------------------------
// 1. TRẠNG THÁI HỆ THỐNG (STATE)
// -------------------------------------------------------------
const state = {
  selectedId: null, // 'hieu' | 'truong' | 'nhu' | 'huynh' | 'chau' | 'thu' | null
  hoveredId: null,
  query: ''
};

// -------------------------------------------------------------
// 2. DOM CACHED ELEMENTS
// -------------------------------------------------------------
const dom = {
  cosmicCanvas: document.getElementById('cosmicCanvas'),
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
// 3. ĐỒNG BỘ PANEL CHI TIẾT & CHUYỂN ĐỔI BẢN ĐỒ THIÊN VĂN
// -------------------------------------------------------------
function selectMember(memberId, shouldFocusPanel = false) {
  const member = MEMBERS.find((m) => m.id === memberId);

  // Trường hợp đóng chi tiết / bỏ chọn
  if (!member) {
    state.selectedId = null;

    if (dom.tableArena) dom.tableArena.classList.remove('has-selection');
    if (dom.profilePanel) dom.profilePanel.hidden = true;

    // Reset trạng thái các thực thể sao
    document.querySelectorAll('.element-box').forEach((box) => {
      box.classList.remove('active-element');
      box.setAttribute('aria-pressed', 'false');
      box.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });

    // Xóa hash trên URL một cách sạch sẽ
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    if (lastFocusedBox) {
      try {
        lastFocusedBox.focus();
      } catch (err) {}
    }
    return;
  }

  // Trường hợp chọn một thực thể sao
  state.selectedId = member.id;

  // Cập nhật trạng thái các ô
  document.querySelectorAll('.element-box').forEach((box) => {
    const isTarget = box.getAttribute('data-member-id') === member.id;
    box.classList.toggle('active-element', isTarget);
    box.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    if (isTarget) {
      lastFocusedBox = box;
      box.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(8px)';
    } else {
      box.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  });

  // Chuyển đổi đấu trường: Lưới co lại 1/3, panel mở ra 2/3
  if (dom.tableArena) dom.tableArena.classList.add('has-selection');
  if (dom.profilePanel) dom.profilePanel.hidden = false;

  // Điền dữ liệu thật đã xác minh
  if (dom.panelMemberSeq) {
    dom.panelMemberSeq.textContent = `STAR NODE // 0${member.order} · ${member.symbol || 'STAR'}`;
  }

  // Tên thành viên
  if (dom.panelMemberName) {
    dom.panelMemberName.textContent = member.name;
  }

  // Vai trò
  if (dom.panelMemberRole) {
    if (member.role) {
      dom.panelMemberRole.textContent = `✦ ${member.role}`;
      dom.panelMemberRole.hidden = false;
    } else {
      dom.panelMemberRole.hidden = true;
    }
  }

  // Headline
  if (dom.panelMemberHeadline) {
    if (member.headline) {
      dom.panelMemberHeadline.textContent = member.headline;
      dom.panelMemberHeadline.hidden = false;
    } else {
      dom.panelMemberHeadline.hidden = true;
    }
  }

  // Avatar hoặc Monogram dự phòng
  if (dom.panelAvatarImg && dom.panelMonogram) {
    if (member.avatar) {
      dom.panelAvatarImg.src = member.avatar;
      dom.panelAvatarImg.alt = `Ảnh đại diện ${member.name}`;
      dom.panelAvatarImg.hidden = false;
      dom.panelMonogram.hidden = true;
      dom.panelAvatarImg.onerror = () => {
        dom.panelAvatarImg.hidden = true;
        dom.panelMonogram.hidden = false;
        dom.panelMonogram.textContent = member.symbol || member.shortName?.slice(0, 2) || '✦';
      };
    } else {
      dom.panelAvatarImg.hidden = true;
      dom.panelMonogram.hidden = false;
      dom.panelMonogram.textContent = member.symbol || member.shortName?.slice(0, 2) || '✦';
    }
  }

  // Thế mạnh chuyên môn đã xác minh
  if (dom.panelSkillsBlock && dom.panelTagsList) {
    dom.panelTagsList.innerHTML = '';
    const validTags = Array.isArray(member.tags) ? member.tags : [];

    if (validTags.length > 0) {
      validTags.forEach((tagKey) => {
        const tagInfo = TAGS[tagKey] || { label: tagKey };
        const badge = document.createElement('span');
        badge.className = 'skill-tag';
        badge.textContent = tagInfo.label;
        dom.panelTagsList.appendChild(badge);
      });
      dom.panelSkillsBlock.hidden = false;
    } else {
      dom.panelSkillsBlock.hidden = true;
    }
  }

  // Nút liên kết portfolio
  if (dom.panelPortfolioLink) {
    if (member.portfolio) {
      dom.panelPortfolioLink.href = member.portfolio;
      dom.panelPortfolioLink.classList.remove('disabled');
      dom.panelPortfolioLink.removeAttribute('aria-disabled');
      dom.panelPortfolioLink.innerHTML = `TIẾN VÀO HỆ QUY CHIẾU 3D ↗`;
    } else {
      dom.panelPortfolioLink.href = '#';
      dom.panelPortfolioLink.classList.add('disabled');
      dom.panelPortfolioLink.setAttribute('aria-disabled', 'true');
      dom.panelPortfolioLink.innerHTML = `Portfolio đang cập nhật`;
    }
  }

  // Nút GitHub cá nhân
  if (dom.panelGithubLink) {
    if (member.github) {
      dom.panelGithubLink.href = member.github;
      dom.panelGithubLink.hidden = false;
    } else {
      dom.panelGithubLink.hidden = true;
    }
  }

  // Cập nhật hash trên URL để hỗ trợ deep-linking
  if (window.location.hash !== `#${member.id}`) {
    history.replaceState(null, '', `#${member.id}`);
  }

  // Di chuyển tiêu điểm vào nút đóng panel nếu cần
  if (shouldFocusPanel && dom.panelCloseBtn) {
    setTimeout(() => {
      try {
        dom.panelCloseBtn.focus();
      } catch (e) {}
    }, 100);
  }
}

// -------------------------------------------------------------
// 4. KHỞI TẠO TƯƠNG TÁC NGHIÊNG 3D VẬT LÝ (3D TILT ENGINE)
// -------------------------------------------------------------
function initElement3DTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    return;
  }

  const boxes = document.querySelectorAll('.element-box');

  boxes.forEach((box) => {
    let rafId = null;

    box.addEventListener('mouseenter', () => {
      state.hoveredId = box.getAttribute('data-member-id');
    });

    box.addEventListener('mousemove', (e) => {
      if (box.classList.contains('active-element')) return;

      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const maxTilt = 7;
        const tiltX = -((y - centerY) / centerY) * maxTilt;
        const tiltY = ((x - centerX) / centerX) * maxTilt;

        box.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });
    });

    box.addEventListener('mouseleave', () => {
      state.hoveredId = null;
      if (rafId) cancelAnimationFrame(rafId);
      if (!box.classList.contains('active-element')) {
        box.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }
    });
  });
}

// -------------------------------------------------------------
// 5. ĐỘNG CƠ CANVAS KHÔNG GIAN VŨ TRỤ & CHÒM SAO 3D (60 FPS)
// -------------------------------------------------------------
function initCosmicCanvas() {
  const canvas = dom.cosmicCanvas;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Tạo hệ thống 160 ngôi sao đa tầng
  const STAR_COUNT = 160;
  const stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.8 + 0.2, // Độ sâu
      radius: Math.random() * 1.5 + 0.4,
      baseAlpha: Math.random() * 0.6 + 0.2,
      alpha: 0.5,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      isGold: Math.random() > 0.85
    });
  }

  // Parallax theo chuột
  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  let pulseTime = 0;

  function render() {
    pulseTime += 0.025;
    ctx.clearRect(0, 0, width, height);

    // Lerp chuột mượt mà
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    const offsetX = (mouseX - width / 2) * 0.03;
    const offsetY = (mouseY - height / 2) * 0.03;

    // 1. Vẽ các ngôi sao nền vũ trụ
    stars.forEach((star) => {
      star.twinklePhase += star.twinkleSpeed;
      const currentAlpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.25;

      const px = star.x - offsetX * star.z;
      const py = star.y - offsetY * star.z;

      // Wrap around
      const rx = (px + width) % width;
      const ry = (py + height) % height;

      ctx.beginPath();
      ctx.arc(rx, ry, star.radius * star.z, 0, Math.PI * 2);
      ctx.fillStyle = star.isGold 
        ? `rgba(240, 200, 121, ${Math.max(0.1, currentAlpha)})` 
        : `rgba(220, 230, 255, ${Math.max(0.1, currentAlpha)})`;
      ctx.fill();
    });

    // 2. Vẽ các đường chòm sao (Constellation Lines) nối 6 nút thành viên
    const boxes = Array.from(document.querySelectorAll('.element-box'));
    const nodeCoords = [];

    boxes.forEach((box) => {
      const rect = box.getBoundingClientRect();
      const memberId = box.getAttribute('data-member-id');
      nodeCoords.push({
        id: memberId,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        isActive: box.classList.contains('active-element'),
        isHovered: state.hoveredId === memberId
      });
    });

    // Vẽ các liên kết chòm sao
    if (nodeCoords.length >= 6) {
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3], [1, 4]
      ];

      edges.forEach(([i, j]) => {
        const n1 = nodeCoords[i];
        const n2 = nodeCoords[j];
        if (!n1 || !n2) return;

        const isHighlighted = n1.isActive || n2.isActive || n1.isHovered || n2.isHovered;

        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);

        if (isHighlighted) {
          ctx.strokeStyle = 'rgba(240, 200, 121, 0.45)';
          ctx.lineWidth = 1.8;
          ctx.shadowColor = '#F0C879';
          ctx.shadowBlur = 8;
        } else {
          ctx.strokeStyle = 'rgba(142, 156, 255, 0.12)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    }

    requestAnimationFrame(render);
  }

  render();
}

// -------------------------------------------------------------
// 6. TÌM KIẾM TỌA ĐỘ CHUẨN HÓA TIẾNG VIỆT
// -------------------------------------------------------------
function filterMembers(rawQuery) {
  state.query = rawQuery.trim();
  const normalized = normalizeText(state.query);
  const words = normalized.split(/\s+/).filter(Boolean);

  let matchCount = 0;

  document.querySelectorAll('.element-box').forEach((box) => {
    const memberId = box.getAttribute('data-member-id');
    const haystack = getMemberHaystack(memberId);

    const isMatch = words.length === 0 || words.every((word) => haystack.includes(word));

    if (isMatch) {
      box.hidden = false;
      box.style.display = 'flex';
      box.removeAttribute('aria-hidden');
      box.tabIndex = 0;
      matchCount++;
    } else {
      box.hidden = true;
      box.style.display = 'none';
      box.setAttribute('aria-hidden', 'true');
      box.tabIndex = -1;
    }
  });

  // Nút xóa tìm kiếm
  if (dom.searchClearBtn) {
    dom.searchClearBtn.hidden = state.query.length === 0;
  }

  // Thông báo trạng thái cho bộ đọc màn hình (aria-live)
  if (dom.searchStatus) {
    if (state.query.length === 0) {
      dom.searchStatus.textContent = '✦ Hiển thị 6/6 thực thể sao trong chòm sao';
    } else {
      dom.searchStatus.textContent = `✦ Tìm thấy ${matchCount}/6 thực thể phù hợp với "${state.query}"`;
    }
  }

  // Hiển thị trạng thái trống nếu không có kết quả
  if (dom.searchEmptyState) {
    dom.searchEmptyState.hidden = matchCount > 0;
  }
}

// -------------------------------------------------------------
// 7. KHỞI CHẠY HỆ THỐNG VÀ GẮN SỰ KIỆN TOÀN CỤC
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Khởi động Canvas Starfield & Constellation
  initCosmicCanvas();

  // 2. Khởi tạo hiệu ứng nghiêng 3D
  initElement3DTilt();

  // 3. Xử lý click chọn thực thể sao
  document.querySelectorAll('.element-box').forEach((box) => {
    box.addEventListener('click', (e) => {
      e.preventDefault();
      const memberId = box.getAttribute('data-member-id');
      if (state.selectedId === memberId) {
        selectMember(null);
      } else {
        selectMember(memberId, false);
      }
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const memberId = box.getAttribute('data-member-id');
        selectMember(memberId, true);
      }
    });
  });

  // 4. Nút đóng panel chi tiết
  if (dom.panelCloseBtn) {
    dom.panelCloseBtn.addEventListener('click', () => {
      selectMember(null);
    });
  }

  // 5. Phím Escape đóng panel
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.selectedId) {
      selectMember(null);
    }
  });

  // 6. Xử lý tìm kiếm thời gian thực
  if (dom.searchInput) {
    dom.searchInput.addEventListener('input', (e) => {
      filterMembers(e.target.value);
    });
  }

  if (dom.searchClearBtn) {
    dom.searchClearBtn.addEventListener('click', () => {
      if (dom.searchInput) {
        dom.searchInput.value = '';
        dom.searchInput.focus();
      }
      filterMembers('');
    });
  }

  if (dom.resetSearchBtn) {
    dom.resetSearchBtn.addEventListener('click', () => {
      if (dom.searchInput) {
        dom.searchInput.value = '';
        dom.searchInput.focus();
      }
      filterMembers('');
    });
  }

  // 7. Menu di động
  if (dom.mobileMenuBtn && dom.mobileDrawer) {
    dom.mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = dom.mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      dom.mobileMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
      dom.mobileDrawer.setAttribute('aria-hidden', String(isExpanded));
    });

    dom.mobileDrawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        dom.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        dom.mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // 8. Đồng bộ URL Hash ban đầu (ví dụ: #truong)
  const initialHash = window.location.hash.replace('#', '').trim();
  if (initialHash) {
    const matched = MEMBERS.find((m) => m.id === initialHash || m.slug === initialHash);
    if (matched) {
      setTimeout(() => {
        selectMember(matched.id, false);
      }, 150);
    }
  }

  window.addEventListener('hashchange', () => {
    const currentHash = window.location.hash.replace('#', '').trim();
    if (!currentHash) {
      selectMember(null);
    } else {
      const matched = MEMBERS.find((m) => m.id === currentHash || m.slug === currentHash);
      if (matched && matched.id !== state.selectedId) {
        selectMember(matched.id, false);
      }
    }
  });
});
