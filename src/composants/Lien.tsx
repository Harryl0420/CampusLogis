import { Pressable, StyleSheet, type PressableProps } from "react-native"; // Zone touchable et outils
import { Texte } from "./Texte"; // Texte au style de la maquette
import { tailleTactileMin, type NomCouleur } from "@/theme/tokens"; // 48 dp et noms de couleur

type Props = Omit<PressableProps, "style" | "children"> & {
  // Props de Pressable, sauf style et contenu
  libelle: string; // Partie touchable, en couleur
  prefixe?: string; // Début de phrase en gris, comme « Vous n'avez pas de compte ? »
  variante?: "libelle" | "legende"; // Taille du texte : Libellé (16, gras) par défaut, ou Légende (13)
  couleur?: NomCouleur; // Couleur du lien, primaire par défaut
  alignement?: "flex-start" | "center" | "flex-end"; // Position dans la ligne : à gauche par défaut
}; // Fin des props

// Lien touchable : un texte placé dans une zone de 48 dp de haut, comme les cadres « Lien » de la maquette
export function Lien({
  libelle,
  prefixe,
  variante = "libelle",
  couleur = "primaire",
  alignement = "flex-start",
  ...autres
}: Props) {
  const variantePrefixe = variante === "libelle" ? "corps" : variante; // Le début de phrase n'est pas en gras
  return (
    // La zone tactile est plus haute que le texte
    <Pressable
      accessibilityRole="link"
      style={[styles.zone, { alignSelf: alignement }]}
      {...autres} /* Annoncé comme un lien */
    >
      <Texte
        variante={variantePrefixe}
        couleur="texteSecondaire" /* Texte imbriqué : début de phrase gris, puis le lien */
      >
        {prefixe ? `${prefixe} ` : null}
        <Texte variante={variante} couleur={couleur}>
          {libelle}
        </Texte>
      </Texte>
    </Pressable>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  zone: { minHeight: tailleTactileMin, justifyContent: "center" }, // 48 de haut, largeur du texte seulement
}); // Fin des styles
