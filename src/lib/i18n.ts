export const langs = ["fr", "en"] as const;

export type Lang = (typeof langs)[number];

export const defaultLang: Lang = "fr";

/** Route prefix for the projects index / detail pages, per language. */
export const projectsSegment: Record<Lang, string> = {
  fr: "projets",
  en: "projects",
};

export function homeHref(lang: Lang): string {
  return `/${lang}`;
}

export function projectHref(lang: Lang, slug: string): string {
  return `/${lang}/${projectsSegment[lang]}/${slug}`;
}

/** Same page, other language — used by the nav language switch. */
export function otherLang(lang: Lang): Lang {
  return lang === "fr" ? "en" : "fr";
}

/**
 * Narrows a raw route segment to a Lang.
 *
 * Next's generated route validator types dynamic params as `string`, so pages
 * take the loose type and pass it through here. Unknown values fall back to the
 * default language rather than throwing: with `dynamicParams = false` nothing
 * else can reach these routes anyway.
 */
export function asLang(value: string): Lang {
  return (langs as readonly string[]).includes(value) ? (value as Lang) : defaultLang;
}
