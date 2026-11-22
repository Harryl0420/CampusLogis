import type { ReactNode } from "react"; // Type de tout ce qui peut être affiché : texte, nombre, élément
import { Text, type TextProps, type TextStyle } from "react-native"; // Composant de base et ses types
import { polices } from "@/theme/polices"; // Graisse vers fichier de police
import { typographie, type NomCouleur } from "@/theme/tokens"; // Les cinq styles de texte et les noms de couleur
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

export type VarianteTexte = keyof typeof typographie; // "titre" | "sousTitre" | "corps" | "legende" | "libelle"

type Props = TextProps & {
  // Toutes les props de Text, plus les deux nôtres
  variante?: VarianteTexte; // Style de texte de la maquette, Corps par défaut
  couleur?: NomCouleur; // Variable de couleur, texte par défaut
  children: ReactNode; // Le contenu du texte
}; // Fin des props

// Un texte qui applique toujours un style de la maquette : on n'écrit plus jamais fontSize à la main
export function Texte({ variante = "corps", couleur = "texte", style, children, ...autres }: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  const t = typographie[variante]; // Taille, graisse et interligne du style demandé
  const base: TextStyle = {
    // Style calculé à partir des tokens
    fontFamily: polices[t.fontWeight], // Le fichier Roboto de la bonne graisse
    fontSize: t.fontSize, // Taille en dp
    lineHeight: t.lineHeight, // Interligne en dp
    color: palette[couleur], // Couleur du mode actif
  }; // Fin du style de base
  return (
    // Le style passé en prop s'ajoute après le style de base et peut le compléter
    <Text style={[base, style]} {...autres} /* Tableau de styles : le dernier l'emporte */>
      {children}
    </Text>
  ); // Fin du rendu
}
