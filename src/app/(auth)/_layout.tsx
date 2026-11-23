import { Stack } from "expo-router"; // Pile d'écrans
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

// Layout du groupe (auth) : une pile qui contient Bienvenue, Connexion et Inscription
export default function AuthLayout() {
  // Expo Router utilise l'export par défaut de ce fichier
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: palette.fond },
      }} /* Pas d'en-tête : chaque écran a son titre */
    />
  ); // Les écrans du groupe s'empilent ici
}
