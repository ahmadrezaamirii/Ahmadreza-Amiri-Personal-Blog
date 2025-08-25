
const bio = document.getElementById('bio');
const toggleBio = document.getElementById('toggleBio');
const fadeEl = bio.querySelector('.fade');
function setBioClamp(expanded) {
  bio.classList.toggle('expanded', expanded);
  fadeEl.style.display = expanded ? 'none' : 'inline';
  toggleBio.textContent = expanded ? 'Read less…' : 'Read more…';
}
setBioClamp(false);
toggleBio.addEventListener('click', () => setBioClamp(!bio.classList.contains('expanded')));

const emailText = document.getElementById('email').textContent.trim();

document.getElementById('copyEmail').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(emailText);
    alert('Email copied!');
  } catch {
    alert("Can't access clipboard.");
  }
});

const btnFollow = document.getElementById('btnFollow');
let following = false;
btnFollow.addEventListener('click', () => {
  following = !following;
  btnFollow.classList.toggle('primary', following);
  btnFollow.textContent = following ? 'Following' : 'Follow';
  toast(following ? 'Followed' : 'Unfollowed');
});

document.getElementById('share').addEventListener('click', async () => {
  const shareData = {
    title: document.getElementById('name').textContent,
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

const avatarImg = document.getElementById('avatarImg');
const avatarInitials = document.getElementById('avatarInitials');
const avatarPath = './IMG_4208.JPG'; 

(function setInitials() {
  const name = document.getElementById('name').textContent.trim();
  const initials = name.split(/\s+/).slice(0, 2).map(s => s[0] || '').join('').toUpperCase();
  avatarInitials.textContent = initials || 'AA';
})();

avatarImg.src = avatarPath;
avatarImg.onload = () => {
  avatarImg.style.display = 'block';
  avatarInitials.style.display = 'none';
};
avatarImg.onerror = () => {
  avatarImg.style.display = 'none';
  avatarInitials.style.display = 'block';
  console.warn('Avatar image not found or failed to load:', avatarPath);
};

// (Light/Dark Mode) 
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const isLightMode = body.classList.contains('light-mode');
  themeToggle.textContent = isLightMode ? 'Dark' : 'Light';
  toast(isLightMode ? 'Switched to Light Mode' : 'Switched to Dark Mode');
});

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