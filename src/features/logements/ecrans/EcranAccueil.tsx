import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { useState } from "react"; // État local de l'alerte
import { FlatList, StyleSheet, View } from "react-native"; // Liste défilante, conteneur et outils
import { Badge } from "@/composants/Badge"; // Badge posé sur la photo
import { Bouton } from "@/composants/Bouton"; // Bouton « Activer »
import { Carte } from "@/composants/Carte"; // Composant Carte
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { Lien } from "@/composants/Lien"; // Liens « Détails » et « Carte »
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { polices } from "@/theme/polices"; // Graisse des textes en gras
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { formaterDistance } from "@/utils/formaterDistance"; // 350 devient « 350 m »
import { formaterPrix } from "@/utils/formaterPrix"; // 45000 devient « 45 000 FCFA »
import { BarreRecherche } from "../composants/BarreRecherche"; // Barre de recherche de la maquette
import { BoutonRond } from "../composants/BoutonRond"; // Cœur posé sur la photo
import { Filtres } from "../composants/Filtres"; // Rangée de filtres
import { Note } from "../composants/Note"; // « ★ 4.9 »
import { logements } from "../donnees"; // Données fictives
import { useLogements } from "../hooks/useLogements"; // Recherche, filtres, favoris et liste calculée

// Espace entre deux cartes de la liste
function Separateur() {
  return <View style={styles.separateur} />; // Écart m
}

// En-tête de la liste : carte « Baux sécurisés », puis titre de section
function EnTeteListe() {
  const { palette } = useTheme(); // Palette claire ou sombre
  return (
    // Deux blocs empilés
    <View style={styles.enTete}>
      <View
        style={[
          styles.encart,
          { backgroundColor: palette.surface, borderColor: palette.bordure },
        ]} /* Carte « Baux sécurisés » */
      >
        <View style={[styles.pictogramme, { backgroundColor: palette.teinte }]}>
          <Ionicons name="shield-checkmark" size={22} color={palette.primaire} />
        </View>
        <View style={styles.extensible}>
          <Texte variante="legende" style={styles.gras}>
            100% Baux sécurisés
          </Texte>
          <Texte variante="legende" couleur="texteSecondaire">
            Visités et validés par notre équipe campus
          </Texte>
        </View>
        <Lien libelle="Détails" variante="legende" /* Page d'information, codée plus tard */ />
      </View>
      <View style={styles.section} /* Titre de section et lien « Carte » */>
        <View style={styles.extensible}>
          <Texte variante="sousTitre">Logements disponibles</Texte>
          <Texte variante="legende" couleur="texteSecondaire">
            Proches de vos facultés et écoles
          </Texte>
        </View>
        <Lien libelle="Carte" variante="legende" /* Carte géographique, séance 7 */ />
      </View>
    </View>
  ); // Fin du rendu
}

// Pied de la liste : carte « Alerte Nouveautés Campus »
function AlerteNouveautes() {
  const { palette } = useTheme(); // Palette claire ou sombre
  const [activee, setActivee] = useState(false); // Alerte activée ou non (les vraies notifications arrivent plus tard)
  return (
    // Carte rose pâle : icône, textes, bouton
    <View style={[styles.encart, styles.pied, { backgroundColor: palette.teinte, borderColor: palette.primaire }]}>
      <View style={[styles.pictogramme, { backgroundColor: palette.fond }]}>
        <Ionicons name={activee ? "notifications" : "notifications-outline"} size={22} color={palette.primaire} />
      </View>
      <View style={styles.extensible}>
        <Texte couleur="primaire">Alerte Nouveautés Campus</Texte>
        <Texte variante="legende" couleur="texteSecondaire">
          {"Recevez un ping dès qu'un studio se libère près de votre fac."}
        </Texte>
      </View>
      <Bouton
        libelle={activee ? "Activée" : "Activer"} // Le libellé suit l'état
        type={activee ? "secondaire" : "primaire"} // Rose plein tant que l'alerte n'est pas activée
        onPress={() => setActivee((actuelle) => !actuelle)} // Active ou désactive
      />
    </View>
  ); // Fin du rendu
}

