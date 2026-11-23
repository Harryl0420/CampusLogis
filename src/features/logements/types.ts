// Les types de données de la fonctionnalité « logements »
import type { ImageSourcePropType } from "react-native"; // Type d'une image
import type { NomIcone } from "@/composants/icones"; // Type des noms d'icônes

export type TypeLogement = "Studio" | "Chambre" | "Colocation"; // Valeurs du filtre « Type »

export type BadgeLogement = { libelle: string; icone: NomIcone }; // Badge posé sur la photo : « Vérifié campus »...

export type Equipement = {
  // Une pastille « Équipements & atouts » du Détail
  libelle: string; // « Wi-Fi Haut Débit »
  icone: NomIcone; // Icône de la pastille
  misEnAvant: boolean; // Pastille rose (vrai) ou grise (faux)
}; // Fin du type Equipement

export type Bailleur = {
  // Carte du bailleur, sur le Détail
  nom: string; // « M. Emmanuel K. »
  initiales: string; // Affichées tant qu'il n'y a pas de photo
  photo?: ImageSourcePropType; // Photo du bailleur, facultative
  certifie: boolean; // « Bailleur certifié CampusLogis »
  delaiReponse: string; // « < 1h »
  satisfaction: number; // Pourcentage de locataires satisfaits
}; // Fin du type Bailleur

export type Logement = {
  // Un logement proposé aux étudiants
  id: string; // Identifiant unique : clé dans les listes et adresse du Détail
  nom: string; // Calque Titre : type et quartier
  type: TypeLogement; // Utilisé par le filtre « Type »
  ville: string; // Ville du logement : « Douala »
  quartier: string; // Utilisé par la recherche
  prix: number; // Prix par mois en francs CFA, sans espace ni unité
  arrhes: number; // Caution à verser pour réserver la visite, frais de dossier inclus
  chargesIncluses: boolean; // « charges comprises » sur le Détail
  etiquette: string; // Mention à droite du prix : « Charges incluses », « Meublée »...
  distanceMetres: number; // Distance au repère, utilisée par le filtre « < 1 km »
  campus: string; // Campus le plus proche, carte du Détail : « Campus B ESSEC »
  reperage: string; // Fin de la phrase de distance : « du Campus B ESSEC », « de Tradex Yassa »
  minutesAPied: number; // Temps de marche jusqu'au campus
  note: number; // Note sur 5
  badge: BadgeLogement | null; // Badge sur la photo, ou aucun
  photos: readonly ImageSourcePropType[]; // Photos du carrousel
  couleurPhoto: string; // Couleur affichée pendant le chargement des photos
  equipements: readonly Equipement[]; // Pastilles du Détail
  bailleur: Bailleur; // Propriétaire du logement
}; // Fin du type Logement
