import { listerFavoris, listerLogements } from "../depot"; // Accès aux données

// Hook de l'onglet Favoris : la liste des logements aimés
export function useFavoris() {
  const favoris = listerFavoris(); // Identifiants aimés
  return listerLogements().filter((logement) => favoris.includes(logement.id)); // Seulement les logements aimés
}
