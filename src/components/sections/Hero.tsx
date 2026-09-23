"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { getDict } from "@/content/site";
import type { Lang } from "@/lib/i18n";
import { useCanvasEnabled } from "@/components/three/useCanvasEnabled";
import Magnetic from "@/components/ui/Magnetic";

// The WebGL bundle is the heaviest thing on the site. Splitting it out keeps it
// off the critical path: the headline paints from the server HTML, the scene
// fades in behind it a moment later.
const HeroCanvas = dynamic(
  () => import("@/components/three/scenes").then((module) => module.HeroCanvas),
  { ssr: false },
);

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const { enabled, tier } = useCanvasEnabled();
  const [index, setIndex] = useState(0);

  const lines = dict.hero.lines;

  useEffect(() => {
    const id = setInterval(() => setIndex((value) => (value + 1) % lines.length), 5200);
    return () => clearInterval(id);
  }, [lines.length]);

  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
    >
      {/* Static stand-in: also what ships in the exported HTML and what a
          reduced-motion or WebGL-less visitor keeps. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_68%_38%,rgba(245,179,1,0.16),transparent_58%),radial-gradient(ellipse_at_20%_80%,rgba(91,124,255,0.10),transparent_55%)]"
      />

      {enabled ? (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <HeroCanvas tier={tier} />
        </motion.div>
      ) : null}

      {/* Scrim under the type. The scene drifts; legibility must not. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink from-10% via-ink/70 via-45% to-transparent to-85%"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[110rem] flex-1 flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32">
        <motion.p
          className="label flex items-center gap-3 text-zinc-400"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {dict.hero.eyebrow}
        </motion.p>

        <div className="py-10">
          <h1 className="text-display font-display max-w-[16ch]">
            <span className="sr-only">{lines[0].join(" ")}</span>
            <AnimatePresence mode="wait">
              <motion.span key={index} aria-hidden="true" className="block">
                {lines[index].map((line, lineIndex) => (
                  <span key={line} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-105%" }}
                      transition={{
                        duration: 0.85,
                        delay: lineIndex * 0.07,
                        ease: EASE,
                      }}
                    >
                      {line}
                      {lineIndex === lines[index].length - 1 ? (
                        <span className="text-accent">.</span>
                      ) : null}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </AnimatePresence>
          </h1>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          >
            <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
              {dict.hero.intro}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#projets"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink"
                >
                  {dict.hero.cta}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-accent hover:text-accent"
                >
                  {dict.hero.ctaContact}
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 self-start md:self-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span className="label text-zinc-500">{dict.hero.scroll}</span>
            <motion.span
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-accent"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={16} />
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Fade the scene into the section below so the seam never shows. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink"
      />
    </section>
  );
}
