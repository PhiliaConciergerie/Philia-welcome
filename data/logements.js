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
    'spacieux-T4-Blagnac': {
    nom: 'spacieux-t4-lumineux-parking-aeroport-meett',
    adresse: '8 rue des marguerites, 31700, Blagnac',
    description: 'Appartement T4',
    arrivee: '17H00',
    depart: '11H00',
    lat: 43.6382,
    lng: 1.38162,
    photosAccueil: [],
    reglesMaison: [
      'Non fumeur',
      'calme de 22h00 à 7H00',
    ],
    poubelles: '',
    recommandations: [],
    photosVille: [],
    checkout: [
      'Afin de faciliter le travail de notre équipe et de respecter les lieux, nous vous remercions par avance de bien vouloir :',
      '• laver et ranger la vaisselle,',
      '• jeter les ordures dans les containers prévus à cet effet,',
      '• déposer les bouteilles en verre dans un point de collecte de la ville,',
      '• rassembler les serviettes ainsi que le tapis de bain,',
      '• remettre en place les meubles éventuellement déplacés.',
      'Avant de partir, merci également de :',
      '• éteindre les lumières et les ventilateurs,',
      '• fermer les fenêtres,',
      '• vérifier que vous n’oubliez aucun effet personnel.',
    ],
    boutique: [
      { nom: 'arrivée anticipée 5 euros/heure', description: '', prix: '' },
      { nom: 'idem pour départ', description: '', prix: '' },
    ],
    contactUrgence: '0783466296',
  },
