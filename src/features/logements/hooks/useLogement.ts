import { trouverLogement } from "../depot"; // Accès aux données

// Hook de l'écran 5. Détail : il donne le logement dont l'identifiant est dans l'adresse, ou undefined
export function useLogement(id: string | undefined) {
  // L'identifiant vient de la route dynamique
  return id ? trouverLogement(id) : undefined; // Sans identifiant, pas de logement ; à la séance 5, ce hook utilisera TanStack Query
}
