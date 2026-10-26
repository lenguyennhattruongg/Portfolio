/**
 * JavaScript tương tác cho Node 06 (Nguyễn Anh Thư)
 * Bao gồm: 3D Physical Tilt cho Artifact & Project Cards, Modal, Form Mailto
 */

const NODE_DATA = {
  profile: {
    fullName: "Nguyễn Anh Thư",
    role: "Product Analyst & Requirements Engineering",
    email: "thuna06@ut.edu.vn",
    githubUrl: "https://github.com/nguyenxuanhieu2903/portfolio-group",
    nodeCode: "NAT-06"
  },
  projects: {
  "group-srs-spec": {
    "title": "Group 06 Technical Specification & Roadmap",
    "category": "Môn Lập trình Web // Phân Tích & Đặc Tả",
    "tech": "SRS Document, Use Case Scenarios, Acceptance Criteria, Mermaid",
    "link": "https://github.com/nguyenxuanhieu2903/portfolio-group",
    "role": "Chủ trì phân tích: Định nghĩa rõ yêu cầu nghiệp vụ, tiêu chí nghiệm thu cho từng checkpoint của nhóm.",
    "learn": "Cách chuyển hóa yêu cầu của giảng viên và hội đồng chấm thi thành các tác vụ kỹ thuật cụ thể cho đội dev."
  },
  "freshvend-spec": {
    "title": "FreshVend Business Domain Modeling",
    "category": "Môn Lập trình Java // Mô Hình Hóa Nghiệp Vụ",
    "tech": "Class Diagram, State Machine, Domain Modeling, Activity Flow",
    "link": "https://github.com/nguyenxuanhieu2903/freshvend-java",
    "role": "Chuyên viên phân tích: Mô hình hóa các trạng thái máy bán hàng tự động (Chờ, Nhận tiền, Xuất hàng, Hoàn tiền).",
    "learn": "Tầm quan trọng của việc hiểu rõ luồng trạng thái trước khi bắt tay vào viết mã nguồn."
  },
  "academic-report-framework": {
    "title": "Đồ Án Academic Defense & Reporting",
    "category": "Đồ án Môn học // Tài Liệu Báo Cáo",
    "tech": "Markdown, Slide Marp, Defense Q&A Prep, Academic Guidelines",
    "link": "https://github.com/nguyenxuanhieu2903/portfolio-group",
    "role": "Biên soạn tài liệu: Chuẩn bị slide bảo vệ đồ án và bộ câu hỏi phản biện kỹ thuật trước hội đồng.",
    "learn": "Kỹ năng trình bày giải pháp kỹ thuật mạch lạc, tự tin bảo vệ quan điểm trước giảng viên phản biện."
  }
}
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll progress
  const trackFill = document.getElementById('trackFill');
  const telemetry = document.getElementById('telemetryIndicator');

  function onScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
    if (trackFill) trackFill.style.width = `${progress}%`;
    if (telemetry) {
      if (progress < 25) telemetry.textContent = 'HERO // NAT-06';
      else if (progress < 55) telemetry.textContent = 'MATRIX // SKILLS';
      else if (progress < 85) telemetry.textContent = 'PROJECTS // 3 VERIFIED';
      else telemetry.textContent = 'UPLINK // CONTACT';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. 3D Physical Tilt cho Artifact & Project Cards
  initPhysicalTilt();

  // 3. Modal chi tiết dự án (hỗ trợ phím ESC và focus trap)
  const modal = document.getElementById('projectModal');
  const modalOverlay = document.getElementById('modalDimOverlay');
  const modalCloseBtn = document.getElementById('modalCloseTrigger');
  const modalBody = document.getElementById('modalBodyContent');
  let lastFocused = null;

  function openModal(pid) {
    const data = NODE_DATA.projects[pid];
    if (!data || !modal || !modalBody) return;
    lastFocused = document.activeElement;

    modalBody.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--node-accent); margin-bottom: 8px;">
        ${data.category}
      </div>
      <h2 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 800; line-height: 1.2; margin-bottom: 14px;">
        ${data.title}
      </h2>
      <div style="background: #F4F5F7; border: 1px solid var(--border-line); padding: 10px 14px; margin-bottom: 20px; font-size: 0.8125rem;">
        <span style="font-family: var(--font-mono); font-weight: 700;">CÔNG NGHỆ: </span>
        <span>${data.tech}</span>
      </div>
      <div style="margin-bottom: 16px;">
        <h4 style="font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 700; color: var(--node-accent); margin-bottom: 4px;">VAI TRÒ:</h4>
        <p style="font-size: 0.9375rem; line-height: 1.6;">${data.role}</p>
      </div>
      <div style="margin-bottom: 20px;">
        <h4 style="font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 700; color: var(--node-accent); margin-bottom: 4px;">KẾT QUẢ / ĐIỀU ĐÃ HỌC:</h4>
        <p style="font-size: 0.9375rem; line-height: 1.6;">${data.learn}</p>
      </div>
      <div style="border-top: 1px dashed var(--border-line); padding-top: 16px;">
        <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="btn-github-action" style="display: block; text-align: center;">
          TRUY CẬP REPOSITORY GITHUB &rarr;
        </a>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.btn-detail-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-project-id');
      openModal(pid);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeModal();
  });

  // 4. Copy Email 1-click
  const copyBtn = document.getElementById('copyMailBtn');
  const copyAlert = document.getElementById('copyAlert');
  if (copyBtn && copyAlert) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(NODE_DATA.profile.email);
        copyAlert.classList.add('visible');
        setTimeout(() => copyAlert.classList.remove('visible'), 2000);
      } catch (err) {
        prompt('Vui lòng sao chép email:', NODE_DATA.profile.email);
      }
    });
  }

  // 5. Form Mailto Validate 4 trường
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      const errName = document.getElementById('errName');
      const errEmail = document.getElementById('errEmail');
      const errSubject = document.getElementById('errSubject');
      const errMessage = document.getElementById('errMessage');

      errName.textContent = '';
      errEmail.textContent = '';
      errSubject.textContent = '';
      errMessage.textContent = '';

      let ok = true;
      if (!name) { errName.textContent = 'Vui lòng nhập họ và tên.'; ok = false; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errEmail.textContent = 'Email không hợp lệ.'; ok = false; }
      if (!subject) { errSubject.textContent = 'Vui lòng nhập tiêu đề.'; ok = false; }
      if (!message || message.length < 10) { errMessage.textContent = 'Nội dung cần ít nhất 10 ký tự.'; ok = false; }

      if (ok) {
        const mailto = `mailto:${NODE_DATA.profile.email}?subject=${encodeURIComponent('[' + NODE_DATA.profile.nodeCode + '] ' + subject)}&body=${encodeURIComponent('Kính gửi ' + NODE_DATA.profile.fullName + ',\n\nTôi là: ' + name + '\nEmail: ' + email + '\n\nNội dung:\n' + message + '\n\n---\nGửi từ Portfolio K24 UTH.')}`;
        window.location.href = mailto;
      }
    });
  }
});

