import { favorisInitiaux, logements, typesLogement } from "./donnees"; // Données fictives de la séance 4
import type { Logement, TypeLogement } from "./types"; // Types de la fonctionnalité

// Le dépôt : seul fichier qui sait d'où viennent les logements. Les hooks l'appellent, les écrans ne le connaissent pas.
// À la séance 5, seul ce fichier changera : il interrogera Supabase au lieu de lire donnees.ts.
export function listerLogements(): readonly Logement[] {
  // Tous les logements proposés
  return logements; // Pour l'instant, la liste fictive
}

export function listerTypesLogement(): readonly TypeLogement[] {
  // Les types du filtre « Type », dans l'ordre
  return typesLogement; // Pour l'instant, la liste fictive
}

export function trouverLogement(id: string): Logement | undefined {
  // Un logement d'après son identifiant
  return logements.find((logement) => logement.id === id); // undefined si aucun logement ne porte cet identifiant
}

export function listerFavoris(): readonly string[] {
  // Identifiants des logements aimés par l'étudiant
  return favorisInitiaux; // Pour l'instant, la liste fictive
}
