"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDict } from "@/content/site";
import { projects } from "@/content/projects";
import { places } from "@/lib/places";
import { projectHref, type Lang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/ui/Reveal";

export default function Work({ lang }: { lang: Lang }) {
  const dict = getDict(lang);

  return (
    <section id="projets" className="relative border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-[110rem] px-5 md:px-10">
        <SectionHeading index={dict.work.index} title={dict.work.title} lead={dict.work.lead} />

        <ul className="mt-16 border-t hairline">
          {projects.map((project, index) => {
            const copy = project.copy[lang];

            return (
              <li key={project.slug} className="border-b hairline">
                <FadeUp>
                  <Link
                    href={projectHref(lang, project.slug)}
                    className="group relative block overflow-hidden px-1 py-8 md:py-10"
                  >
                    {/* Accent wash that wipes in from the bottom on hover. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[linear-gradient(180deg,transparent,rgba(245,179,1,0.07))] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    />

                    <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
                      <span className="font-mono text-xs text-zinc-600 md:w-10">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="label text-accent">{copy.context}</p>

                        <h3 className="font-display mt-2 text-[clamp(1.9rem,5vw,4rem)] leading-[0.95] tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                          {copy.title}
                        </h3>

                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                          {copy.tagline}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col items-start gap-3 md:w-56 md:items-end">
                        <p className="font-mono text-xs text-zinc-500">{project.year}</p>

                        <ul className="flex flex-wrap gap-2 md:justify-end">
                          {project.places.map((id) => (
                            <li
                              key={id}
                              className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] tracking-wide text-zinc-300"
                            >
                              {places[id].name[lang]}
                            </li>
                          ))}
                        </ul>

                        <span className="mt-1 inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 transition-colors group-hover:text-accent">
                          {dict.work.caseStudy}
                          <span className="flex size-9 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-accent">
                            <ArrowUpRight
                              size={16}
                              className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
