"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { useInView } from "framer-motion";
import { contact, getDict } from "@/content/site";
import { withBasePath } from "@/lib/base-path";
import type { Lang } from "@/lib/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import Magnetic from "@/components/ui/Magnetic";

/** Counts up to the value the first time it scrolls into view. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const target = Number(value);
  const numeric = !Number.isNaN(target);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || !numeric) return;

    const start = performance.now();
    const duration = 900;
    let frame = 0;

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Cubic ease-out: most of the distance covered early, then a settle.
      setDisplay(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [inView, numeric, target]);

  // Anything that isn't a plain number is rendered as-is.
  return <span ref={ref}>{numeric ? display : value}</span>;
}

export default function About({ lang }: { lang: Lang }) {
  const dict = getDict(lang);
  const [portraitFailed, setPortraitFailed] = useState(false);

  const keywords = [
    "Full Stack",
    "DevOps",
    "Mobile Money",
    "Kubernetes",
    "Next.js",
    "Design system",
    "Cloud-native",
  ];

  return (
    <section id="a-propos" className="relative border-t hairline py-24 md:py-32">
      <div className="mx-auto max-w-[110rem] px-5 md:px-10">
        <SectionHeading index={dict.about.index} title={dict.about.title} lead={dict.about.lead} />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <FadeUp>
            <div className="group relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border hairline bg-ink-soft">
                {portraitFailed ? (
                  <div
                    role="img"
                    aria-label="Christian Bakiti Kamga"
                    className="flex size-full items-center justify-center bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
                  >
                    <span className="font-display text-8xl text-zinc-700">CB</span>
                  </div>
                ) : (
                  <Image
                    src={withBasePath("/images/myprofile.png")}
                    alt="Christian Bakiti Kamga"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    // Desaturated at rest, full colour on hover: the portrait
                    // stays subordinate to the type until you look at it.
                    className="object-cover object-[50%_25%] grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                    onError={() => setPortraitFailed(true)}
                  />
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                />
              </div>

              <div className="absolute -bottom-5 -right-3 rounded-2xl border hairline bg-ink px-5 py-4 md:-right-6">
                <p className="label text-zinc-500">Yaoundé · CM</p>
                <p className="mt-1 text-sm font-medium">GMT+1 · remote friendly</p>
              </div>
            </div>
          </FadeUp>

          <div>
            <div className="space-y-6">
              {dict.about.body.map((paragraph, index) => (
                <FadeUp key={index} delay={index * 0.08}>
                  <p className="text-base leading-relaxed text-zinc-300 md:text-lg">{paragraph}</p>
                </FadeUp>
              ))}
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border hairline bg-white/10 md:grid-cols-4">
              {dict.about.stats.map((stat) => (
                <div key={stat.label} className="bg-ink px-5 py-6">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="font-display block text-4xl tracking-tight text-accent md:text-5xl">
                      <CountUp value={stat.value} />
                    </span>
                    <span className="mt-2 block text-xs leading-snug text-zinc-500">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <FadeUp delay={0.15}>
              <Magnetic className="mt-10">
                <a
                  href={withBasePath(contact.cv)}
                  download={contact.cvFileName}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
                  {dict.about.cv}
                </a>
              </Magnetic>
            </FadeUp>
          </div>
        </div>
      </div>

      <div className="mt-20 border-y hairline">
        <Marquee items={keywords} />
      </div>
    </section>
  );
}
