// ============================================================
// C'EST ICI QUE VOUS AJOUTEZ / MODIFIEZ VOS LOGEMENTS.
// Ce fichier est PUBLIC (visible sur GitHub).
//
// Pour un nouveau logement :
//  1. Copiez tout le bloc "modele-vierge" ci-dessous (de { à },)
//  2. Collez-le juste avant le dernier "};" du fichier
//  3. Remplacez "modele-vierge" par un identifiant court
//     (sans espace ni accent) -> ex: "saint-pierre", "capitole-2"
//     C'est ce qui devient l'adresse du livret :
//     https://livret.philiaconciergerie.fr/<identifiant>
//
// IMPORTANT : le wifi, les instructions/photos d'accès et les
// équipements se configurent séparément, dans le coffre-fort KV
// de Cloudflare (protégés par code) — pas ici.
// ============================================================

export const logements = {
  'modele-vierge': {
    // --- Présentation ---
    nom: '',
    adresse: '',
    description: '',

    // --- Horaires ---
    arrivee: '',
    depart: '',

    // --- Photos d'accueil (déposez les fichiers dans
    // public/logements/<identifiant>/) ---
    photosAccueil: [
      // '/logements/<identifiant>/salon-nom-logement.jpg',
    ],

    // --- Règles de la maison ---
    reglesMaison: [
      // 'Non-fumeur',
      // 'Calme après 22h',
    ],

    // --- Poubelles et tri ---
    poubelles: '',
// --- Position géographique (pour la carte des environs) ---
    lat: null,
    lng: null,
    // --- Recommandations locales ---
    recommandations: [
      // { nom: '...', description: '...' },
    ],

    // --- Photos de la ville et des environs ---
    photosVille: [
      // '/logements/<identifiant>/place-du-capitole-toulouse.jpg',
    ],

    // --- Check-out ---
    checkout: [
      // 'Déposer les clés dans la boîte',
      // 'Sortir les poubelles',
    ],

    // --- Notre boutique : ventes additionnelles (optionnel) ---
    boutique: [
      // { nom: 'Petit-déjeuner livré', description: '...', prix: '15€' },
    ],

    // --- Contact ---
    contactUrgence: '',
  },
};
