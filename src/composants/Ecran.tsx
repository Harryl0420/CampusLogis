import type { ReactNode } from "react"; // Type du contenu de l'écran
import { StyleSheet } from "react-native"; // Outils de style
import { SafeAreaView, type Edge } from "react-native-safe-area-context"; // Respect des zones de sécurité du téléphone
import { espacements } from "@/theme/tokens"; // Marge latérale m
import { useTheme } from "@/theme/useTheme"; // Couleur de fond du mode actif

type Props = {
  // Props du cadre d'écran
  children: ReactNode; // Le contenu de l'écran
  bords?: Edge[]; // Bords à protéger : haut et bas par défaut
}; // Fin des props

// Cadre commun à tous les écrans : fond du thème, zones de sécurité et marge latérale de 16 dp
export function Ecran({ children, bords = ["top", "bottom"] }: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // SafeAreaView ajoute la hauteur de la barre d'état, de l'encoche et de la barre de gestes
    <SafeAreaView edges={bords} style={[styles.ecran, { backgroundColor: palette.fond }]}>
      {children}
    </SafeAreaView>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  ecran: { flex: 1, paddingHorizontal: espacements.m }, // Tout l'écran, marges latérales de 16 comme le cadre « Contenu »
}); // Fin des styles
