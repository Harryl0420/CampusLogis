import { StyleSheet, Text, View } from "react-native"; // Conteneur, texte de base et outils de style
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { polices } from "@/theme/polices"; // Fichiers de la police Roboto
import { espacements, rayons, typographie, type NomCouleur } from "@/theme/tokens"; // Mesures et noms de couleur
import { useTheme } from "@/theme/useTheme"; // Palette du mode actif

const noms: NomCouleur[] = [
  "fond",
  "surface",
  "texte",
  "texteSecondaire",
  "primaire",
  "surPrimaire",
  "teinte",
  "bordure",
  "contourChamp",
  "erreur",
]; // Les dix variables

// Vitrine provisoire : elle affiche les tokens et les composants, comme la page « 2. Composants » de Figma
export function EcranVitrine() {
  const { mode, palette } = useTheme(); // Mode et couleurs actifs
  return (
    // Un nuancier : une ligne par couleur
    <Ecran>
      <Text style={[styles.texte, { color: palette.texte }]}>{`Nuancier, mode ${mode}`}</Text>
      {noms.map((nom) => (
        // Une ligne par nom de couleur
        <View key={nom} style={styles.ligne} /* Pastille et nom côte à côte */>
          <View
            style={[styles.pastille, { backgroundColor: palette[nom], borderColor: palette.bordure }]} /* Échantillon */
          />
          <Text style={[styles.texte, { color: palette.texte }]}>{`${nom} ${palette[nom]}`}</Text>
        </View>
      ))}
    </Ecran>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  ligne: { flexDirection: "row", alignItems: "center", gap: espacements.m, paddingVertical: espacements.xs }, // Pastille puis texte
  pastille: { width: espacements.xl, height: espacements.xl, borderRadius: rayons.petit, borderWidth: 1 }, // Carré de 32 dp
  texte: { fontFamily: polices["400"], fontSize: typographie.corps.fontSize, lineHeight: typographie.corps.lineHeight }, // Style Corps écrit à la main, en attendant le composant Texte
}); // Fin des styles