// Écran 4. Accueil : recherche et filtres fixes, puis la liste des logements qui défile
export function EcranAccueil() {
  const { palette } = useTheme(); // Palette claire ou sombre
  const {
    recherche,
    setRecherche,
    triParPrix,
    basculerTriParPrix,
    procheSeulement,
    basculerProche,
    type,
    typeSuivant,
    favoris,
    basculerFavori,
    resultats,
  } = useLogements(logements); // Toute la logique est dans le hook
  return (
    // La barre d'onglets sera ajoutée par Expo Router au chapitre 4
    <Ecran>
      <View style={[styles.bandeau, { backgroundColor: palette.surface }]} /* Recherche et filtres, fixes */>
        <BarreRecherche valeur={recherche} surChangement={setRecherche} />
        <Filtres
          triParPrix={triParPrix} // Filtre « Prix »
          surTriParPrix={basculerTriParPrix} // Toucher du filtre « Prix »
          procheSeulement={procheSeulement} // Filtre « < 1 km »
          surProche={basculerProche} // Toucher du filtre « < 1 km »
          type={type} // Filtre « Type »
          surType={typeSuivant} // Toucher du filtre « Type »
        />
      </View>
      <FlatList
        data={resultats} // Liste calculée par le hook
        keyExtractor={(logement) => logement.id} // Clé unique : l'identifiant, jamais l'index
        ListHeaderComponent={EnTeteListe} // Carte « Baux sécurisés » et titre de section
        ListFooterComponent={AlerteNouveautes} // Carte « Alerte Nouveautés Campus » en fin de liste
        ItemSeparatorComponent={Separateur} // Écart m entre deux cartes
        ListEmptyComponent={
          // État vide : aucun dessin dans la maquette, le code le prévoit
          <Texte couleur="texteSecondaire" style={styles.vide}>
            Aucun logement ne correspond à votre recherche.
          </Texte>
        }
        contentContainerStyle={styles.liste} // Marges de la liste
        showsVerticalScrollIndicator={false} // Pas de barre de défilement visible
        keyboardShouldPersistTaps="handled" // Un toucher fonctionne même clavier ouvert
        renderItem={({ item }) => {
          // Une carte par logement
          const favori = favoris.includes(item.id); // Vrai si le logement est aimé
          return (
            <Carte
              titre={item.nom} // Calque Titre : type et quartier
              info={formaterPrix(item.prix)} // Calque Info : prix par mois
              detailInfo="/ mois" // Petit texte après le prix
              photos={item.photos} // Carrousel de photos
              couleurPhoto={item.couleurPhoto} // Couleur pendant le chargement
              hauteurPhoto={160} // Grande photo de la maquette
              surPhoto={
                // Badge à gauche, cœur à droite
                <View style={styles.hautPhoto}>
                  {item.badge ? <Badge ton="neutre" libelle={item.badge.libelle} icone={item.badge.icone} /> : <View />}
                  <BoutonRond
                    icone={favori ? "heart" : "heart-outline"} // Cœur plein si aimé
                    couleur={favori ? "primaire" : "texte"} // Rose si aimé
                    accessibilityLabel={favori ? "Retirer des favoris" : "Ajouter aux favoris"} // Action annoncée
                    onPress={() => basculerFavori(item.id)} // Ajoute ou retire le favori
                  />
                </View>
              }
              aCoteDuTitre={<Note valeur={item.note} />} // « ★ 4.9 »
              complement={
                // Calque ajouté : distance au repère
                <View style={styles.distance}>
                  <Ionicons name="walk-outline" size={16} color={palette.texteSecondaire} />
                  <Texte
                    variante="legende"
                    couleur="texteSecondaire"
                  >{`À ${formaterDistance(item.distanceMetres)} ${item.reperage}`}</Texte>
                </View>
              }
              aCoteDeInfo={
                // Mention à droite du prix, dans une pastille
                <View style={[styles.etiquette, { borderColor: palette.bordure }]}>
                  <Texte variante="legende" couleur="texteSecondaire">
                    {item.etiquette}
                  </Texte>
                </View>
              }
            />
          );
        }}
      />
    </Ecran>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  bandeau: {
    // Bande grise du haut, sur toute la largeur
    marginHorizontal: -espacements.m, // Annule la marge latérale de l'Écran
    paddingHorizontal: espacements.m, // Remet la marge à l'intérieur
    paddingVertical: espacements.s, // Marge s en haut et en bas
    gap: espacements.s, // Écart s entre la recherche et les filtres
  }, // Fin du bandeau
  liste: { paddingTop: espacements.m, paddingBottom: espacements.l }, // Marges de la liste
  separateur: { height: espacements.m }, // Écart m entre deux cartes
  enTete: { gap: espacements.l, paddingBottom: espacements.m }, // Carte d'information, puis titre de section
  encart: {
    // Cartes d'information (« Baux sécurisés », « Alerte »)
    flexDirection: "row", // Icône, textes et action côte à côte
    alignItems: "center", // Centrés verticalement
    gap: espacements.s + espacements.xs, // Écart de 12 dp
    padding: espacements.m, // Marge m
    borderRadius: rayons.moyen, // Rayon moyen
    borderWidth: 1, // Contour de 1
  }, // Fin des encarts
  pied: { marginTop: espacements.l }, // L'alerte est séparée de la dernière carte
  pictogramme: {
    // Cercle de 40 dp
    width: tailleTactileMin - espacements.s, // 40 dp
    height: tailleTactileMin - espacements.s, // 40 dp
    borderRadius: rayons.pilule, // Cercle
    alignItems: "center", // Icône centrée
    justifyContent: "center", // Icône centrée
  }, // Fin du pictogramme
  section: { flexDirection: "row", alignItems: "flex-start", gap: espacements.s }, // Titre à gauche, lien à droite
  extensible: { flex: 1 }, // Prend la place restante
  gras: { fontFamily: polices["700"] }, // Texte en gras
  hautPhoto: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }, // Badge à gauche, cœur à droite
  distance: { flexDirection: "row", alignItems: "center", gap: espacements.xs }, // Icône puis texte
  etiquette: {
    paddingHorizontal: espacements.s,
    paddingVertical: espacements.xs,
    borderRadius: rayons.pilule,
    borderWidth: 1,
  }, // Pastille à droite du prix
  vide: { textAlign: "center", paddingVertical: espacements.xl }, // Message centré, avec de l'air
}); // Fin des styles
