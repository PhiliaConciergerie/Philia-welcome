// ============================================================
// C'EST ICI QUE VOUS AJOUTEZ / MODIFIEZ VOS LOGEMENTS.
// Chaque bloc { ... } correspond à un logement.
// La "clé" (ex: "saint-pierre") devient l'adresse du livret :
//   https://livret.philiaconciergerie.fr/saint-pierre
//
// IMPORTANT : ne mettez JAMAIS ici le wifi, les codes d'accès
// ou toute information sensible. Ce fichier finit dans les
// pages publiques du site. Ces infos continuent d'être envoyées
// séparément avec le générateur de message.
// ============================================================

export const logements = {
  'saint-pierre': {
    nom: 'Le Saint-Pierre',
    adresse: '12 rue des Lilas, 31000 Toulouse',
    description:
      "Un appartement lumineux au cœur de Toulouse, à deux pas de la place Saint-Pierre et de ses terrasses.",
    arrivee: 'à partir de 16h00',
    depart: 'avant 11h00',
    photos: [
      '/logements/saint-pierre/salon.jpg',
      '/logements/saint-pierre/chambre.jpg',
      '/logements/saint-pierre/cuisine.jpg',
    ],
    recommandations: [
      { nom: 'Boulangerie du coin', description: 'Croissants et pain frais, à 3 minutes à pied.' },
      { nom: 'Place Saint-Pierre', description: 'Bars et restaurants au bord de la Garonne.' },
    ],
    contactUrgence: '06 00 00 00 00',
  },

  // Pour ajouter un nouveau logement, copiez-collez le bloc ci-dessous
  // juste après celui de "saint-pierre" (n'oubliez pas la virgule avant),
  // puis remplacez les informations.
  //
  // 'nom-du-logement': {
  //   nom: 'Nom affiché du logement',
  //   adresse: 'Adresse complète',
  //   description: 'Une phrase de présentation.',
  //   arrivee: 'à partir de 16h00',
  //   depart: 'avant 11h00',
  //   wifiNom: 'NomDuReseau',
  //   wifiMotDePasse: 'motdepasse',
  //   photos: ['/logements/nom-du-logement/photo1.jpg'],
  //   recommandations: [
  //     { nom: '...', description: '...' },
  //   ],
  //   contactUrgence: '06 00 00 00 00',
  // },
};
