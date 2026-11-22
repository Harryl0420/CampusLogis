import { useColorScheme } from "react-native"; // Hook de React Native qui lit le thème choisi dans les réglages du téléphone
import { couleurs } from "./tokens"; // Les vingt couleurs de la maquette

export type Mode = keyof typeof couleurs; // "clair" | "sombre", les deux groupes de variables de Figma
export type Palette = (typeof couleurs)[Mode]; // Les dix couleurs d'un groupe

// Hook personnalisé : il renvoie le mode actif et la palette correspondante
export function useTheme(): { mode: Mode; palette: Palette } {
  // Le nom commence par « use » : c'est un hook
  const schema = useColorScheme(); // "dark" si le téléphone est en mode sombre
  const mode: Mode = schema === "dark" ? "sombre" : "clair"; // Le mode clair est le mode par défaut
  return { mode, palette: couleurs[mode] }; // Chaque composant obtient ses couleurs par palette.fond, palette.texte...
}
