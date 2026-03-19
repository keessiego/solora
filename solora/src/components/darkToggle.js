/**
 * Initialiseert de Solora Theme Toggle
 * @param {string} elementSelector - De CSS selector voor de toggle knop(pen)
 */
export function initThemeToggle(elementSelector = '.sol-theme-toggle') {
  const html = document.documentElement;
  const toggles = document.querySelectorAll(elementSelector);
  const STORAGE_KEY = 'solora-theme';

  // 1. Helper: Pas thema toe
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }

    // Update alle icoontjes op de pagina
    toggles.forEach(btn => {
      btn.innerHTML = `<span>${theme === 'dark' ? '☀️' : '🌙'}</span>`;
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });

    localStorage.setItem(STORAGE_KEY, theme);
  };

  // 2. Bepaal start-thema
  const getInitialTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  // 3. Initialiseer
  applyTheme(getInitialTheme());

  // 4. Event Listeners
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = html.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  });

  // 5. Luister naar systeemveranderingen (optioneel, voor de echte pro feel)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}