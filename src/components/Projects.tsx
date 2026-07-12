"use client";

import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Reveal";

export default function Projects() {
  return (
    <section id="projets" className="bg-ink py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
          04 — Projets
        </p>
        <FadeUp>
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
            Des produits en production<span className="text-accent">.</span>
          </h2>
        </FadeUp>

        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.1}>
          {projects.map((project) => {
            const hasLink = project.link !== "#";
            return (
              <StaggerItem
                key={project.title}
                className={project.featured ? "md:col-span-2" : ""}
              >
                <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-accent/60 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                        {project.context}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight">
                        {project.title}
                      </h3>
                    </div>
                    {hasLink ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visiter ${project.title} (nouvel onglet)`}
                        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:border-accent group-hover:text-accent"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    ) : (
                      <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        Sur demande
                      </span>
                    )}
                  </div>

                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400">
                    {project.description}
                  </p>
                  <p className="mt-3 text-sm font-medium text-zinc-300">
                    Rôle : {project.role}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-zinc-300"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
