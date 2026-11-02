import type { Lang } from "@/lib/i18n";

export type SkillGroup = {
  /** Picks the procedural 3D glyph rendered beside the group. */
  icon: "code" | "layout" | "server" | "database" | "payment" | "cloud";
  title: string;
  items: string[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: { label: string; href: string }[];
  langSwitch: { label: string; aria: string };
  loader: { name: string; hint: string };
  hero: {
    eyebrow: string;
    lines: string[][];
    intro: string;
    cta: string;
    scroll: string;
    ctaContact: string;
  };
  about: {
    index: string;
    title: string;
    lead: string;
    body: string[];
    stats: { value: string; label: string }[];
    cv: string;
  };
  skills: {
    index: string;
    title: string;
    lead: string;
    groups: SkillGroup[];
    managementTitle: string;
    management: string[];
  };
  experience: {
    index: string;
    title: string;
    lead: string;
    items: Experience[];
    educationTitle: string;
    education: { degree: string; school: string; period: string }[];
  };
  work: {
    index: string;
    title: string;
    lead: string;
    caseStudy: string;
    liveSite: string;
    onRequest: string;
  };
  contact: {
    index: string;
    title: string;
    lead: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    cv: string;
  };
  project: {
    back: string;
    role: string;
    year: string;
    link: string;
    problem: string;
    contribution: string;
    contributionLead: string;
    stack: string;
    outcome: string;
    where: string;
    whereLead: string;
    visit: string;
    next: string;
    globeHint: string;
  };
  footer: { built: string; rights: string; top: string };
};

export const contact = {
  email: "christianbakiti07@gmail.com",
  phone: "+237 6 59 35 71 04",
  phoneHref: "tel:+237659357104",
  github: "https://github.com/PandaChrist",
  linkedin: "https://www.linkedin.com/in/christian-bakiti-7849b11a1/",
  cv: "/cv.pdf",
  cvFileName: "CV-Christian-Bakiti-Kamga.pdf",
};

const fr: Dictionary = {
  meta: {
    title: "Christian Bakiti Kamga — Ingénieur Full Stack & DevOps",
    description:
      "Ingénieur full stack et DevOps à Yaoundé. Je conçois des produits web et mobiles de bout en bout — du pixel au cluster Kubernetes — avec une spécialité paiements Mobile Money.",
  },
  nav: [
    { label: "À propos", href: "#a-propos" },
    { label: "Compétences", href: "#competences" },
    { label: "Parcours", href: "#parcours" },
    { label: "Projets", href: "#projets" },
    { label: "Contact", href: "#contact" },
  ],
  langSwitch: { label: "EN", aria: "Switch to English" },
  loader: { name: "Christian Bakiti Kamga", hint: "Chargement de la scène" },
  hero: {
    eyebrow: "Yaoundé, Cameroun — ouvert au remote",
    lines: [
      ["Concevoir.", "Scaler.", "Livrer"],
      ["Du pixel", "au cluster", "Kubernetes"],
      ["Le web.", "Le cloud.", "Le paiement"],
    ],
    intro:
      "Ingénieur full stack et DevOps, 6 ans d'expérience dont 2 comme référent technique. Je construis des produits web et mobiles de bout en bout, et je les emmène jusqu'en production.",
    cta: "Voir mes projets",
    ctaContact: "Me contacter",
    scroll: "Faites défiler",
  },
  about: {
    index: "01",
    title: "L'esthétique rencontre l'infrastructure",
    lead: "Un profil rare : le soin du front-end et la rigueur de la scalabilité back-end, dans la même personne.",
    body: [
      "Je m'appelle Christian Bakiti Kamga. Depuis six ans, je conçois et je livre des applications web et mobiles — et depuis deux ans, je le fais en tant que référent technique : architecture, choix de stack, encadrement d'équipes et de prestataires.",
      "Ce qui me distingue, c'est de ne pas avoir choisi mon camp. Je sais construire une interface qui donne envie et un design system qui tient dans la durée. Je sais aussi conteneuriser les services, les orchestrer sur Kubernetes et automatiser la chaîne de déploiement jusqu'à ce que la mise en production devienne un non-événement.",
      "Ma spécialité concrète, c'est le paiement en contexte africain : Mobile Money, CinetPay, Flutterwave, MonetBil. Encaisser de l'argent sur un marché où la carte bancaire est minoritaire, ce n'est pas un détail d'intégration — c'est une contrainte d'architecture qui remonte jusqu'au modèle de données.",
    ],
    stats: [
      { value: "5", label: "ans d'expérience" },
      { value: "2", label: "ans comme référent technique" },
      { value: "3", label: "plateformes : web, Android, iOS" },
      { value: "4", label: "passerelles de paiement intégrées" },
    ],
    cv: "Télécharger le CV",
  },
  skills: {
    index: "02",
    title: "La chaîne complète",
    lead: "Du composant React au pipeline CI/CD, sans rupture de responsabilité.",
    groups: [
      { icon: "code", title: "Langages", items: ["JavaScript", "Python", "PHP", "TypeScript"] },
      {
        icon: "layout",
        title: "Frontend",
        items: ["React.js", "Next.js", "React Native", "Tailwind CSS"],
      },
      {
        icon: "server",
        title: "Backend",
        items: ["Node.js", "Laravel", "FastAPI", "Angular 18", "Flutter"],
      },
      {
        icon: "database",
        title: "Bases de données",
        items: ["PostgreSQL", "MySQL", "Firebase"],
      },
      {
        icon: "payment",
        title: "API & Paiement",
        items: ["REST", "OAuth / JWT", "Stripe", "Flutterwave", "CinetPay", "MonetBil", "Mobile Money"],
      },
      {
        icon: "cloud",
        title: "DevOps & Cloud",
        items: ["Docker", "Kubernetes (GKE)", "GCP", "GitLab CI/CD"],
      },
    ],
    managementTitle: "Et côté pilotage",
    management: [
      "Pilotage technique de projets multi-équipes",
      "Encadrement de prestataires et de développeurs",
      "Coordination design / backend / produit",
      "Documentation technique & revue de code",
      "Mise en place de design systems scalables",
    ],
  },
  experience: {
    index: "03",
    title: "Le parcours",
    lead: "Trois entreprises, une progression : développeur, puis référent technique.",
    items: [
      {
        role: "Ingénieur Full Stack & Responsable Technique",
        company: "UMOJA DS",
        period: "2024 — Aujourd'hui",
        location: "Yaoundé, Cameroun",
        highlights: [
          "Pilotage technique de plusieurs plateformes digitales stratégiques, web et mobile : architecture, choix technologiques, livraisons.",
          "Conception d'un système complet de gestion de mobilité : réservation, paiement Mobile Money et gestion des disponibilités via API REST.",
          "Déploiement d'une infrastructure cloud-native sur GCP : Docker, Kubernetes (GKE), CI/CD GitLab.",
          "Encadrement et coordination des équipes backend, frontend et produit.",
        ],
      },
      {
        role: "Développeur Full Stack",
        company: "Alaxione Solutions · e-santé",
        period: "Juillet 2022 — Avril 2024",
        location: "Yaoundé, Cameroun",
        highlights: [
          "Développement d'un widget de prise de rendez-vous en ligne : performance, accessibilité, multi-environnements.",
          "Conception du module Survey pour la collecte et l'analyse de la satisfaction client.",
          "Industrialisation d'un design system et de composants réutilisables React & React Native.",
          "Optimisation UX/UI en environnement e-santé réglementé.",
        ],
      },
      {
        role: "Développeur Full Stack",
        company: "Iboga Group",
        period: "Juin 2020 — Juin 2022",
        location: "Yaoundé, Cameroun",
        highlights: [
          "Réalisation de plateformes web et institutionnelles pour divers secteurs d'activité.",
          "Mise en place d'architectures full stack robustes et performantes.",
          "Intégration de solutions d'intelligence artificielle.",
        ],
      },
    ],
    educationTitle: "Formation",
    education: [
      {
        degree: "Ingénieur des Travaux Informatiques",
        school: "Institut Africain d'Informatique",
        period: "2020 — 2021",
      },
      {
        degree: "Diplôme des Techniciens Supérieurs",
        school: "Institut Africain d'Informatique",
        period: "2018 — 2020",
      },
      { degree: "Baccalauréat Série D", school: "Lycée de la Cité-Verte", period: "2018" },
    ],
  },
  work: {
    index: "04",
    title: "Des produits en production",
    lead: "Chaque projet a sa page : le problème, ce que j'ai fait précisément, et pour quel pays.",
    caseStudy: "Lire l'étude de cas",
    liveSite: "Site en ligne",
    onRequest: "Sur demande",
  },
  contact: {
    index: "05",
    title: "Parlons de votre produit",
    lead: "Un projet, un poste, une architecture à challenger ? Écrivez-moi, je réponds.",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    locationLabel: "Localisation",
    cv: "Télécharger le CV",
  },
  project: {
    back: "Tous les projets",
    role: "Mon rôle",
    year: "Période",
    link: "Lien",
    problem: "Le problème",
    contribution: "Ce que j'ai fait",
    contributionLead: "Précisément, voici ma contribution sur ce projet.",
    stack: "La stack",
    outcome: "Ce que ça a donné",
    where: "Pour quel pays",
    whereLead: "Où ce produit vit, et d'où il a été construit.",
    visit: "Visiter le site",
    next: "Projet suivant",
    globeHint: "Glissez pour faire tourner le globe",
  },
  footer: {
    built: "Construit avec Next.js, Three.js et Tailwind CSS. Déployé en continu sur GitHub Pages.",
    rights: "Tous droits réservés.",
    top: "Haut de page",
  },
};

const en: Dictionary = {
  meta: {
    title: "Christian Bakiti Kamga — Full Stack & DevOps Engineer",
    description:
      "Full stack and DevOps engineer based in Yaoundé. I build web and mobile products end to end — from the pixel to the Kubernetes cluster — with a specialty in Mobile Money payments.",
  },
  nav: [
    { label: "About", href: "#a-propos" },
    { label: "Skills", href: "#competences" },
    { label: "Career", href: "#parcours" },
    { label: "Work", href: "#projets" },
    { label: "Contact", href: "#contact" },
  ],
  langSwitch: { label: "FR", aria: "Passer en français" },
  loader: { name: "Christian Bakiti Kamga", hint: "Loading the scene" },
  hero: {
    eyebrow: "Yaoundé, Cameroon — open to remote",
    lines: [
      ["Design.", "Scale.", "Ship"],
      ["From the pixel", "to the Kubernetes", "cluster"],
      ["The web.", "The cloud.", "The payment"],
    ],
    intro:
      "Full stack and DevOps engineer, 5 years of experience including 2 as technical lead. I build web and mobile products end to end, and take them all the way to production.",
    cta: "See my work",
    ctaContact: "Get in touch",
    scroll: "Scroll",
  },
  about: {
    index: "01",
    title: "Where craft meets infrastructure",
    lead: "A rare profile: front-end care and back-end scalability rigour, in the same person.",
    body: [
      "My name is Christian Bakiti Kamga. For five years I have been designing and shipping web and mobile applications — and for the last two, doing it as a technical lead: architecture, stack decisions, managing teams and contractors.",
      "What sets me apart is that I never picked a side. I can build an interface people want to use and a design system that survives contact with time. I can also containerise the services, orchestrate them on Kubernetes and automate the delivery chain until releasing becomes a non-event.",
      "My concrete specialty is payments in an African context: Mobile Money, CinetPay, Flutterwave, MonetBil. Collecting money in a market where cards are the minority is not an integration detail — it is an architectural constraint that reaches all the way down to the data model.",
    ],
    stats: [
      { value: "5", label: "years of experience" },
      { value: "2", label: "years as technical lead" },
      { value: "3", label: "platforms: web, Android, iOS" },
      { value: "4", label: "payment gateways integrated" },
    ],
    cv: "Download CV",
  },
  skills: {
    index: "02",
    title: "The whole chain",
    lead: "From the React component to the CI/CD pipeline, with no gap in ownership.",
    groups: [
      { icon: "code", title: "Languages", items: ["JavaScript", "TypeScript", "PHP"] },
      {
        icon: "layout",
        title: "Frontend",
        items: ["React.js", "Next.js", "React Native", "Tailwind CSS"],
      },
      {
        icon: "server",
        title: "Backend",
        items: ["Node.js", "Laravel", "FastAPI", "Angular 18", "Flutter"],
      },
      { icon: "database", title: "Databases", items: ["PostgreSQL", "MySQL", "Firebase"] },
      {
        icon: "payment",
        title: "API & Payments",
        items: ["REST", "OAuth / JWT", "Stripe", "Flutterwave", "CinetPay", "MonetBil", "Mobile Money"],
      },
      {
        icon: "cloud",
        title: "DevOps & Cloud",
        items: ["Docker", "Kubernetes (GKE)", "GCP", "GitLab CI/CD"],
      },
    ],
    managementTitle: "And on the leadership side",
    management: [
      "Technical leadership on multi-team projects",
      "Managing contractors and developers",
      "Design / backend / product coordination",
      "Technical documentation & code review",
      "Building scalable design systems",
    ],
  },
  experience: {
    index: "03",
    title: "The track record",
    lead: "Three companies, one trajectory: developer, then technical lead.",
    items: [
      {
        role: "Full Stack Engineer & Technical Lead",
        company: "UMOJA DS",
        period: "2024 — Present",
        location: "Yaoundé, Cameroon",
        highlights: [
          "Technical leadership on several strategic digital platforms, web and mobile: architecture, technology choices, delivery.",
          "Designed a complete mobility management system: booking, Mobile Money payment and availability management over a REST API.",
          "Deployed cloud-native infrastructure on GCP: Docker, Kubernetes (GKE), GitLab CI/CD.",
          "Led and coordinated the backend, frontend and product teams.",
        ],
      },
      {
        role: "Full Stack Developer",
        company: "Alaxione Solutions · e-health",
        period: "July 2022 — April 2024",
        location: "Yaoundé, Cameroon",
        highlights: [
          "Built an online appointment-booking widget: performance, accessibility, multi-environment.",
          "Designed the Survey module for collecting and analysing customer satisfaction.",
          "Industrialised a design system and reusable React & React Native components.",
          "UX/UI optimisation in a regulated e-health environment.",
        ],
      },
      {
        role: "Full Stack Developer",
        company: "Iboga Group",
        period: "June 2020 — June 2022",
        location: "Yaoundé, Cameroon",
        highlights: [
          "Delivered web and institutional platforms across a range of sectors.",
          "Set up robust, performant full stack architectures.",
          "Integrated artificial intelligence solutions.",
        ],
      },
    ],
    educationTitle: "Education",
    education: [
      {
        degree: "Computer Engineering degree (Ingénieur des Travaux Informatiques)",
        school: "Institut Africain d'Informatique",
        period: "2020 — 2021",
      },
      {
        degree: "Higher Technician Diploma (DTS)",
        school: "Institut Africain d'Informatique",
        period: "2018 — 2020",
      },
      { degree: "Baccalauréat, Science stream", school: "Lycée de la Cité-Verte", period: "2018" },
    ],
  },
  work: {
    index: "04",
    title: "Products in production",
    lead: "Every project has its own page: the problem, exactly what I did, and which country it was for.",
    caseStudy: "Read the case study",
    liveSite: "Live site",
    onRequest: "On request",
  },
  contact: {
    index: "05",
    title: "Let's talk about your product",
    lead: "A project, a role, an architecture to challenge? Write to me — I answer.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    locationLabel: "Location",
    cv: "Download CV",
  },
  project: {
    back: "All projects",
    role: "My role",
    year: "Period",
    link: "Link",
    problem: "The problem",
    contribution: "What I did",
    contributionLead: "Precisely, here is my contribution on this project.",
    stack: "The stack",
    outcome: "What came out of it",
    where: "Which country",
    whereLead: "Where this product lives, and where it was built from.",
    visit: "Visit the site",
    next: "Next project",
    globeHint: "Drag to spin the globe",
  },
  footer: {
    built: "Built with Next.js, Three.js and Tailwind CSS. Continuously deployed to GitHub Pages.",
    rights: "All rights reserved.",
    top: "Back to top",
  },
};

const dictionaries: Record<Lang, Dictionary> = { fr, en };

export function getDict(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export const location: Record<Lang, string> = {
  fr: "Yaoundé, Cameroun · ouvert au remote",
  en: "Yaoundé, Cameroon · open to remote",
};
