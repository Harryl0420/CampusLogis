import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { StyleSheet, View } from "react-native"; // Conteneur et outils
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { polices } from "@/theme/polices"; // Graisse des textes en gras
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { avecOpacite } from "@/utils/couleurs"; // Rose transparent du cercle et du contour

// Bandeau « Mode démonstration actif » de l'écran 7. Paiement : il reste visible tant que le paiement est simulé
export function BandeauDemonstration() {
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Cadenas dans un cercle, puis deux lignes de texte
    <View
      style={[styles.bandeau, { backgroundColor: palette.teinte, borderColor: avecOpacite(palette.primaire, 0.3) }]}
    >
      <View style={[styles.cercle, { backgroundColor: avecOpacite(palette.primaire, 0.15) }]}>
        <Ionicons name="lock-closed" size={20} color={palette.primaire} />
      </View>
      <View style={styles.textes}>
        <Texte couleur="primaire" style={styles.gras}>
          Mode démonstration actif
        </Texte>
        <Texte variante="legende" couleur="texteSecondaire">
          Aucun prélèvement réel ne sera effectué
        </Texte>
      </View>
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  bandeau: {
    // Le cadre du bandeau
    flexDirection: "row", // Cercle puis textes
    alignItems: "center", // Centrés verticalement
    gap: espacements.s + espacements.xs, // 12 dp
    padding: espacements.s + espacements.xs - 1, // 12 dp moins le contour
    borderWidth: 1, // Contour de 1
    borderRadius: rayons.moyen, // Rayon moyen
  }, // Fin du bandeau
  cercle: {
    // Cercle de 40 dp
    width: tailleTactileMin - espacements.s, // 40 dp
    height: tailleTactileMin - espacements.s, // 40 dp
    borderRadius: rayons.pilule, // Cercle
    alignItems: "center", // Icône centrée
    justifyContent: "center", // Icône centrée
  }, // Fin du cercle
  textes: { flex: 1 }, // Les textes prennent la place restante
  gras: { fontFamily: polices["600"] }, // Demi-gras
}); // Fin des styles
