"use client";

import { motion, type Variants } from "framer-motion";
import { Download } from "lucide-react";
import { withBasePath } from "@/lib/base-path";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Reveal";

type Chunk = { text: string; chip?: "blue" | "orange" | "green"; suffix?: string };

const heading: Chunk[] = [
  { text: "Je conçois des" },
  { text: "interfaces soignées", chip: "blue", suffix: "," },
  { text: "des" },
  { text: "infrastructures qui scalent", chip: "orange" },
  { text: "et des" },
  { text: "paiements Mobile Money", chip: "green" },
  { text: "fiables, de bout en bout." },
];

const chipStyles = {
  blue: "border-blue-500 text-blue-600 bg-blue-500/5",
  orange: "border-orange-500 text-orange-600 bg-orange-500/5",
  green: "border-emerald-600 text-emerald-700 bg-emerald-600/5",
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const stats = [
  { value: "5 ans", label: "d'expérience full stack, du front à l'infra" },
  { value: "2 ans", label: "de pilotage technique et d'encadrement d'équipes" },
  { value: "4", label: "solutions de paiement intégrées — Stripe, Flutterwave, CinetPay, MonetBil" },
];

export default function About() {
  return (
    <section id="a-propos" className="bg-paper py-24 text-ink md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
          01 — À propos
        </p>

        <motion.h2
          className="max-w-4xl text-3xl font-bold leading-snug tracking-tight sm:text-4xl md:text-5xl md:leading-snug"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {heading.map((chunk, i) =>
            chunk.chip ? (
              <span key={i} className="my-1 mr-1 inline-flex items-baseline whitespace-normal">
                <motion.span
                  variants={wordVariants}
                  className={`ml-1 inline-block rounded-lg border-2 border-dashed px-3 py-0.5 ${chipStyles[chunk.chip]}`}
                >
                  {chunk.text}
                </motion.span>
                {chunk.suffix ? <span>{chunk.suffix}</span> : null}
              </span>
            ) : (
              chunk.text.split(" ").map((word, j) => (
                <motion.span
                  key={`${i}-${j}`}
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                  {" "}
                </motion.span>
              ))
            )
          )}
        </motion.h2>

        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <FadeUp delay={0.15} className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
              Ingénieur Full Stack & DevOps — Yaoundé, Cameroun
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
              5 ans d&apos;expérience · 2 ans référent technique
            </p>
            <p className="mt-6 leading-relaxed text-zinc-700">
              Développeur fullstack avec 5 ans d&apos;expérience, dont 2 ans en
              tant que référent technique. Je conçois et livre des applications
              web et mobiles de bout en bout, où l&apos;esthétique rencontre
              l&apos;efficacité. Spécialisé dans les systèmes de paiement Mobile
              Money et les architectures cloud-native scalables, je maîtrise
              aussi bien le front moderne que le back-end et la chaîne de
              déploiement complète. Autonome et rigoureux, capable
              d&apos;encadrer des équipes et des prestataires.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <a
              href={withBasePath("/cv.pdf")}
              download
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <Download size={16} aria-hidden="true" />
              Télécharger le CV
            </a>
          </FadeUp>
        </div>

        <StaggerGroup className="mt-20 grid gap-6 sm:grid-cols-3" stagger={0.12}>
          {stats.map((stat) => (
            <StaggerItem
              key={stat.value}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <p className="text-4xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
