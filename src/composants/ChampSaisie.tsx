import { useState } from "react"; // État local du composant
import { Platform, StyleSheet, TextInput, View, type TextInputProps } from "react-native"; // Champ de saisie et outils
import { Texte } from "./Texte"; // Texte au style de la maquette
import { polices } from "@/theme/polices"; // Fichier de police de la valeur saisie
import { espacements, rayons, tailleTactileMin, typographie } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

export type EtatChamp = "normal" | "focus" | "erreur"; // Propriété « État » du composant Figma

type Props = Omit<TextInputProps, "value" | "style"> & {
  // Props de TextInput, sauf value et style que l'on gère ici
  etiquette: string; // Calque « Étiquette »
  valeur: string; // Calque « Valeur » : le texte saisi
  etat?: EtatChamp; // Normal par défaut ; Focus s'affiche aussi tout seul quand le champ est touché
  message?: string; // Calque « Message », affiché seulement en état Erreur
}; // Fin des props

// Composant ChampSaisie : l'étiquette, le cadre de 48 dp qui contient la valeur, et le message d'erreur
export function ChampSaisie({ etiquette, valeur, etat = "normal", message, onFocus, onBlur, ...autres }: Props) {
  // Props extraites
  const { palette } = useTheme(); // Palette claire ou sombre
  const [aLeFocus, setALeFocus] = useState(false); // Vrai pendant que le clavier écrit dans ce champ
  const etatAffiche: EtatChamp = etat === "normal" && aLeFocus ? "focus" : etat; // L'erreur reste prioritaire sur le focus
  const couleurContour =
    etatAffiche === "erreur" ? palette.erreur : etatAffiche === "focus" ? palette.primaire : palette.contourChamp; // Contour selon l'état
  return (
    // Trois calques empilés, avec l'écart xs de la maquette
    <View style={styles.conteneur} /* Pile verticale : étiquette, cadre, message */>
      <Texte variante="legende" /* Calque Étiquette */>{etiquette}</Texte>
      <View
        style={[
          styles.cadre,
          {
            // Calque Cadre
            borderColor: couleurContour, // Couleur du contour selon l'état
            borderWidth: etatAffiche === "normal" ? 1 : 2, // 1 au repos, 2 en Focus et en Erreur
            backgroundColor: palette.fond, // Fond du champ
          },
        ]} // Fin du style du cadre
      >
        <TextInput
          value={valeur} // Texte affiché, fourni par l'écran
          accessibilityLabel={etiquette} // Le lecteur d'écran annonce l'étiquette
          placeholderTextColor={palette.texteSecondaire} // Couleur du texte d'exemple
          style={[styles.valeur, { color: palette.texte }]} // Calque Valeur
          onFocus={(evenement) => {
            setALeFocus(true);
            onFocus?.(evenement);
          }} // Passe en Focus, puis prévient l'écran s'il le demande
          onBlur={(evenement) => {
            setALeFocus(false);
            onBlur?.(evenement);
          }} // Revient à Normal quand on quitte le champ
          {...autres} // onChangeText, placeholder, keyboardType, secureTextEntry...
        />
      </View>
      {etatAffiche === "erreur" && message ? ( // Rendu conditionnel : le message n'existe qu'en état Erreur
        <Texte variante="legende" couleur="erreur" /* Calque Message */>
          {message}
        </Texte>
      ) : null}
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  conteneur: { gap: espacements.xs }, // Écart xs (4) entre les trois calques
  cadre: {
    // Le cadre de 48 dp
    minHeight: tailleTactileMin, // Zone tactile minimale
    paddingHorizontal: espacements.m, // Marge intérieure m
    borderRadius: rayons.moyen, // Rayon moyen (12)
    justifyContent: "center", // Valeur centrée verticalement
  }, // Fin du cadre
  valeur: {
    // Le texte saisi, au style Corps
    fontFamily: polices["400"], // Roboto Regular
    fontSize: typographie.corps.fontSize, // 16 dp
    ...Platform.select({ android: { paddingVertical: 0 } }), // Android ajoute une marge verticale au TextInput : on la supprime
  }, // Fin de la valeur
}); // Fin des styles
