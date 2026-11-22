import type { Visite } from "./types"; // Type de la fonctionnalité

// Données fictives de la séance 4 : à la séance 5, les visites viendront du backend
export const visites: readonly Visite[] = [
  // Les plus récentes d'abord
  {
    id: "v3",
    logement: "Studio Moderne, Cité-Cicam",
    montant: 2000,
    date: "24 novembre",
    heure: "10 h",
    statut: "À payer",
    couleurPhoto: "#F4C7D6",
  }, // Visite à régler
  {
    id: "v2",
    logement: "Chambre meublée, Bonamoussadi",
    montant: 2000,
    date: "22 novembre",
    heure: "15 h",
    statut: "Confirmée",
    couleurPhoto: "#D6E4F4",
  }, // Visite prévue
  {
    id: "v1",
    logement: "Chambre en Colocation, Yassa",
    montant: 1500,
    date: "15 novembre",
    heure: "9 h",
    statut: "Effectuée",
    couleurPhoto: "#E8DCC8",
  }, // Visite passée
]; // Fin des visites
