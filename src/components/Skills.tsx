"use client";

import {
  CheckCircle2,
  Cloud,
  Code2,
  CreditCard,
  Database,
  LayoutTemplate,
  Server,
  type LucideIcon,
} from "lucide-react";
import { managementSkills, skillGroups } from "@/lib/data";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Reveal";
import { OrbitDoodle, SpiralDoodle, WaveDoodle } from "@/components/Doodle";

const doodles = [WaveDoodle, OrbitDoodle, SpiralDoodle];

const icons: Record<string, LucideIcon> = {
  code: Code2,
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  creditcard: CreditCard,
  cloud: Cloud,
};

export default function Skills() {
  return (
    <section id="competences" className="bg-ink py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
          02 — Compétences
        </p>
        <FadeUp>
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
            Du pixel au cluster<span className="text-accent">.</span>
          </h2>
        </FadeUp>

        <StaggerGroup
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon];
            const Doodle = doodles[i % doodles.length];
            return (
              <StaggerItem
                key={group.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/50"
              >
                <Doodle className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 text-accent/10 transition-all duration-700 ease-out group-hover:-translate-y-1 group-hover:rotate-6 group-hover:text-accent/30" />
                <div className="relative flex items-center gap-3">
                  <Icon size={20} className="text-accent" aria-hidden="true" />
                  <h3 className="font-semibold">{group.title}</h3>
                </div>
                <ul className="relative mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-zinc-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <FadeUp delay={0.2} className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
            Leadership technique
          </h3>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {managementSkills.map((skill) => (
              <li key={skill} className="flex items-start gap-3 text-sm text-zinc-300">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                {skill}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
