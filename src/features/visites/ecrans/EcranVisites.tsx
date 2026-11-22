import { ScrollView, StyleSheet } from "react-native"; // Défilement et outils
import { Carte } from "@/composants/Carte"; // Composant Carte
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { espacements } from "@/theme/tokens"; // Mesures de la maquette
import { formaterPrix } from "@/utils/formaterPrix"; // 2000 devient « 2 000 FCFA »
import { listerVisites } from "../depot"; // Accès aux données

// Onglet Visites : les demandes de visite de l'étudiant, en cartes horizontales
export function EcranVisites() {
  const visites = listerVisites(); // Liste fournie par le dépôt
  return (
    // Seul le bord haut est protégé : en bas, la barre d'onglets gère la zone de sécurité
    <Ecran bords={["top"]}>
      <ScrollView contentContainerStyle={styles.contenu} /* Cadre « Contenu » */>
        <Texte variante="titre">Mes visites</Texte>
        {visites.map((visite) => (
          // Une carte horizontale par visite
          <Carte
            key={visite.id} // Clé unique : l'identifiant
            disposition="horizontale" // Photo à gauche, textes à droite
            titre={visite.logement} // Calque Titre
            info={formaterPrix(visite.montant)} // Calque Info : frais de visite
            couleurPhoto={visite.couleurPhoto} // Calque Photo
            complement={
              <Texte variante="legende" couleur="texteSecondaire">
                {`${visite.statut}, le ${visite.date} à ${visite.heure}`}
              </Texte>
            } // Calque ajouté : statut, date et heure
          />
        ))}
      </ScrollView>
    </Ecran>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  contenu: { gap: espacements.m, paddingTop: espacements.m, paddingBottom: espacements.m }, // Même squelette que l'Accueil
}); // Fin des styles
