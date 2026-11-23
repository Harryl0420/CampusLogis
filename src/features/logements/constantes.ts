// Règles fixes de la fonctionnalité « logements » : ce ne sont pas des données, le serveur ne les fournira pas
export const distanceProche = 1000; // Seuil du filtre « < 1 km », en mètres
export const creneauxVisite = ["14:00 - 15:30", "16:00 - 17:30", "Matin (10h - 12h)"] as const; // Créneaux de la maquette

export const operateursPaiement = [
  // Les deux lignes « Choisir un moyen de paiement » de la maquette, dans l'ordre
  {
    code: "mtn", // Valeur technique du schéma
    nom: "MTN Mobile Money", // Titre de la ligne
    detail: "Confirmation instantanée USSD", // Sous-titre de la ligne
    logo: require("../../../assets/images/paiement/MTNMomo.jpg"), // Logo de l'opérateur
  },
  {
    code: "orange", // Valeur technique du schéma
    nom: "Orange Money", // Titre de la ligne
    detail: "Code de validation par SMS", // Sous-titre de la ligne
    logo: require("../../../assets/images/paiement/OrangeMoney.png"), // Logo de l'opérateur
  },
] as const; // Valeurs figées : code vaut exactement "mtn" ou "orange"
