// Theme management script
export function initTheme() {
  const html = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Check saved preference or system preference
  function getThemePreference(): 'dark' | 'light' {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  
  // Apply theme
  function applyTheme(theme: 'dark' | 'light') {
    if (theme === 'dark') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  
  // Set initial theme
  const initialTheme = getThemePreference();
  applyTheme(initialTheme);
  
  // Listen for theme toggle button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = html.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  }
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

// Run on page load and after navigation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

// Also run on Astro view transitions
document.addEventListener('astro:after-swap', initTheme);
