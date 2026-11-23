import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { Image, StyleSheet, View } from "react-native"; // Image, conteneur et outils
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { couleursFixes } from "@/theme/couleursFixes"; // Voile et texte posés sur la photo
import { polices } from "@/theme/polices"; // Graisse des textes en gras
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { avecOpacite } from "@/utils/couleurs"; // Voile transparent
import { formaterPrix } from "@/utils/formaterPrix"; // 10000 devient « 10 000 FCFA »
import type { Logement } from "../types"; // Type de la fonctionnalité

type Props = {
  // Props de la carte
  logement: Logement; // Logement réservé
  visite: string | null; // « Mercredi 25 novembre 2026 (14:00 - 15:30) », ou null si inconnue
}; // Fin des props

// Carte « Réservation d'arrhes » de l'écran 7. Paiement : logement, photo, date de visite et montant
export function CarteReservation({ logement, visite }: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Cadre surface, éléments empilés
    <View style={[styles.carte, { backgroundColor: palette.surface, borderColor: palette.bordure }]}>
      <View style={styles.entete} /* Titres à gauche, icône à droite */>
        <View style={styles.extensible}>
          <Texte variante="legende" couleur="texteSecondaire" style={styles.surTitre}>
            {"RÉSERVATION D'ARRHES"}
          </Texte>
          <Texte variante="sousTitre">{logement.nom}</Texte>
        </View>
        <View style={[styles.pictogramme, { backgroundColor: palette.fond, borderColor: palette.bordure }]}>
          <Ionicons name="business" size={20} color={palette.primaire} />
        </View>
      </View>

      <View style={[styles.photo, { backgroundColor: logement.couleurPhoto }]} /* Photo du logement */>
        {logement.photos[0] ? (
          <Image source={logement.photos[0]} style={styles.image} accessibilityIgnoresInvertColors />
        ) : null}
        <View style={[styles.voile, { backgroundColor: avecOpacite(couleursFixes.voilePhoto, 0.45) }]}>
          <Ionicons name="location-outline" size={16} color={couleursFixes.texteSurPhoto} />
          <Texte variante="legende" style={[styles.gras, { color: couleursFixes.texteSurPhoto }]}>
            {`Face ${logement.campus}`}
          </Texte>
        </View>
      </View>

      {visite ? (
        <View style={styles.ligne} /* Date et créneau choisis dans le Formulaire */>
          <Ionicons name="calendar-outline" size={16} color={palette.texteSecondaire} />
          <Texte variante="legende" couleur="texteSecondaire">{`Visite : ${visite}`}</Texte>
        </View>
      ) : null}

      <View style={[styles.separateur, { backgroundColor: palette.bordure }]} />

      <View style={styles.montant} /* Libellé à gauche, montant à droite */>
        <Texte variante="legende" couleur="texteSecondaire" style={styles.extensible}>
          {"Montant de la caution\nFrais de dossier inclus"}
        </Texte>
        <Texte variante="titre" couleur="primaire">
          {formaterPrix(logement.arrhes)}
        </Texte>
      </View>
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  carte: {
    // Le cadre de la carte
    gap: espacements.s + espacements.xs, // 12 dp entre les éléments
    padding: espacements.m - 1, // Marge m moins le contour
    borderWidth: 1, // Contour de 1
    borderRadius: rayons.moyen, // Rayon moyen
  }, // Fin de la carte
  entete: { flexDirection: "row", alignItems: "flex-start", gap: espacements.s }, // Titres puis icône
  extensible: { flex: 1 }, // Prend la place restante
  surTitre: { letterSpacing: 0.5 }, // « RÉSERVATION D'ARRHES » légèrement espacé
  pictogramme: {
    // Carré de 40 dp
    width: tailleTactileMin - espacements.s, // 40 dp
    height: tailleTactileMin - espacements.s, // 40 dp
    borderRadius: rayons.petit, // Rayon petit
    borderWidth: 1, // Contour de 1
    alignItems: "center", // Icône centrée
    justifyContent: "center", // Icône centrée
  }, // Fin du pictogramme
  photo: { height: 120, borderRadius: rayons.petit, overflow: "hidden", justifyContent: "flex-end" }, // Photo de 120 dp, texte en bas
  image: { ...StyleSheet.absoluteFill, width: "100%", height: "100%" }, // L'image remplit le cadre, derrière le voile
  voile: {
    // Bande sombre en bas de la photo
    flexDirection: "row", // Icône puis texte
    alignItems: "center", // Centrés verticalement
    gap: espacements.xs, // Écart xs
    paddingHorizontal: espacements.s + espacements.xs, // 12 dp
    paddingVertical: espacements.s, // 8 dp
  }, // Fin du voile
  ligne: { flexDirection: "row", alignItems: "center", gap: espacements.xs }, // Icône puis texte
  separateur: { height: 1 }, // Trait de 1 dp
  montant: { flexDirection: "row", alignItems: "center", gap: espacements.s }, // Libellé puis montant
  gras: { fontFamily: polices["600"] }, // Demi-gras
}); // Fin des styles
