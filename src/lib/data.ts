export const nav = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Compétences", href: "#competences" },
  { label: "Parcours", href: "#parcours" },
  { label: "Projets", href: "#projets" },
  { label: "Contact", href: "#contact" },
];

export const contact = {
  email: "christianbakiti07@gmail.com",
  phone: "+237 6 59 35 71 04",
  phoneHref: "tel:+237659357104",
  location: "Yaoundé, Cameroun · ouvert au remote",
  github: "#",
  linkedin: "#",
};

export const slogans: string[][] = [
  ["coder.", "scaler.", "livrer."],
  ["web.", "cloud.", "fintech."],
];

export const skillGroups = [
  {
    title: "Langages",
    icon: "code" as const,
    items: ["JavaScript", "TypeScript", "PHP"],
  },
  {
    title: "Frontend",
    icon: "layout" as const,
    items: ["React.js", "Next.js", "React Native", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: "server" as const,
    items: ["Node.js", "Laravel", "FastAPI (en cours)", "Angular 18 (en cours)", "Flutter (en cours)"],
  },
  {
    title: "Bases de données",
    icon: "database" as const,
    items: ["PostgreSQL", "MySQL", "Firebase"],
  },
  {
    title: "API & Paiement",
    icon: "creditcard" as const,
    items: ["REST", "OAuth / JWT", "Stripe", "Flutterwave", "CinetPay", "MonetBil", "Mobile Money"],
  },
  {
    title: "DevOps & Cloud",
    icon: "cloud" as const,
    items: ["Docker", "Kubernetes (GKE)", "GCP", "GitLab CI/CD"],
  },
];

export const managementSkills = [
  "Pilotage technique de projets multi-équipes",
  "Encadrement de prestataires et développeurs",
  "Coordination design / backend / produit",
  "Documentation technique & code review",
  "Mise en place de design systems scalables",
];

export const experiences = [
  {
    role: "Ingénieur Full Stack & Responsable Technique",
    company: "UMOJA DS",
    period: "2024 — Aujourd'hui",
    location: "Yaoundé, Cameroun",
    highlights: [
      "Pilotage technique de plusieurs plateformes digitales stratégiques (web & mobile) : architecture, choix technologiques, livraisons.",
      "Conception d'un système complet de gestion de mobilité : modules de réservation, paiement (Mobile Money) et gestion des disponibilités via API REST.",
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
      "Développement d'un widget de prise de rendez-vous en ligne (performance, accessibilité, multi-environnements).",
      "Conception du module Survey pour la collecte et l'analyse de la satisfaction client (API REST, BDD).",
      "Industrialisation d'un design system et de composants réutilisables (React & React Native).",
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
];

export const education = [
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
  {
    degree: "Baccalauréat Série D",
    school: "Lycée de la Cité-Verte",
    period: "2018",
  },
];

export const projects = [
  {
    title: "Tugo — Gestion de mobilité",
    context: "UMOJA DS",
    description:
      "Réserver un trajet et le payer en Mobile Money depuis n'importe quel téléphone : plateforme complète de réservation, paiement et gestion des disponibilités via API REST, déployée sur une infrastructure cloud-native GCP. Applications web, Android et iOS.",
    role: "Responsable technique — architecture, paiements, infrastructure",
    tags: ["React Native", "Node.js", "Mobile Money", "GCP", "Kubernetes (GKE)", "GitLab CI/CD"],
    link: "https://tugo.africa/",
    featured: true,
  },
  {
    title: "Plateforme e-santé",
    context: "Alaxione",
    description:
      "Simplifier la prise de rendez-vous médicaux : widget embarquable performant et accessible, module Survey de mesure de la satisfaction patient, et design system partagé entre le web et le mobile.",
    role: "Développeur full stack",
    tags: ["React", "React Native", "Design system", "API REST", "Accessibilité"],
    link: "https://www.alaxione.fr/",
    featured: false,
  },
  {
    title: "Ecomatin",
    context: "Média",
    description:
      "Rendre l'information économique d'Afrique centrale accessible en ligne : plateforme éditoriale rapide, lisible et optimisée pour le référencement.",
    role: "Développeur full stack",
    tags: ["PHP", "MySQL", "SEO", "Performance"],
    link: "https://ecomatin.net/",
    featured: false,
  },
  {
    title: "Jestock",
    context: "Projet produit",
    description:
      "Aider les boutiques à suivre inventaire et ventes en temps réel : une API REST commune qui alimente un back-office Angular 18 et une application mobile Flutter.",
    role: "Concepteur & développeur",
    tags: ["FastAPI", "Angular 18", "Flutter", "PostgreSQL", "API REST"],
    link: "#",
    featured: false,
  },
  {
    title: "Video Save",
    context: "Extension",
    description:
      "Sauvegarder fichiers et vidéos vers le cloud en un clic : extension navigateur légère adossée à un service de téléchargement distant.",
    role: "Concepteur & développeur",
    tags: ["TypeScript", "Node.js", "Cloud", "Extension navigateur"],
    link: "#",
    featured: false,
  },
];
