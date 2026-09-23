"use client";

import { ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";
import { contact, getDict, location } from "@/content/site";
import { withBasePath } from "@/lib/base-path";
import type { Lang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

export default function Contact({ lang }: { lang: Lang }) {
  const dict = getDict(lang);

  const rows = [
    { icon: Mail, label: dict.contact.emailLabel, value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: dict.contact.phoneLabel, value: contact.phone, href: contact.phoneHref },
    { icon: MapPin, label: dict.contact.locationLabel, value: location[lang], href: null },
  ];

  return (
    <section id="contact" className="relative border-t hairline py-24 md:py-32">
      {/* A pool of accent light under the closing call to action. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(245,179,1,0.13),transparent_58%)]"
      />

      <div className="relative mx-auto max-w-[110rem] px-5 md:px-10">
        <SectionHeading index={dict.contact.index} title={dict.contact.title} lead={dict.contact.lead} />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <FadeUp>
              <Magnetic>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-display group inline-flex max-w-full items-center gap-4 text-[clamp(1.6rem,5vw,3.6rem)] leading-none tracking-tight transition-colors hover:text-accent"
                >
                  <span className="min-w-0 break-all">{contact.email}</span>
                  <ArrowUpRight
                    className="hidden shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 sm:block"
                    size={40}
                  />
                </a>
              </Magnetic>
            </FadeUp>

            <div className="mt-12 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={withBasePath(contact.cv)}
                  download={contact.cvFileName}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink"
                >
                  <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
                  {dict.contact.cv}
                </a>
              </Magnetic>

              {[
                { href: contact.github, label: "GitHub" },
                { href: contact.linkedin, label: "LinkedIn" },
              ].map((item) => (
                <Magnetic key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                  >
                    {item.label}
                    <ArrowUpRight size={15} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <dl className="divide-y divide-white/10 border-y hairline">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center gap-4 py-5">
                <row.icon size={18} className="shrink-0 text-accent" />
                <div className="min-w-0">
                  <dt className="label text-zinc-500">{row.label}</dt>
                  <dd className="mt-1 truncate text-sm text-zinc-200">
                    {row.href ? (
                      <a href={row.href} className="transition-colors hover:text-accent">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
