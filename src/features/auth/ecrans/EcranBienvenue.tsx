import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { router } from "expo-router"; // Navigation entre écrans (détaillée au chapitre 4)
import { StyleSheet, View } from "react-native"; // Conteneur et outils
import { Badge } from "@/composants/Badge"; // Pilule d'information
import { Bouton } from "@/composants/Bouton"; // Composant Bouton
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { polices } from "@/theme/polices"; // Graisse du texte « 0 XAF caution* »
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { avecOpacite } from "@/utils/couleurs"; // Fond rose très pâle de l'illustration

// Écran 1. Bienvenue : marque, illustration et accroche au centre, deux boutons dans la zone du pouce
export function EcranBienvenue() {
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Deux blocs : la présentation, qui prend toute la place libre, puis les actions
    <Ecran>
      <View style={styles.presentation} /* Cadre « Contenu » */>
        <View style={styles.marque} /* Nom de l'application et badge */>
          <Texte variante="titre">CampusLogis</Texte>
          <Badge libelle="Logements étudiants certifiés" icone="checkmark-circle" />
        </View>
        <View
          style={[
            styles.illustration,
            { backgroundColor: avecOpacite(palette.teinte, 0.6), borderColor: palette.bordure },
          ]} // Cadre rose pâle
        >
          <Badge libelle="100% Vérifié & Sans frais cachés" ton="neutre" point />
          <View
            style={[
              styles.atout,
              { backgroundColor: palette.fond, borderColor: palette.bordure },
            ]} /* Carte « À moins de 10 min » */
          >
            <View style={[styles.pictogramme, { backgroundColor: palette.teinte }]} /* Cercle de l'icône */>
              <Ionicons name="navigate" size={20} color={palette.primaire} />
            </View>
            <View style={styles.atoutTextes} /* Les deux lignes de texte prennent la place restante */>
              <Texte variante="legende">À moins de 10 min des amphis</Texte>
              <Texte variante="legende" couleur="texteSecondaire">
                Colocations, studios & résidences
              </Texte>
            </View>
            <View
              style={[
                styles.caution,
                { backgroundColor: palette.surface, borderColor: palette.bordure },
              ]} /* Étiquette */
            >
              <Texte variante="legende" style={styles.gras}>
                0 XAF caution*
              </Texte>
            </View>
          </View>
        </View>
        <View style={styles.accroche} /* Accroche centrée */>
          <Texte variante="sousTitre" style={styles.centre}>
            Le logement qui vous convient, près de votre campus
          </Texte>
          <Texte variante="legende" couleur="texteSecondaire" style={styles.centre}>
            {"Baux clairs, loyers tout compris et colocataires vérifiés pour emménager l'esprit libre."}
          </Texte>
        </View>
      </View>
      <View style={styles.actions} /* Les deux boutons et la mention, en bas */>
        <Bouton
          libelle="Se connecter"
          icone="arrow-forward"
          onPress={() => router.push("/connexion")} /* Ouvre l'écran 2. Connexion */
        />
        <Bouton
          libelle="Créer un compte"
          type="secondaire"
          onPress={() => router.push("/inscription")} /* Ouvre l'écran 3. Inscription */
        />
        <Texte variante="legende" couleur="texteSecondaire" style={styles.centre}>
          Plateforme sécurisée pour étudiants & universités
        </Texte>
      </View>
    </Ecran>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  presentation: { flex: 1, justifyContent: "center", gap: espacements.l, paddingTop: espacements.l }, // Prend la place libre et centre son contenu
  marque: { alignItems: "center", gap: espacements.s }, // Nom et badge centrés
  illustration: {
    // Cadre rose pâle de la maquette
    flexBasis: 260, // Hauteur de la maquette...
    flexShrink: 1, // ...réduite sur les petits téléphones
    minHeight: 170, // Sans jamais écraser son contenu
    justifyContent: "space-between", // Badge en haut, carte en bas
    alignItems: "flex-start", // Le badge garde la largeur de son texte
    padding: espacements.m, // Marge intérieure m
    borderRadius: rayons.moyen, // Rayon moyen
    borderWidth: 1, // Contour de 1
  }, // Fin de l'illustration
  atout: {
    // Carte blanche du bas de l'illustration
    alignSelf: "stretch", // Toute la largeur du cadre
    flexDirection: "row", // Icône, textes et étiquette côte à côte
    alignItems: "center", // Centrés verticalement
    gap: espacements.s, // Écart s
    padding: espacements.s, // Marge intérieure s
    borderRadius: rayons.moyen, // Rayon moyen
    borderWidth: 1, // Contour de 1
  }, // Fin de la carte
  pictogramme: {
    // Cercle de 40 dp
    width: tailleTactileMin - espacements.s, // 40 dp
    height: tailleTactileMin - espacements.s, // 40 dp
    borderRadius: rayons.pilule, // Cercle
    alignItems: "center", // Icône centrée
    justifyContent: "center", // Icône centrée
  }, // Fin du pictogramme
  atoutTextes: { flex: 1 }, // Les textes prennent la place restante
  caution: {
    paddingHorizontal: espacements.s,
    paddingVertical: espacements.xs,
    borderRadius: rayons.petit,
    borderWidth: 1,
  }, // Étiquette « 0 XAF caution* »
  gras: { fontFamily: polices["700"] }, // Légende en gras
  accroche: { gap: espacements.s }, // Titre de l'accroche et description
  centre: { textAlign: "center" }, // Texte centré
  actions: { gap: espacements.s, paddingTop: espacements.m, paddingBottom: espacements.m }, // Boutons rapprochés, au-dessus de la zone de sécurité
}); // Fin des styles
