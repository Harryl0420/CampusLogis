import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { router } from "expo-router"; // Navigation entre écrans
import { useState } from "react"; // État local
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native"; // Composants et outils
import { Badge } from "@/composants/Badge"; // Pilule « Étape 1 sur 2 »
import { Bouton } from "@/composants/Bouton"; // Composant Bouton
import { ChampSaisie } from "@/composants/ChampSaisie"; // Composant Champ de saisie
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { Lien } from "@/composants/Lien"; // Lien de 48 dp de haut
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { useClavierVisible } from "@/hooks/useClavierVisible"; // Vrai quand le clavier est ouvert
import { polices } from "@/theme/polices"; // Graisse des textes en gras
import { espacements, rayons, tailleTactileMin } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { CarteRole } from "../composants/CarteRole"; // Carte de choix, dans la même fonctionnalité : chemin relatif
import type { Role } from "../types"; // Type du rôle

const longueurMin = 8; // Longueur minimale du mot de passe

// Écran 3. Inscription : choix du rôle, trois champs, conditions, bouton, puis lien vers la connexion
export function EcranInscription() {
  const { palette } = useTheme(); // Palette claire ou sombre
  const [role, setRole] = useState<Role>("etudiant"); // Rôle choisi, Étudiant au départ comme la maquette
  const [nom, setNom] = useState(""); // Nom complet saisi
  const [telephone, setTelephone] = useState(""); // Numéro saisi
  const [motDePasse, setMotDePasse] = useState(""); // Mot de passe saisi
  const clavierVisible = useClavierVisible(); // Hook personnalisé
  const motDePasseTropCourt = motDePasse.length > 0 && motDePasse.length < longueurMin; // Entre 1 et 7 caractères : erreur
  const formulaireValide = nom.trim().length > 0 && telephone.length > 0 && motDePasse.length >= longueurMin; // Recalculé à chaque frappe
  const retour = () => (router.canGoBack() ? router.back() : router.replace("/")); // Écran précédent, ou Bienvenue
  return (
    // L'en-tête reste fixe, le formulaire défile et remonte avec le clavier
    <Ecran>
      <View style={styles.entete} /* Étape à gauche, progression à droite */>
        <Pressable accessibilityRole="button" accessibilityLabel="Retour" onPress={retour} hitSlop={espacements.s}>
          <Badge libelle="Étape 1 sur 2" icone="chevron-back" />
        </Pressable>
        <View style={styles.progression} /* Barre de progression : 1 étape sur 2 */>
          <View style={[styles.segmentActif, { backgroundColor: palette.primaire }]} />
          <View style={[styles.segment, { backgroundColor: palette.bordure }]} />
        </View>
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
          <View style={styles.titres} /* Titre et sous-titre rapprochés */>
            <Texte variante="titre">Créer un compte</Texte>
            <Texte couleur="texteSecondaire">Trouvez ou publiez un logement étudiant</Texte>
          </View>
          <View style={styles.groupe} /* Choix du rôle */>
            <Texte variante="legende" couleur="texteSecondaire" style={styles.surTitre}>
              VOUS ÊTES ?
            </Texte>
            <View style={styles.roles} accessibilityRole="radiogroup" /* Deux cartes côte à côte */>
              <CarteRole
                titre="Étudiant" // Calque Titre
                sousTitre="Je cherche" // Calque Sous-titre
                icone="school" // Icône de la maquette
                choisie={role === "etudiant"} // Mise en avant si choisie
                surChoix={() => setRole("etudiant")} // Choisit le rôle Étudiant
              />
              <CarteRole
                titre="Bailleur" // Calque Titre
                sousTitre="Je loue" // Calque Sous-titre
                icone="key-outline" // Icône de la maquette
                choisie={role === "bailleur"} // Mise en avant si choisie
                surChoix={() => setRole("bailleur")} // Choisit le rôle Bailleur
              />
            </View>
          </View>
          <ChampSaisie
            etiquette="Nom complet" // Calque Étiquette
            valeur={nom} // Valeur de l'état
            onChangeText={setNom} // Met l'état à jour à chaque frappe
            autoCapitalize="words" // Majuscule à chaque mot
            placeholder="ex. Marc Bella" // Exemple de la maquette
            icone="person-outline" // Icône de la maquette
          />
          <ChampSaisie
            etiquette="Numéro de téléphone" // Calque Étiquette
            valeur={telephone} // Valeur de l'état
            onChangeText={setTelephone} // Met l'état à jour
            keyboardType="phone-pad" // Clavier numérique
            placeholder="+237 690 000 000" // Exemple de la maquette
            icone="call-outline" // Icône de la maquette
          />
          <ChampSaisie
            etiquette="Mot de passe" // Calque Étiquette
            indication="8 car. min" // Texte à droite de l'étiquette
            valeur={motDePasse} // Valeur de l'état
            onChangeText={setMotDePasse} // Met l'état à jour
            motDePasse // Caractères masqués, avec l'œil
            placeholder="8 caractères minimum" // Indication
            icone="lock-closed-outline" // Icône de la maquette
            etat={motDePasseTropCourt ? "erreur" : "normal"} // État Erreur entre 1 et 7 caractères
            message="Le mot de passe doit contenir au moins 8 caractères" // Calque Message
          />
          <View style={styles.conditions} /* Mention des conditions générales */>
            <Ionicons name="shield-checkmark" size={18} color={palette.primaire} />
            <Texte variante="legende" couleur="texteSecondaire" style={styles.conditionsTexte}>
              En créant un compte, vous acceptez nos{" "}
              <Texte variante="legende" couleur="primaire" style={styles.souligne}>
                Conditions Générales
              </Texte>{" "}
              et confirmez avoir pris connaissance de notre politique de confidentialité.
            </Texte>
          </View>
          <Bouton
            libelle="Créer mon compte" // Calque Libellé
            icone="arrow-forward" // Flèche de la maquette
            etat={formulaireValide ? "normal" : "desactive"} // Désactivé tant que le formulaire n'est pas valide
          />
        </ScrollView>
        {clavierVisible ? null : ( // Rendu conditionnel : le lien est masqué quand le clavier est ouvert
          <View style={styles.bas} /* Lien connexion, en bas de l'écran */>
            <Lien
              prefixe="Déjà inscrit ?"
              libelle="Se connecter"
              alignement="center"
              onPress={() => router.push("/connexion")}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </Ecran>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  entete: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", minHeight: tailleTactileMin }, // Barre du haut
  progression: { flexDirection: "row", alignItems: "center", gap: espacements.xs }, // Deux segments côte à côte
  segmentActif: { width: espacements.l, height: espacements.xs, borderRadius: rayons.pilule }, // Étape en cours : 24 dp
  segment: { width: espacements.s, height: espacements.xs, borderRadius: rayons.pilule }, // Étape suivante : 8 dp
  plein: { flex: 1 }, // Toute la hauteur restante
  contenu: { gap: espacements.m, paddingTop: espacements.m, paddingBottom: espacements.l }, // Pile du formulaire
  titres: { gap: espacements.xs }, // Titre et sous-titre rapprochés
  groupe: { gap: espacements.s }, // Sur-titre et cartes
  surTitre: { fontFamily: polices["700"], letterSpacing: 1 }, // « VOUS ÊTES ? » en gras espacé
  roles: { flexDirection: "row", gap: espacements.s + espacements.xs }, // Deux cartes, écart de 12 dp
  conditions: { flexDirection: "row", alignItems: "flex-start", gap: espacements.s }, // Icône puis texte
  conditionsTexte: { flex: 1 }, // Le texte prend la place restante
  souligne: { fontFamily: polices["700"], textDecorationLine: "underline" }, // « Conditions Générales » en gras souligné
  bas: { paddingBottom: espacements.s }, // Au-dessus de la zone de sécurité
}); // Fin des styles
