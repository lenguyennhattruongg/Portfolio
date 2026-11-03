// Portfolio Nguyen Anh Thu - Base Script
console.log('Portfolio Nguyen Anh Thu initialized.');
const PROFILE_EMAIL = "ngthuanh2604@gmail.com";

const translations = {
  vi: {
    skip: "Bỏ qua điều hướng",
    "nav.about": "Giới thiệu", "nav.skills": "Kỹ năng", "nav.interests": "Sở thích", "nav.education": "Học vấn", "nav.journey": "Hành trình học tập", "nav.contact": "Liên hệ",
    downloadCv: "Tải CV",
    "hero.hello": "Mình là", "hero.name": "Anh Thư", "hero.role": "Business Analyst",
    "hero.point1": "Sinh viên MIS", "hero.point2": "Nhu cầu kinh doanh", "hero.point3": "Giải pháp công nghệ", "hero.point4": "Thực tập BA",
    scroll: "Cuộn để khám phá",
    "about.kicker": "Giới thiệu", "about.hello": "Hi, I'm", "about.scriptName": "Anh Thư.",
    "about.body": "Tôi là sinh viên Hệ thống thông tin quản lý, đang định hướng Business Analysis. Tôi muốn kết nối nhu cầu kinh doanh với giải pháp công nghệ, và đang tìm cơ hội thực tập để học quy trình làm việc thực tế.",
    "about.facebook": "Facebook", "about.contact": "Liên hệ", "about.cardLabel": "Hồ sơ sinh viên",
    "about.statusLabel": "Trạng thái", "about.statusValue": "Đang tìm thực tập", "about.yearLabel": "Niên khóa",
    "about.quote": "Kết nối nhu cầu kinh doanh với giải pháp công nghệ.", "about.play": "Phát hiệu ứng thẻ hồ sơ",
    "objective.label": "MỤC TIÊU NGHỀ NGHIỆP", "objective.body": "Tìm kiếm cơ hội thực tập Business Analyst để làm quen với quy trình làm việc thực tế, học hỏi từ đội ngũ giàu kinh nghiệm và từng bước phát triển chuyên môn.",
    "detail.specialty": "Chuyên ngành", "detail.specialtyValue": "Hệ thống thông tin quản lý", "detail.birthday": "Ngày sinh", "detail.focus": "Định hướng",
    "skills.kicker": "Nền tảng của tôi", "skills.title": "Luôn<br><span>học hỏi.</span>", "skills.description": "Kỹ năng được trình bày đúng với những gì tôi đang học và sử dụng — nền tảng cho hành trình phát triển.",
    "skills.web": "Web Fundamentals", "skills.webDescription": "Kiến thức nền tảng về xây dựng giao diện web.", "skills.webAlt": "Logo Visual Studio Code",
    "skills.tools": "Tools", "skills.toolsDescription": "Công cụ cộng tác và quản lý công việc ở mức cơ bản.", "skills.toolsAlt": "Búa và cờ lê bắt chéo",
    "skills.soft": "Soft Skills", "skills.softDescription": "Những kỹ năng tôi chủ động rèn luyện trong học tập và cộng tác.", "skills.softAlt": "Hình não minh họa kỹ năng mềm",
    "skills.database": "Database", "skills.databaseDescription": "Hệ quản trị cơ sở dữ liệu được bổ sung vào hồ sơ.", "skills.databaseAlt": "Biểu tượng cơ sở dữ liệu", basic: "cơ bản",
    "tag.selfLearning": "Tự học", "tag.communication": "Giao tiếp", "tag.teamwork": "Làm việc nhóm", "tag.time": "Quản lý thời gian", "tag.feedback": "Tiếp nhận phản hồi",
    "interests.kicker": "Sở thích cá nhân", "interests.title": "Những điều tôi yêu<br><span>thích mỗi ngày.</span>", "interests.description": "Những điều tôi yêu thích cũng phản ánh cách tôi tư duy, tổ chức thông tin và giải quyết vấn đề.",
    "interest.mysteryTitle": "Trinh thám", "interest.mysteryDescription": "Xâu chuỗi dữ kiện và tìm manh mối giúp tôi rèn khả năng quan sát và suy luận.", "interest.mysteryAlt": "Băng hiện trường màu vàng",
    "interest.psychologyTitle": "Tâm lý học", "interest.psychologyDescription": "Tôi thích đọc để hiểu động cơ và hành vi. 1984 là cuốn tôi hay quay lại.", "interest.psychologyAlt": "Bìa sách 1984 của George Orwell",
    "interest.diyTitle": "Thủ công & DIY", "interest.diyDescription": "Từng bước biến ý tưởng thành sản phẩm thực tế nuôi dưỡng sự tỉ mỉ, kiên nhẫn và chú ý đến chi tiết.", "interest.diyAlt": "Bó hoa nhung tự làm",
    "interest.bakingTitle": "Làm bánh & thử công thức", "interest.bakingDescription": "Đong đếm chính xác, theo sát quy trình rồi điều chỉnh nguyên liệu dựa trên kết quả là niềm vui của tôi.", "interest.bakingAlt": "Bát bột socola, vỏ trứng và trái tim bằng bột",
    "education.kicker": "Học vấn", "education.title": "Bắt đầu từ nền tảng<br><span>hệ thống thông tin.</span>", "education.label": "CHƯƠNG TRÌNH ĐÀO TẠO",
    "education.degree": "Hệ thống thông tin quản lý", "education.school": "Đại học Giao Thông Vận Tải TpHCM — 2024-2028", "education.schoolName": "Đại học Giao Thông Vận Tải TpHCM", "education.note": "Thời gian học và các môn học liên quan sẽ được bổ sung khi có thông tin xác nhận.", "education.status": "Đang học",
    "education.milestone": "Cột mốc", "education.milestoneTitle": "Bắt đầu đại học", "education.sceneLabel": "Học vấn", "education.range": "2024 — 2028",
    "education.point1": "Nhập học chương trình cử nhân.", "education.point2": "Theo học Hệ thống thông tin quản lý.", "education.point3": "Định hướng Business Analysis.",
    "education.tag1": "Năm nhất", "education.play": "Phát hiệu ứng hành trình học vấn", "education.playHint": "Nhấn play để xem lại hành trình học vấn.",
    "journey.kicker": "Hành trình học tập", "journey.title": "Luôn giữ tinh thần<br><span>học hỏi.</span>", "journey.emptyTitle": "Những cột mốc tiếp theo",
    "journey.emptyBody": "Các khóa học, chứng chỉ và nội dung BA đang học sẽ được cập nhật tại đây khi có thông tin thực tế. Không có chứng chỉ hay thành tích nào được tự thêm vào hồ sơ.",
    "journey.note": "Đang mở rộng kiến thức từng bước",
    "contact.kicker": "Kết nối", "contact.title": "Cùng bắt đầu<br><span>một cuộc trò chuyện.</span>", "contact.description": "Tôi luôn sẵn sàng kết nối và tìm hiểu về những cơ hội thực tập phù hợp. Hãy gửi lời nhắn cho tôi.",
    "contact.emailButton": "Gửi email", "contact.copy": "Sao chép email", "contact.socialLabel": "Thông tin liên hệ", "contact.emailLabel": "Email", "contact.phoneLabel": "Điện thoại", "contact.facebookLabel": "Facebook",     "contact.openProfile": "Xem trang cá nhân",
    "footer.top": "Về đầu trang",
    "error.noEmail": "Chưa cập nhật email liên hệ. Hãy bổ sung email trong script.js trước khi gửi.", "copy.unavailable": "Trình duyệt không hỗ trợ sao chép tự động. Email: ", "copy.empty": "Vui lòng cập nhật email trong script.js trước.",
    "toast.copied": "Đã sao chép email vào bộ nhớ tạm.", "theme.light": "Bật giao diện sáng", "theme.dark": "Bật giao diện tối", "menu.open": "Mở menu", "menu.close": "Đóng menu",
  },
  en: {
    skip: "Skip navigation",
    "nav.about": "About", "nav.skills": "Skills", "nav.interests": "Interests", "nav.education": "Education", "nav.journey": "Learning", "nav.contact": "Contact",
    downloadCv: "Download CV",
    "hero.hello": "Hi I'm", "hero.name": "Anh Thu", "hero.role": "Business Analyst",
    "hero.point1": "MIS student", "hero.point2": "Business needs", "hero.point3": "Technology solutions", "hero.point4": "BA internship",
    scroll: "Scroll to explore",
    "about.kicker": "About", "about.hello": "Hi, I'm", "about.scriptName": "Anh Thu.",
    "about.body": "I'm a Management Information Systems student aspiring to work in Business Analysis. I want to connect business needs with technology, and I'm looking for an internship to learn real workflows.",
    "about.facebook": "Facebook", "about.contact": "Contact", "about.cardLabel": "Student profile",
    "about.statusLabel": "Status", "about.statusValue": "Seeking an internship", "about.yearLabel": "Years",
    "about.quote": "Connecting business needs with technology solutions.", "about.play": "Play the profile card",
    "objective.label": "CAREER OBJECTIVE", "objective.body": "Seeking a Business Analyst internship to learn real-world workflows, grow alongside an experienced team, and build my professional foundations step by step.",
    "detail.specialty": "Major", "detail.specialtyValue": "Management Information Systems", "detail.birthday": "Date of birth", "detail.focus": "Career focus",
    "skills.kicker": "My foundations", "skills.title": "Always<br><span>learning.</span>", "skills.description": "Skills are presented as currently learned and used — a foundation for continued growth.",
    "skills.web": "Web Fundamentals", "skills.webDescription": "Foundational knowledge of building web interfaces.", "skills.webAlt": "Visual Studio Code logo",
    "skills.tools": "Tools", "skills.toolsDescription": "Basic collaboration and work management tools.", "skills.toolsAlt": "A crossed hammer and wrench",
    "skills.soft": "Soft Skills", "skills.softDescription": "Skills I actively develop through learning and collaboration.", "skills.softAlt": "A brain illustration for soft skills",
    "skills.database": "Database", "skills.databaseDescription": "Database management systems added to this profile.", "skills.databaseAlt": "A database symbol", basic: "basic",
    "tag.selfLearning": "Self-learning", "tag.communication": "Communication", "tag.teamwork": "Teamwork", "tag.time": "Time management", "tag.feedback": "Receptive to feedback",
    "interests.kicker": "Personal interests", "interests.title": "The things I enjoy<br><span>every day.</span>", "interests.description": "The things I enjoy also reflect how I think, organize information, and approach problems.",
    "interest.mysteryTitle": "Mystery", "interest.mysteryDescription": "Connecting clues helps me practice observation and logical reasoning.", "interest.mysteryAlt": "Yellow crime scene tape",
    "interest.psychologyTitle": "Psychology", "interest.psychologyDescription": "I like reading about motives and behavior. 1984 is a book I keep coming back to.", "interest.psychologyAlt": "The cover of George Orwell's 1984",
    "interest.diyTitle": "Crafts & DIY", "interest.diyDescription": "Turning an idea into something tangible nurtures patience, precision, and attention to detail.", "interest.diyAlt": "A handmade bouquet of velvet flowers",
    "interest.bakingTitle": "Baking & recipe experiments", "interest.bakingDescription": "I enjoy precise measurements, following a process, and adjusting ingredients based on the results.", "interest.bakingAlt": "A bowl of chocolate batter, an eggshell, and a flour heart",
    "education.kicker": "Education", "education.title": "Building from a foundation<br>in <span>information systems.</span>", "education.label": "ACADEMIC PROGRAM",
    "education.degree": "Management Information Systems", "education.school": "Ho Chi Minh City University of Transport — 2024-2028", "education.schoolName": "Ho Chi Minh City University of Transport", "education.note": "Study dates and relevant coursework can be added once confirmed.", "education.status": "Currently studying",
    "education.milestone": "Milestone", "education.milestoneTitle": "Started university", "education.sceneLabel": "Education", "education.range": "2024 — 2028",
    "education.point1": "Enrolled in the bachelor's program.", "education.point2": "Studying Management Information Systems.", "education.point3": "Focused on Business Analysis.",
    "education.tag1": "First year", "education.play": "Play the education timeline", "education.playHint": "Press play to watch the education timeline again.",
    "journey.kicker": "Learning journey", "journey.title": "Always making room<br><span>to learn.</span>", "journey.emptyTitle": "The next milestones",
    "journey.emptyBody": "Courses, certificates, and BA topics will be added here when confirmed. No credentials or achievements have been invented for this profile.",
    "journey.note": "Growing my knowledge step by step",
    "contact.kicker": "Connect", "contact.title": "Let's start<br><span>a conversation.</span>", "contact.description": "I'm always open to connecting and learning about relevant internship opportunities. Feel free to reach out.",
    "contact.emailButton": "Send an email", "contact.copy": "Copy email", "contact.socialLabel": "Contact details", "contact.emailLabel": "Email", "contact.phoneLabel": "Phone", "contact.facebookLabel": "Facebook",     "contact.openProfile": "View profile",
    "footer.top": "Back to top",
    "error.noEmail": "A contact email hasn't been configured. Add it in script.js before sending.", "copy.unavailable": "Automatic copying isn't supported. Email: ", "copy.empty": "Please add your email in script.js first.",
    "toast.copied": "Email copied to clipboard.", "theme.light": "Switch to light theme", "theme.dark": "Switch to dark theme", "menu.open": "Open menu", "menu.close": "Close menu",
  },
};

