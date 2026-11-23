import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { useLocalSearchParams, useRouter } from "expo-router"; // Paramètres de l'adresse et navigation
import { useState } from "react"; // État local
import { ScrollView, Share, StyleSheet, View } from "react-native"; // Défilement, partage, conteneur et outils
import { Badge } from "@/composants/Badge"; // Pastilles d'équipements et badge « Logement vérifié »
import { Bouton } from "@/composants/Bouton"; // Bouton « Réserver une visite »
import { Carrousel } from "@/composants/Carrousel"; // Photos qui défilent
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { Lien } from "@/composants/Lien"; // Lien « Itinéraire »
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { polices } from "@/theme/polices"; // Graisse des textes en gras
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { formaterDistance } from "@/utils/formaterDistance"; // 350 devient « 350 m »
import { formaterPrix } from "@/utils/formaterPrix"; // 45000 devient « 45 000 FCFA »
import { BoutonRond } from "../composants/BoutonRond"; // Retour, partager, cœur
import { CarteBailleur } from "../composants/CarteBailleur"; // Carte du bailleur
import { Note } from "../composants/Note"; // « ★ 4.9 »
import { useLogement } from "../hooks/useLogement"; // Le logement de l'adresse, fourni par le dépôt

// Écran 5. Détail : photos, titre, distance, prix, équipements, bailleur, campus, puis barre de réservation fixe
export function EcranDetail() {
  const { palette } = useTheme(); // Palette claire ou sombre
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>(); // Paramètre de l'adresse : « l1 » dans /accueil/l1
  const [favori, setFavori] = useState(false); // Cœur du Détail (partagé avec l'Accueil au chapitre 5)
  const logement = useLogement(id); // Logement correspondant, ou undefined
  const retour = () => (router.canGoBack() ? router.back() : router.replace("/accueil")); // Écran précédent, ou Accueil

  if (!logement) {
    // Adresse inconnue : on l'explique au lieu d'afficher un écran vide
    return (
      <Ecran bords={["top"]}>
        <View style={styles.introuvable}>
          <Texte variante="sousTitre">Logement introuvable</Texte>
          <Texte couleur="texteSecondaire" style={styles.centre}>
            {"Ce logement n'existe plus ou a été retiré."}
          </Texte>
          <Bouton libelle="Retour à l'accueil" onPress={() => router.replace("/accueil")} />
        </View>
      </Ecran>
    );
  }

  const partager = () => {
    // Ouvre le menu de partage du téléphone (WhatsApp, SMS...)
    void Share.share({ message: `${logement.nom}, ${formaterPrix(logement.prix)} par mois, sur CampusLogis` }); // void : on n'attend pas la fin
  };

  return (
    // Le contenu défile, la barre de réservation reste au-dessus de la barre d'onglets, qui gère la zone de sécurité du bas
    <Ecran bords={["top"]}>
      <ScrollView style={styles.plein} contentContainerStyle={styles.contenu} showsVerticalScrollIndicator={false}>
        <View
          style={[styles.photo, { backgroundColor: logement.couleurPhoto }]} /* Grande photo, sur toute la largeur */
        >
          <Carrousel photos={logement.photos} indicateur="compteur" />
          <View style={styles.surPhoto} pointerEvents="box-none" /* Boutons et badge posés sur la photo */>
            <View style={styles.ligneHaut} pointerEvents="box-none">
              <BoutonRond icone="arrow-back" accessibilityLabel="Retour" onPress={retour} />
              <View style={styles.actionsPhoto} pointerEvents="box-none">
                <BoutonRond icone="share-social-outline" accessibilityLabel="Partager" onPress={partager} />
                <BoutonRond
                  icone={favori ? "heart" : "heart-outline"} // Cœur plein si aimé
                  couleur={favori ? "primaire" : "texte"} // Rose si aimé
                  accessibilityLabel={favori ? "Retirer des favoris" : "Ajouter aux favoris"} // Action annoncée
                  onPress={() => setFavori((actuel) => !actuel)} // Ajoute ou retire le favori
                />
              </View>
            </View>
            {logement.badge ? <Badge libelle={logement.badge.libelle} icone={logement.badge.icone} /> : null}
          </View>
        </View>

        <View style={styles.entete} /* Titre à gauche, note à droite */>
          <Texte variante="titre" style={styles.extensible}>
            {logement.nom}
          </Texte>
          <View style={[styles.pastilleNote, { borderColor: palette.bordure }]}>
            <Note valeur={logement.note} />
          </View>
        </View>

        <View style={styles.ligne} /* Distance au campus */>
          <Ionicons name="navigate-outline" size={16} color={palette.texteSecondaire} />
          <Texte variante="legende" couleur="texteSecondaire" style={styles.extensible}>
            {`À ${formaterDistance(logement.distanceMetres)} ${logement.reperage} `}
            <Texte variante="legende" style={styles.gras}>
              {`(${logement.minutesAPied} min à pied)`}
            </Texte>
          </Texte>
        </View>

        <View style={[styles.encart, { backgroundColor: palette.surface, borderColor: palette.bordure }]} /* Prix */>
          <Texte variante="titre" couleur="primaire">
            {formaterPrix(logement.prix)}
            <Texte variante="legende" couleur="texteSecondaire">
              {logement.chargesIncluses ? " / mois charges comprises" : " / mois"}
            </Texte>
          </Texte>
        </View>

        <View style={styles.groupe} /* Équipements et atouts */>
          <Texte variante="legende" couleur="texteSecondaire" style={styles.surTitre}>
            ÉQUIPEMENTS & ATOUTS
          </Texte>
          <View style={styles.pastilles} /* Pastilles qui passent à la ligne */>
            {logement.equipements.map((equipement) => (
              <Badge
                key={equipement.libelle} // Clé unique : le libellé
                libelle={equipement.libelle} // Texte de la pastille
                icone={equipement.icone} // Icône de la pastille
                ton={equipement.misEnAvant ? "teinte" : "neutre"} // Rose ou grise
              />
            ))}
          </View>
        </View>

        <CarteBailleur bailleur={logement.bailleur} />

        <View
          style={[
            styles.encart,
            styles.ligneCampus,
            { backgroundColor: palette.surface, borderColor: palette.bordure },
          ]} /* Campus */
        >
          <View style={[styles.pictogramme, { backgroundColor: palette.teinte }]}>
            <Ionicons name="school-outline" size={22} color={palette.primaire} />
          </View>
          <View style={styles.extensible}>
            <Texte variante="legende" style={styles.gras}>
              {logement.campus}
            </Texte>
            <Texte
              variante="legende"
              couleur="texteSecondaire"
            >{`Entrée principale à ${formaterDistance(logement.distanceMetres)}`}</Texte>
          </View>
          <View style={[styles.itineraire, { backgroundColor: palette.fond }]}>
            <Lien libelle="Itinéraire" variante="legende" /* Carte géographique, séance 7 */ />
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.barreBas,
          { backgroundColor: palette.fond, borderColor: palette.bordure },
        ]} /* Barre fixe de réservation */
      >
        <View>
          <Texte variante="sousTitre" couleur="primaire">
            {formaterPrix(logement.prix, "F")}
          </Texte>
          <Texte variante="legende" couleur="texteSecondaire">
            par mois
          </Texte>
        </View>
        <View style={styles.extensible}>
          <Bouton
            libelle="Réserver une visite"
            icone="calendar-outline"
            positionIcone="debut" // Icône avant le libellé
            onPress={() => router.push({ pathname: "/demande/[id]", params: { id: logement.id } })} // Ouvre l'écran 6. Formulaire
          />
        </View>
      </View>
    </Ecran>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  plein: { flex: 1 }, // Toute la hauteur au-dessus de la barre
  contenu: { gap: espacements.m, paddingBottom: espacements.l }, // Pile du contenu
  photo: { marginHorizontal: -espacements.m, height: 280, overflow: "hidden" }, // Photo de 280 dp, sur toute la largeur de l'écran
  surPhoto: {
    // Couche posée sur la photo
    ...StyleSheet.absoluteFill, // Recouvre toute la photo
    padding: espacements.m, // Marge m
    justifyContent: "space-between", // Boutons en haut, badge en bas
    alignItems: "flex-start", // Le badge garde la largeur de son texte
  }, // Fin de la couche
  ligneHaut: { alignSelf: "stretch", flexDirection: "row", justifyContent: "space-between" }, // Retour à gauche, actions à droite
  actionsPhoto: { flexDirection: "row", gap: espacements.s }, // Partager et cœur
  entete: { flexDirection: "row", alignItems: "flex-start", gap: espacements.s }, // Titre et note
  pastilleNote: {
    // Note dans un cadre
    marginTop: espacements.xs, // Alignée sur la première ligne du titre
    paddingHorizontal: espacements.s, // Marge s
    paddingVertical: espacements.xs, // Marge xs
    borderRadius: rayons.petit, // Rayon petit
    borderWidth: 1, // Contour de 1
  }, // Fin de la note
  ligne: { flexDirection: "row", alignItems: "center", gap: espacements.xs }, // Icône puis texte
  extensible: { flex: 1 }, // Prend la place restante
  gras: { fontFamily: polices["700"] }, // Texte en gras
  encart: { padding: espacements.m, borderRadius: rayons.moyen, borderWidth: 1 }, // Cadres du prix et du campus
  groupe: { gap: espacements.s }, // Sur-titre et pastilles
  surTitre: { fontFamily: polices["700"], letterSpacing: 1 }, // « ÉQUIPEMENTS & ATOUTS »
  pastilles: { flexDirection: "row", flexWrap: "wrap", gap: espacements.s }, // Pastilles qui passent à la ligne
  ligneCampus: { flexDirection: "row", alignItems: "center", gap: espacements.s + espacements.xs }, // Icône, textes, bouton
  pictogramme: {
    // Cercle de 40 dp
    width: tailleTactileMin - espacements.s, // 40 dp
    height: tailleTactileMin - espacements.s, // 40 dp
    borderRadius: rayons.pilule, // Cercle
    alignItems: "center", // Icône centrée
    justifyContent: "center", // Icône centrée
  }, // Fin du pictogramme
  itineraire: { paddingHorizontal: espacements.s + espacements.xs, borderRadius: rayons.petit }, // Pastille « Itinéraire »
  barreBas: {
    // Barre fixe du bas, sur toute la largeur
    marginHorizontal: -espacements.m, // Annule la marge latérale de l'Écran
    paddingHorizontal: espacements.m, // Remet la marge à l'intérieur
    paddingTop: espacements.s + espacements.xs, // 12 dp au-dessus
    paddingBottom: espacements.s + espacements.xs, // 12 dp au-dessous : la barre d'onglets commence juste après
    flexDirection: "row", // Prix à gauche, bouton à droite
    alignItems: "center", // Centrés verticalement
    gap: espacements.m, // Écart m
    borderTopWidth: 1, // Trait de séparation
  }, // Fin de la barre
  introuvable: { flex: 1, justifyContent: "center", gap: espacements.m }, // Message centré
  centre: { textAlign: "center" }, // Texte centré
}); // Fin des styles
