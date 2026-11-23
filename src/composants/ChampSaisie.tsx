import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { useState } from "react"; // État local du composant
import { Platform, Pressable, StyleSheet, TextInput, View, type TextInputProps } from "react-native"; // Champ de saisie et outils
import type { NomIcone } from "./icones"; // Type des noms d'icônes
import { Texte } from "./Texte"; // Texte au style de la maquette
import { polices } from "@/theme/polices"; // Fichiers de police
import { espacements, rayons, tailleTactileMin, typographie } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { avecOpacite } from "@/utils/couleurs"; // Fond rose pâle de l'état Erreur

export type EtatChamp = "normal" | "focus" | "erreur"; // Propriété « État » du composant Figma

type Props = Omit<TextInputProps, "value" | "style"> & {
  // Props de TextInput, sauf value et style que l'on gère ici
  etiquette: string; // Calque « Étiquette »
  valeur: string; // Calque « Valeur » : le texte saisi
  etat?: EtatChamp; // Normal par défaut ; Focus s'affiche aussi tout seul quand le champ est touché
  message?: string; // Calque « Message », affiché seulement en état Erreur
  icone?: NomIcone; // Icône à gauche de la valeur (téléphone, cadenas...)
  iconeFin?: NomIcone; // Icône à droite de la valeur (calendrier, horloge...)
  prefixe?: string; // Texte fixe devant la valeur, comme l'indicatif « +237 »
  indication?: string; // Petit texte à droite de l'étiquette, comme « 8 car. min » ou « Optionnel »
  obligatoire?: boolean; // Ajoute « * » après l'étiquette et « Requis » à droite
  motDePasse?: boolean; // Masque la valeur et ajoute l'œil pour l'afficher
}; // Fin des props

// Composant ChampSaisie : l'étiquette, le cadre de 48 dp qui contient les icônes et la valeur, et le message d'erreur
export function ChampSaisie({
  etiquette, // Calque Étiquette
  valeur, // Calque Valeur
  etat = "normal", // État imposé par l'écran
  message, // Calque Message
  icone, // Icône de gauche
  iconeFin, // Icône de droite
  prefixe, // Texte fixe devant la valeur
  indication, // Texte à droite de l'étiquette
  obligatoire = false, // Champ obligatoire
  motDePasse = false, // Champ de mot de passe
  multiline = false, // Zone de texte sur plusieurs lignes
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
  const couleurIcone = etatAffiche === "normal" ? palette.texteSecondaire : couleurContour; // Les icônes suivent l'état
  const texteIndication = indication ?? (obligatoire ? "Requis" : undefined); // « Requis » par défaut pour un champ obligatoire
  return (
    // Trois calques empilés, avec l'écart xs de la maquette
    <View style={styles.conteneur} /* Pile verticale : étiquette, cadre, message */>
      <View style={styles.entete} /* Étiquette à gauche, indication à droite */>
        <Texte variante="legende" couleur="texteSecondaire" style={styles.gras} /* Calque Étiquette */>
          {etiquette}
          {obligatoire ? (
            <Texte variante="legende" couleur="erreur">
              {" *"}
            </Texte>
          ) : null}
        </Texte>
        {texteIndication ? (
          <Texte
            variante="legende"
            couleur={obligatoire ? "primaire" : "texteSecondaire"} // « Requis » en rose
            style={obligatoire ? styles.gras : null}
          >
            {texteIndication}
          </Texte>
        ) : null}
      </View>
      <View
        style={[
          styles.cadre,
          multiline ? styles.cadreMultiligne : null, // Zone de texte plus haute
          {
            // Calque Cadre
            borderColor: couleurContour, // Couleur du contour selon l'état
            borderWidth: etatAffiche === "normal" ? 1 : 2, // 1 au repos, 2 en Focus et en Erreur
            backgroundColor: etatAffiche === "erreur" ? avecOpacite(palette.erreur, 0.12) : palette.surface, // Rose pâle en Erreur, surface sinon
          },
        ]}
      >
        {icone ? <Ionicons name={icone} size={20} color={couleurIcone} /> : null}
        {prefixe ? <Texte variante="libelle">{prefixe}</Texte> : null}
        <TextInput
          value={valeur} // Texte affiché, fourni par l'écran
          accessibilityLabel={etiquette} // Le lecteur d'écran annonce l'étiquette
          placeholderTextColor={palette.texteSecondaire} // Couleur du texte d'exemple
          multiline={multiline} // Plusieurs lignes si demandé
          textAlignVertical={multiline ? "top" : "center"} // Android : le texte commence en haut de la zone
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
        {iconeFin ? <Ionicons name={iconeFin} size={22} color={couleurIcone} /> : null}
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
        <View style={styles.message} /* Calque Message : icône d'alerte, puis texte */>
          <Ionicons name="alert-circle" size={16} color={palette.erreur} />
          <Texte variante="legende" couleur="erreur" style={[styles.gras, styles.extensible]}>
            {message}
          </Texte>
        </View>
      ) : null}
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  conteneur: { gap: espacements.xs }, // Écart xs (4) entre les trois calques
  entete: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, // Étiquette et indication aux deux bouts
  gras: { fontFamily: polices["600"] }, // Demi-gras, comme la maquette
  cadre: {
    // Le cadre de 48 dp
    minHeight: tailleTactileMin, // Zone tactile minimale
    paddingHorizontal: espacements.m, // Marge intérieure m
    borderRadius: rayons.moyen, // Rayon moyen (12)
    flexDirection: "row", // Icône, valeur et icône de fin côte à côte
    alignItems: "center", // Centrés verticalement
    gap: espacements.s, // Écart s
  }, // Fin du cadre
  cadreMultiligne: {
    // Zone de texte : deux fois la hauteur d'un champ
    minHeight: tailleTactileMin * 2, // 96 dp
    alignItems: "flex-start", // Texte en haut
    paddingVertical: espacements.s + espacements.xs, // 12 dp en haut et en bas
  }, // Fin de la zone de texte
  valeur: {
    // Le texte saisi, au style Corps
    flex: 1, // Prend toute la place entre les icônes
    fontFamily: polices["400"], // Roboto Regular
    fontSize: typographie.corps.fontSize, // 16 dp
    ...Platform.select({ android: { paddingVertical: 0 } }), // Android ajoute une marge verticale au TextInput : on la supprime
  }, // Fin de la valeur
  message: { flexDirection: "row", gap: espacements.xs }, // Icône d'alerte puis texte
  extensible: { flex: 1 }, // Le message passe à la ligne au lieu de déborder
}); // Fin des styles
