import type { ReactNode } from "react"; // Type d'un élément à afficher
import { Image, Pressable, StyleSheet, View, type ImageSourcePropType } from "react-native"; // Image, zone touchable, conteneur et outils
import { Carrousel } from "./Carrousel"; // Plusieurs photos qui défilent
import { Texte } from "./Texte"; // Texte au style de la maquette
import { espacements, rayons } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

export type DispositionCarte = "verticale" | "horizontale"; // Les deux dispositions permises par la convention

type Props = {
  // Les calques de la Carte deviennent des props
  titre: string; // Calque « Titre »
  info: string; // Calque « Info » : le prix
  detailInfo?: string; // Petit texte après l'info, comme « / mois »
  photo?: ImageSourcePropType; // Calque « Photo » : une seule image
  photos?: readonly ImageSourcePropType[]; // Plusieurs images : elles défilent en carrousel
  couleurPhoto?: string; // Couleur de remplacement, comme le rectangle coloré de la maquette
  hauteurPhoto?: number; // Hauteur de la photo verticale, 80 dp par défaut
  surPhoto?: ReactNode; // Éléments posés sur la photo : badge, cœur
  aCoteDuTitre?: ReactNode; // Élément à droite du titre : la note
  aCoteDeInfo?: ReactNode; // Élément à droite de l'info : « Charges incluses »
  complement?: ReactNode; // Calques ajoutés par le sujet, sous le titre : la distance
  action?: ReactNode; // Calque « Action », facultatif : un Bouton
  disposition?: DispositionCarte; // Verticale par défaut
  onPress?: () => void; // Si présent, toute la carte devient touchable
}; // Fin des props

// Composant Carte : photo (ou carrousel), titre, calques ajoutés, info et action facultative
export function Carte({
  titre, // Calque Titre
  info, // Calque Info
  detailInfo, // Petit texte après l'info
  photo, // Une photo
  photos, // Plusieurs photos
  couleurPhoto = "#F6D365", // Couleur de remplacement
  hauteurPhoto = 80, // 80 dp par défaut
  surPhoto, // Éléments posés sur la photo
  aCoteDuTitre, // Élément à droite du titre
  aCoteDeInfo, // Élément à droite de l'info
  complement, // Calques ajoutés
  action, // Calque Action
  disposition = "verticale", // Verticale par défaut
  onPress, // Toucher de la carte
}: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  const horizontale = disposition === "horizontale"; // Vrai pour la disposition en ligne
  const stylePhoto = horizontale ? styles.photoCote : [styles.photoHaut, { height: hauteurPhoto }]; // Forme de la photo
  const styleCarte = [
    styles.carte,
    horizontale ? styles.rangee : null,
    { backgroundColor: palette.surface, borderColor: palette.bordure },
  ]; // Fond surface, contour bordure
  const contenu = // Contenu commun, que la carte soit touchable ou non
    (
      <>
        <View
          style={[stylePhoto, { backgroundColor: couleurPhoto }]} /* Calque Photo, coloré tant que l'image charge */
        >
          {photos && photos.length > 0 ? ( // Plusieurs photos : carrousel
            <Carrousel photos={photos} />
          ) : photo ? ( // Une seule photo
            <Image
              source={photo}
              style={styles.image}
              accessibilityIgnoresInvertColors /* La photo garde ses couleurs */
            />
          ) : null}
          {surPhoto ? ( // Éléments posés par-dessus la photo
            <View
              style={styles.surPhoto}
              pointerEvents="box-none" /* Les glissements passent au carrousel, les touchers aux boutons */
            >
              {surPhoto}
            </View>
          ) : null}
        </View>
        <View
          style={[styles.textes, horizontale ? styles.textesCote : null]} /* Titre, calques ajoutés, info et action */
        >
          <View style={styles.ligne} /* Titre à gauche, note à droite */>
            <Texte variante="sousTitre" numberOfLines={1} style={styles.extensible} /* Calque Titre */>
              {titre}
            </Texte>
            {aCoteDuTitre}
          </View>
          {complement}
          <View style={styles.ligne} /* Prix à gauche, mention à droite */>
            <Texte variante="sousTitre" couleur="primaire" style={styles.extensible} /* Calque Info */>
              {info}
              {detailInfo ? <Texte variante="legende" couleur="texteSecondaire">{` ${detailInfo}`}</Texte> : null}
            </Texte>
            {aCoteDeInfo}
          </View>
          {action}
        </View>
      </>
    );
  if (onPress) {
    // Carte touchable : elle ouvre l'écran de détail
    return (
      <Pressable
        accessibilityRole="button" // Annoncée comme un bouton
        accessibilityLabel={`${titre}, ${info}`} // Texte annoncé
        onPress={onPress} // Prévient l'écran
        style={({ pressed }) => [styleCarte, { opacity: pressed ? 0.9 : 1 }]} // Léger retour visuel
      >
        {contenu}
      </Pressable>
    );
  }
  return <View style={styleCarte}>{contenu}</View>; // Carte simple
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  carte: {
    // Le cadre de la carte
    padding: espacements.s - 1, // Marge s moins le contour : en React Native, le contour s'ajoute à la taille
    gap: espacements.s + espacements.xs, // Écart de 12 dp entre la photo et les textes
    borderWidth: 1, // Contour de 1
    borderRadius: rayons.moyen, // Rayon moyen (12)
  }, // Fin de la carte
  rangee: { flexDirection: "row", alignItems: "center" }, // Disposition horizontale : photo à gauche, textes à droite
  photoHaut: { borderRadius: rayons.petit, overflow: "hidden" }, // Verticale : photo sur toute la largeur, coins arrondis
  photoCote: { width: 80, height: 80, borderRadius: rayons.petit, overflow: "hidden" }, // Horizontale : photo carrée de 80 dp
  image: { ...StyleSheet.absoluteFill }, // L'image remplit tout le calque Photo
  surPhoto: { ...StyleSheet.absoluteFill, padding: espacements.s }, // Couche posée sur la photo, marge s
  textes: { gap: espacements.xs, paddingHorizontal: espacements.xs, paddingBottom: espacements.xs }, // Pile des textes
  textesCote: { flex: 1 }, // Horizontale : les textes prennent la place restante
  ligne: { flexDirection: "row", alignItems: "center", gap: espacements.s }, // Deux éléments aux deux bouts
  extensible: { flex: 1 }, // Prend la place restante
}); // Fin des styles
