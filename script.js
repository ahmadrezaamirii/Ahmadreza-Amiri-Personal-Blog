document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for a saved theme preference on page load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-mode') {
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }
  }

  // Toggle the theme when the button is clicked
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Update the button text and save the preference
    if (body.classList.contains('dark-mode')) {
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark-mode');
    } else {
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', '');
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // ذخیره تم
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === 'dark-mode' ? '☀️' : '🌙';
  }

  // تغییر تم
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark-mode');
    } else {
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', '');
    }
  });

  // باز و بسته شدن منوی موبایل
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // وقتی روی لینک کلیک شد منو بسته بشه
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
});