function initPhysicalTilt() {
  const cards = document.querySelectorAll('.spatial-card-item, .artifact-frame');
  if (!cards.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (reducedMotion.matches || !finePointer.matches) return;

  cards.forEach(card => {
    let frameId = null;
    let rotX = 0, rotY = 0, sx = 50, sy = 50;

    const render = () => {
      card.style.setProperty('--ticket-rotate-x', `${rotX.toFixed(2)}deg`);
      card.style.setProperty('--ticket-rotate-y', `${rotY.toFixed(2)}deg`);
      card.style.setProperty('--tilt-x', `${rotX.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${rotY.toFixed(2)}deg`);
      card.style.setProperty('--sheen-x', `${sx.toFixed(1)}%`);
      card.style.setProperty('--sheen-y', `${sy.toFixed(1)}%`);
      frameId = null;
    };

    const requestRender = () => {
      if (frameId === null) frameId = requestAnimationFrame(render);
    };

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      rotX = (y * 2 - 1) * -8;
      rotY = (x * 2 - 1) * 8;
      sx = x * 100;
      sy = y * 100;
      card.classList.add('is-tilting');
      card.style.setProperty('--sheen-opacity', '1');
      requestRender();
    }, { passive: true });

    const onLeave = () => {
      rotX = 0; rotY = 0; sx = 50; sy = 50;
      card.classList.remove('is-tilting');
      card.style.setProperty('--sheen-opacity', '0');
      requestRender();
    };

    card.addEventListener('pointerleave', onLeave);
    card.addEventListener('pointercancel', onLeave);
  });
}
