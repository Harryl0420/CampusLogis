import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { Pressable, ScrollView, StyleSheet } from "react-native"; // Zone touchable, défilement et outils
import type { NomIcone } from "@/composants/icones"; // Type des noms d'icônes
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { espacements, rayons, tailleTactileMin, type NomCouleur } from "@/theme/tokens"; // Mesures et noms de couleur
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { distanceProche } from "../constantes"; // Seuil du filtre de distance
import type { TypeLogement } from "../types"; // Type du filtre « Type »

type PropsPastille = {
  // Une pastille de filtre
  libelle: string; // Texte de la pastille
  icone: NomIcone; // Icône de la pastille
  iconeAvant?: boolean; // Icône avant le texte (vrai) ou après (faux)
  active: boolean; // Filtre en cours
  neutre?: boolean; // Pastille grise au repos, comme « Type »
  onPress: () => void; // Fonction appelée au toucher
}; // Fin des props

// Une pastille : rose pâle (ou grise) au repos, rose plein quand le filtre est actif
function Pastille({ libelle, icone, iconeAvant = false, active, neutre = false, onPress }: PropsPastille) {
  const { palette } = useTheme(); // Palette claire ou sombre
  const couleur: NomCouleur = active ? "surPrimaire" : neutre ? "texte" : "primaire"; // Couleur du texte et de l'icône
  const pictogramme = <Ionicons name={icone} size={16} color={palette[couleur]} />; // Icône de la pastille
  return (
    // Pastille touchable
    <Pressable
      accessibilityRole="button" // Annoncée comme un bouton
      accessibilityState={{ selected: active }} // Le lecteur d'écran sait si le filtre est actif
      hitSlop={{ top: espacements.xs, bottom: espacements.xs }} // Zone tactile agrandie à 48 dp de haut
      onPress={onPress} // Prévient l'écran
      style={[
        styles.pastille,
        {
          backgroundColor: active ? palette.primaire : neutre ? palette.fond : palette.teinte, // Fond selon l'état
          borderColor: active ? palette.primaire : neutre ? palette.bordure : palette.teinte, // Contour selon l'état
        },
      ]}
    >
      {iconeAvant ? pictogramme : null}
      <Texte couleur={couleur}>{libelle}</Texte>
      {iconeAvant ? null : pictogramme}
    </Pressable>
  ); // Fin du rendu
}

type Props = {
  // Props de la rangée de filtres
  triParPrix: boolean; // Filtre « Prix » actif
  surTriParPrix: () => void; // Toucher du filtre « Prix »
  procheSeulement: boolean; // Filtre « < 1 km » actif
  surProche: () => void; // Toucher du filtre « < 1 km »
  type: TypeLogement | null; // Type choisi, ou aucun
  surType: () => void; // Toucher du filtre « Type »
}; // Fin des props

// Rangée « Filtres » de la maquette : Prix, distance et type, qui défile horizontalement sur les petits écrans
export function Filtres({ triParPrix, surTriParPrix, procheSeulement, surProche, type, surType }: Props) {
  return (
    // Trois pastilles côte à côte
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rangee}>
      <Pastille libelle="Prix" icone="options-outline" active={triParPrix} onPress={surTriParPrix} />
      <Pastille
        libelle={`< ${distanceProche / 1000} km`}
        icone="navigate-outline"
        iconeAvant
        active={procheSeulement}
        onPress={surProche}
      />
      <Pastille
        libelle={type === null ? "Type (Studio, Coloc)" : `Type : ${type}`} // Le libellé montre le type choisi
        icone="chevron-down" // Flèche de la maquette
        active={type !== null} // Actif dès qu'un type est choisi
        neutre // Gris au repos
        onPress={surType} // Passe au type suivant
      />
    </ScrollView>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  rangee: { gap: espacements.s, paddingVertical: espacements.xs }, // Pastilles côte à côte, écart s
  pastille: {
    // Une pastille de 40 dp de haut
    flexDirection: "row", // Icône et texte côte à côte
    alignItems: "center", // Centrés verticalement
    gap: espacements.xs, // Écart xs
    minHeight: tailleTactileMin - espacements.s, // 40 dp
    paddingHorizontal: espacements.m - 1, // Marge m moins le contour
    borderRadius: rayons.pilule, // Bords entièrement arrondis
    borderWidth: 1, // Contour de 1
  }, // Fin de la pastille
}); // Fin des styles
