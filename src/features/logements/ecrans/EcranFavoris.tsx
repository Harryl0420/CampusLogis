import { Ionicons } from "@expo/vector-icons"; // Jeu d'icônes Ionicons, inclus dans Expo
import { useRouter } from "expo-router"; // Hook de navigation d'Expo Router
import { ScrollView, StyleSheet, View } from "react-native"; // Défilement, conteneur et outils
import { Carte } from "@/composants/Carte"; // Composant Carte
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { espacements } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { formaterDistance } from "@/utils/formaterDistance"; // 350 devient « 350 m »
import { formaterPrix } from "@/utils/formaterPrix"; // 45000 devient « 45 000 FCFA »
import { useFavoris } from "../hooks/useFavoris"; // Logements aimés, fournis par le dépôt

// Onglet Favoris : les logements aimés, en cartes horizontales (les favoris partagés avec l'Accueil arrivent avec l'état global)
export function EcranFavoris() {
  const { palette } = useTheme(); // Palette claire ou sombre
  const router = useRouter(); // Objet de navigation
  const favoris = useFavoris(); // Seulement les logements aimés
  return (
    // Seul le bord haut est protégé : en bas, la barre d'onglets gère la zone de sécurité
    <Ecran bords={["top"]}>
      <ScrollView contentContainerStyle={styles.contenu} /* Cadre « Contenu » */>
        <Texte variante="titre">Favoris</Texte>
        {favoris.length === 0 ? ( // Rendu conditionnel : état vide
          <View style={styles.vide}>
            <Ionicons name="heart-outline" size={56} color={palette.texteSecondaire} /* Icône d'illustration */ />
            <Texte couleur="texteSecondaire" style={styles.centre}>
              Touchez le cœur d’un logement pour le retrouver ici.
            </Texte>
          </View>
        ) : (
          favoris.map((logement) => (
            // Une carte horizontale par logement aimé
            <Carte
              key={logement.id} // Clé unique : l'identifiant
              disposition="horizontale" // Photo à gauche, textes à droite
              titre={logement.nom} // Calque Titre
              info={formaterPrix(logement.prix)} // Calque Info : prix par mois
              detailInfo="/ mois" // Petit texte après le prix
              photo={logement.photos[0]} // Première photo seulement : la carte est petite
              couleurPhoto={logement.couleurPhoto} // Couleur pendant le chargement
              complement={
                <Texte variante="legende" couleur="texteSecondaire">
                  {`À ${formaterDistance(logement.distanceMetres)} ${logement.reperage}`}
                </Texte>
              } // Calque ajouté : distance au repère
              onPress={() => router.push({ pathname: "/accueil/[id]", params: { id: logement.id } })} // Passe sur l'onglet Accueil et y ouvre le Détail
            />
          ))
        )}
      </ScrollView>
    </Ecran>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  contenu: { gap: espacements.m, paddingTop: espacements.m, paddingBottom: espacements.m }, // Même squelette que l'Accueil
  vide: { alignItems: "center", gap: espacements.m, paddingVertical: espacements.xl }, // Message centré, avec de l'air
  centre: { textAlign: "center" }, // Texte centré
}); // Fin des styles
