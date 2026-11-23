import type { ReactNode } from "react"; // Type d'un élément à afficher
import { Pressable, StyleSheet } from "react-native"; // Zone touchable et outils
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

type Props = {
  // Props d'une ligne du profil
  libelle: string; // Texte de gauche : « Langue », « Thème »...
  valeur?: ReactNode; // Élément de droite, facultatif : un texte ou une icône
  danger?: boolean; // Vrai pour « Se déconnecter » : libellé en couleur erreur
  onPress?: () => void; // Action au toucher, facultative
}; // Fin des props

// Ligne de réglage de l'écran 8. Profil : 52 dp de haut, libellé à gauche, valeur à droite
export function LigneProfil({ libelle, valeur, danger = false, onPress }: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Toute la ligne est touchable
    <Pressable
      accessibilityRole="button" // Annoncée comme un bouton
      onPress={onPress} // Action fournie par l'écran
      style={({ pressed }) => [
        styles.ligne,
        {
          backgroundColor: palette.surface, // Fond surface
          borderColor: palette.bordure, // Contour bordure
          opacity: pressed && onPress ? 0.8 : 1, // Retour visuel seulement si la ligne a une action
        },
      ]}
    >
      <Texte variante={danger ? "libelle" : "corps"} couleur={danger ? "erreur" : "texte"}>
        {libelle}
      </Texte>
      {
        typeof valeur === "string" ? (
          <Texte couleur="texteSecondaire">{valeur}</Texte>
        ) : (
          valeur
        ) /* Un texte est mis en forme, une icône est affichée telle quelle */
      }
    </Pressable>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  ligne: {
    // Le cadre de la ligne
    flexDirection: "row", // Libellé et valeur côte à côte
    justifyContent: "space-between", // Libellé à gauche, valeur à droite
    alignItems: "center", // Centrés verticalement
    minHeight: tailleTactileMin + espacements.xs, // 52 dp, contour compris, comme dans la maquette
    paddingHorizontal: espacements.m - 1, // Marge m moins le contour
    borderWidth: 1, // Contour de 1
    borderRadius: rayons.moyen, // Rayon moyen
  }, // Fin de la ligne
}); // Fin des styles
