"use client";

import { GraduationCap } from "lucide-react";
import { education, experiences } from "@/lib/data";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Reveal";
import { OrbitDoodle, SpiralDoodle, WaveDoodle } from "@/components/Doodle";

const doodles = [WaveDoodle, OrbitDoodle, SpiralDoodle];

export default function Experience() {
  return (
    <section id="parcours" className="bg-paper py-24 text-ink md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
          03 — Parcours
        </p>
        <FadeUp>
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
            5 ans de terrain, 3 aventures<span className="text-accent">.</span>
          </h2>
        </FadeUp>

        <StaggerGroup className="mt-14" stagger={0.15}>
          {experiences.map((exp, i) => {
            const Doodle = doodles[i % doodles.length];
            return (
              <StaggerItem
                key={exp.company}
                className="group relative overflow-hidden border-l-2 border-zinc-300 pb-12 pl-8 last:pb-0 md:pl-12"
              >
                <Doodle className="pointer-events-none absolute -right-6 top-0 hidden h-40 w-40 text-accent/10 transition-all duration-700 ease-out group-hover:-translate-y-1 group-hover:rotate-6 group-hover:text-accent/25 lg:block" />
                <span
                  aria-hidden="true"
                  className="absolute -left-[9px] top-1 size-4 rounded-full border-2 border-paper bg-accent"
                />
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {exp.period} · {exp.location}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-tight md:text-2xl">
                  {exp.role}
                </h3>
                <p className="mt-1 font-semibold text-zinc-600">{exp.company}</p>
                <ul className="relative mt-4 max-w-3xl space-y-2">
                  {exp.highlights.map((item) => (
                    <li
                      key={item}
                      className="relative pl-5 text-sm leading-relaxed text-zinc-700 before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:rounded-full before:bg-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <FadeUp delay={0.1} className="mt-20">
          <h3 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
            <GraduationCap size={18} aria-hidden="true" />
            Formation
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {education.map((item) => (
              <div
                key={item.degree}
                className="rounded-2xl border border-zinc-200 bg-white p-6"
              >
                <p className="font-mono text-xs text-zinc-500">{item.period}</p>
                <p className="mt-2 font-semibold leading-snug">{item.degree}</p>
                <p className="mt-1 text-sm text-zinc-600">{item.school}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
