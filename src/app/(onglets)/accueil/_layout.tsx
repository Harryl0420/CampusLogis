import { Stack } from "expo-router"; // Pile d'écrans
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

// Un lien profond vers /accueil/l1 place d'abord l'Accueil sous le Détail : le bouton Retour y ramène
export const unstable_settings = { anchor: "index" }; // « index » est la route /accueil de cette pile

// Layout de l'onglet Accueil : une pile imbriquée dans l'onglet, pour que le Détail garde la barre d'onglets
export default function AccueilLayout() {
  // Expo Router utilise l'export par défaut de ce fichier
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: palette.fond },
      }} /* Accueil, puis Détail par-dessus */
    />
  ); // Les écrans de l'onglet s'empilent ici
}
