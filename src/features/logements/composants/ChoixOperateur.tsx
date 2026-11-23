import { Image, Pressable, StyleSheet, View, type ImageSourcePropType } from "react-native"; // Image, zone touchable, conteneur et outils
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

type Props = {
  // Props d'une ligne d'opérateur
  nom: string; // « MTN Mobile Money » ou « Orange Money »
  detail: string; // Sous-titre : « Confirmation instantanée USSD »...
  logo: ImageSourcePropType; // Logo de l'opérateur
  choisi: boolean; // Vrai si cet opérateur est sélectionné
  surChoix: () => void; // Fonction appelée au toucher
}; // Fin des props

// Ligne « MTN Mobile Money » ou « Orange Money » de l'écran 7. Paiement : un bouton radio, barre rose à gauche quand elle est choisie
export function ChoixOperateur({ nom, detail, logo, choisi, surChoix }: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Toute la ligne est touchable
    <Pressable
      accessibilityRole="radio" // Annoncée comme un choix unique parmi plusieurs
      accessibilityState={{ checked: choisi }} // Le lecteur d'écran dit si elle est cochée
      accessibilityLabel={`${nom}, ${detail}`} // Texte annoncé
      onPress={surChoix} // Prévient l'écran
      style={({ pressed }) => [
        styles.ligne,
        { backgroundColor: palette.surface, borderColor: choisi ? palette.primaire : palette.bordure }, // Contour rose si choisie
        pressed ? styles.presse : null, // Retour visuel sous le doigt
      ]}
    >
      {choisi ? <View style={[styles.barre, { backgroundColor: palette.primaire }]} /> : null}
      <Image source={logo} style={styles.logo} accessibilityIgnoresInvertColors /* Logo de 48 dp */ />
      <View style={styles.textes}>
        <Texte variante="libelle">{nom}</Texte>
        <Texte variante="legende" couleur="texteSecondaire">
          {detail}
        </Texte>
      </View>
      <View style={[styles.radio, { backgroundColor: choisi ? palette.primaire : palette.bordure }]} /* Bouton radio */>
        <View style={[styles.pointRadio, { backgroundColor: choisi ? palette.surPrimaire : palette.surface }]} />
      </View>
    </Pressable>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  ligne: {
    // Le cadre de la ligne
    flexDirection: "row", // Logo, textes, radio
    alignItems: "center", // Centrés verticalement
    gap: espacements.m, // Écart m
    padding: espacements.m - 1, // Marge m moins le contour
    borderWidth: 1, // Contour de 1
    borderRadius: rayons.moyen, // Rayon moyen
    overflow: "hidden", // La barre rose suit l'arrondi
  }, // Fin de la ligne
  presse: { opacity: 0.8 }, // Légèrement transparente sous le doigt
  barre: { position: "absolute", left: 0, top: 0, bottom: 0, width: espacements.xs }, // Barre rose de 4 dp à gauche
  logo: { width: tailleTactileMin, height: tailleTactileMin, borderRadius: rayons.petit }, // Logo de 48 dp
  textes: { flex: 1 }, // Les textes prennent la place restante
  radio: {
    // Cercle extérieur de 24 dp
    width: espacements.l, // 24 dp
    height: espacements.l, // 24 dp
    borderRadius: rayons.pilule, // Cercle
    alignItems: "center", // Point centré
    justifyContent: "center", // Point centré
  }, // Fin du radio
  pointRadio: { width: espacements.s + 2, height: espacements.s + 2, borderRadius: rayons.pilule }, // Point intérieur de 10 dp
}); // Fin des styles
