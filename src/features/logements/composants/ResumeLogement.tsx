import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { Image, StyleSheet, View } from "react-native"; // Image, conteneur et outils
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { polices } from "@/theme/polices"; // Graisse des textes en gras
import { espacements, rayons } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { formaterPrix } from "@/utils/formaterPrix"; // 45000 devient « 45 000 FCFA »
import type { Logement } from "../types"; // Type de la fonctionnalité

type Props = { logement: Logement }; // Le logement à résumer

// Carte de rappel du logement, en haut du Formulaire : photo avec « Vérifié », lieu, nom et prix
export function ResumeLogement({ logement }: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Photo à gauche, textes à droite
    <View style={[styles.carte, { backgroundColor: palette.surface, borderColor: palette.bordure }]}>
      <View style={[styles.photo, { backgroundColor: logement.couleurPhoto }]} /* Photo de 100 dp */>
        {logement.photos[0] ? (
          <Image source={logement.photos[0]} style={styles.image} accessibilityIgnoresInvertColors />
        ) : null}
        {logement.badge ? (
          <View style={[styles.verifie, { backgroundColor: palette.primaire }]} /* Pastille « Vérifié » */>
            <Texte variante="legende" couleur="surPrimaire" style={styles.gras}>
              Vérifié
            </Texte>
          </View>
        ) : null}
      </View>
      <View style={styles.textes}>
        <View style={styles.lieu} /* « Douala • Cité-Cicam » */>
          <Ionicons name="location-outline" size={14} color={palette.primaire} />
          <Texte variante="legende" couleur="texteSecondaire">{`${logement.ville} • ${logement.quartier}`}</Texte>
        </View>
        <Texte variante="sousTitre" numberOfLines={2}>
          {logement.nom}
        </Texte>
        <Texte variante="sousTitre" couleur="primaire">
          {formaterPrix(logement.prix)}
          <Texte variante="legende" couleur="texteSecondaire">
            {" / mois"}
          </Texte>
        </Texte>
      </View>
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  carte: {
    // Le cadre de la carte
    flexDirection: "row", // Photo à gauche, textes à droite
    alignItems: "center", // Centrés verticalement
    gap: espacements.m, // Écart m
    padding: espacements.m - 1, // Marge m moins le contour
    borderWidth: 1, // Contour de 1
    borderRadius: rayons.moyen, // Rayon moyen
  }, // Fin de la carte
  photo: { width: 100, height: 100, borderRadius: rayons.petit, overflow: "hidden" }, // Photo carrée de 100 dp
  image: { width: "100%", height: "100%" }, // L'image remplit le cadre
  verifie: {
    // Pastille posée en haut à gauche de la photo
    position: "absolute", // Par-dessus l'image
    top: espacements.xs, // 4 dp du haut
    left: espacements.xs, // 4 dp de la gauche
    paddingHorizontal: espacements.s, // Marge s
    paddingVertical: espacements.xs / 2, // 2 dp
    borderRadius: rayons.pilule, // Pilule
  }, // Fin de la pastille
  textes: { flex: 1, gap: espacements.xs }, // Les textes prennent la place restante
  lieu: { flexDirection: "row", alignItems: "center", gap: espacements.xs }, // Icône puis lieu
  gras: { fontFamily: polices["600"] }, // Demi-gras
}); // Fin des styles
