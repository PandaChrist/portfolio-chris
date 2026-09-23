"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { getDict } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/ui/Reveal";

export default function Experience({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const timeline = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  // The accent rail fills as the timeline scrolls past, so progress through a
  // career reads as physical distance.
  const { scrollYProgress } = useScroll({
    target: timeline,
    offset: ["start 75%", "end 55%"],
  });
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  return (
    <section id="parcours" className="relative border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-[110rem] px-5 md:px-10">
        <SectionHeading
          index={dict.experience.index}
          title={dict.experience.title}
          lead={dict.experience.lead}
        />

        <ol ref={timeline} className="relative mt-16 space-y-14 pl-8 md:space-y-20 md:pl-14">
          {/* Rail */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-2 h-full w-px bg-white/10 md:left-2"
          />
          <motion.span
            aria-hidden="true"
            className="absolute left-0 top-2 h-full w-px origin-top bg-accent md:left-2"
            style={{ scaleY: reduced ? 1 : railScale }}
          />

          {dict.experience.items.map((item) => (
            <li key={`${item.company}-${item.period}`} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-8 top-2 flex size-3 items-center justify-center md:-left-[3.4rem]"
              >
                <span className="size-3 rounded-full border-2 border-ink bg-accent" />
              </span>

              <FadeUp>
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-8">
                  <h3 className="font-display text-2xl tracking-tight md:text-4xl">
                    {item.role}
                  </h3>
                  <p className="label shrink-0 text-accent">{item.period}</p>
                </div>

                <p className="mt-2 text-sm text-zinc-400">
                  {item.company} · {item.location}
                </p>

                <ul className="mt-6 space-y-3 border-l hairline pl-5">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm leading-relaxed text-zinc-300">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <FadeUp className="md:col-span-3">
            <h3 className="font-display flex items-center gap-3 text-2xl tracking-tight">
              <GraduationCap size={22} className="text-accent" />
              {dict.experience.educationTitle}
            </h3>
          </FadeUp>

          {dict.experience.education.map((entry, index) => (
            <FadeUp key={entry.degree} delay={index * 0.08}>
              <article className="h-full rounded-2xl border hairline bg-ink-soft p-6 transition-colors hover:border-accent/50">
                <p className="label text-accent">{entry.period}</p>
                <h4 className="mt-3 text-base font-semibold leading-snug">{entry.degree}</h4>
                <p className="mt-2 text-sm text-zinc-500">{entry.school}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
