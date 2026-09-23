# Portfolio — Christian Bakiti Kamga

Portfolio d'ingénieur full stack & DevOps, bilingue (FR/EN), avec des scènes
WebGL et une page d'étude de cas par projet. Site **entièrement statique**,
déployé en continu sur GitHub Pages.

## Stack

| Rôle | Choix |
|---|---|
| Framework | Next.js 16 (App Router, `output: "export"`) |
| Langage | TypeScript |
| Styles | Tailwind CSS v4 |
| 3D | three.js + React Three Fiber + drei |
| Animation | Framer Motion + Lenis (scroll inertiel) |
| Typographie | Syne (display), Geist Sans / Geist Mono |

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000 → redirige vers /fr
npm run build        # export statique dans out/
npx eslint .         # lint
npx tsc --noEmit     # types
```

## Structure

```
src/
  app/(entry)/                     page racine : redirige / vers /fr/
  app/(site)/[lang]/               layout racine (html lang), accueil, transitions
  app/(site)/[lang]/projets/…      études de cas FR   → /fr/projets/tugo/
  app/(site)/[lang]/projects/…     études de cas EN   → /en/projects/tugo/
  content/site.ts                  tous les textes d'interface, FR et EN
  content/projects.ts              les projets : contributions, stack, pays, FR et EN
  components/sections/             Hero, About, Skills, Experience, Work, Contact, ProjectDetail
  components/three/                scènes WebGL (voir plus bas)
  components/layout/               nav, footer, curseur, loader, smooth scroll
  components/ui/                   primitives d'animation réutilisables
  lib/places.ts                    pays des projets (sans dépendance à three)
  lib/geo.ts                       maths sphériques du globe (importe three)
  lib/land-mask.ts                 données des continents pour le globe (généré)
scripts/                           génération du masque de continents, post-build
```

Les deux groupes de routes ont chacun leur **layout racine** — c'est ce que Next
autorise en l'absence de `app/layout.tsx`. Sans ça, il faudrait choisir entre
avoir une page à `/` et avoir un `<html lang>` juste pour chaque langue.

### Ajouter ou modifier un projet

Tout est dans [`src/content/projects.ts`](src/content/projects.ts) : un objet par
projet, avec `copy.fr` et `copy.en`. Le champ `contributions` est le cœur de la
page — c'est lui qui détaille ce qui a été fait précisément. Les routes, le menu
« projet suivant » et la liste d'accueil se mettent à jour tout seuls.

Les pays affichés sur le globe viennent de `places` dans
[`src/lib/places.ts`](src/lib/places.ts). Pour en ajouter un, il suffit de son
nom, de sa capitale et de ses coordonnées.

## Les scènes 3D

Trois scènes, toutes construites à partir de primitives — aucun modèle glTF,
aucune texture à télécharger :

- **Hero** — terminal, conteneurs, barre de Kubernetes, base de données, maillage
  de services, graphe Git, carte de paiement, sur un fond en shader (fbm).
- **Compétences** — un objet par famille de compétences, échangé au scroll.
- **Globe** (pages projet) — sphère de points calquée sur les vrais continents,
  marqueurs par pays et arcs animés entre eux.

Les continents viennent de Natural Earth, rastérisés hors ligne en un masque de
1 bit par point : 8 265 points de terre pour 4,8 ko, contre ~140 ko de GeoJSON.
Pour le régénérer :

```bash
curl -L -o land.geojson https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson
node scripts/gen-land.mjs .
# puis recopier le base64 obtenu dans src/lib/land-mask.ts
```

### Poids et dégradation

Le code 3D est chargé à part, après le premier rendu, et toutes les scènes
partagent **un seul** chunk three.js (`src/components/three/scenes.ts`) :

| | brut | gzip |
|---|---|---|
| JS initial | ~880 ko | ~270 ko |
| Chunk 3D (différé) | ~1 Mo | ~274 ko |

Rien de tout cela n'est chargé si WebGL est indisponible ou si le visiteur a
demandé `prefers-reduced-motion` : le contenu est déjà présent dans le HTML
exporté, et chaque scène a une version statique équivalente.

## Déploiement

Push sur `main` → [GitHub Actions](.github/workflows/deploy.yml) construit et
publie `out/` sur GitHub Pages. La variable `NEXT_PUBLIC_BASE_PATH` vaut le nom
du dépôt pour un site de projet (`user.github.io/<repo>`) ; pour un site
utilisateur (`user.github.io`), la laisser vide.

`npm run build` enchaîne `next build` puis
[`scripts/flatten-prefetch.mjs`](scripts/flatten-prefetch.mjs), qui recopie les
charges utiles de préchargement RSC sous le nom exact que le client demande —
sans ça, chaque préchargement de lien renvoie un 404 sur GitHub Pages.
