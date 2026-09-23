import Link from "next/link";
import { defaultLang, homeHref, langs } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";

/**
 * The site lives under /fr and /en; this page is the only thing at the root and
 * its job is to hand the visitor to a language.
 *
 * It redirects with a meta refresh rather than `redirect()` — which needs a
 * server and is unavailable in a static export — or a client effect, which
 * would leave the root page inert until React had hydrated. The tag is written
 * through `withBasePath` so it stays correct under a GitHub Pages project path,
 * and the links below cover crawlers and anyone the refresh does not move.
 */
export default function EntryPage() {
  const target = withBasePath(`${homeHref(defaultLang)}/`);

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <link rel="canonical" href={target} />

      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-display text-2xl tracking-tight text-paper">
          Christian Bakiti Kamga
        </p>

        <nav className="flex flex-wrap justify-center gap-3">
          {langs.map((lang) => (
            <Link
              key={lang}
              href={homeHref(lang)}
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-paper transition-colors hover:border-accent hover:text-accent"
            >
              {lang === "fr" ? "Version française" : "English version"}
            </Link>
          ))}
        </nav>
      </main>
    </>
  );
}
