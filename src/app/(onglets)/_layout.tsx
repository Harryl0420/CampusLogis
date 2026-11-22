import { Ionicons } from "@expo/vector-icons"; // Jeu d'icônes Ionicons, inclus dans Expo
import { Tabs } from "expo-router"; // Barre d'onglets d'Expo Router
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Hauteur des zones de sécurité du téléphone
import { polices } from "@/theme/polices"; // Fichier de police de la Légende
import { tailleTactileMin, typographie } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

// Layout du groupe (onglets) : le composant « Barre d'onglets » de la maquette (le quatrième onglet, Profil, arrive à l'étape 5)
export default function OngletsLayout() {
  // Expo Router utilise l'export par défaut de ce fichier
  const { palette } = useTheme(); // Palette claire ou sombre
  const marges = useSafeAreaInsets(); // Zones de sécurité : marges.bottom est la hauteur de la barre de gestes
  return (
    // Chaque Tabs.Screen correspond à un fichier du dossier (onglets)
    <Tabs
      screenOptions={{
        // Réglages communs à tous les onglets
        headerShown: false, // Pas d'en-tête : chaque écran a son titre
        tabBarActiveTintColor: palette.primaire, // Onglet actif en rose (propriété Actif de la maquette)
        tabBarInactiveTintColor: palette.texteSecondaire, // Autres onglets en texte secondaire
        tabBarStyle: {
          // Le cadre de la barre
          backgroundColor: palette.surface, // Fond surface
          borderTopColor: palette.bordure, // Trait du haut, couleur bordure
          borderTopWidth: 1, // Trait de 1
          height: tailleTactileMin + marges.bottom, // 48 de zone touchable + la zone de sécurité
          paddingBottom: marges.bottom, // Icônes et noms restent au-dessus de la barre de gestes
        }, // Fin du cadre
        tabBarLabelStyle: { fontFamily: polices["400"], fontSize: typographie.legende.fontSize }, // Calque Nom : style Légende
      }} // Fin des réglages communs
    >
      <Tabs.Screen
        name="accueil" // Fichier accueil.tsx (un dossier accueil/ à l'étape 7)
        options={{
          title: "Accueil",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? palette.primaire : palette.texteSecondaire}
            />
          ),
        }} // Nom et icône de l'onglet
      />
      <Tabs.Screen
        name="favoris" // Fichier favoris.tsx
        options={{
          title: "Favoris",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={24}
              color={focused ? palette.primaire : palette.texteSecondaire}
            />
          ),
        }} // Icône pleine si l'onglet est actif
      />
      <Tabs.Screen
        name="visites" // Fichier visites.tsx
        options={{
          title: "Visites",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={24}
              color={focused ? palette.primaire : palette.texteSecondaire}
            />
          ),
        }} // color : primaire ou texteSecondaire
      />
    </Tabs>
  ); // Fin du rendu
}
