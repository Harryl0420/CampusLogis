import { Pressable, StyleSheet, View } from "react-native"; // Zone touchable, conteneur et outils
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

type Props = {
  // Props de la rangée de créneaux
  creneaux: readonly string[]; // Créneaux proposés
  choisi: string; // Créneau sélectionné, ou chaîne vide
  surChoix: (creneau: string) => void; // Appelée au toucher d'une pastille
}; // Fin des props

// Pastilles des créneaux horaires : rose plein pour le créneau choisi, grises pour les autres
export function ChoixCreneau({ creneaux, choisi, surChoix }: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Les pastilles passent à la ligne si la largeur manque
    <View style={styles.rangee}>
      {creneaux.map((creneau) => {
        const actif = creneau === choisi; // Vrai pour le créneau sélectionné
        return (
          <Pressable
            key={creneau} // Clé unique : le libellé du créneau
            accessibilityRole="radio" // Un seul choix possible
            accessibilityState={{ checked: actif }} // Le lecteur d'écran sait lequel est choisi
            hitSlop={{ top: espacements.xs, bottom: espacements.xs }} // Zone tactile agrandie à 48 dp de haut
            onPress={() => surChoix(creneau)} // Prévient l'écran
            style={[
              styles.pastille,
              {
                backgroundColor: actif ? palette.primaire : palette.surface, // Rose plein si choisi
                borderColor: actif ? palette.primaire : palette.bordure, // Contour discret sinon
              },
            ]}
          >
            <Texte variante="legende" couleur={actif ? "surPrimaire" : "texteSecondaire"}>
              {creneau}
            </Texte>
          </Pressable>
        );
      })}
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  rangee: { flexDirection: "row", flexWrap: "wrap", gap: espacements.s }, // Pastilles côte à côte, écart s
  pastille: {
    // Une pastille de 40 dp de haut
    minHeight: tailleTactileMin - espacements.s, // 40 dp
    justifyContent: "center", // Texte centré verticalement
    paddingHorizontal: espacements.m - 1, // Marge m moins le contour
    borderRadius: rayons.pilule, // Bords entièrement arrondis
    borderWidth: 1, // Contour de 1
  }, // Fin de la pastille
}); // Fin des styles
