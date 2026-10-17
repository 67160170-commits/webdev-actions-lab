const statusEl = document.querySelector('#status');
const helloBtn = document.querySelector('#helloBtn');
const themeBtn = document.querySelector('#themeBtn');
const root = document.documentElement;

// ปุ่ม Say Hello: สลับข้อความสถานะ
const messages = [
  'Hello from GitHub Pages!',
  'สวัสดีครับ! หน้านี้ deploy ด้วย GitHub Actions',
  'Keep coding, keep learning 🚀'
];
let msgIndex = 0;

helloBtn.addEventListener('click', () => {
  statusEl.textContent = messages[msgIndex];
  msgIndex = (msgIndex + 1) % messages.length;
});

// ปุ่ม Toggle Theme: สลับ Light/Dark และจำค่าไว้ในเบราว์เซอร์
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  const isDark = theme === 'dark';
  themeBtn.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
  themeBtn.setAttribute('aria-pressed', String(isDark));
}

function getSavedTheme() {
  try {
    return localStorage.getItem('theme');
  } catch (e) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    // ถ้าบันทึกไม่ได้ ก็ใช้งานต่อได้ตามปกติ
  }
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(getSavedTheme() || (prefersDark ? 'dark' : 'light'));

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  saveTheme(next);
});
