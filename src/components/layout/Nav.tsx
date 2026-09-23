"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { contact, getDict } from "@/content/site";
import { homeHref, otherLang, projectsSegment, type Lang } from "@/lib/i18n";
import Magnetic from "@/components/ui/Magnetic";

/**
 * Anchor links only work on the home page. From a project page they have to
 * become links back to the home page with the hash appended.
 */
function resolveHref(href: string, lang: Lang, onHome: boolean): string {
  return onHome ? href : `${homeHref(lang)}${href}`;
}

export default function Nav({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const pathname = usePathname() ?? "";
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const onHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const other = otherLang(lang);

  // Same page, other language — a project page keeps its slug, everything else
  // falls back to that language's home.
  const projectMatch = pathname.match(
    new RegExp(`^/${lang}/${projectsSegment[lang]}/([^/]+)`),
  );
  const switchHref = projectMatch
    ? `/${other}/${projectsSegment[other]}/${projectMatch[1]}`
    : homeHref(other);

  useEffect(() => {
    let last = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      // Hide on the way down, reveal on the way up — but never while the mobile
      // sheet is open, and never in the first viewport.
      setHidden(current > last && current > 220 && !open);
      last = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="mx-auto flex max-w-[110rem] items-center justify-between gap-6 px-5 py-4 md:px-10 md:py-6">
          <Link
            href={homeHref(lang)}
            className="group flex items-center gap-3"
            aria-label="Christian Bakiti Kamga"
          >
            <span className="relative flex size-9 items-center justify-center rounded-full border border-white/15 bg-ink/70 backdrop-blur transition-colors group-hover:border-accent">
              <span className="font-display text-sm tracking-tight">CB</span>
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-accent" />
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">
              Christian Bakiti Kamga
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-ink/60 px-2 py-1.5 backdrop-blur lg:flex">
            {dict.nav.map((item) => (
              <a
                key={item.href}
                href={resolveHref(item.href, lang, onHome)}
                className="rounded-full px-4 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-paper"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={switchHref}
              aria-label={dict.langSwitch.aria}
              className="flex h-9 items-center rounded-full border border-white/15 px-3 font-mono text-xs tracking-widest text-zinc-300 transition-colors hover:border-accent hover:text-accent"
            >
              {dict.langSwitch.label}
            </Link>

            {/* Responsive visibility lives on the wrapper: Magnetic sets its own
                display, and two display utilities on one element resolve by
                stylesheet order rather than by which one was written last. */}
            <span className="hidden sm:block">
              <Magnetic>
                <a
                  href={resolveHref("#contact", lang, onHome)}
                  className="flex h-9 items-center rounded-full bg-accent px-5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
                >
                  {dict.hero.ctaContact}
                </a>
              </Magnetic>
            </span>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="flex size-9 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 lg:hidden"
            >
              <motion.span
                className="block h-px w-4 bg-paper"
                animate={{ rotate: open ? 45 : 0, y: open ? 3.5 : 0 }}
              />
              <motion.span
                className="block h-px w-4 bg-paper"
                animate={{ rotate: open ? -45 : 0, y: open ? -3.5 : 0 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-6 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {dict.nav.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + index * 0.06, duration: 0.5 }}
                >
                  <a
                    href={resolveHref(item.href, lang, onHome)}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2 text-[12vw] leading-none tracking-tight"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <a href={`mailto:${contact.email}`} className="hover:text-accent">
                {contact.email}
              </a>
              <Link
                href={switchHref}
                onClick={() => setOpen(false)}
                className="hover:text-accent"
              >
                {dict.langSwitch.label}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
