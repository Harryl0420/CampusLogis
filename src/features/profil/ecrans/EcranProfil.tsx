import { Ionicons } from "@expo/vector-icons"; // Jeu d'icônes Ionicons, inclus dans Expo
import { useRouter } from "expo-router"; // Hook de navigation d'Expo Router
import { ScrollView, StyleSheet, View } from "react-native"; // Défilement, conteneur et outils
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { couleursFixes } from "@/theme/couleursFixes"; // Couleur de la photo factice
import { espacements, rayons } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { LigneProfil } from "../composants/LigneProfil"; // Ligne de réglage
import { lireUtilisateur } from "../depot"; // Accès aux données

// Écran 8. Profil : photo, nom, numéro, puis quatre lignes ; la barre d'onglets est ajoutée par le layout (onglets)
export function EcranProfil() {
  const { palette } = useTheme(); // Palette claire ou sombre
  const router = useRouter(); // Objet de navigation
  const utilisateur = lireUtilisateur(); // Utilisateur fourni par le dépôt
  return (
    // Seul le bord haut est protégé : la barre d'onglets gère le bas
    <Ecran bords={["top"]}>
      <ScrollView contentContainerStyle={styles.contenu} /* Cadre « Contenu », centré, à Y = 72 */>
        <View style={styles.avatar} /* Calque Avatar : cercle de 88 dp */ />
        <Texte variante="sousTitre">{utilisateur.nom}</Texte>
        <Texte couleur="texteSecondaire">{utilisateur.telephone}</Texte>
        <View style={styles.lignes} /* Les quatre lignes prennent toute la largeur */>
          <LigneProfil libelle="Langue" valeur="Français" /* Le choix de la langue arrive à la séance 8 */ />
          <LigneProfil libelle="Thème" valeur="Automatique" /* Suit le réglage du téléphone (useTheme) */ />
          <LigneProfil
            libelle="Mes visites" // Raccourci vers le troisième onglet
            valeur={
              <Ionicons
                name="chevron-forward"
                size={20}
                color={palette.texteSecondaire} /* Le « > » de la maquette */
              />
            }
            onPress={() => router.navigate("/visites")} // Passe à l'onglet Visites, sans empiler d'écran
          />
          <LigneProfil
            libelle="Se déconnecter" // Libellé en couleur erreur
            danger // Style « danger »
            onPress={() => router.replace("/")} // L'authentification remplace les onglets : Retour ne ramène pas au profil
          />
        </View>
      </ScrollView>
    </Ecran>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  contenu: {
    alignItems: "center", // Avatar, nom et numéro centrés
    gap: espacements.m, // Écart m
    paddingTop: espacements.xl + espacements.m, // Y = 72 moins 24 de zone de sécurité = 48
    paddingBottom: espacements.m, // Air en bas
  }, // Fin du contenu
  avatar: { width: 88, height: 88, borderRadius: rayons.pilule, backgroundColor: couleursFixes.avatar }, // Cercle de 88 dp
  lignes: { alignSelf: "stretch", gap: espacements.m }, // Pleine largeur, écart m entre les lignes
}); // Fin des styles
