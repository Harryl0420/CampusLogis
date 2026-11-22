import { ScrollView, StyleSheet, View } from "react-native"; // Défilement, conteneur et outils de style
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { Texte, type VarianteTexte } from "@/composants/Texte"; // Texte au style de la maquette
import { espacements, rayons, type NomCouleur } from "@/theme/tokens"; // Mesures et noms de couleur
import { useTheme } from "@/theme/useTheme"; // Palette du mode actif
import { Bouton } from "@/composants/Bouton"; // Composant Bouton
import { ChampSaisie } from "@/composants/ChampSaisie"; // Composant Champ de saisie
import { Lien } from "@/composants/Lien"; // Lien de 48 dp
import { Carte } from "@/composants/Carte"; // Composant Carte
import { formaterPrix } from "@/utils/formaterPrix"; // 45000 devient « 45 000 FCFA »

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
        <View style={styles.section} testID="section-cartes" /* Section 5 : la Carte */>
          <Texte variante="sousTitre" couleur="primaire">
            Carte
          </Texte>
          <View style={styles.rangee} /* Deux cartes verticales côte à côte */>
            <Carte
              titre="Studio · Bonamoussadi" // Calque Titre : type et quartier
              info={`${formaterPrix(45000)} / mois`} // Calque Info : prix par mois
              couleurPhoto="#F4A3C0" // Emplacement de la photo
              action={<Bouton libelle="Voir" />} // Calque Action : une instance du Bouton
            />
            <Carte
              titre="Chambre · Ndogbong"
              info={`${formaterPrix(30000)} / mois`}
              couleurPhoto="#A3C4F4" /* Sans action */
            />
          </View>
          <Carte
            disposition="horizontale" // Photo à gauche, textes à droite
            titre="Appartement · Makepe" // Calque Titre
            info={`${formaterPrix(80000)} / mois`} // Calque Info
            couleurPhoto="#C4F4A3" // Emplacement de la photo
            complement={
              <Texte variante="legende" couleur="texteSecondaire">
                À 800 m du campus
              </Texte>
            } // Calque ajouté par le sujet
          />
        </View>

        <View style={styles.section} testID="section-champs" /* Section 4 : le Champ de saisie et le Lien */>
          <Texte variante="sousTitre" couleur="primaire">
            Champ de saisie et lien
          </Texte>
          <ChampSaisie etiquette="Normal" valeur="" placeholder="Texte d'exemple" />
          <ChampSaisie etiquette="Focus" valeur="Awa Ngono" etat="focus" />
          <ChampSaisie etiquette="Erreur" valeur="677" etat="erreur" message="Le numéro doit contenir 9 chiffres" />
          <Lien libelle="Mot de passe oublié ?" />
        </View>

        <View style={styles.section} testID="section-boutons" /* Section 3 : les six variantes du Bouton */>
          <Texte variante="sousTitre" couleur="primaire">
            Bouton
          </Texte>
          <Bouton libelle="Primaire, Normal" />
          <Bouton libelle="Primaire, Pressé" etat="presse" />
          <Bouton libelle="Primaire, Désactivé" etat="desactive" />
          <Bouton libelle="Secondaire, Normal" type="secondaire" />
          <Bouton libelle="Secondaire, Pressé" type="secondaire" etat="presse" />
          <Bouton libelle="Secondaire, Désactivé" type="secondaire" etat="desactive" />
        </View>
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
