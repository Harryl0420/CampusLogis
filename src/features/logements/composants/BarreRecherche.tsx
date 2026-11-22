import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { Platform, StyleSheet, TextInput, View } from "react-native"; // Champ de saisie, conteneur et outils
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { polices } from "@/theme/polices"; // Fichier de police de la valeur saisie
import { espacements, rayons, tailleTactileMin, typographie } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

type Props = { valeur: string; surChangement: (texte: string) => void }; // Texte tapé et fonction de mise à jour

// Barre de recherche de la maquette : loupe, question et champ sur deux lignes, icône des réglages
export function BarreRecherche({ valeur, surChangement }: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Pilule horizontale
    <View style={[styles.barre, { backgroundColor: palette.fond, borderColor: palette.bordure }]}>
      <Ionicons name="search" size={22} color={palette.primaire} />
      <View style={styles.textes} /* Question au-dessus, champ en dessous */>
        <Texte>Où voulez-vous habiter ?</Texte>
        <TextInput
          value={valeur} // Texte tapé, fourni par l'écran
          onChangeText={surChangement} // Chaque frappe met l'état à jour
          placeholder="Campus, quartier, université…" // Texte d'exemple de la maquette
          placeholderTextColor={palette.texteSecondaire} // Couleur du texte d'exemple
          accessibilityLabel="Où voulez-vous habiter ?" // Annoncé par le lecteur d'écran
          returnKeyType="search" // Touche « Rechercher » sur le clavier
          style={[styles.saisie, { color: palette.texte }]} // Style Légende
        />
      </View>
      <Ionicons name="options-outline" size={22} color={palette.texteSecondaire} />
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  barre: {
    // La pilule
    flexDirection: "row", // Loupe, textes et icône côte à côte
    alignItems: "center", // Centrés verticalement
    gap: espacements.s + espacements.xs, // Écart de 12 dp
    minHeight: tailleTactileMin + espacements.s, // 56 dp
    paddingHorizontal: espacements.m, // Marge m
    paddingVertical: espacements.s, // Marge s
    borderRadius: rayons.pilule, // Bords entièrement arrondis
    borderWidth: 1, // Contour de 1
  }, // Fin de la barre
  textes: { flex: 1 }, // Les textes prennent la place restante
  saisie: {
    // Champ au style Légende
    fontFamily: polices["400"], // Roboto Regular
    fontSize: typographie.legende.fontSize, // 13 dp
    ...Platform.select({ android: { paddingVertical: 0 } }), // Android ajoute une marge verticale : on la supprime
  }, // Fin du champ
}); // Fin des styles
