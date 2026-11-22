import { visites } from "./donnees"; // Données fictives de la séance 4
import type { Visite } from "./types"; // Type de la fonctionnalité

// Le dépôt des visites : seul fichier qui sait d'où elles viennent ; il changera à la séance 5
export function listerVisites(): readonly Visite[] {
  // Toutes les visites de l'étudiant
  return visites; // Pour l'instant, la liste fictive
}
