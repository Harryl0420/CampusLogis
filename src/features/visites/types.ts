// Les types de données de la fonctionnalité « visites »
export type StatutVisite = "À payer" | "Confirmée" | "Effectuée"; // Les étapes d'une demande de visite

export type Visite = {
  // Une visite de logement réservée par l'étudiant
  id: string; // Identifiant unique, utilisé comme clé dans la liste
  logement: string; // Nom du logement visité (la fonctionnalité ne dépend pas de « logements »)
  montant: number; // Frais de visite en francs CFA
  date: string; // Date de la visite, déjà mise en forme
  heure: string; // Heure du rendez-vous
  statut: StatutVisite; // Où en est la visite
  couleurPhoto: string; // Couleur de remplacement de la photo
}; // Fin du type Visite
