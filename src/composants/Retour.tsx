import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { useRouter } from "expo-router"; // Hook de navigation d'Expo Router
import { Pressable, StyleSheet, View } from "react-native"; // Zone touchable, conteneur et outils
import { Texte } from "./Texte"; // Texte au style de la maquette
import { espacements, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

type Props = {
  // Props de l'en-tête
  titre?: string; // Titre à côté de la flèche, facultatif (« Demande de visite »)
}; // Fin des props

// En-tête « Retour » des écrans 6 et 7 : la flèche, et un titre facultatif sur une bande grise
export function Retour({ titre }: Props) {
  const router = useRouter(); // Objet de navigation fourni par Expo Router
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Bande sur toute la largeur de l'écran, avec un trait en bas
    <View
      style={[
        styles.bande,
        { backgroundColor: titre ? palette.surface : palette.fond, borderBottomColor: palette.bordure },
      ]}
    >
      <Pressable
        accessibilityRole="button" // Annoncé comme un bouton
        accessibilityLabel="Retour" // Le lecteur d'écran dit « Retour »
        onPress={() => router.back()} // Revient à l'écran précédent de la pile
        style={({ pressed }) => [styles.fleche, pressed ? styles.presse : null]} // Zone de 48 dp
      >
        <Ionicons name="arrow-back" size={24} color={palette.texte} />
      </Pressable>
      {titre ? <Texte variante="titre">{titre}</Texte> : null}
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  bande: {
    // La bande de l'en-tête
    marginHorizontal: -espacements.m, // Annule la marge latérale de l'Écran : bande sur toute la largeur
    paddingHorizontal: espacements.s, // La flèche reste à 8 + 12 = 20 dp du bord, comme la maquette
    paddingVertical: espacements.s, // 8 dp en haut et en bas
    flexDirection: "row", // Flèche puis titre
    alignItems: "center", // Centrés verticalement
    gap: espacements.xs, // Écart xs
    borderBottomWidth: 1, // Trait de séparation
  }, // Fin de la bande
  fleche: { width: tailleTactileMin, height: tailleTactileMin, alignItems: "center", justifyContent: "center" }, // Zone tactile de 48 dp
  presse: { opacity: 0.6 }, // Retour visuel sous le doigt
}); // Fin des styles
