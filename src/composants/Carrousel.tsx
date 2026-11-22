import { useState } from "react"; // État local
import {
  FlatList, // Liste défilante, ici horizontale
  Image, // Photo
  StyleSheet, // Outils de style
  View, // Conteneur
  type ImageSourcePropType, // Type d'une image
  type LayoutChangeEvent, // Événement de mesure
  type NativeScrollEvent, // Événement de défilement
  type NativeSyntheticEvent, // Enveloppe des événements natifs
} from "react-native";
import { Texte } from "./Texte"; // Texte au style de la maquette
import { espacements, rayons } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { avecOpacite } from "@/utils/couleurs"; // Transparence des points et du compteur

export type IndicateurCarrousel = "points" | "compteur"; // Points (Accueil) ou « 1 / 2 » (Détail)

type Props = {
  // Props du carrousel
  photos: readonly ImageSourcePropType[]; // Photos à faire défiler
  indicateur?: IndicateurCarrousel; // Points par défaut
}; // Fin des props

// Carrousel de photos : on fait glisser le doigt pour passer d'une photo à l'autre. Il remplit son parent.
export function Carrousel({ photos, indicateur = "points" }: Props) {
  const { mode, palette } = useTheme(); // Mode et couleurs actifs
  const [taille, setTaille] = useState({ largeur: 0, hauteur: 0 }); // Taille mesurée du cadre
  const [index, setIndex] = useState(0); // Photo affichée
  const clair = mode === "sombre" ? palette.texte : palette.fond; // Couleur claire dans les deux modes (posée sur une photo)
  const fonce = mode === "sombre" ? palette.fond : palette.texte; // Couleur foncée dans les deux modes
  const mesurer = (evenement: LayoutChangeEvent) =>
    // Appelé quand le cadre connaît sa taille
    setTaille({ largeur: evenement.nativeEvent.layout.width, hauteur: evenement.nativeEvent.layout.height });
  const finDefilement = (evenement: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Appelé quand la photo s'arrête
    if (taille.largeur > 0) setIndex(Math.round(evenement.nativeEvent.contentOffset.x / taille.largeur)); // Numéro de la photo visible
  };
  return (
    // Les photos, puis l'indicateur posé par-dessus
    <View style={styles.cadre} onLayout={mesurer}>
      {taille.largeur > 0 ? ( // On attend la mesure : chaque photo prend exactement la largeur du cadre
        <FlatList
          data={photos} // Les photos
          horizontal // Défilement horizontal
          pagingEnabled // S'arrête toujours sur une photo entière
          showsHorizontalScrollIndicator={false} // Pas de barre de défilement
          keyExtractor={(_, position) => String(position)} // Liste fixe, jamais réordonnée : la position suffit comme clé
          onMomentumScrollEnd={finDefilement} // Met à jour l'indicateur
          renderItem={({ item }) => (
            <Image
              source={item}
              style={{ width: taille.largeur, height: taille.hauteur }}
              accessibilityIgnoresInvertColors
            />
          )}
        />
      ) : null}
      {indicateur === "points" && photos.length > 1 ? ( // Points de la maquette de l'Accueil
        <View style={styles.points} pointerEvents="none">
          {photos.map((_, position) => (
            <View
              key={String(position)} // Liste fixe : la position suffit comme clé
              style={[styles.point, { backgroundColor: position === index ? clair : avecOpacite(clair, 0.5) }]} // Point plein pour la photo visible
            />
          ))}
        </View>
      ) : null}
      {indicateur === "compteur" ? ( // Compteur « 1 / 2 » de la maquette du Détail
        <View style={[styles.compteur, { backgroundColor: avecOpacite(fonce, 0.7) }]} pointerEvents="none">
          <Texte
            variante="legende"
            couleur={mode === "sombre" ? "texte" : "fond"}
          >{`${index + 1} / ${photos.length}`}</Texte>
        </View>
      ) : null}
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  cadre: { ...StyleSheet.absoluteFill }, // Remplit le calque Photo du parent
  points: {
    // Rangée de points, en bas au centre
    position: "absolute", // Posée sur la photo
    bottom: espacements.s, // À 8 dp du bas
    left: 0, // Toute la largeur...
    right: 0, // ...pour pouvoir centrer
    flexDirection: "row", // Points côte à côte
    justifyContent: "center", // Centrés
    gap: espacements.xs, // Écart xs
  }, // Fin des points
  point: { width: espacements.s, height: espacements.s, borderRadius: rayons.pilule }, // Point de 8 dp
  compteur: {
    // Pilule « 1 / 2 », en bas à droite
    position: "absolute", // Posée sur la photo
    bottom: espacements.s, // À 8 dp du bas
    right: espacements.s, // À 8 dp de la droite
    paddingHorizontal: espacements.s, // Marge s
    paddingVertical: espacements.xs, // Marge xs
    borderRadius: rayons.pilule, // Bords arrondis
  }, // Fin du compteur
}); // Fin des styles
