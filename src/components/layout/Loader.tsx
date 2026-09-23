"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "cbk:intro-seen";

/**
 * Intro curtain with a counter.
 *
 * The counter is deliberately synthetic: it eases to 100 over a fixed window
 * rather than reporting real asset progress. The heavy assets here are the
 * WebGL chunks, which load *after* first paint on purpose — a truthful progress
 * bar would sit at 100% while the interesting part hadn't started.
 *
 * The curtain ships in the HTML with `hidden` set, and the effect only unhides
 * it when it should actually play. That way visitors without JavaScript, and
 * crawlers, never meet a curtain that has nothing to lift it, and showing it
 * costs a DOM write rather than a state change and a second render.
 *
 * Plays once per tab; the page content is always in the DOM underneath.
 */
export default function Loader({ name, hint }: { name: string; hint: string }) {
  const curtain = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = curtain.current;
    if (!element) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private mode or blocked storage: treat as a first visit and play it.
    }

    if (reduced || seen) return;

    element.hidden = false;
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1700;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Expo-out, so the number races early and settles on the last few percent.
      setProgress(Math.round((1 - Math.pow(2, -10 * t)) * 100));

      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      // Lift the curtain, then take it out of the layout once it has cleared.
      element.style.transform = "translateY(-100%)";
      document.body.style.overflow = "";
      window.setTimeout(() => {
        element.hidden = true;
      }, 900);

      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Nothing to do — the intro simply plays again next navigation.
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={curtain}
      hidden
      aria-hidden="true"
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink px-5 py-8 transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] md:px-10 md:py-12"
    >
      <p className="label text-zinc-500">{hint}</p>

      <div className="flex items-end justify-between gap-6">
        <p className="font-display max-w-md text-2xl leading-tight tracking-tight text-paper md:text-4xl">
          {name}
        </p>
        <p className="font-display text-[18vw] leading-[0.75] tracking-tighter text-paper md:text-[12vw]">
          {progress}
          <span className="text-accent">%</span>
        </p>
      </div>

      <div className="mt-6 h-px w-full bg-ink-line">
        <div className="h-px bg-accent" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
