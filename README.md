# Portfolio — Christian Bakiti Kamga

Portfolio statique construit avec Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion et lucide-react. Exporté en site statique (`output: 'export'`) pour un hébergement sur GitHub Pages.

## Développement local

```bash
npm install
npm run dev
```

Le site est disponible sur http://localhost:3000.

## Build statique

```bash
npm run build
```

Le site exporté est généré dans le dossier `out/`.

## À remplacer avant la mise en ligne

- **Photo de profil** : déposer une vraie photo (portrait, idéalement noir et blanc) dans `public/images/profile.jpg`. Tant que le fichier est absent, le hero affiche un dégradé avec les initiales « CB ».
- **CV** : remplacer le fichier vide `public/cv.pdf` par le vrai CV au format PDF.
- **Liens GitHub / LinkedIn** : renseigner les vraies URLs dans `src/lib/data.ts` (champs `contact.github` et `contact.linkedin`, actuellement `#`).

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` build et déploie automatiquement sur GitHub Pages à chaque push sur `main` (activer Pages avec la source « GitHub Actions » dans les réglages du dépôt).

### Base path

GitHub Pages sert un site de projet sous `https://<user>.github.io/<repo>/`. Le nom du dépôt doit donc servir de préfixe (`basePath`/`assetPrefix`). C'est piloté par la variable d'environnement `NEXT_PUBLIC_BASE_PATH` (chaîne vide par défaut) :

- Dans le workflow, elle est automatiquement définie à `/${{ github.event.repository.name }}` — rien à faire si le site est déployé comme site de projet.
- Si le dépôt s'appelle `<user>.github.io` (site utilisateur, servi à la racine), remplacer cette valeur par une chaîne vide dans `deploy.yml`.
- Pour tester un build avec préfixe en local : `NEXT_PUBLIC_BASE_PATH=/mon-repo npm run build`.
