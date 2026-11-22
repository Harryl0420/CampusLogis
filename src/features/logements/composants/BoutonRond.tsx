import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { Pressable, StyleSheet } from "react-native"; // Zone touchable et outils
import type { NomIcone } from "@/composants/icones"; // Type des noms d'icônes
import { espacements, rayons, tailleTactileMin, type NomCouleur } from "@/theme/tokens"; // Mesures et noms de couleur
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

type Props = {
  // Props du bouton rond posé sur une photo
  icone: NomIcone; // Icône du bouton
  accessibilityLabel: string; // Action annoncée par le lecteur d'écran
  onPress?: () => void; // Fonction appelée au toucher
  couleur?: NomCouleur; // Couleur de l'icône, texte par défaut
}; // Fin des props

// Bouton rond de 40 dp, fond de l'écran : posé sur les photos (cœur, retour, partager)
export function BoutonRond({ icone, accessibilityLabel, onPress, couleur = "texte" }: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Cercle touchable
    <Pressable
      accessibilityRole="button" // Annoncé comme un bouton
      accessibilityLabel={accessibilityLabel} // Action annoncée
      onPress={onPress} // Prévient l'écran
      hitSlop={espacements.xs} // Zone tactile de 48 dp
      style={({ pressed }) => [styles.rond, { backgroundColor: palette.fond, opacity: pressed ? 0.8 : 1 }]} // Retour visuel
    >
      <Ionicons name={icone} size={22} color={palette[couleur]} />
    </Pressable>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  rond: {
    // Cercle de 40 dp
    width: tailleTactileMin - espacements.s, // 40 dp
    height: tailleTactileMin - espacements.s, // 40 dp
    borderRadius: rayons.pilule, // Cercle
    alignItems: "center", // Icône centrée
    justifyContent: "center", // Icône centrée
  }, // Fin du cercle
}); // Fin des styles
