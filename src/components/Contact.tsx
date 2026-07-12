"use client";

import { Download, Mail, Phone } from "lucide-react";
import { contact } from "@/lib/data";
import { withBasePath } from "@/lib/base-path";
import { FadeUp } from "@/components/Reveal";

function GithubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="bg-accent py-24 text-ink md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ink/60">
          05 — Contact
        </p>
        <FadeUp>
          <h2 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            Travaillons ensemble.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
            Un produit à lancer, une plateforme à faire scaler ou des paiements
            Mobile Money à intégrer ? Basé à Yaoundé, disponible en remote.
          </p>
        </FadeUp>

        <FadeUp delay={0.15} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <Mail size={16} aria-hidden="true" />
            Contacter par email
          </a>
          <a
            href={withBasePath("/cv.pdf")}
            download="Christian-Bakiti-Kamga-CV.pdf"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            <Download size={16} aria-hidden="true" />
            Télécharger le CV
          </a>
          <a
            href={contact.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            <Phone size={16} aria-hidden="true" />
            {contact.phone}
          </a>
        </FadeUp>

        <FadeUp delay={0.25} className="mt-12 flex items-center gap-6">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Profil GitHub"
            className="flex size-12 items-center justify-center rounded-full border-2 border-ink transition-colors hover:bg-ink hover:text-accent"
          >
            <GithubIcon />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Profil LinkedIn"
            className="flex size-12 items-center justify-center rounded-full border-2 border-ink transition-colors hover:bg-ink hover:text-accent"
          >
            <LinkedinIcon />
          </a>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/60">
            {contact.location}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
