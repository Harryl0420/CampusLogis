import { Roboto_400Regular } from "@expo-google-fonts/roboto/400Regular"; // Fichier de la police Roboto Regular
import { Roboto_600SemiBold } from "@expo-google-fonts/roboto/600SemiBold"; // Roboto SemiBold
import { Roboto_700Bold } from "@expo-google-fonts/roboto/700Bold"; // Roboto Bold
import { useFonts } from "expo-font"; // Hook de chargement des polices
import { Stack } from "expo-router"; // Pile d'écrans (détaillée au chapitre 4)
import * as SplashScreen from "expo-splash-screen"; // Écran de démarrage
import { StatusBar } from "expo-status-bar"; // Barre d'état du téléphone
import { useEffect } from "react"; // Effet de bord
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

SplashScreen.preventAutoHideAsync(); // Garde l'écran de démarrage affiché tant que les polices ne sont pas prêtes

// Layout racine : il enveloppe tous les écrans de l'application
export default function RacineLayout() {
  // Expo Router utilise l'export par défaut de ce fichier
  const { palette } = useTheme(); // Palette claire ou sombre
  const [policesChargees, erreurPolices] = useFonts({ Roboto_400Regular, Roboto_600SemiBold, Roboto_700Bold }); // Charge les trois graisses

  useEffect(() => {
    // S'exécute après l'affichage, puis à chaque changement des dépendances
    if (policesChargees || erreurPolices) SplashScreen.hideAsync(); // Polices prêtes, ou échec : on retire l'écran de démarrage
  }, [policesChargees, erreurPolices]); // L'effet se relance quand l'une d'elles change

  if (!policesChargees && !erreurPolices) return null; // Rien à afficher tant que le chargement n'est pas terminé

  return (
    // Layout racine : la pile principale, qui contient les deux groupes
    <>
      <StatusBar style="auto" /* Icônes foncées en mode clair, claires en mode sombre */ />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: palette.fond },
        }} /* Pas d'en-tête : chaque écran a son titre */
      >
        <Stack.Screen name="(auth)" /* Groupe Bienvenue, Connexion, Inscription : sa propre pile */ />
        <Stack.Screen name="(onglets)" /* Groupe des onglets */ />
      </Stack>
    </>
  ); // Fin du rendu
}