const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const languageToggle = document.querySelector(".language-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
const navLinks = [...document.querySelectorAll(".nav-link")];
const toast = document.querySelector(".toast");
let language = "vi";
let toastTimeout;

function t(key) {
  return translations[language][key] || key;
}

function updateThemeButton() {
  const isDark = root.dataset.theme === "dark";
  const label = isDark ? t("theme.light") : t("theme.dark");
  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
  themeToggle.innerHTML = isDark
    ? '<svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.1 15.6A8.5 8.5 0 0 1 8.4 3.9 8.5 8.5 0 1 0 20.1 15.6Z"/></svg>'
    : '<svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>';
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  root.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = translations[language][element.dataset.i18n];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const value = translations[language][element.dataset.i18nAlt];
    if (value) element.alt = value;
  });
  languageToggle.textContent = language === "vi" ? "EN" : "VI";
  languageToggle.setAttribute("aria-label", language === "vi" ? "Switch language" : "Chuyển sang tiếng Việt");
  menuToggle.setAttribute("aria-label", t(nav.classList.contains("is-open") ? "menu.close" : "menu.open"));
  document.querySelector(".back-to-top").setAttribute("aria-label", t("footer.top"));
  updateThemeButton();
  const eduPlayButton = document.querySelector(".edu-play");
  if (eduPlayButton) eduPlayButton.setAttribute("aria-label", t("education.play"));
  document.title = language === "vi"
    ? "Nguyễn Anh Thư — Aspiring Business Analyst"
    : "Nguyen Anh Thu — Aspiring Business Analyst";
  document.querySelector('meta[name="description"]').content = language === "vi"
    ? "Hồ sơ cá nhân của Nguyễn Anh Thư — sinh viên Hệ thống thông tin quản lý, định hướng Business Analyst."
    : "The profile of Nguyen Anh Thu — a Management Information Systems student aspiring to become a Business Analyst.";
  document.dispatchEvent(new CustomEvent("profile:content"));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function closeMenu() {
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", t("menu.open"));
}

themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem("profile-theme", root.dataset.theme);
  } catch (error) {
    console.warn("Theme preference could not be saved.", error);
  }
  updateThemeButton();
  document.dispatchEvent(new CustomEvent("profile:content"));
});

languageToggle.addEventListener("click", () => setLanguage(language === "vi" ? "en" : "vi"));
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", t(isOpen ? "menu.close" : "menu.open"));
});
navLinks.forEach((link) => link.addEventListener("click", closeMenu));
const clothesline = document.querySelector(".clothesline");
const clothesStage = clothesline ? clothesline.querySelector(".clothesline-stage") : null;
const clothesRope = clothesline ? clothesline.querySelector(".clothesline-rope") : null;
const clothesMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (clothesline && clothesStage && clothesRope && !clothesMotion.matches) {
  const originals = [...clothesStage.children];
  let cards = [];
  let width = clothesline.clientWidth;
  let lastTime = performance.now();

  function ropeY(x, base) {
    const span = Math.max(280, width / 2.4);
    const local = ((x % span) + span) % span / span;
    return base + Math.sin(local * Math.PI) * 28;
  }

  function drawRopes(bases) {
    const ropeHeight = Math.max(90, bases[bases.length - 1] + 36);
    const paths = bases.map((base) => {
      let d = `M 0 ${ropeY(0, base).toFixed(1)}`;
      for (let x = 6; x <= width; x += 6) d += ` L ${x} ${ropeY(x, base).toFixed(1)}`;
      return `<path d="${d}"/>`;
    });
    clothesRope.setAttribute("viewBox", `0 0 ${width} ${ropeHeight}`);
    clothesRope.setAttribute("preserveAspectRatio", "none");
    clothesRope.style.height = `${ropeHeight}px`;
    clothesRope.innerHTML = paths.join("");
  }

  function layoutCards() {
    width = clothesline.clientWidth;
    const count = originals.length;
    const columns = width < 760 ? 2 : count;
    const rows = Math.ceil(count / columns);
    const cardW = width < 760 ? Math.min(180, (width - 40) / columns - 12) : 214;
    const gap = width < 760 ? 16 : 52;
    const rowPitch = cardW + gap;
    const rowWidth = columns * cardW + (columns - 1) * gap;
    const startX = (width - rowWidth) / 2;
    const rowStep = 292;
    originals.forEach((el) => { el.style.width = `${cardW}px`; });
    cards = originals.map((el, index) => ({
      el,
      x: startX + (index % columns) * rowPitch,
      base: 8 + Math.floor(index / columns) * rowStep,
      phase: index * 0.85,
      swing: 0,
      swingV: 0
    }));
    drawRopes([...new Set(cards.map((card) => card.base))]);
    clothesline.style.height = `${rows === 1 ? 500 : 24 + rows * rowStep}px`;
  }

  function frame(now) {
    const dt = Math.min(32, now - lastTime);
    lastTime = now;
    const step = dt / 16.7;
    cards.forEach((card) => {
      const sway = Math.sin(now / 1800 + card.phase) * 2.6;
      card.swingV += ((sway - card.swing) * 0.05 - card.swingV * 0.18) * step;
      card.swing += card.swingV * step;
      const cardW = card.el.offsetWidth || 214;
      const y = ropeY(card.x + cardW / 2, card.base) - 10;
      card.el.style.transform = `translate3d(${card.x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${card.swing.toFixed(2)}deg)`;
    });
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", layoutCards);
  layoutCards();
  requestAnimationFrame(frame);
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("is-open")) {
    closeMenu();
    menuToggle.focus();
  }
});

