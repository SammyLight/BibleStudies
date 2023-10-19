const themeToggle = document.getElementById('theme-toggle');
const themeStylesheet = document.getElementById('theme-stylesheet');
// Function to toggle between light and dark mode
function toggleTheme() {
  if (themeStylesheet.getAttribute('href') === '../style/lightMODE.css') {
    themeStylesheet.setAttribute('href', '../style/darkMODE.css');
    saveThemePreference('darkMODE');
  } else {
    themeStylesheet.setAttribute('href', '../style/lightMODE.css');
    saveThemePreference('lightMODE');
  }
}
// Save the user's theme preference
function saveThemePreference(theme) {
  localStorage.setItem('theme', theme);
}
// Retrieve and apply the user's theme preference or system preference
function applyThemePreference() {
  const userPreference = localStorage.getItem('theme');
  if (userPreference) {
    themeStylesheet.setAttribute('href', `../style/${userPreference}.css`);
    if (userPreference === 'darkMODE') {
      themeToggle.checked = true;
    }
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    themeStylesheet.setAttribute('href', '../style/darkMODE.css');
    themeToggle.checked = true;
  }
}
themeToggle.addEventListener('click', toggleTheme);
// Apply the user's or system preference on page load
applyThemePreference();
