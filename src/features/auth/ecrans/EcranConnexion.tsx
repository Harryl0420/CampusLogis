import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { useRouter } from "expo-router"; // Hook de navigation d'Expo Router
import { useState } from "react"; // État local
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native"; // Composants et outils
import { Badge } from "@/composants/Badge"; // Pilule « Espace sécurisé »
import { Bouton } from "@/composants/Bouton"; // Composant Bouton
import { ChampSaisie } from "@/composants/ChampSaisie"; // Composant Champ de saisie
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { Lien } from "@/composants/Lien"; // Lien de 48 dp de haut
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { useClavierVisible } from "@/hooks/useClavierVisible"; // Vrai quand le clavier est ouvert
import { polices } from "@/theme/polices"; // Graisse des textes en gras
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif

// Écran 2. Connexion : en-tête, marque, titre, deux champs, bouton, lien vers l'inscription et carte d'information
export function EcranConnexion() {
  const { palette } = useTheme(); // Palette claire ou sombre
  const router = useRouter(); // Objet de navigation : Expo recommande ce hook dans les composants
  const [telephone, setTelephone] = useState(""); // Numéro saisi
  const [motDePasse, setMotDePasse] = useState(""); // Mot de passe saisi
  const clavierVisible = useClavierVisible(); // Hook personnalisé
  const formulaireRempli = telephone.length > 0 && motDePasse.length > 0; // Les deux champs contiennent quelque chose
  const retour = () => (router.canGoBack() ? router.back() : router.replace("/")); // Écran précédent, ou Bienvenue s'il n'y en a pas
  return (
    // L'en-tête reste fixe, le reste défile et remonte avec le clavier
    <Ecran>
      <View style={styles.entete} /* En-tête : retour à gauche, badge à droite */>
        <Pressable accessibilityRole="button" accessibilityLabel="Retour" onPress={retour} style={styles.retour}>
          <Ionicons name="arrow-back" size={24} color={palette.texte} />
        </Pressable>
        <Badge libelle="Espace sécurisé" icone="shield-checkmark" ton="neutre" />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Réglage différent sur iPhone et sur Android
        style={styles.plein} // Occupe le reste de l'écran
      >
        <ScrollView
          contentContainerStyle={styles.contenu} // Pile verticale, écart m
          keyboardShouldPersistTaps="handled" // Un toucher sur un bouton fonctionne même clavier ouvert
          showsVerticalScrollIndicator={false} // Pas de barre de défilement visible
        >
          <View style={styles.marque} /* Tuile du logo et nom en capitales */>
            <View style={[styles.tuile, { backgroundColor: palette.teinte }]}>
              <Ionicons name="business" size={24} color={palette.primaire} />
            </View>
            <Texte variante="legende" couleur="primaire" style={styles.nomMarque}>
              CAMPUSLOGIS
            </Texte>
          </View>
          <View style={styles.titres} /* Titre et sous-titre rapprochés */>
            <Texte variante="titre">Connexion</Texte>
            <Texte couleur="texteSecondaire">Bon retour sur CampusLogis</Texte>
          </View>
          <ChampSaisie
            etiquette="Numéro de téléphone" // Calque Étiquette
            valeur={telephone} // Valeur de l'état
            onChangeText={setTelephone} // Met l'état à jour à chaque frappe
            keyboardType="phone-pad" // Clavier numérique
            placeholder="+237 6XX XXX XXX" // Exemple de format
            icone="phone-portrait-outline" // Icône de la maquette
          />
          <View style={styles.validation} /* Groupe « Validation » : champ, lien et bouton rapprochés */>
            <ChampSaisie
              etiquette="Mot de passe" // Calque Étiquette
              valeur={motDePasse} // Valeur de l'état
              onChangeText={setMotDePasse} // Met l'état à jour
              motDePasse // Caractères masqués, avec l'œil
              placeholder="8 caractères minimum" // Indication
              icone="lock-closed-outline" // Icône de la maquette
            />
            <Lien
              libelle="Mot de passe oublié ?"
              variante="legende"
              couleur="texteSecondaire"
              alignement="flex-end" /* Codé plus tard */
            />
            <Bouton
              libelle="Se connecter" // Calque Libellé
              etat={formulaireRempli ? "normal" : "desactive"} // Prévention des erreurs : désactivé tant qu'un champ est vide
              onPress={() => router.replace("/accueil")} // Les onglets remplacent l'authentification : Retour ne ramène pas ici (la vraie connexion arrive au chapitre 5)
            />
          </View>
          <Lien
            prefixe="Vous n'avez pas de compte ?" // Début de phrase en gris
            libelle="Créer un compte" // Partie touchable
            variante="legende" // Taille de la maquette
            alignement="center" // Centré
            onPress={() => router.push("/inscription")} // Ouvre l'écran 3. Inscription
          />
          {clavierVisible ? null : ( // Rendu conditionnel : la carte d'information disparaît quand le clavier est ouvert
            <View style={[styles.info, { backgroundColor: palette.surface, borderColor: palette.bordure }]}>
              <Ionicons name="school-outline" size={20} color={palette.primaire} />
              <View style={styles.infoTextes}>
                <Texte variante="legende" style={styles.gras}>
                  Logements certifiés étudiants
                </Texte>
                <Texte variante="legende" couleur="texteSecondaire">
                  Accédez à plus de 1 200 chambres et studios vérifiés proches des campus.
                </Texte>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Ecran>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  entete: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", minHeight: tailleTactileMin }, // Barre du haut
  retour: { width: tailleTactileMin, height: tailleTactileMin, justifyContent: "center" }, // Zone tactile de 48 dp
  plein: { flex: 1 }, // Toute la hauteur restante
  contenu: { gap: espacements.m, paddingTop: espacements.s, paddingBottom: espacements.l }, // Pile du contenu
  marque: { flexDirection: "row", alignItems: "center", gap: espacements.m }, // Tuile puis nom
  tuile: {
    // Carré arrondi du logo
    width: tailleTactileMin, // 48 dp
    height: tailleTactileMin, // 48 dp
    borderRadius: rayons.moyen, // Rayon moyen
    alignItems: "center", // Icône centrée
    justifyContent: "center", // Icône centrée
  }, // Fin de la tuile
  nomMarque: { fontFamily: polices["700"], letterSpacing: 1 }, // Capitales espacées, en gras
  titres: { gap: espacements.xs }, // Titre et sous-titre rapprochés
  validation: { gap: espacements.xs }, // Champ, lien et bouton rapprochés
  info: {
    // Carte « Logements certifiés étudiants »
    flexDirection: "row", // Icône puis textes
    gap: espacements.s + espacements.xs, // Écart de 12 dp
    padding: espacements.m, // Marge intérieure m
    borderRadius: rayons.moyen, // Rayon moyen
    borderWidth: 1, // Contour de 1
  }, // Fin de la carte
  infoTextes: { flex: 1 }, // Les textes prennent la place restante
  gras: { fontFamily: polices["700"] }, // Légende en gras
}); // Fin des styles