const header = document.querySelector(".site-header");
const backToTop = document.querySelector(".back-to-top");

function scrollToTop(event) {
  if (event) event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateScrollUI() {
  const hero = document.querySelector(".hero");
  const onHero = Boolean(hero) && window.scrollY < hero.offsetHeight - 70;
  header.classList.toggle("is-on-hero", onHero);
  header.classList.toggle("is-scrolled", window.scrollY > 12 && !onHero);
  backToTop.classList.toggle("is-visible", window.scrollY > 500);
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backToTop.addEventListener("click", scrollToTop);
document.querySelectorAll('a[href="#top"], .footer-top-link').forEach((link) => {
  link.addEventListener("click", scrollToTop);
});
document.querySelector("#current-year").textContent = String(new Date().getFullYear());

const eduStage = document.querySelector(".edu-stage");
const eduPlay = document.querySelector(".edu-play");
const eduMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let eduPlayId = 0;

function animateEduYear(year, id, delay) {
  const target = Number(year.dataset.year);
  const startValue = target - 16;
  const span = year.querySelector("span");
  span.textContent = String(startValue);
  const duration = 900;
  function tick(now) {
    if (id !== eduPlayId) return;
    const progress = Math.min(1, Math.max(0, (now - delay) / duration));
    const eased = 1 - Math.pow(1 - progress, 3);
    span.textContent = String(Math.round(startValue + (target - startValue) * eased));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function playEducation() {
  if (!eduStage || eduMotionQuery.matches) return;
  const id = ++eduPlayId;
  eduStage.classList.remove("is-playing");
  eduStage.querySelectorAll(".edu-year").forEach((year) => {
    year.querySelector("span").textContent = String(Number(year.dataset.year) - 16);
  });
  void eduStage.offsetWidth;
  eduStage.classList.add("is-playing");
  const started = performance.now();
  eduStage.querySelectorAll(".edu-year").forEach((year, index) => {
    animateEduYear(year, id, started + index * 520);
  });
}

if (eduStage) {
  if (eduMotionQuery.matches) {
    eduStage.classList.add("is-static");
  } else {
    eduStage.classList.add("is-armed");
    const startEducation = () => {
      playEducation();
    };
    if ("IntersectionObserver" in window) {
      const eduObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          startEducation();
          eduObserver.disconnect();
        });
      }, { threshold: 0.32 });
      eduObserver.observe(eduStage);
    } else {
      startEducation();
    }
    eduPlay.addEventListener("click", playEducation);
    eduStage.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = eduStage.getBoundingClientRect();
      eduStage.style.setProperty("--px", String((event.clientX - rect.left) / rect.width - 0.5));
      eduStage.style.setProperty("--py", String((event.clientY - rect.top) / rect.height - 0.5));
    });
    eduStage.addEventListener("pointerleave", () => {
      eduStage.style.setProperty("--px", "0");
      eduStage.style.setProperty("--py", "0");
    });
  }
}

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("profile-theme") || "light";
} catch (error) {
  console.warn("Theme preference could not be read.", error);
}
root.dataset.theme = savedTheme === "dark" ? "dark" : "light";
updateThemeButton();

