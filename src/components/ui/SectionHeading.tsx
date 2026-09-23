"use client";

import { FadeUp, MaskLine } from "@/components/ui/Reveal";

/** Index number, masked title, optional lead — the shared header for every section. */
export default function SectionHeading({
  index,
  title,
  lead,
  className,
}: {
  index: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <header className={className}>
      <FadeUp>
        <p className="label flex items-center gap-4 text-zinc-500">
          <span className="text-accent">{index}</span>
          <span className="h-px w-12 bg-white/15" />
        </p>
      </FadeUp>

      <h2 className="text-section font-display mt-5 max-w-[18ch]">
        <MaskLine>{title}</MaskLine>
      </h2>

      {lead ? (
        <FadeUp delay={0.12}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">{lead}</p>
        </FadeUp>
      ) : null}
    </header>
  );
}
