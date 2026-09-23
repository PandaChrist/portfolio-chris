"use client";

import { ArrowUpRight, ArrowUp } from "lucide-react";
import { contact, getDict } from "@/content/site";
import type { Lang } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  const dict = getDict(lang);

  const toTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t hairline bg-ink">
      <div className="mx-auto max-w-[110rem] px-5 py-10 md:px-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl tracking-tight md:text-3xl">
              Christian Bakiti Kamga
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
              {dict.footer.built}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {[
              { href: contact.github, label: "GitHub" },
              { href: contact.linkedin, label: "LinkedIn" },
              { href: `mailto:${contact.email}`, label: "Email" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-zinc-300 transition-colors hover:text-accent"
              >
                {item.label}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}

            <button
              type="button"
              onClick={toTop}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-zinc-300 transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowUp size={14} />
              {dict.footer.top}
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t hairline pt-6 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Christian Bakiti Kamga. {dict.footer.rights}
          </p>
          <p className="font-mono tracking-widest">YAOUNDÉ · CM</p>
        </div>
      </div>
    </footer>
  );
}
