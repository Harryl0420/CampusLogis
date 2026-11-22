import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { Image, StyleSheet, View } from "react-native"; // Image, conteneur et outils
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { polices } from "@/theme/polices"; // Graisse des textes en gras
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import type { Bailleur } from "../types"; // Type du bailleur

// Carte du bailleur : avatar certifié, nom, mention « certifié », délai de réponse et satisfaction
export function CarteBailleur({ bailleur }: { bailleur: Bailleur }) {
  // bailleur : propriétaire du logement
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Deux rangées : identité, puis statistiques
    <View style={[styles.carte, { backgroundColor: palette.surface, borderColor: palette.bordure }]}>
      <View style={styles.identite} /* Avatar à gauche, nom à droite */>
        <View /* Avatar et sa coche */>
          <View style={[styles.avatar, { backgroundColor: palette.teinte }]} /* Cercle de 56 dp */>
            {bailleur.photo ? ( // La photo si elle existe...
              <Image source={bailleur.photo} style={styles.image} accessibilityIgnoresInvertColors />
            ) : (
              // ...sinon les initiales
              <Texte variante="sousTitre" couleur="primaire">
                {bailleur.initiales}
              </Texte>
            )}
          </View>
          {bailleur.certifie ? ( // Coche rose en bas à droite de l'avatar
            <View style={[styles.coche, { backgroundColor: palette.primaire, borderColor: palette.surface }]}>
              <Ionicons name="checkmark" size={12} color={palette.surPrimaire} />
            </View>
          ) : null}
        </View>
        <View style={styles.extensible} /* Nom et mention */>
          <Texte variante="sousTitre">{bailleur.nom}</Texte>
          {bailleur.certifie ? (
            <View style={styles.ligne}>
              <Ionicons name="shield-checkmark-outline" size={16} color={palette.primaire} />
              <Texte variante="legende" couleur="primaire">
                Bailleur certifié CampusLogis
              </Texte>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.statistiques} /* Délai à gauche, satisfaction à droite */>
        <View style={styles.ligne}>
          <Ionicons name="time-outline" size={16} color={palette.texteSecondaire} />
          <Texte variante="legende" couleur="texteSecondaire">
            {"Délai de réponse : "}
            <Texte variante="legende" style={styles.gras}>
              {bailleur.delaiReponse}
            </Texte>
          </Texte>
        </View>
        <View style={styles.ligne}>
          <Ionicons name="thumbs-up-outline" size={16} color={palette.texteSecondaire} />
          <Texte variante="legende" couleur="texteSecondaire">
            <Texte variante="legende" style={styles.gras}>
              {`${bailleur.satisfaction}%`}
            </Texte>
            {" satisfait"}
          </Texte>
        </View>
      </View>
    </View>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  carte: { padding: espacements.m, gap: espacements.m, borderRadius: rayons.moyen, borderWidth: 1 }, // Cadre de la carte
  identite: { flexDirection: "row", alignItems: "center", gap: espacements.m }, // Avatar puis nom
  avatar: {
    // Cercle de 56 dp
    width: tailleTactileMin + espacements.s, // 56 dp
    height: tailleTactileMin + espacements.s, // 56 dp
    borderRadius: rayons.pilule, // Cercle
    overflow: "hidden", // La photo reste dans le cercle
    alignItems: "center", // Initiales centrées
    justifyContent: "center", // Initiales centrées
  }, // Fin de l'avatar
  image: { ...StyleSheet.absoluteFill }, // La photo remplit le cercle
  coche: {
    // Pastille de 20 dp
    position: "absolute", // Posée sur l'avatar
    right: 0, // Bord droit
    bottom: 0, // Bord bas
    width: espacements.l - espacements.xs, // 20 dp
    height: espacements.l - espacements.xs, // 20 dp
    borderRadius: rayons.pilule, // Cercle
    borderWidth: 2, // Liseré de la couleur de la carte
    alignItems: "center", // Coche centrée
    justifyContent: "center", // Coche centrée
  }, // Fin de la coche
  extensible: { flex: 1, gap: espacements.xs }, // Nom et mention
  statistiques: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", gap: espacements.s }, // Aux deux bouts
  ligne: { flexDirection: "row", alignItems: "center", gap: espacements.xs }, // Icône puis texte
  gras: { fontFamily: polices["700"] }, // Valeur en gras
}); // Fin des styles
