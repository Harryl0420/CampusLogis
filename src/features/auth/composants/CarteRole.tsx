import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { Pressable, StyleSheet, View } from "react-native"; // Zone touchable, conteneur et outils
import type { NomIcone } from "@/composants/icones"; // Type des noms d'icônes
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

type Props = {
  // Calques de la carte de choix de la maquette
  titre: string; // « Étudiant » ou « Bailleur »
  sousTitre: string; // « Je cherche » ou « Je loue »
  icone: NomIcone; // Icône dans le cercle
  choisie: boolean; // Vrai pour la carte sélectionnée
  surChoix: () => void; // Fonction appelée au toucher
}; // Fin des props

// Carte de choix du rôle : fond teinte, textes primaires et coche quand elle est choisie
export function CarteRole({ titre, sousTitre, icone, choisie, surChoix }: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Toute la carte est touchable
    <Pressable
      accessibilityRole="radio" // Annoncée comme un choix parmi plusieurs
      accessibilityState={{ checked: choisie }} // Le lecteur d'écran sait laquelle est choisie
      accessibilityLabel={`${titre}, ${sousTitre}`} // Texte annoncé
      onPress={surChoix} // Prévient l'écran
      style={({ pressed }) => [
        // Style recalculé quand le doigt se pose
        styles.carte, // Partie commune
        {
          backgroundColor: choisie ? palette.teinte : palette.surface, // Fond teinte si choisie
          borderColor: choisie ? palette.teinte : palette.bordure, // Contour discret si non choisie
          opacity: pressed ? 0.8 : 1, // Léger retour visuel au toucher
        },
      ]}
    >
      {choisie ? ( // Rendu conditionnel : la coche n'existe que sur la carte choisie
        <View style={styles.coche}>
          <Ionicons name="checkmark-circle" size={24} color={palette.primaire} />
        </View>
      ) : null}
      <View style={[styles.pictogramme, { backgroundColor: palette.fond }]} /* Cercle de l'icône */>
        <Ionicons name={icone} size={22} color={choisie ? palette.primaire : palette.texteSecondaire} />
      </View>
      <Texte variante="libelle" couleur={choisie ? "primaire" : "texte"}>
        {titre}
      </Texte>
      <Texte variante="legende" couleur={choisie ? "primaire" : "texteSecondaire"}>
        {sousTitre}
      </Texte>
    </Pressable>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  carte: {
    // La carte
    flex: 1, // Les deux cartes se partagent la largeur
    alignItems: "center", // Contenu centré
    gap: espacements.xs, // Écart xs entre les textes
    paddingVertical: espacements.m, // Marge m en haut et en bas
    paddingHorizontal: espacements.s, // Marge s sur les côtés
    borderRadius: rayons.moyen, // Rayon moyen
    borderWidth: 1, // Contour de 1
    minHeight: tailleTactileMin, // Zone tactile minimale
  }, // Fin de la carte
  coche: { position: "absolute", top: espacements.s, right: espacements.s }, // Coche dans le coin haut droit
  pictogramme: {
    // Cercle de 40 dp
    width: tailleTactileMin - espacements.s, // 40 dp
    height: tailleTactileMin - espacements.s, // 40 dp
    borderRadius: rayons.pilule, // Cercle
    alignItems: "center", // Icône centrée
    justifyContent: "center", // Icône centrée
    marginBottom: espacements.xs, // Petit espace avant le titre
  }, // Fin du pictogramme
}); // Fin des styles
