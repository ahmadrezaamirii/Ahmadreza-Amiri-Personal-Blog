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
