import { Pressable, StyleSheet, type PressableProps } from "react-native"; // Zone touchable et outils
import { Texte } from "./Texte"; // Texte au style de la maquette
import { tailleTactileMin } from "@/theme/tokens"; // 48 dp

type Props = Omit<PressableProps, "style" | "children"> & { libelle: string }; // Un lien n'a qu'un libellé

// Lien touchable : un texte en couleur primaire placé dans une zone de 48 dp de haut, comme les cadres « Lien » de la maquette
export function Lien({ libelle, ...autres }: Props) {
  // onPress arrive dans autres
  return (
    // La zone tactile est plus haute que le texte
    <Pressable accessibilityRole="link" style={styles.zone} {...autres} /* Annoncé comme un lien */>
      <Texte variante="libelle" couleur="primaire" /* Style Libellé, couleur primaire */>
        {libelle}
      </Texte>
    </Pressable>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  zone: { minHeight: tailleTactileMin, justifyContent: "center", alignSelf: "flex-start" }, // 48 de haut, largeur du texte seulement
}); // Fin des styles
