"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Move3d } from "lucide-react";
import { getDict } from "@/content/site";
import { projects, type Project } from "@/content/projects";
import { places } from "@/lib/places";
import { homeHref, projectHref, type Lang } from "@/lib/i18n";
import { FadeUp, MaskLine, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { useCanvasEnabled } from "@/components/three/useCanvasEnabled";

const GlobeCanvas = dynamic(
  () => import("@/components/three/scenes").then((module) => module.GlobeCanvas),
  { ssr: false },
);

export default function ProjectDetail({ project, lang }: { project: Project; lang: Lang }) {
  const dict = getDict(lang);
  const copy = project.copy[lang];
  const { enabled, tier } = useCanvasEnabled();

  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      {/* ------------------------------------------------------------ header */}
      <header className="relative overflow-hidden border-b hairline pb-16 pt-32 md:pb-24 md:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_0%,rgba(245,179,1,0.14),transparent_55%)]"
        />

        <div className="relative mx-auto max-w-[110rem] px-5 md:px-10">
          <Link
            href={`${homeHref(lang)}#projets`}
            className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            {dict.project.back}
          </Link>

          <p className="label mt-10 text-accent">{copy.context}</p>

          <h1 className="text-display font-display mt-4 max-w-[14ch]">
            <MaskLine>{copy.title}</MaskLine>
          </h1>

          <FadeUp delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
              {copy.tagline}
            </p>
          </FadeUp>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border hairline bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-ink px-5 py-5">
              <dt className="label text-zinc-500">{dict.project.role}</dt>
              <dd className="mt-2 text-sm leading-snug text-zinc-200">{copy.role}</dd>
            </div>
            <div className="bg-ink px-5 py-5">
              <dt className="label text-zinc-500">{dict.project.year}</dt>
              <dd className="mt-2 text-sm text-zinc-200">{project.year}</dd>
            </div>
            <div className="bg-ink px-5 py-5">
              <dt className="label text-zinc-500">{dict.project.where}</dt>
              <dd className="mt-2 text-sm text-zinc-200">
                {project.places.map((id) => places[id].name[lang]).join(" · ")}
              </dd>
            </div>
            <div className="bg-ink px-5 py-5">
              <dt className="label text-zinc-500">{dict.project.link}</dt>
              <dd className="mt-2 text-sm">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent hover:underline"
                  >
                    {dict.work.liveSite}
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <span className="text-zinc-500">{dict.work.onRequest}</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {/* ----------------------------------------------------------- problem */}
      <section className="border-b hairline py-20 md:py-28">
        <div className="mx-auto grid max-w-[110rem] gap-10 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
          <FadeUp>
            <p className="text-lg leading-relaxed text-zinc-200 md:text-2xl md:leading-relaxed">
              {copy.summary}
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-3xl border hairline bg-ink-soft p-7 md:p-9">
              <h2 className="font-display text-xl tracking-tight md:text-2xl">
                {dict.project.problem}
                <span className="text-accent">.</span>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-zinc-400 md:text-base">
                {copy.problem}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ------------------------------------------------------ contributions */}
      <section className="border-b hairline py-20 md:py-28">
        <div className="mx-auto max-w-[110rem] px-5 md:px-10">
          <FadeUp>
            <p className="label text-zinc-500">{dict.project.contributionLead}</p>
          </FadeUp>

          <h2 className="text-section font-display mt-5 max-w-[16ch]">
            <MaskLine>{dict.project.contribution}</MaskLine>
          </h2>

          <ol className="mt-14 border-t hairline">
            {copy.contributions.map((item, itemIndex) => (
              <li key={item.title} className="border-b hairline">
                <FadeUp>
                  <div className="grid gap-4 py-8 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.3fr)] md:gap-10 md:py-10">
                    <span className="font-mono text-xs text-accent">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl leading-tight tracking-tight md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
                      {item.body}
                    </p>
                  </div>
                </FadeUp>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------------------- globe */}
      <section className="relative overflow-hidden border-b hairline py-20 md:py-28">
        <div className="mx-auto grid max-w-[110rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <FadeUp>
              <p className="label text-zinc-500">{dict.project.whereLead}</p>
            </FadeUp>

            <h2 className="text-section font-display mt-5">
              <MaskLine>{dict.project.where}</MaskLine>
            </h2>

            <FadeUp delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-300 md:text-lg">
                {copy.reach}
              </p>
            </FadeUp>

            <ul className="mt-10 space-y-px overflow-hidden rounded-2xl border hairline bg-white/10">
              {project.places.map((id) => {
                const place = places[id];
                return (
                  <li key={id} className="flex items-center justify-between gap-4 bg-ink px-5 py-4">
                    <div>
                      <p className="font-display text-lg tracking-tight">{place.name[lang]}</p>
                      <p className="mt-0.5 text-xs text-zinc-500">{place.city}</p>
                    </div>
                    <p className="font-mono text-xs text-zinc-500">
                      {place.lat.toFixed(2)}°, {place.lon.toFixed(2)}°
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <FadeUp delay={0.15}>
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              {/* Halo behind the sphere; also the whole visual when WebGL is off. */}
              <div
                aria-hidden="true"
                className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(127,166,255,0.14),transparent_68%)]"
              />

              {enabled ? (
                <GlobeCanvas placeIds={project.places} tier={tier} />
              ) : (
                <div className="flex size-full items-center justify-center rounded-full border hairline">
                  <p className="max-w-[16rem] px-6 text-center text-sm text-zinc-500">
                    {project.places.map((id) => places[id].name[lang]).join(" · ")}
                  </p>
                </div>
              )}
            </div>

            {enabled ? (
              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-600">
                <Move3d size={14} />
                {dict.project.globeHint}
              </p>
            ) : null}
          </FadeUp>
        </div>
      </section>

      {/* ------------------------------------------------------ stack & outcome */}
      <section className="border-b hairline py-20 md:py-28">
        <div className="mx-auto grid max-w-[110rem] gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display text-2xl tracking-tight md:text-3xl">
              {dict.project.stack}
              <span className="text-accent">.</span>
            </h2>

            <StaggerGroup className="mt-8 space-y-7">
              {project.stack.map((group) => (
                <StaggerItem key={group.label}>
                  <p className="label text-zinc-500">{group.label}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 font-mono text-xs text-zinc-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <div>
            <h2 className="font-display text-2xl tracking-tight md:text-3xl">
              {dict.project.outcome}
              <span className="text-accent">.</span>
            </h2>

            <StaggerGroup className="mt-8 space-y-5">
              {copy.outcome.map((item) => (
                <StaggerItem key={item}>
                  <p className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300 md:text-base">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>

            {project.link ? (
              <Magnetic className="mt-10">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink"
                >
                  {dict.project.visit}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </Magnetic>
            ) : null}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- next project */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[110rem] px-5 md:px-10">
          <Link
            href={projectHref(lang, next.slug)}
            className="group flex flex-col gap-4 rounded-3xl border hairline p-8 transition-colors hover:border-accent/50 md:flex-row md:items-center md:justify-between md:p-12"
          >
            <div>
              <p className="label text-zinc-500">{dict.project.next}</p>
              <p className="font-display mt-3 text-[clamp(1.8rem,5vw,3.5rem)] leading-none tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                {next.copy[lang].title}
              </p>
            </div>
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/15 text-accent transition-colors group-hover:border-accent">
              <ArrowRight
                size={20}
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>
      </section>
    </article>
  );
}
