"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { slogans } from "@/lib/data";

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [imgError, setImgError] = useState(false);

  const next = () => setSlide((s) => (s + 1) % slogans.length);
  const prev = () => setSlide((s) => (s - 1 + slogans.length) % slogans.length);

  useEffect(() => {
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [slide]);

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center overflow-hidden bg-ink text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(245,179,1,0.08),transparent_55%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-5 pb-28 pt-28 md:px-8 md:pb-24">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-center md:gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative size-64 shrink-0 sm:size-80 md:size-[26rem]"
          >
            <div className="absolute inset-0 rounded-full bg-accent" />
            {imgError ? (
              <div
                role="img"
                aria-label="Portrait de Christian Bakiti Kamga (photo à ajouter)"
                className="absolute inset-3 flex items-center justify-center rounded-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
              >
                <span className="text-6xl font-bold tracking-tight text-zinc-600 md:text-8xl">
                  CB
                </span>
              </div>
            ) : (
              <div className="absolute inset-x-6 bottom-0 top-[-8%] overflow-hidden rounded-b-full">
                <Image
                  src="/images/myprofile.png"
                  alt="Portrait de Christian Bakiti Kamga"
                  fill
                  priority
                  sizes="(min-width: 768px) 416px, 320px"
                  className="scale-125 object-cover object-[45%_38%]"
                  onError={() => setImgError(true)}
                />
              </div>
            )}
          </motion.div>

          <div className="relative z-10 text-center md:-ml-16 md:text-left">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
              Christian Bakiti Kamga — Full Stack & DevOps ii
            </p>
            <h1 className="text-7xl font-bold leading-[0.95] tracking-tight sm:text-8xl md:text-[7.5rem]">
              <AnimatePresence mode="wait">
                <motion.span key={slide} className="block">
                  {slogans[slide].map((line, i) => (
                    <motion.span
                      key={line}
                      className="block"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {line}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative z-10 mt-14 max-w-sm text-center md:absolute md:bottom-16 md:left-8 md:mt-0 md:rounded-2xl md:bg-ink/80 md:p-4 md:text-left md:backdrop-blur-sm lg:left-[max(2rem,calc((100vw-72rem)/2+2rem))]"
        >
          <p className="text-sm leading-relaxed text-zinc-300">
            Ingénieur full stack basé à Yaoundé. Je conçois des produits web et
            mobiles de bout en bout — du pixel au cluster Kubernetes — avec une
            spécialité paiements Mobile Money.
          </p>
          <a
            href="#a-propos"
            className="mt-4 inline-block text-sm font-semibold text-white underline underline-offset-4 transition-colors hover:text-accent"
          >
            En savoir plus
          </a>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3 md:inset-x-auto md:bottom-auto md:right-8 md:top-1/2 md:-translate-y-1/2 md:flex-col">
        <button
          type="button"
          onClick={prev}
          aria-label="Slogan précédent"
          className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Slogan suivant"
          className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
