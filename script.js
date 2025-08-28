// ==================== THEME TOGGLE ====================
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // بررسی تم ذخیره شده
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    if (themeToggle) themeToggle.textContent = "🌙";
  }

  // تغییر تم با کلیک
  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "dark");
      toast("Switched to Dark Mode");
    } else {
      themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "light");
      toast("Switched to Light Mode");
    }
  });
});

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger?.addEventListener("click", () => {
  mobileMenu?.classList.toggle("active");
});

// وقتی اندازه صفحه تغییر کرد => منو تو حالت دسکتاپ جمع بشه
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    mobileMenu?.classList.remove("active");
  }
});

// ==================== TOAST FUNCTION ====================
function toast(msg) {
  const el = document.createElement("div");
  el.textContent = msg;
  el.style.cssText = `
    position: fixed;
    left: 50%;
    bottom: 22px;
    transform: translateX(-50%);
    max-width: 90%;
    background: rgba(25, 25, 46, 0.9);
    color: #fff;
    padding: 10px 14px;
    border-radius: 12px;
    backdrop-filter: saturate(1.2) blur(6px);
    box-shadow: 0 10px 24px rgba(0,0,0,.25);
    font-weight: 700;
    text-align: center;
    z-index: 9999;
    font-size: clamp(12px, 2vw, 16px);
  `;
  document.body.appendChild(el);

  setTimeout(() => {
    el.style.transition = "opacity .45s";
    el.style.opacity = "0";
    el.addEventListener("transitionend", () => el.remove());
  }, 1400);
}