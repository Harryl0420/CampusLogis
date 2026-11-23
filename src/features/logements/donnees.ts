// Données fictives : seul le fichier depot.ts les lit ; à la séance 5, elles seront remplacées par celles du backend
import type { Bailleur, Equipement, Logement, TypeLogement } from "./types"; // Types de la fonctionnalité

export const typesLogement: readonly TypeLogement[] = ["Studio", "Chambre", "Colocation"]; // Ordre du filtre « Type »
export const favorisInitiaux: readonly string[] = ["l1"]; // Logements aimés au départ, comme dans la maquette

const photo1 = require("../../../assets/images/logements/logement-1.jpg"); // Studio moderne
const photo2 = require("../../../assets/images/logements/logement-2.jpg"); // Chambre « Coup de cœur »
const photo3 = require("../../../assets/images/logements/logement-3.jpg"); // Colocation à Yassa
const photo4 = require("../../../assets/images/logements/logement-4.jpg"); // Studio du Détail

const equipementsStandard: readonly Equipement[] = [
  // Pastilles de la maquette du Détail
  { libelle: "Wi-Fi Haut Débit", icone: "wifi", misEnAvant: true },
  { libelle: "Compteur individuel", icone: "speedometer-outline", misEnAvant: true },
  { libelle: "Sécurité 24/7", icone: "shield-outline", misEnAvant: true },
  { libelle: "Meublé", icone: "bed-outline", misEnAvant: true },
  { libelle: "Forage continu", icone: "water-outline", misEnAvant: false },
]; // Fin des équipements

const emmanuel: Bailleur = {
  nom: "M. Emmanuel K.",
  initiales: "EK",
  certifie: true,
  delaiReponse: "< 1h",
  satisfaction: 100,
}; // Bailleur de la maquette
const brigitte: Bailleur = {
  nom: "Mme Brigitte N.",
  initiales: "BN",
  certifie: true,
  delaiReponse: "< 3h",
  satisfaction: 96,
}; // Autre bailleur

export const logements: readonly Logement[] = [
  // Les cartes de la maquette de l'Accueil, dans l'ordre
  {
    id: "l1",
    nom: "Studio Moderne, Cité-Cicam",
    type: "Studio",
    ville: "Douala",
    quartier: "Cité-Cicam",
    prix: 45000,
    chargesIncluses: true,
    etiquette: "Charges incluses",
    distanceMetres: 350,
    campus: "Campus B ESSEC",
    reperage: "du Campus B ESSEC",
    minutesAPied: 5,
    note: 4.9,
    badge: { libelle: "Vérifié campus", icone: "shield-checkmark" },
    photos: [photo1, photo4],
    couleurPhoto: "#F4C7D6",
    equipements: equipementsStandard,
    bailleur: emmanuel,
  },
  {
    id: "l2",
    nom: "Chambre meublée, Bonamoussadi",
    type: "Chambre",
    ville: "Douala",
    quartier: "Bonamoussadi",
    prix: 35000,
    chargesIncluses: false,
    etiquette: "Meublée",
    distanceMetres: 1200,
    campus: "Université de Douala",
    reperage: "de l'Université de Douala",
    minutesAPied: 15,
    note: 4.7,
    badge: { libelle: "Coup de cœur", icone: "flash-outline" },
    photos: [photo2, photo1],
    couleurPhoto: "#D6E4F4",
    equipements: equipementsStandard.slice(0, 4),
    bailleur: brigitte,
  },
  {
    id: "l3",
    nom: "Chambre en Colocation, Yassa",
    type: "Colocation",
    ville: "Douala",
    quartier: "Yassa",
    prix: 28000,
    chargesIncluses: false,
    etiquette: "Wifi haut débit",
    distanceMetres: 200,
    campus: "IUT de Douala",
    reperage: "de Tradex Yassa",
    minutesAPied: 3,
    note: 4.8,
    badge: { libelle: "Colocation (2/3)", icone: "people-outline" },
    photos: [photo3, photo2],
    couleurPhoto: "#E8DCC8",
    equipements: equipementsStandard.slice(0, 3),
    bailleur: brigitte,
  },
  {
    id: "l4",
    nom: "Studio Confort Cité-Cicam",
    type: "Studio",
    ville: "Douala",
    quartier: "Cité-Cicam",
    prix: 45000,
    chargesIncluses: true,
    etiquette: "Charges incluses",
    distanceMetres: 350,
    campus: "Campus B ESSEC I",
    reperage: "du Campus B ESSEC I",
    minutesAPied: 5,
    note: 4.9,
    badge: { libelle: "Logement vérifié", icone: "shield-checkmark" },
    photos: [photo4, photo1],
    couleurPhoto: "#C8E8D0",
    equipements: equipementsStandard,
    bailleur: emmanuel,
  },
]; // Fin des logements
