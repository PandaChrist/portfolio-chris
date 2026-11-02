import type { Lang } from "@/lib/i18n";
import type { PlaceId } from "@/lib/places";

export type StackGroup = { label: string; items: string[] };

export type ProjectCopy = {
  title: string;
  /** Client or context label, shown above the title. */
  context: string;
  /** One line, used on the cards and as the page's meta description. */
  tagline: string;
  role: string;
  /** Opening paragraph of the detail page. */
  summary: string;
  problem: string;
  /** "En quoi précisément j'ai aidé" — the heart of each project page. */
  contributions: { title: string; body: string }[];
  outcome: string[];
  /** Why these countries, shown next to the globe. */
  reach: string;
};

export type Project = {
  slug: string;
  year: string;
  places: PlaceId[];
  stack: StackGroup[];
  link: string | null;
  copy: Record<Lang, ProjectCopy>;
};

export const projects: Project[] = [
  {
    slug: "tugo",
    year: "2024 — 2026",
    places: ["CM", "BE"],
    link: "https://tugo.africa/",
    stack: [
      { label: "Frontend", items: ["Next.js", "React Native", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "API REST", "PostgreSQL"] },
      { label: "Paiement", items: ["Mobile Money", "CinetPay", "MonetBil", "Webhooks"] },
      { label: "Infra", items: ["Docker", "Kubernetes (GKE)", "GCP", "GitLab CI/CD"] },
    ],
    copy: {
      fr: {
        title: "Tugo",
        context: "UMOJA DS · Mobilité",
        tagline: "Réserver un trajet et le payer en Mobile Money, depuis n'importe quel téléphone.",
        role: "Responsable technique — architecture, paiements, infrastructure",
        summary:
          "Tugo est une plateforme de mobilité : on réserve un trajet, on choisit une disponibilité, on paie avec son compte Mobile Money. Web, Android et iOS partagent la même API. J'en suis le référent technique depuis 2024 : architecture, choix de stack, intégration des paiements, infrastructure et coordination des équipes.",
        problem:
          "En Afrique centrale, la carte bancaire n'est pas le moyen de paiement par défaut — le Mobile Money l'est. Une plateforme de réservation qui ne sait pas encaisser via MTN MoMo ou Orange Money ne sert à rien sur ce marché. Il fallait donc un parcours de réservation où le paiement est une étape native et fiable, pas une pièce rapportée, et une infrastructure capable d'absorber les pics de trafic sans équipe d'astreinte pléthorique.",
        contributions: [
          {
            title: "Architecture et choix technologiques",
            body: "J'ai défini l'architecture de la plateforme : une API REST unique qui sert le web comme le mobile, un modèle de données pour les trajets, les disponibilités et les réservations, et le découpage en services. C'est moi qui tranche les choix de stack et qui les documente pour que l'équipe s'aligne dessus.",
          },
          {
            title: "Moteur de réservation et de disponibilités",
            body: "J'ai conçu le module qui gère les trajets, les créneaux et les places restantes — la partie où les conditions de course font le plus de dégâts. Réservation, modification, annulation et libération des places passent par des règles serveur centralisées plutôt que par la confiance dans le client.",
          },
          {
            title: "Intégration des paiements Mobile Money",
            body: "J'ai branché les agrégateurs Mobile Money (CinetPay, MonetBil) sur le parcours de réservation : initiation du paiement, écoute des webhooks de confirmation, réconciliation des transactions, et gestion des cas tordus — paiement confirmé après expiration du panier, double notification, échec silencieux de l'opérateur. Une réservation n'est validée que lorsque l'argent est réellement confirmé côté opérateur.",
          },
          {
            title: "Applications web, Android et iOS",
            body: "J'ai piloté la déclinaison du produit sur trois supports à partir d'une même API : un front Next.js et des applications React Native Android et iOS, avec des composants et des règles métier partagés pour éviter que les plateformes divergent.",
          },
          {
            title: "Infrastructure cloud-native et CI/CD",
            body: "J'ai conteneurisé les services avec Docker, orchestré le tout sur Kubernetes (GKE) chez GCP, et mis en place les pipelines GitLab CI/CD : build, tests, images versionnées et déploiement automatisé. Les mises en production sont devenues une formalité au lieu d'un événement.",
          },
          {
            title: "Encadrement des équipes",
            body: "Je coordonne les équipes backend, frontend et produit : découpage des chantiers, revues de code, documentation technique et arbitrages quand le calendrier et la qualité s'opposent.",
          },
        ],
        outcome: [
          "Un produit en production sur trois plateformes — web, Android et iOS — alimenté par une seule API.",
          "Le paiement Mobile Money traité comme un parcours critique : confirmation asynchrone, réconciliation, reprise sur échec.",
          "Des déploiements automatisés sur Kubernetes, reproductibles et sans intervention manuelle.",
        ],
        reach:
          "Le produit sert le marché camerounais, où le Mobile Money est le moyen de paiement dominant. L'équipe et le pilotage, eux, sont répartis entre Yaoundé et la Belgique — une organisation distribuée qui a façonné autant l'architecture que les process.",
      },
      en: {
        title: "Tugo",
        context: "UMOJA DS · Mobility",
        tagline: "Book a ride and pay for it with Mobile Money, from any phone.",
        role: "Technical lead — architecture, payments, infrastructure",
        summary:
          "Tugo is a mobility platform: book a ride, pick an available slot, pay from your Mobile Money account. Web, Android and iOS all run on the same API. I have been its technical lead since 2024 — architecture, stack decisions, payment integration, infrastructure and team coordination.",
        problem:
          "In Central Africa, the card is not the default payment method — Mobile Money is. A booking platform that cannot collect through MTN MoMo or Orange Money is useless on that market. So payment had to be a native, reliable step of the booking flow rather than a bolted-on afterthought, on infrastructure able to absorb traffic peaks without a large on-call team.",
        contributions: [
          {
            title: "Architecture and technology decisions",
            body: "I defined the platform's architecture: a single REST API serving both web and mobile, a data model for routes, availability and bookings, and the service boundaries. I own the stack decisions and document them so the team can align on them.",
          },
          {
            title: "Booking and availability engine",
            body: "I designed the module handling routes, time slots and remaining seats — the part where race conditions do the most damage. Booking, changes, cancellation and seat release all go through centralised server-side rules instead of trusting the client.",
          },
          {
            title: "Mobile Money payment integration",
            body: "I wired the Mobile Money aggregators (CinetPay, MonetBil) into the booking flow: payment initiation, confirmation webhooks, transaction reconciliation, and the awkward cases — payment confirmed after the cart expired, duplicate notifications, silent operator failures. A booking is only confirmed once the money is actually confirmed on the operator's side.",
          },
          {
            title: "Web, Android and iOS applications",
            body: "I drove the product across three surfaces from one API: a Next.js front end plus React Native apps for Android and iOS, with shared components and business rules so the platforms don't drift apart.",
          },
          {
            title: "Cloud-native infrastructure and CI/CD",
            body: "I containerised the services with Docker, orchestrated them on Kubernetes (GKE) on GCP, and set up the GitLab CI/CD pipelines: build, tests, versioned images and automated deployment. Releases became routine instead of an event.",
          },
          {
            title: "Team leadership",
            body: "I coordinate the backend, frontend and product teams: breaking down the work, code reviews, technical documentation, and arbitrating when schedule and quality pull in opposite directions.",
          },
        ],
        outcome: [
          "A product live on three platforms — web, Android and iOS — served by a single API.",
          "Mobile Money payment treated as a critical path: asynchronous confirmation, reconciliation, failure recovery.",
          "Automated, reproducible Kubernetes deployments with no manual steps.",
        ],
        reach:
          "The product serves the Cameroonian market, where Mobile Money is the dominant payment method. The team and the steering, however, are split between Yaoundé and Belgium — a distributed setup that shaped the architecture as much as the process.",
      },
    },
  },
  {
    slug: "alaxione",
    year: "2022 — 2024",
    places: ["FR"],
    link: "https://www.alaxione.fr/",
    stack: [
      { label: "Frontend", items: ["React", "React Native", "TypeScript"] },
      { label: "Design system", items: ["Composants partagés", "Accessibilité", "Tokens"] },
      { label: "Backend", items: ["API REST", "Base relationnelle"] },
    ],
    copy: {
      fr: {
        title: "Plateforme e-santé",
        context: "Alaxione Solutions · e-santé",
        tagline: "Prendre rendez-vous médical en ligne, et mesurer la satisfaction des patients.",
        role: "Développeur full stack",
        summary:
          "Pendant près de deux ans, j'ai travaillé sur une plateforme e-santé française : un widget de prise de rendez-vous embarquable chez les professionnels de santé, un module de mesure de la satisfaction patient, et le design system qui unifie le web et le mobile.",
        problem:
          "Un widget de rendez-vous s'intègre dans des sites qu'on ne contrôle pas, sur des machines qu'on ne choisit pas, pour des utilisateurs qui ne sont pas tous à l'aise avec le numérique. Dans un contexte e-santé, chaque friction se paie en rendez-vous non pris. Le produit devait être rapide, accessible, et se comporter de la même façon quel que soit l'environnement d'accueil.",
        contributions: [
          {
            title: "Widget de prise de rendez-vous",
            body: "J'ai développé le widget embarquable : parcours de réservation complet, chargement contenu pour ne pas pénaliser les sites hôtes, et isolation des styles pour qu'il s'affiche correctement quel que soit le CSS de la page d'accueil. Il devait fonctionner à l'identique sur plusieurs environnements — intégration, recette, production — avec la même base de code.",
          },
          {
            title: "Accessibilité et performance",
            body: "J'ai travaillé la navigation au clavier, les rôles ARIA, les contrastes et les états de focus, ainsi que le poids et le temps d'affichage du widget. En e-santé, l'accessibilité n'est pas une option de confort : une partie des patients en dépend pour réserver seuls.",
          },
          {
            title: "Module Survey",
            body: "J'ai conçu le module de collecte et d'analyse de la satisfaction client : modélisation des questionnaires et des réponses, API REST de collecte, stockage et restitution des résultats pour les équipes métier.",
          },
          {
            title: "Design system React / React Native",
            body: "J'ai industrialisé un design system et une bibliothèque de composants réutilisables partagés entre le web (React) et le mobile (React Native) : tokens, variantes, états, documentation. L'objectif était d'arrêter de redévelopper le même bouton trois fois et de garantir la cohérence visuelle entre les supports.",
          },
          {
            title: "Optimisation UX/UI en environnement réglementé",
            body: "J'ai retravaillé les parcours avec les contraintes propres au secteur — données de santé, traçabilité, vocabulaire médical — en cherchant à simplifier l'interface sans jamais sacrifier la rigueur imposée par le domaine.",
          },
        ],
        outcome: [
          "Un widget de rendez-vous intégrable, accessible et stable sur plusieurs environnements.",
          "Un module Survey qui transforme le ressenti patient en données exploitables.",
          "Un design system partagé web/mobile qui a réduit la duplication de composants.",
        ],
        reach:
          "Projet mené pour Alaxione Solutions, éditeur français : le produit s'adresse aux professionnels de santé en France, avec les exigences d'accessibilité et de traitement des données de santé qui vont avec. Je l'ai développé depuis Yaoundé, en remote.",
      },
      en: {
        title: "E-health platform",
        context: "Alaxione Solutions · e-health",
        tagline: "Book medical appointments online, and measure how patients felt about it.",
        role: "Full stack developer",
        summary:
          "For nearly two years I worked on a French e-health platform: an embeddable appointment-booking widget for healthcare professionals, a patient-satisfaction module, and the design system unifying web and mobile.",
        problem:
          "A booking widget lives inside sites you don't control, on machines you don't choose, for users who aren't all comfortable with digital tools. In e-health, every friction is paid for in appointments not booked. The product had to be fast, accessible, and behave identically whatever the host environment.",
        contributions: [
          {
            title: "Appointment-booking widget",
            body: "I built the embeddable widget: the full booking flow, restrained loading so host sites aren't penalised, and style isolation so it renders correctly whatever CSS the host page ships. It had to behave identically across integration, staging and production from a single codebase.",
          },
          {
            title: "Accessibility and performance",
            body: "I worked on keyboard navigation, ARIA roles, contrast and focus states, as well as the widget's weight and time to display. In e-health, accessibility isn't a nice-to-have: some patients depend on it to book unaided.",
          },
          {
            title: "Survey module",
            body: "I designed the module for collecting and analysing customer satisfaction: modelling questionnaires and answers, the REST collection API, storage, and reporting results back to the business teams.",
          },
          {
            title: "React / React Native design system",
            body: "I industrialised a design system and a shared reusable component library across web (React) and mobile (React Native): tokens, variants, states, documentation. The point was to stop rebuilding the same button three times and to keep the surfaces visually consistent.",
          },
          {
            title: "UX/UI work in a regulated environment",
            body: "I reworked the flows within the sector's constraints — health data, traceability, medical vocabulary — simplifying the interface without ever giving up the rigour the domain demands.",
          },
        ],
        outcome: [
          "An embeddable booking widget that is accessible and stable across environments.",
          "A Survey module turning patient sentiment into usable data.",
          "A shared web/mobile design system that cut component duplication.",
        ],
        reach:
          "Built for Alaxione Solutions, a French software vendor: the product serves healthcare professionals in France, with the accessibility and health-data requirements that come with it. I developed it remotely from Yaoundé.",
      },
    },
  },
  {
    slug: "ecomatin",
    year: "2020 — 2022",
    places: ["CM", "BE"],
    link: "https://ecomatin.net/",
    stack: [
      { label: "Backend", items: ["PHP", "MySQL"] },
      { label: "Frontend", items: ["HTML/CSS", "JavaScript"] },
      { label: "Qualité", items: ["SEO", "Performance", "Cache"] },
    ],
    copy: {
      fr: {
        title: "Ecomatin",
        context: "Média · Presse économique",
        tagline: "L'information économique d'Afrique centrale, lisible et rapide sur petite connexion.",
        role: "Développeur full stack",
        summary:
          "Ecomatin est une plateforme éditoriale dédiée à l'information économique en Afrique centrale. J'ai travaillé sur le site : publication des contenus, performance d'affichage et référencement.",
        problem:
          "Un média vit de son trafic, et son trafic vit de deux choses : être trouvé sur les moteurs de recherche, et s'afficher avant que le lecteur n'abandonne. En Afrique centrale, une part importante des lecteurs arrive sur mobile avec une connexion limitée : un site lourd n'est pas juste désagréable, il est tout simplement illisible.",
        contributions: [
          {
            title: "Plateforme éditoriale",
            body: "J'ai développé la plateforme de publication : modélisation des articles, rubriques et catégories, back-office de rédaction, et gabarits d'affichage — page d'accueil, rubriques, article, recherche.",
          },
          {
            title: "Performance sur connexion lente",
            body: "J'ai travaillé le poids des pages et le temps d'affichage : optimisation des images, mise en cache, réduction des requêtes en base sur les pages à fort trafic. Le but était qu'un article reste lisible sur une connexion mobile modeste.",
          },
          {
            title: "Référencement",
            body: "J'ai structuré le HTML et les métadonnées pour le référencement : hiérarchie des titres, URLs lisibles, balises Open Graph pour le partage social, plan de site et données structurées sur les articles.",
          },
        ],
        outcome: [
          "Une plateforme éditoriale autonome, gérée au quotidien par la rédaction.",
          "Des pages allégées, pensées pour la lecture mobile sur connexion limitée.",
          "Une structure technique orientée référencement et partage social.",
        ],
        reach:
          "Ecomatin couvre l'économie d'Afrique centrale depuis le Cameroun, avec un lectorat qui inclut la diaspora en Europe — la Belgique notamment. Deux publics, deux qualités de connexion, un même site à faire tenir pour les deux.",
      },
      en: {
        title: "Ecomatin",
        context: "Media · Business press",
        tagline: "Central African business news, readable and fast on a thin connection.",
        role: "Full stack developer",
        summary:
          "Ecomatin is an editorial platform covering business and economic news in Central Africa. I worked on the site itself: content publishing, rendering performance and search visibility.",
        problem:
          "A news outlet lives on traffic, and traffic lives on two things: being found by search engines, and rendering before the reader gives up. In Central Africa a large share of readers arrive on mobile over a limited connection — a heavy site isn't merely unpleasant, it is unreadable.",
        contributions: [
          {
            title: "Editorial platform",
            body: "I built the publishing platform: modelling articles, sections and categories, the newsroom back office, and the display templates — home, section, article, search.",
          },
          {
            title: "Performance on slow connections",
            body: "I worked on page weight and time to display: image optimisation, caching, and cutting database queries on high-traffic pages. The goal was for an article to stay readable on a modest mobile connection.",
          },
          {
            title: "Search visibility",
            body: "I structured the HTML and metadata for search: heading hierarchy, readable URLs, Open Graph tags for social sharing, sitemap and structured data on articles.",
          },
        ],
        outcome: [
          "A self-sufficient editorial platform, run day to day by the newsroom.",
          "Lighter pages, designed for mobile reading on a limited connection.",
          "A technical structure built for search visibility and social sharing.",
        ],
        reach:
          "Ecomatin covers Central African economics from Cameroon, with a readership that includes the diaspora in Europe — Belgium in particular. Two audiences, two connection qualities, one site that has to work for both.",
      },
    },
  },
  {
    slug: "jestock",
    year: "2025 — 2026",
    places: ["CM"],
    link: null,
    stack: [
      { label: "Backend", items: ["FastAPI", "Python", "node", "PostgreSQL"] },
      { label: "Web", items: ["Angular 18", "TypeScript"] },
      { label: "Mobile", items: ["Flutter", "Dart"] },
      { label: "API", items: ["REST", "JWT"] },
    ],
    copy: {
      fr: {
        title: "Jestock",
        context: "Projet produit",
        tagline: "Suivre son stock et ses ventes en temps réel, depuis le comptoir ou le téléphone.",
        role: "Concepteur & développeur",
        summary:
          "Jestock est une application de gestion d'inventaire et de ventes pour les boutiques. Une API REST unique alimente un back-office Angular 18 et une application mobile Flutter. C'est aussi mon terrain d'exploration sur ces trois technologies.",
        problem:
          "Beaucoup de petites boutiques tiennent encore leur stock sur un cahier ou un tableur. Le problème n'est pas l'absence d'outils, c'est que les outils existants supposent un ordinateur toujours allumé, une connexion stable et un vocabulaire comptable. Il fallait quelque chose qui fonctionne au comptoir, sur un téléphone, avec le vocabulaire du commerçant.",
        contributions: [
          {
            title: "Conception du modèle métier",
            body: "J'ai modélisé les produits, les variantes, les mouvements de stock et les ventes, en faisant du mouvement de stock la source de vérité : l'inventaire est un état calculé, pas un compteur qu'on incrémente à la main et qui finit par mentir.",
          },
          {
            title: "API REST FastAPI",
            body: "J'ai développé l'API en FastAPI sur PostgreSQL : authentification JWT, validation des entrées, endpoints d'inventaire et de ventes, et documentation OpenAPI générée — la même API servant strictement le web et le mobile.",
          },
          {
            title: "Back-office Angular 18",
            body: "J'ai construit l'interface de gestion en Angular 18 : catalogue, entrées et sorties de stock, historique des ventes et tableaux de synthèse pour le gérant.",
          },
          {
            title: "Application mobile Flutter",
            body: "J'ai développé l'application Flutter pour l'usage au comptoir : enregistrement rapide d'une vente, consultation du stock, et une interface pensée pour être utilisable d'une seule main pendant qu'on sert un client.",
          },
        ],
        outcome: [
          "Une seule API REST pour deux clients très différents, web et mobile.",
          "Un inventaire calculé à partir des mouvements, donc auditable et réconciliable.",
          "Un projet qui m'a servi à prendre en main FastAPI, Angular 18 et Flutter sur un cas réel.",
        ],
        reach:
          "Pensé pour les commerces de détail au Cameroun : petites boutiques, connexion intermittente, usage au comptoir sur téléphone Android d'entrée de gamme.",
      },
      en: {
        title: "Jestock",
        context: "Product project",
        tagline: "Track stock and sales in real time, from the counter or from a phone.",
        role: "Designer & developer",
        summary:
          "Jestock is an inventory and sales management app for retail shops. A single REST API feeds an Angular 18 back office and a Flutter mobile app. It is also my proving ground for those three technologies.",
        problem:
          "Many small shops still track stock in a notebook or a spreadsheet. The problem isn't a lack of tools — it's that existing tools assume an always-on computer, a stable connection and accounting vocabulary. This needed to work at the counter, on a phone, in the shopkeeper's own words.",
        contributions: [
          {
            title: "Domain modelling",
            body: "I modelled products, variants, stock movements and sales, making the stock movement the source of truth: inventory is a computed state, not a hand-incremented counter that eventually lies.",
          },
          {
            title: "FastAPI REST API",
            body: "I built the API in FastAPI on PostgreSQL: JWT authentication, input validation, inventory and sales endpoints, and generated OpenAPI documentation — the same API serving web and mobile strictly alike.",
          },
          {
            title: "Angular 18 back office",
            body: "I built the management interface in Angular 18: catalogue, stock in and out, sales history and summary tables for the owner.",
          },
          {
            title: "Flutter mobile app",
            body: "I developed the Flutter app for counter use: recording a sale in seconds, checking stock, and an interface designed to be usable one-handed while serving a customer.",
          },
        ],
        outcome: [
          "One REST API serving two very different clients, web and mobile.",
          "Inventory computed from movements, so it stays auditable and reconcilable.",
          "A project that let me pick up FastAPI, Angular 18 and Flutter on a real case.",
        ],
        reach:
          "Built for retail in Cameroon: small shops, intermittent connectivity, counter use on entry-level Android phones.",
      },
    },
  },
  {
    slug: "video-save",
    year: "2023",
    places: ["CM"],
    link: null,
    stack: [
      { label: "Extension", items: ["TypeScript", "WebExtension API"] },
      { label: "Service", items: ["Node.js", "File d'attente", "Stockage objet"] },
    ],
    copy: {
      fr: {
        title: "Video Save",
        context: "Extension navigateur",
        tagline: "Envoyer un fichier ou une vidéo vers le cloud en un clic, sans passer par sa machine.",
        role: "Concepteur & développeur",
        summary:
          "Video Save est une extension de navigateur adossée à un service de téléchargement distant : au lieu de télécharger un fichier sur sa machine puis de le réenvoyer, l'extension demande au service de le récupérer directement vers le cloud.",
        problem:
          "Télécharger un gros fichier sur une connexion lente puis le réuploader ailleurs, c'est payer deux fois le même transfert — et perdre la partie à la première coupure. Déporter la récupération côté serveur supprime purement et simplement l'aller-retour par la machine de l'utilisateur.",
        contributions: [
          {
            title: "Extension navigateur",
            body: "J'ai développé l'extension en TypeScript sur les WebExtension APIs : détection des ressources téléchargeables dans la page, menu contextuel, et envoi de la demande au service distant avec le minimum de permissions nécessaires.",
          },
          {
            title: "Service de téléchargement distant",
            body: "J'ai construit le service Node.js qui exécute les demandes : file d'attente des travaux, récupération du fichier, reprise en cas d'interruption, et dépôt sur le stockage cloud de destination.",
          },
          {
            title: "Suivi et reprise",
            body: "J'ai mis en place le suivi de l'état des travaux — en attente, en cours, terminé, échoué — pour que l'utilisateur ferme son navigateur sans perdre le transfert en cours, et que les échecs soient rejouables plutôt que définitifs.",
          },
        ],
        outcome: [
          "Un transfert cloud-vers-cloud qui n'utilise plus la bande passante de l'utilisateur.",
          "Des travaux suivis et rejouables, résistants aux coupures de connexion.",
          "Une extension légère, demandant le strict minimum de permissions.",
        ],
        reach:
          "Né d'un besoin concret au Cameroun : travailler avec de gros fichiers sur une connexion qui ne tient pas la distance. Le problème est local, la solution est utilisable partout.",
      },
      en: {
        title: "Video Save",
        context: "Browser extension",
        tagline: "Send a file or video straight to the cloud in one click, without routing it through your machine.",
        role: "Designer & developer",
        summary:
          "Video Save is a browser extension backed by a remote download service: instead of downloading a file to your machine and uploading it again, the extension asks the service to fetch it directly into cloud storage.",
        problem:
          "Downloading a large file over a slow connection and re-uploading it elsewhere means paying for the same transfer twice — and losing everything at the first dropout. Moving the fetch server-side removes the round trip through the user's machine entirely.",
        contributions: [
          {
            title: "Browser extension",
            body: "I built the extension in TypeScript on the WebExtension APIs: detecting downloadable resources on the page, a context menu, and dispatching the request to the remote service with the minimum permissions required.",
          },
          {
            title: "Remote download service",
            body: "I built the Node.js service that carries out the requests: a job queue, fetching the file, resuming after interruption, and writing it to the destination cloud storage.",
          },
          {
            title: "Job tracking and retries",
            body: "I added job state tracking — queued, running, done, failed — so users can close their browser without losing a transfer, and so failures are replayable instead of final.",
          },
        ],
        outcome: [
          "Cloud-to-cloud transfers that no longer consume the user's bandwidth.",
          "Tracked, replayable jobs that survive connection dropouts.",
          "A lightweight extension asking for the bare minimum of permissions.",
        ],
        reach:
          "Born from a concrete need in Cameroon: working with large files on a connection that doesn't go the distance. The problem is local, the solution works anywhere.",
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
