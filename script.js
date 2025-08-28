// ==================== BIO TOGGLE ====================
const bio = document.getElementById('bio');
const toggleBio = document.getElementById('toggleBio');
const fadeEl = bio?.querySelector('.fade');

function setBioClamp(expanded) {
  if (!bio) return;
  bio.classList.toggle('expanded', expanded);
  if (fadeEl) fadeEl.style.display = expanded ? 'none' : 'inline';
  if (toggleBio) toggleBio.textContent = expanded ? 'Read less…' : 'Read more…';
}

if (toggleBio) {
  setBioClamp(false);
  toggleBio.addEventListener('click', () => setBioClamp(!bio.classList.contains('expanded')));
}

// ==================== EMAIL COPY ====================
const emailEl = document.getElementById('email');
if (emailEl) {
  const emailText = emailEl.textContent.trim();
  document.getElementById('copyEmail')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailText);
      toast('Email copied!');
    } catch {
      toast("Can't access clipboard.");
    }
  });
}

// ==================== FOLLOW BUTTON ====================
const btnFollow = document.getElementById('btnFollow');
let following = false;
btnFollow?.addEventListener('click', () => {
  following = !following;
  btnFollow.classList.toggle('primary', following);
  btnFollow.textContent = following ? 'Following' : 'Follow';
  toast(following ? 'Followed' : 'Unfollowed');
});

// ==================== SHARE ====================
document.getElementById('share')?.addEventListener('click', async () => {
  const shareData = {
    title: document.getElementById('name')?.textContent,
    text: 'Check this profile',
    url: window.location.href
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {}
  } else {
    try {
      await navigator.clipboard.writeText(shareData.url);
      toast('Link copied!');
    } catch {}
  }
});

// ==================== AVATAR ====================
const avatarImg = document.getElementById('avatarImg');
const avatarInitials = document.getElementById('avatarInitials');
const avatarPath = './IMG_4208.JPG'; 

(function setInitials() {
  const name = document.getElementById('name')?.textContent.trim() || "AA";
  const initials = name.split(/\s+/).slice(0, 2).map(s => s[0] || '').join('').toUpperCase();
  if (avatarInitials) avatarInitials.textContent = initials || 'AA';
})();

if (avatarImg) {
  avatarImg.src = avatarPath;
  avatarImg.onload = () => {
    avatarImg.style.display = 'block';
    if (avatarInitials) avatarInitials.style.display = 'none';
  };
  avatarImg.onerror = () => {
    avatarImg.style.display = 'none';
    if (avatarInitials) avatarInitials.style.display = 'block';
    console.warn('Avatar image not found or failed to load:', avatarPath);
  };
}

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('theme-toggle'); // دکمه 🌙/☀️
const body = document.body;

// تغییر تم
function toggleTheme() {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    themeToggle.textContent = "☀️";
    localStorage.setItem("theme", "dark");
    toast('Switched to Dark Mode');
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
    toast('Switched to Light Mode');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// اعمال تم ذخیره‌شده
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    if (themeToggle) themeToggle.textContent = "🌙";
  }
});

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger?.addEventListener("click", () => {
  mobileMenu?.classList.toggle("active");
});

// ==================== TOAST FUNCTION ====================
function toast(msg) {
  const el = Object.assign(document.createElement('div'), {
    textContent: msg
  });
  el.style.cssText =
    `position:fixed;inset-inline:0;bottom:22px;margin:auto;max-width:320px;` +
    `background:rgba(25,25,46,.9);color:#fff;padding:10px 14px;border-radius:12px;` +
    `backdrop-filter:saturate(1.2) blur(6px);box-shadow:0 10px 24px rgba(0,0,0,.25);` +
    `font-weight:700;text-align:center;z-index:9999;`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .45s';
    el.style.opacity = '0';
    el.addEventListener('transitionend', () => el.remove());
  }, 1400);
}
