import { useState } from "react"; // État local
import { distanceProche, favorisInitiaux, typesLogement } from "../donnees"; // Seuil, favoris de départ et ordre des types
import type { Logement, TypeLogement } from "../types"; // Types de la fonctionnalité

// Hook personnalisé : regroupe la recherche, les trois filtres, les favoris et le calcul de la liste à afficher
export function useLogements(logements: readonly Logement[]) {
  // Reçoit la liste complète
  const [recherche, setRecherche] = useState(""); // Texte tapé dans la barre de recherche
  const [triParPrix, setTriParPrix] = useState(false); // Filtre « Prix » : du moins cher au plus cher
  const [procheSeulement, setProcheSeulement] = useState(false); // Filtre « < 1 km »
  const [type, setType] = useState<TypeLogement | null>(null); // Filtre « Type », aucun au départ
  const [favoris, setFavoris] = useState<readonly string[]>(favorisInitiaux); // Identifiants aimés : même liste de départ que l'onglet Favoris

  const basculerTriParPrix = () => setTriParPrix((actuel) => !actuel); // Retoucher le filtre l'annule
  const basculerProche = () => setProcheSeulement((actuel) => !actuel); // Retoucher le filtre l'annule
  const typeSuivant = () =>
    // Chaque toucher passe au type suivant : Tous, Studio, Chambre, Colocation, puis Tous
    setType((actuel) =>
      actuel === null ? typesLogement[0] : (typesLogement[typesLogement.indexOf(actuel) + 1] ?? null),
    );
  const basculerFavori = (id: string) =>
    // Ajoute ou retire un logement des favoris
    setFavoris((liste) => (liste.includes(id) ? liste.filter((x) => x !== id) : [...liste, id]));

  const texte = recherche.trim().toLowerCase(); // Recherche sans espaces superflus ni majuscules
  const filtres = logements.filter(
    // Liste recalculée à chaque affichage
    (l) =>
      (type === null || l.type === type) && // Filtre « Type »
      (!procheSeulement || l.distanceMetres < distanceProche) && // Filtre « < 1 km »
      `${l.nom} ${l.quartier} ${l.campus}`.toLowerCase().includes(texte), // Recherche sur le nom, le quartier et le campus
  );
  const resultats = triParPrix ? [...filtres].sort((a, b) => a.prix - b.prix) : filtres; // Copie triée : on ne modifie jamais les données

  return {
    recherche,
    setRecherche,
    triParPrix,
    basculerTriParPrix,
    procheSeulement,
    basculerProche,
    type,
    typeSuivant,
    favoris,
    basculerFavori,
    resultats,
  }; // Ce dont l'écran a besoin
}
