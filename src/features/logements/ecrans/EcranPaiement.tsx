import { zodResolver } from "@hookform/resolvers/zod"; // Fait valider le formulaire par un schéma Zod
import { useLocalSearchParams, useRouter } from "expo-router"; // Paramètres de l'adresse et navigation
import { Controller, useForm, useWatch } from "react-hook-form"; // Gestion du formulaire
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native"; // Composants et outils
import { Bouton } from "@/composants/Bouton"; // Composant Bouton
import { ChampFormulaire } from "@/composants/ChampFormulaire"; // Champ de saisie relié au formulaire
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { Retour } from "@/composants/Retour"; // En-tête avec la flèche de retour
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { espacements, rayons } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { formaterDateLongue } from "@/utils/dates"; // « 25/11/2026 » devient « Mercredi 25 novembre 2026 »
import { formaterPrix } from "@/utils/formaterPrix"; // 10000 devient « 10 000 FCFA »
import { BandeauDemonstration } from "../composants/BandeauDemonstration"; // Bandeau « Mode démonstration »
import { CarteReservation } from "../composants/CarteReservation"; // Carte « Réservation d'arrhes »
import { ChoixOperateur } from "../composants/ChoixOperateur"; // Ligne d'opérateur
import { operateursPaiement } from "../constantes"; // MTN Mobile Money et Orange Money
import { useLogement } from "../hooks/useLogement"; // Le logement à réserver
import { schemaPaiement, type ValeursPaiement } from "../schemas"; // Règles du formulaire et type des valeurs

const valeursDeDepart: ValeursPaiement = { operateur: "mtn", numero: "" }; // MTN choisi au départ, comme la maquette

// Écran 7. Paiement : bandeau de démonstration, réservation, choix de l'opérateur, numéro, puis le bouton de confirmation
export function EcranPaiement() {
  const router = useRouter(); // Objet de navigation
  const { palette } = useTheme(); // Palette claire ou sombre
  const { id, date, creneau } = useLocalSearchParams<{ id: string; date?: string; creneau?: string }>(); // /paiement/l1?date=...&creneau=...
  const logement = useLogement(id); // Le montant vient des données, jamais de l'écran précédent
  const { control, handleSubmit } = useForm({
    // Le formulaire et ses outils
    resolver: zodResolver(schemaPaiement), // Validation par le schéma Zod
    defaultValues: valeursDeDepart, // Valeurs de départ
    mode: "onTouched", // Un champ est validé quand on le quitte, puis à chaque frappe
  }); // Fin de useForm
  const codeOperateur = useWatch({ control, name: "operateur" }); // Opérateur choisi, pour le message final

  if (!logement) {
    // Identifiant inconnu : tous les hooks ont déjà été appelés au-dessus
    return (
      <Ecran>
        <Retour />
        <Texte couleur="texteSecondaire" style={styles.introuvable}>
          {"Ce logement n'existe plus ou a été retiré."}
        </Texte>
      </Ecran>
    );
  }

  const montant = formaterPrix(logement.arrhes); // « 10 000 FCFA »
  const visite = date ? `${formaterDateLongue(date)}${creneau ? ` (${creneau})` : ""}` : null; // Rappel de la visite
  const operateur = operateursPaiement.find((o) => o.code === codeOperateur); // Ligne choisie

  const payer = () =>
    void handleSubmit(() => {
      // Données valides : paiement simulé, puis retour aux onglets, sur Visites
      Alert.alert(
        "Paiement simulé", // Titre de la fenêtre
        `${montant} via ${operateur ? operateur.nom : "Mobile Money"}. Votre demande de visite est envoyée au bailleur.`, // Résumé
        [{ text: "OK", onPress: () => router.dismissTo("/visites") }], // Ferme Paiement et Formulaire, affiche l'onglet Visites
      ); // Fin de l'alerte
    })(); // Le vrai paiement arrive à la séance 8

  return (
    // En-tête fixe, contenu qui défile, bouton fixe en bas
    <Ecran>
      <Retour />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.plein} /* Remonte le contenu au-dessus du clavier */
      >
        <ScrollView
          contentContainerStyle={styles.contenu}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false} /* Cadre « Contenu » */
        >
          <BandeauDemonstration />
          <CarteReservation logement={logement} visite={visite} />

          <Texte variante="legende" couleur="texteSecondaire" style={styles.surTitre}>
            CHOISIR UN MOYEN DE PAIEMENT
          </Texte>
          <Controller
            control={control} // Le formulaire
            name="operateur" // Champ du schéma
            render={({ field }) => (
              // Les deux lignes forment un seul champ : un choix parmi deux
              <View style={styles.operateurs} accessibilityRole="radiogroup">
                {operateursPaiement.map((o) => (
                  <ChoixOperateur
                    key={o.code} // Clé unique
                    nom={o.nom} // Titre de la ligne
                    detail={o.detail} // Sous-titre
                    logo={o.logo} // Logo de l'opérateur
                    choisi={field.value === o.code} // Vrai pour la ligne choisie
                    surChoix={() => field.onChange(o.code)} // Le toucher change la valeur du champ
                  />
                ))}
              </View>
            )}
          />

          <View style={[styles.encart, { backgroundColor: palette.surface, borderColor: palette.bordure }]}>
            <ChampFormulaire
              control={control} // Le formulaire
              nom="numero" // Champ du schéma
              etiquette="Numéro de débit" // Calque Étiquette
              prefixe="+237" // Indicatif du Cameroun, devant le numéro
              iconeFin="phone-portrait-outline" // Téléphone à droite
              keyboardType="phone-pad" // Clavier numérique
              placeholder="677 89 42 10" // Exemple de la maquette
            />
            <Texte variante="legende" couleur="texteSecondaire">
              Un prompt de validation s’affichera directement sur votre téléphone.
            </Texte>
          </View>
        </ScrollView>
        <View style={styles.bas} /* Bouton fixe, dans la zone du pouce */>
          <Bouton
            libelle={`Confirmer le paiement (${montant})`} // Le montant est rappelé sur le bouton
            icone="checkmark-circle-outline" // Coche de la maquette
            positionIcone="debut" // Avant le libellé
            onPress={payer} // Valide le formulaire avant de continuer
          />
        </View>
      </KeyboardAvoidingView>
    </Ecran>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  plein: { flex: 1 }, // Toute la hauteur sous l'en-tête
  contenu: { gap: espacements.m, paddingTop: espacements.m, paddingBottom: espacements.m }, // Écart m entre les blocs
  surTitre: { letterSpacing: 0.5, marginTop: espacements.s }, // « CHOISIR UN MOYEN DE PAIEMENT »
  operateurs: { gap: espacements.s + espacements.xs }, // 12 dp entre les deux lignes
  encart: {
    // Cadre du numéro de débit
    gap: espacements.s, // Écart s
    padding: espacements.m - 1, // Marge m moins le contour
    borderWidth: 1, // Contour de 1
    borderRadius: rayons.moyen, // Rayon moyen
  }, // Fin de l'encart
  bas: { paddingTop: espacements.s, paddingBottom: espacements.m }, // Air au-dessus de la zone de sécurité
  introuvable: { paddingTop: espacements.m }, // Air sous l'en-tête
}); // Fin des styles
