import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { StyleSheet, View } from "react-native"; // Conteneur et outils de style
import type { NomIcone } from "./icones"; // Type des noms d'icônes
import { Texte } from "./Texte"; // Texte au style de la maquette
import { polices } from "@/theme/polices"; // Graisse du libellé
import { espacements, rayons } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

export type TonBadge = "teinte" | "neutre"; // Rose pâle (mise en avant) ou gris (information)

type Props = {
  // Calques du badge de la maquette
  libelle: string; // Texte du badge
  icone?: NomIcone; // Icône facultative à gauche
  point?: boolean; // Petit point rose à gauche, comme « 100 % Vérifié »
  ton?: TonBadge; // Teinte par défaut
}; // Fin des props

// Badge en forme de pilule : petite information mise en avant
export function Badge({ libelle, icone, point = false, ton = "teinte" }: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  const teinte = ton === "teinte"; // Vrai pour le badge rose pâle
  return (
    // Pastille horizontale : point ou icône, puis libellé
    <View
      style={[
        styles.badge,
        {
          backgroundColor: teinte ? palette.teinte : palette.surface, // Fond teinte ou surface
          borderColor: teinte ? palette.teinte : palette.bordure, // Contour visible seulement pour le badge neutre
        },
      ]}
    >
      {point ? <View style={[styles.point, { backgroundColor: palette.primaire }]} /> : null}
      {icone ? <Ionicons name={icone} size={16} color={palette.primaire} /> : null}
      <Texte variante="legende" couleur={teinte ? "primaire" : "texte"} style={styles.gras}>
        {libelle}
      </Texte>
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  badge: {
    // La pilule
    flexDirection: "row", // Éléments côte à côte
    alignItems: "center", // Centrés verticalement
    gap: espacements.xs, // Écart xs
    paddingHorizontal: espacements.s + espacements.xs, // 12 dp à gauche et à droite
    paddingVertical: espacements.xs, // 4 dp en haut et en bas
    borderRadius: rayons.pilule, // Bords entièrement arrondis
    borderWidth: 1, // Contour de 1
  }, // Fin du badge
  point: { width: espacements.s, height: espacements.s, borderRadius: rayons.pilule }, // Point de 8 dp
  gras: { fontFamily: polices["600"] }, // Légende en demi-gras, comme la maquette
}); // Fin des styles
