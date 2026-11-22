import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { useState } from "react"; // État local du composant
import { Platform, Pressable, StyleSheet, TextInput, View, type TextInputProps } from "react-native"; // Champ de saisie et outils
import type { NomIcone } from "./icones"; // Type des noms d'icônes
import { Texte } from "./Texte"; // Texte au style de la maquette
import { polices } from "@/theme/polices"; // Fichiers de police
import { espacements, rayons, tailleTactileMin, typographie } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

export type EtatChamp = "normal" | "focus" | "erreur"; // Propriété « État » du composant Figma

type Props = Omit<TextInputProps, "value" | "style"> & {
  // Props de TextInput, sauf value et style que l'on gère ici
  etiquette: string; // Calque « Étiquette »
  valeur: string; // Calque « Valeur » : le texte saisi
  etat?: EtatChamp; // Normal par défaut ; Focus s'affiche aussi tout seul quand le champ est touché
  message?: string; // Calque « Message », affiché seulement en état Erreur
  icone?: NomIcone; // Icône à gauche de la valeur (téléphone, cadenas...)
  indication?: string; // Petit texte à droite de l'étiquette, comme « 8 car. min »
  motDePasse?: boolean; // Masque la valeur et ajoute l'œil pour l'afficher
}; // Fin des props

// Composant ChampSaisie : l'étiquette, le cadre de 48 dp qui contient l'icône et la valeur, et le message d'erreur
export function ChampSaisie({
  etiquette, // Calque Étiquette
  valeur, // Calque Valeur
  etat = "normal", // État imposé par l'écran
  message, // Calque Message
  icone, // Icône de gauche
  indication, // Texte à droite de l'étiquette
  motDePasse = false, // Champ de mot de passe
  secureTextEntry, // Masquage demandé par l'écran
  onFocus, // Prévenu quand le champ est touché
  onBlur, // Prévenu quand on quitte le champ
  ...autres // onChangeText, placeholder, keyboardType...
}: Props) {
  const { palette } = useTheme(); // Palette claire ou sombre
  const [aLeFocus, setALeFocus] = useState(false); // Vrai pendant que le clavier écrit dans ce champ
  const [valeurVisible, setValeurVisible] = useState(false); // Vrai quand l'œil affiche le mot de passe
  const etatAffiche: EtatChamp = etat === "normal" && aLeFocus ? "focus" : etat; // L'erreur reste prioritaire sur le focus
  const couleurContour =
    etatAffiche === "erreur" ? palette.erreur : etatAffiche === "focus" ? palette.primaire : palette.contourChamp; // Contour selon l'état
  const couleurIcone = etatAffiche === "normal" ? palette.texteSecondaire : couleurContour; // L'icône suit l'état
  return (
    // Trois calques empilés, avec l'écart xs de la maquette
    <View style={styles.conteneur} /* Pile verticale : étiquette, cadre, message */>
      <View style={styles.entete} /* Étiquette à gauche, indication à droite */>
        <Texte variante="legende" couleur="texteSecondaire" style={styles.gras} /* Calque Étiquette */>
          {etiquette}
        </Texte>
        {indication ? (
          <Texte variante="legende" couleur="texteSecondaire">
            {indication}
          </Texte>
        ) : null}
      </View>
      <View
        style={[
          styles.cadre,
          {
            // Calque Cadre
            borderColor: couleurContour, // Couleur du contour selon l'état
            borderWidth: etatAffiche === "normal" ? 1 : 2, // 1 au repos, 2 en Focus et en Erreur
            backgroundColor: palette.surface, // Fond surface, comme la maquette
          },
        ]}
      >
        {icone ? <Ionicons name={icone} size={20} color={couleurIcone} /> : null}
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
          secureTextEntry={motDePasse ? !valeurVisible : secureTextEntry} // Mot de passe masqué tant que l'œil est fermé
          {...autres} // onChangeText, placeholder, keyboardType...
        />
        {motDePasse ? ( // L'œil n'existe que pour un mot de passe
          <Pressable
            accessibilityRole="button" // Annoncé comme un bouton
            accessibilityLabel={valeurVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"} // Action annoncée
            hitSlop={espacements.s} // Zone tactile agrandie de 8 dp de chaque côté
            onPress={() => setValeurVisible((visible) => !visible)} // Inverse l'affichage
          >
            <Ionicons
              name={valeurVisible ? "eye-outline" : "eye-off-outline"}
              size={20}
              color={palette.texteSecondaire}
            />
          </Pressable>
        ) : null}
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
  entete: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, // Étiquette et indication aux deux bouts
  gras: { fontFamily: polices["600"] }, // Étiquette en demi-gras, comme la maquette
  cadre: {
    // Le cadre de 48 dp
    minHeight: tailleTactileMin, // Zone tactile minimale
    paddingHorizontal: espacements.m, // Marge intérieure m
    borderRadius: rayons.moyen, // Rayon moyen (12)
    flexDirection: "row", // Icône, valeur et œil côte à côte
    alignItems: "center", // Centrés verticalement
    gap: espacements.s, // Écart s
  }, // Fin du cadre
  valeur: {
    // Le texte saisi, au style Corps
    flex: 1, // Prend toute la place entre l'icône et l'œil
    fontFamily: polices["400"], // Roboto Regular
    fontSize: typographie.corps.fontSize, // 16 dp
    ...Platform.select({ android: { paddingVertical: 0 } }), // Android ajoute une marge verticale au TextInput : on la supprime
  }, // Fin de la valeur
}); // Fin des styles
