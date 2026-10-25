import fs from 'node:fs';
import path from 'node:path';

const projectRoot = 'd:/LapTrinhWeb/Project/Portfolio_group';
const distHtmlPath = path.join(projectRoot, 'dist/members/nguyen-xuan-hieu/index.html');
const srcHtmlPath = path.join(projectRoot, 'members/nguyen-xuan-hieu/index.html');
const srcCssPath = path.join(projectRoot, 'members/nguyen-xuan-hieu/style.css');
const srcJsPath = path.join(projectRoot, 'members/nguyen-xuan-hieu/script.js');

const results = [];

function check(name, pass, detail) {
  results.push({ name, pass, detail });
  console.log(`${pass ? '✅ PASS' : '❌ FAIL'}: ${name}${detail ? ' (' + detail + ')' : ''}`);
}

// 1. Dist File Verification
check('dist HTML exists', fs.existsSync(distHtmlPath), distHtmlPath);
const distHtml = fs.readFileSync(distHtmlPath, 'utf-8');
const srcHtml = fs.readFileSync(srcHtmlPath, 'utf-8');
const srcCss = fs.readFileSync(srcCssPath, 'utf-8');
const srcJs = fs.readFileSync(srcJsPath, 'utf-8');

// 2. Relative Asset Paths in dist HTML
const assetRegex = /(src|href)="(\.\.\/\.\.\/assets\/[^"]+)"/g;
let match;
const assetMatches = [];
while ((match = assetRegex.exec(distHtml)) !== null) {
  assetMatches.push(match[2]);
}
check('dist HTML references bundled assets', assetMatches.length >= 2, `${assetMatches.length} references found`);

let allAssetsExist = true;
for (const relAsset of assetMatches) {
  // from dist/members/nguyen-xuan-hieu/
  const resolved = path.resolve(path.dirname(distHtmlPath), relAsset);
  const exists = fs.existsSync(resolved);
  if (!exists) {
    allAssetsExist = false;
    console.error(`Asset not found: ${relAsset} -> ${resolved}`);
  }
}
check('all bundled asset files exist on disk', allAssetsExist);

// 3. Navigation Links in dist
check('team home link is relative ../../index.html', distHtml.includes('href="../../index.html"'));
const memberSlugs = [
  'le-nguyen-nhat-truong',
  'nguyen-thi-thao-nhu',
  'nguyen-pham-y-huynh',
  'le-huu-chau',
  'nguyen-anh-thu'
];
const allMemberLinks = memberSlugs.every(slug => distHtml.includes(`href="../${slug}/index.html"`));
check('all 5 peer member links use ../<slug>/index.html', allMemberLinks);

// 4. Section Structure & Order
const sections = ['hero', 'about', 'skills', 'projects', 'process', 'team', 'contact'];
let lastIndex = -1;
let orderCorrect = true;
for (const sec of sections) {
  const idx = distHtml.indexOf(`id="${sec}"`);
  if (idx === -1 || idx < lastIndex) {
    orderCorrect = false;
  }
  lastIndex = idx;
}
check('all 7 sections present and in correct sequential order', orderCorrect);

// 5. Truthfulness & Rubric P0 Checks
// Projects
const hasHiunxstar = distHtml.includes('HIUNXSTAR') && distHtml.includes('github.com/nguyenxuanhieu2903/hiunx-cinema-manager');
const hasVetCenter = (distHtml.includes('Veterinary') || distHtml.includes('Thú y')) && distHtml.includes('github.com/nguyenxuanhieu2903/veterinary-center-web');
check('truthful projects with valid GitHub repos', hasHiunxstar && hasVetCenter);

// No fake live demos
const noFakeLiveDemo = !distHtml.includes('href="http://demo') && !distHtml.includes('href="https://hiunxstar.com') && !distHtml.includes('Live Demo</a>');
check('no fake live demo links', noFakeLiveDemo);

// Unobtained items marked coming soon/disabled
const cvDisabled = distHtml.includes('disabled') || distHtml.includes('Sắp có') || distHtml.includes('coming_soon');
check('unobtained items (CV/LinkedIn) appropriately marked', cvDisabled);

// No fake % skill bars
const noFakePercent = !srcHtml.includes('class="skill-bar"') && !srcHtml.includes('class="skill-level"');
check('no fake skill percentage/progress meters', noFakePercent);

// Contact mailto truth in UX
const hasMailto = srcJs.includes('mailto:nguyenxuanhieu2903@gmail.com') || srcJs.includes('nguyenxuanhieu2903@gmail.com');
const noFakeSent = !srcJs.includes('Đã gửi thành công') && !srcJs.includes('Message sent successfully!');
check('contact form uses mailto without deceptive success state', hasMailto && noFakeSent);

// 6. Bilingual Translations Completeness
const i18nMatches = [...srcHtml.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
const uniqueKeys = [...new Set(i18nMatches)];

// Extract translations object from script.js
const translationsExtract = srcJs.match(/const\s+translations\s*=\s*(\{[\s\S]*?\n\s*\};\n)/);
let i18nValid = false;
let missingVi = [];
let missingEn = [];
if (translationsExtract) {
  try {
    const fn = new Function(`${translationsExtract[0]}; return translations;`);
    const dict = fn();
    i18nValid = true;
    for (const key of uniqueKeys) {
      if (!dict.vi[key]) missingVi.push(key);
      if (!dict.en[key]) missingEn.push(key);
    }
  } catch (err) {
    console.error('Failed to parse translations dict:', err);
  }
}
check('all data-i18n keys present in dictionary', i18nValid && missingVi.length === 0 && missingEn.length === 0, 
  `Total keys: ${uniqueKeys.length}, Missing VI: ${missingVi.length}, Missing EN: ${missingEn.length}`);

// 7. A11y & WCAG
const hasSkipLink = distHtml.includes('class="skip-link"');
const hasFocusVisible = srcCss.includes(':focus-visible');
const hasReducedMotion = srcCss.includes('prefers-reduced-motion: reduce');
const hasModalDialog = distHtml.includes('<dialog') && distHtml.includes('aria-modal="true"');
check('WCAG skip-link, focus-visible, reduced-motion, dialog present', hasSkipLink && hasFocusVisible && hasReducedMotion && hasModalDialog);

// Summary
const total = results.length;
const passed = results.filter(r => r.pass).length;
console.log(`\n========================================`);
console.log(`STAGE G AUDIT SUMMARY: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
console.log(`========================================`);

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
