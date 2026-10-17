const statusEl = document.querySelector('#status');
const helloBtn = document.querySelector('#helloBtn');
const themeBtn = document.querySelector('#themeBtn');
const root = document.documentElement;

// ปุ่ม Say Hello: สลับข้อความสถานะและเล่นแอนิเมชันเด้งเบาๆ
const messages = [
  'Hello from GitHub Pages!',
  'สวัสดีครับ! หน้านี้ deploy ด้วย GitHub Actions',
  'Keep coding, keep learning 🚀'
];
let msgIndex = 0;

helloBtn.addEventListener('click', () => {
  statusEl.textContent = messages[msgIndex];
  msgIndex = (msgIndex + 1) % messages.length;
  statusEl.classList.remove('pop');
  void statusEl.offsetWidth; // รีเซ็ตแอนิเมชันให้เล่นซ้ำได้
  statusEl.classList.add('pop');
});

// ปุ่ม Toggle Theme: กลางวัน (พระอาทิตย์) / กลางคืน (พระจันทร์) และจำค่าไว้
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  const isDark = theme === 'dark';
  themeBtn.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
  themeBtn.setAttribute('aria-pressed', String(isDark));
}

function getSavedTheme() {
  try { return localStorage.getItem('theme'); } catch (e) { return null; }
}

function saveTheme(theme) {
  try { localStorage.setItem('theme', theme); } catch (e) { /* ใช้งานต่อได้ตามปกติ */ }
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(getSavedTheme() || (prefersDark ? 'dark' : 'light'));

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  saveTheme(next);
});
