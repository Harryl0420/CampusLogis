import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { StyleSheet, View } from "react-native"; // Conteneur et outils
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { polices } from "@/theme/polices"; // Graisse du chiffre
import { espacements } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

// Note sur 5 : étoile rose puis chiffre, comme « ★ 4.9 » dans la maquette
export function Note({ valeur }: { valeur: number }) {
  // valeur : note sur 5
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Étoile et chiffre côte à côte
    <View style={styles.note} accessibilityLabel={`Note ${valeur} sur 5`} /* Annoncé en entier */>
      <Ionicons name="star" size={16} color={palette.primaire} />
      <Texte variante="legende" style={styles.gras}>
        {valeur.toFixed(1)}
      </Texte>
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  note: { flexDirection: "row", alignItems: "center", gap: espacements.xs }, // Étoile puis chiffre
  gras: { fontFamily: polices["700"] }, // Chiffre en gras
}); // Fin des styles
