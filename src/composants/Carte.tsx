import type { ReactNode } from "react"; // Type d'un élément à afficher
import { Image, StyleSheet, View, type ImageSourcePropType } from "react-native"; // Image, conteneur et outils
import { Texte } from "./Texte"; // Texte au style de la maquette
import { espacements, rayons } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

export type DispositionCarte = "verticale" | "horizontale"; // Les deux dispositions permises par la convention

type Props = {
  // Les calques obligatoires de la Carte deviennent des props
  titre: string; // Calque « Titre » : type et quartier du logement
  info: string; // Calque « Info » : prix par mois
  photo?: ImageSourcePropType; // Calque « Photo » : une vraie image quand elle existe
  couleurPhoto?: string; // Couleur de remplacement, comme le rectangle coloré de la maquette
  action?: ReactNode; // Calque « Action », facultatif : un Bouton
  complement?: ReactNode; // Calques ajoutés par le sujet : distance, badge, statut...
  disposition?: DispositionCarte; // Verticale par défaut
}; // Fin des props

// Composant Carte : photo, titre, info, calques ajoutés et action facultative
export function Carte({
  titre,
  info,
  photo,
  couleurPhoto = "#F6D365",
  action,
  complement,
  disposition = "verticale",
}: Props) {
  // Valeurs par défaut
  const { palette } = useTheme(); // Palette claire ou sombre
  const horizontale = disposition === "horizontale"; // Vrai pour la disposition en ligne
  const stylePhoto = horizontale ? styles.photoCote : styles.photoHaut; // La photo change de forme selon la disposition
  return (
    // Cadre Auto Layout de la maquette, vertical ou horizontal
    <View
      style={[
        styles.carte,
        horizontale ? styles.ligne : null,
        { backgroundColor: palette.surface, borderColor: palette.bordure },
      ]} // Fond surface, contour bordure
    >
      {photo ? ( // Rendu conditionnel : la vraie photo si elle existe...
        <Image source={photo} style={stylePhoto} accessibilityIgnoresInvertColors /* La photo garde ses couleurs */ />
      ) : (
        // ...sinon le rectangle coloré de la maquette (couleur fixe : les photos factices ne changent pas de mode)
        <View style={[stylePhoto, { backgroundColor: couleurPhoto }]} /* Emplacement de la photo */ />
      )}
      <View
        style={[styles.textes, horizontale ? styles.textesCote : null]} /* Titre, info, calques ajoutés et action */
      >
        <Texte variante="libelle" numberOfLines={1} /* Calque Titre */>
          {titre}
        </Texte>
        <Texte couleur="primaire" /* Calque Info, style Corps en couleur primaire */>{info}</Texte>
        {complement}
        {action}
      </View>
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  carte: {
    // Le cadre de la carte
    flex: 1, // Occupe sa part de la rangée : deux cartes verticales se partagent la largeur
    padding: espacements.s - 1, // Marge s moins le contour : en React Native, le contour s'ajoute à la taille, dans Figma il est dessiné à l'intérieur
    gap: espacements.s, // Écart s entre les calques
    borderWidth: 1, // Contour de 1
    borderRadius: rayons.moyen, // Rayon moyen (12)
  }, // Fin de la carte
  ligne: { flexDirection: "row", alignItems: "center" }, // Disposition horizontale : photo à gauche, textes à droite
  photoHaut: { height: 80, borderRadius: rayons.petit }, // Verticale : photo de 80 dp de haut sur toute la largeur
  photoCote: { width: 80, height: 80, borderRadius: rayons.petit }, // Horizontale : photo carrée de 80 dp
  textes: { gap: espacements.s }, // Écart s entre les textes
  textesCote: { flex: 1 }, // Horizontale : les textes prennent la place restante
}); // Fin des styles
