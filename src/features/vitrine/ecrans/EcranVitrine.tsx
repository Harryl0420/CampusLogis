import { ScrollView, StyleSheet, View } from "react-native"; // Défilement, conteneur et outils de style
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { Texte, type VarianteTexte } from "@/composants/Texte"; // Texte au style de la maquette
import { espacements, rayons, type NomCouleur } from "@/theme/tokens"; // Mesures et noms de couleur
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
const styles5: { variante: VarianteTexte; nom: string }[] = [
  // Les cinq styles de texte de la maquette
  { variante: "titre", nom: "Titre" }, // Roboto 24 gras
  { variante: "sousTitre", nom: "Sous-titre" }, // Roboto 18 demi-gras
  { variante: "corps", nom: "Corps" }, // Roboto 16
  { variante: "legende", nom: "Légende" }, // Roboto 13
  { variante: "libelle", nom: "Libellé" }, // Roboto 16 gras
]; // Fin des styles

// Vitrine provisoire : elle affiche les tokens et les composants, comme la page « 2. Composants » de Figma
export function EcranVitrine() {
  const { mode, palette } = useTheme(); // Mode et couleurs actifs
  return (
    // Les sections s'empilent ; le contenu défile s'il dépasse l'écran
    <Ecran>
      <ScrollView contentContainerStyle={styles.contenu} /* Pile des sections, la plus récente en haut */>
        {/* LES SECTIONS DES ÉTAPES 7, 8 ET 9 SE COLLERONT ICI */}
        <View style={styles.section} testID="section-textes" /* Section 2 : les styles de texte */>
          <Texte variante="sousTitre" couleur="primaire">
            Styles de texte
          </Texte>
          {styles5.map((s) => (
            // Un exemple par style
            <Texte key={s.variante} variante={s.variante}>
              {s.nom}
            </Texte>
          ))}
        </View>
        <View style={styles.section} testID="section-nuancier" /* Section 1 : le nuancier */>
          <Texte variante="sousTitre" couleur="primaire">{`Nuancier, mode ${mode}`}</Texte>
          {noms.map((nom) => (
            // Une ligne par nom de couleur
            <View key={nom} style={styles.ligne} /* Pastille et nom côte à côte */>
              <View
                style={[
                  styles.pastille,
                  { backgroundColor: palette[nom], borderColor: palette.bordure },
                ]} /* Échantillon */
              />
              <Texte variante="legende">{`${nom} ${palette[nom]}`}</Texte>
            </View>
          ))}
        </View>
      </ScrollView>
    </Ecran>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  contenu: { gap: espacements.l, paddingVertical: espacements.m }, // Écart l entre les sections
  section: { gap: espacements.s }, // Écart s dans une section
  rangee: { flexDirection: "row", gap: espacements.s }, // Cartes côte à côte (servira à l'étape 9)
  ligne: { flexDirection: "row", alignItems: "center", gap: espacements.m }, // Pastille puis texte
  pastille: { width: espacements.l, height: espacements.l, borderRadius: rayons.petit, borderWidth: 1 }, // Carré de 24 dp
}); // Fin des styles