const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isActive = link.dataset.section === entry.target.id;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

// Email button — opens mailto directly
const emailLink = document.querySelector(".email-link");
emailLink.addEventListener("click", (event) => {
  if (!PROFILE_EMAIL) {
    event.preventDefault();
    showToast(t("error.noEmail"));
  } else {
    emailLink.href = "mailto:" + PROFILE_EMAIL;
  }
});

// Copy email button
document.querySelector(".copy-email").addEventListener("click", async () => {
  if (!PROFILE_EMAIL) {
    showToast(t("copy.empty"));
    return;
  }
  try {
    await navigator.clipboard.writeText(PROFILE_EMAIL);
    showToast(t("toast.copied"));
  } catch (error) {
    console.warn("Clipboard access failed.", error);
    showToast(t("copy.unavailable") + PROFILE_EMAIL);
  }
});

const interestStage = document.querySelector(".interest-stage");
const interestGallery = document.querySelector("#interest-gallery");
const interestArticles = interestStage ? [...interestStage.querySelectorAll(".interest-copy article")] : [];
if (interestStage && interestGallery && interestArticles.length) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const phoneQuery = window.matchMedia("(max-width: 820px)");
  const pool = [];
  let items = [];
  let offset = 0;
  let flick = 0;
  let drag = null;
  let lastTime = 0;
  let running = false;
  let activeIndex = 0;
  const clock = document.documentElement.animate(
    [{ transform: "none" }, { transform: "none" }],
    { duration: 1e9, fill: "forwards" }
  );

  function now() {
    return typeof clock.currentTime === "number" ? clock.currentTime : performance.now();
  }

  function readItems() {
    items = interestArticles.map((article) => ({
      image: article.dataset.image,
      title: article.querySelector("h3").textContent.trim(),
      alt: translations[language][article.dataset.i18nAlt] || ""
    }));
  }

  function direction(from, to) {
    const x = to.x - from.x;
    const y = to.y - from.y;
    const length = Math.hypot(x, y) || 1;
    return { x: x / length, y: y / length };
  }

  function roundedPath(points, radius) {
    const round = (value) => Math.round(value * 10) / 10;
    const corners = points.map((point, index) => {
      const previous = points[(index + points.length - 1) % points.length];
      const next = points[(index + 1) % points.length];
      const toPrevious = direction(point, previous);
      const toNext = direction(point, next);
      const limit = Math.min(
        radius,
        Math.hypot(previous.x - point.x, previous.y - point.y) / 2.2,
        Math.hypot(next.x - point.x, next.y - point.y) / 2.2
      );
      return {
        start: { x: point.x + toPrevious.x * limit, y: point.y + toPrevious.y * limit },
        point,
        end: { x: point.x + toNext.x * limit, y: point.y + toNext.y * limit }
      };
    });
    let path = `M ${round(corners[0].start.x)} ${round(corners[0].start.y)}`;
    corners.forEach((corner, index) => {
      const following = corners[(index + 1) % corners.length].start;
      path += ` Q ${round(corner.point.x)} ${round(corner.point.y)} ${round(corner.end.x)} ${round(corner.end.y)} L ${round(following.x)} ${round(following.y)}`;
    });
    return path + " Z";
  }

  function cardNode(index) {
    if (pool[index]) return pool[index];
    const card = document.createElement("div");
    card.className = "curve-card";
    const image = document.createElement("img");
    image.alt = "";
    image.draggable = false;
    card.append(image, document.createElement("span"));
    interestGallery.appendChild(card);
    pool[index] = card;
    return card;
  }

  function layout(dt) {
    const width = interestGallery.clientWidth;
    if (!width || !items.length) return false;
    const phone = phoneQuery.matches;
    const unit = width / (phone ? 640 : 1440);
    const center = width / 2;
    const reach = 706 * unit;
    const pitch = 196 * unit;
    const band = phone ? 250 : Math.ceil(372 * unit + 36);
    interestGallery.style.height = band + "px";
    const mid = band / 2;
    if (!drag && dt > 0) {
      flick *= Math.pow(0.05, dt);
      if (Math.abs(flick) < 6) flick = 0;
      offset += ((reduceMotion.matches ? 0 : 50 * unit) + flick) * dt;
    }
    const loop = items.length * pitch;
    offset = ((offset % loop) + loop) % loop;

    const minOffset = -reach * 1.5;
    const maxOffset = reach * 1.5;
    const first = Math.floor((offset + minOffset) / pitch) - 1;
    const last = Math.ceil((offset + maxOffset) / pitch) + 1;
    let used = 0;
    let nearest = Infinity;
    let nearestItem = activeIndex;

    for (let slot = first; slot <= last; slot += 1) {
      const raw = slot * pitch - offset;
      const x = center + raw * (1 + 0.083 * (raw / reach) ** 2);
      const distance = Math.min(1, Math.abs(x - center) / reach);
      const cardWidth = (170 + 48 * distance * distance) * unit;
      const left = x - cardWidth / 2;
      const right = x + cardWidth / 2;
      const edgeHeight = (edge) => {
        const q = Math.min(1, Math.abs(edge - center) / reach);
        return (280 + 92 * q ** 2.6) * unit;
      };
      const y = mid - 12 * distance * distance * unit;
      const leftHeight = edgeHeight(left);
      const rightHeight = edgeHeight(right);
      const corners = [
        { x: left, y: y - leftHeight / 2 },
        { x: right, y: y - rightHeight / 2 },
        { x: right, y: y + rightHeight / 2 },
        { x: left, y: y + leftHeight / 2 }
      ];
      const minX = Math.min(left, right);
      const minY = Math.min(corners[0].y, corners[1].y);
      const maxY = Math.max(corners[2].y, corners[3].y);
      const card = cardNode(used);
      const itemIndex = ((slot % items.length) + items.length) % items.length;
      const item = items[itemIndex];
      const image = card.querySelector("img");
      const label = card.querySelector("span");
      if (image.getAttribute("src") !== item.image) image.src = item.image;
      if (image.alt !== item.alt) image.alt = item.alt;
      if (label.textContent !== item.title) label.textContent = item.title;
      card.hidden = false;
      card.style.left = minX + "px";
      card.style.top = minY + "px";
      card.style.width = cardWidth + "px";
      card.style.height = (maxY - minY) + "px";
      card.style.zIndex = String(Math.round((1.5 - distance) * 20));
      card.style.clipPath = `path('${roundedPath(corners.map((point) => ({ x: point.x - minX, y: point.y - minY })), 15 * unit)}')`;
      if (Math.abs(x - center) < nearest) {
        nearest = Math.abs(x - center);
        nearestItem = itemIndex;
      }
      used += 1;
    }

    for (let index = used; index < pool.length; index += 1) pool[index].hidden = true;
    if (nearestItem !== activeIndex) {
      activeIndex = nearestItem;
      interestArticles.forEach((article, index) => article.classList.toggle("is-active", index === nearestItem));
    }
    return Boolean(drag) || flick !== 0 || !reduceMotion.matches;
  }

  function tick(time) {
    const dt = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 0;
    lastTime = time;
    if (layout(dt)) requestAnimationFrame(tick);
    else running = false;
  }

  function wake() {
    if (running) return;
    running = true;
    lastTime = 0;
    requestAnimationFrame(tick);
  }

  interestGallery.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    drag = { x: event.clientX, time: now(), velocity: 0 };
    flick = 0;
    interestGallery.classList.add("is-dragging");
    try { interestGallery.setPointerCapture(event.pointerId); } catch (error) { /* Pointer capture is optional. */ }
    wake();
  });
  interestGallery.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const time = now();
    const dx = event.clientX - drag.x;
    const elapsed = Math.max(16, time - drag.time);
    drag.velocity = (-dx / elapsed) * 1000;
    offset -= dx;
    drag.x = event.clientX;
    drag.time = time;
  });
  function releasePointer() {
    if (!drag) return;
    flick = drag.velocity;
    drag = null;
    interestGallery.classList.remove("is-dragging");
    wake();
  }
  interestGallery.addEventListener("pointerup", releasePointer);
  interestGallery.addEventListener("pointercancel", releasePointer);
  readItems();
  interestStage.classList.add("is-live");
  document.addEventListener("profile:content", () => {
    readItems();
    wake();
  });
  window.addEventListener("resize", wake);
  phoneQuery.addEventListener("change", wake);
  reduceMotion.addEventListener("change", wake);
  wake();
}
