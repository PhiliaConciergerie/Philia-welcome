# Livret d'accueil — Philia Conciergerie

Ce projet génère automatiquement une page de livret d'accueil pour chaque
logement, à partir d'un seul fichier de données.

## Ajouter un nouveau logement

1. Ouvrez le fichier **`data/logements.js`**.
2. Copiez-collez le bloc d'exemple en commentaire tout en bas du fichier.
3. Remplissez les informations (nom, adresse, description, horaires,
   recommandations).
4. Choisissez un identifiant court sans espace ni accent pour le logement
   (ex. `saint-pierre`, `capitole-2`) — c'est ce qui apparaîtra dans le lien :
   `https://livret.philiaconciergerie.fr/capitole-2`
5. Ajoutez les photos du logement dans un nouveau dossier :
   `public/logements/<identifiant>/` (ex. `public/logements/capitole-2/salon.jpg`)
6. Référencez-les dans le champ `photos` du logement, avec le chemin
   `/logements/<identifiant>/nom-du-fichier.jpg`.
7. Enregistrez, puis publiez les modifications sur GitHub (Commit changes).
   Cloudflare reconstruit et republie automatiquement le site en 1-2 minutes.

## Important — informations sensibles

Ne mettez **jamais** le wifi, les codes d'accès, digicode ou boîte à clés
dans `data/logements.js` : ce fichier est public. Ces informations
continuent d'être envoyées séparément à chaque voyageur avec le générateur
de message dédié.

## Développement local (optionnel, pour votre informaticienne)

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
```

Le site statique est généré dans le dossier `out/`.
