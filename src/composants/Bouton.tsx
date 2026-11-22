import { Pressable, StyleSheet, type PressableProps } from "react-native"; // Zone touchable et outils de style
import { Texte } from "./Texte"; // Texte au style de la maquette
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { avecOpacite } from "@/utils/couleurs"; // Opacité d'une couleur, comme dans Figma

export type TypeBouton = "primaire" | "secondaire"; // Propriété « Type » du composant Figma
export type EtatBouton = "normal" | "presse" | "desactive"; // Propriété « État » du composant Figma

type Props = Omit<PressableProps, "style" | "children"> & {
  // Props de Pressable, sauf style et contenu que l'on fixe ici
  libelle: string; // Calque « Libellé » de la maquette
  type?: TypeBouton; // Primaire par défaut
  etat?: EtatBouton; // Normal par défaut
}; // Fin des props

// Composant Bouton : les variantes Type et État de Figma deviennent les props type et etat
export function Bouton({ libelle, type = "primaire", etat = "normal", ...autres }: Props) {
  // Valeurs par défaut
  const { palette } = useTheme(); // Palette claire ou sombre
  const desactive = etat === "desactive"; // Vrai si le bouton ne doit pas réagir
  const couleurTexte = desactive ? "texteSecondaire" : type === "primaire" ? "surPrimaire" : "primaire"; // Couleur du libellé
  return (
    // Pressable fournit l'état « pressé » pendant que le doigt est posé
    <Pressable
      accessibilityRole="button" // Annoncé comme un bouton par les lecteurs d'écran
      accessibilityState={{ disabled: desactive }} // Annoncé comme indisponible s'il est désactivé
      disabled={desactive} // Ignore les touchers quand il est désactivé
      style={({ pressed }) => {
        // Le style est recalculé quand le doigt se pose ou se lève
        const presse = etat === "presse" || pressed; // État Pressé imposé ou réel
        if (type === "primaire") {
          // Variante Type = Primaire
          const fond = desactive ? palette.bordure : presse ? avecOpacite(palette.primaire, 0.8) : palette.primaire; // Remplissage selon l'état
          return [styles.base, { backgroundColor: fond }]; // Style commun puis couleur de fond
        } // Fin du bouton primaire
        return [
          styles.base,
          {
            // Variante Type = Secondaire
            backgroundColor: presse ? avecOpacite(palette.primaire, 0.12) : palette.fond, // Teinte légère quand il est pressé
            borderWidth: 1.5, // Contour de 1,5 comme dans la maquette
            borderColor: desactive ? palette.bordure : palette.primaire, // Contour gris s'il est désactivé
          },
        ]; // Fin du bouton secondaire
      }}
      {...autres} // onPress et les autres props transmises par l'écran
    >
      <Texte variante="libelle" couleur={couleurTexte} numberOfLines={1} /* Calque Libellé, sur une seule ligne */>
        {libelle}
      </Texte>
    </Pressable>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois, hors du composant
  base: {
    // Partie commune aux deux types
    minHeight: tailleTactileMin, // 48 dp : la zone tactile minimale
    paddingHorizontal: espacements.m, // Marges intérieures m à gauche et à droite
    paddingVertical: espacements.s, // Marges intérieures s en haut et en bas
    borderRadius: rayons.moyen, // Rayon moyen (12)
    alignItems: "center", // Libellé centré horizontalement
    justifyContent: "center", // Libellé centré verticalement
  }, // Fin du style de base
}); // Fin des styles
