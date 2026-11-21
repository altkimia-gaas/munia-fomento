/** Tema claro/oscuro. El valor vive en <html data-theme> y se persiste en localStorage.
 *  El bootstrap en index.html lo fija antes del primer render para evitar parpadeo. */
export type Theme = 'light' | 'dark';
const KEY = 'munia-theme';

export function getTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function applyTheme(t: Theme) {
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem(KEY, t); } catch { /* modo privado */ }
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}
