import { ui, defaultLocale, locales, type Locale } from './ui';

/**
 * Extract the current locale from a URL pathname.
 * E.g. "/Agentic_CMS/ru/about/" → "ru"
 *      "/Agentic_CMS/nodes/espresso/" → "es" (default, no prefix)
 */
export function getLangFromUrl(url: URL): Locale {
  const base = import.meta.env.BASE_URL;
  // Make sure base doesn't end with slash when we slice it, unless it's just '/'
  const cleanBase = base === '/' ? '' : base.replace(/\/$/, '');
  const pathWithoutBase = url.pathname.startsWith(cleanBase) ? url.pathname.slice(cleanBase.length) : url.pathname;
  const segments = pathWithoutBase.split('/').filter(Boolean);
  const first = segments[0];
  
  if (first && (locales as readonly string[]).includes(first)) {
    return first as Locale;
  }
  return defaultLocale;
}

/**
 * Get a translation function for the given locale.
 */
export function useTranslations(lang: Locale) {
  return function t(key: string): string {
    return ui[lang]?.[key] ?? ui[defaultLocale]?.[key] ?? key;
  };
}

/**
 * Build a localized URL path. Handles the base path and default locale (no prefix).
 * E.g. getLocalizedUrl('ru', '/about/') → "/Agentic_CMS/ru/about/"
 *      getLocalizedUrl('es', '/about/') → "/Agentic_CMS/about/"
 */
export function getLocalizedUrl(locale: Locale, path: string = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) {
    return `${base}${cleanPath}`;
  }
  return `${base}/${locale}${cleanPath}`;
}

/**
 * Get the content folder prefix for a given locale.
 * Used to filter content collections by locale.
 * Content is stored as: src/content/pages/es/index.md → id = "es/index"
 */
export function getContentPrefix(locale: Locale): string {
  return `${locale}/`;
}

/**
 * Extract locale from a content entry's id.
 * E.g. "es/index" → "es", "ru/about" → "ru"
 */
export function getLocaleFromId(id: string): Locale {
  const prefix = id.split('/')[0];
  if ((locales as readonly string[]).includes(prefix)) {
    return prefix as Locale;
  }
  return defaultLocale;
}

/**
 * Strip the locale prefix from a content entry's id to get the slug.
 * E.g. "es/index" → "index", "ru/espresso" → "espresso"
 */
export function getSlugFromId(id: string): string {
  const parts = id.split('/');
  let slug = id;
  if ((locales as readonly string[]).includes(parts[0])) {
    slug = parts.slice(1).join('/');
  }
  return slug.replace(/\.md$/, '').replace(/\.json$/, '');
}

export { defaultLocale, locales, type Locale } from './ui';
