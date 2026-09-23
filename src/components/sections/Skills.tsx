"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Check } from "lucide-react";
import { getDict } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { useCanvasEnabled } from "@/components/three/useCanvasEnabled";

const SkillsCanvas = dynamic(
  () => import("@/components/three/scenes").then((module) => module.SkillsCanvas),
  { ssr: false },
);

export default function Skills({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const { enabled } = useCanvasEnabled();
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  const icons = dict.skills.groups.map((group) => group.icon);

  useEffect(() => {
    if (!enabled) return;

    // Whichever row is closest to the middle of the viewport owns the 3D slot.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;

        const index = rowRefs.current.indexOf(visible.target as HTMLLIElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );

    rowRefs.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <section id="competences" className="relative border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-[110rem] px-5 md:px-10">
        <SectionHeading
          index={dict.skills.index}
          title={dict.skills.title}
          lead={dict.skills.lead}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-square overflow-hidden rounded-3xl border hairline bg-[radial-gradient(circle_at_50%_40%,rgba(245,179,1,0.10),transparent_62%)]">
                {enabled ? <SkillsCanvas icons={icons} active={active} /> : null}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <p className="font-display text-2xl tracking-tight">
                    {dict.skills.groups[active].title}
                  </p>
                  <p className="label text-zinc-500">
                    {String(active + 1).padStart(2, "0")} / {String(icons.length).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ul className="divide-y divide-white/10 border-y hairline">
            {dict.skills.groups.map((group, index) => (
              <li
                key={group.title}
                ref={(node) => {
                  rowRefs.current[index] = node;
                }}
                onMouseEnter={() => setActive(index)}
                className="group py-7 transition-colors"
              >
                <FadeUp>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                      {group.title}
                    </h3>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2 pl-9">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 font-mono text-xs text-zinc-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </FadeUp>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 rounded-3xl border hairline bg-ink-soft p-8 md:p-12">
          <FadeUp>
            <h3 className="font-display text-2xl tracking-tight md:text-3xl">
              {dict.skills.managementTitle}
              <span className="text-accent">.</span>
            </h3>
          </FadeUp>

          <StaggerGroup className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {dict.skills.management.map((item) => (
              <StaggerItem key={item}>
                <p className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
