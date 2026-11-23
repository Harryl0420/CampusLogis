import { Ionicons } from "@expo/vector-icons"; // Icônes Ionicons
import { zodResolver } from "@hookform/resolvers/zod"; // Fait valider le formulaire par un schéma Zod
import { useLocalSearchParams, useRouter } from "expo-router"; // Paramètres de l'adresse et navigation
import { useForm, useWatch } from "react-hook-form"; // Gestion du formulaire et lecture d'une valeur
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native"; // Composants et outils
import { Bouton } from "@/composants/Bouton"; // Composant Bouton
import { ChampFormulaire } from "@/composants/ChampFormulaire"; // Champ de saisie relié au formulaire
import { Ecran } from "@/composants/Ecran"; // Cadre commun des écrans
import { Retour } from "@/composants/Retour"; // En-tête avec la flèche de retour
import { Texte } from "@/composants/Texte"; // Texte au style de la maquette
import { espacements, rayons } from "@/theme/tokens"; // Mesures de la maquette
import { useTheme } from "@/theme/useTheme"; // Couleurs du mode actif
import { ChoixCreneau } from "../composants/ChoixCreneau"; // Pastilles des créneaux
import { ResumeLogement } from "../composants/ResumeLogement"; // Rappel du logement
import { creneauxVisite } from "../constantes"; // Créneaux proposés
import { useLogement } from "../hooks/useLogement"; // Le logement de l'adresse
import { schemaDemandeVisite, type ValeursDemandeVisite } from "../schemas"; // Règles du formulaire et type des valeurs

// Écran 6. Formulaire « Demande de visite » : ouvert depuis le Détail, dans la pile principale
export function EcranDemandeVisite() {
  const router = useRouter(); // Objet de navigation
  const { palette } = useTheme(); // Palette claire ou sombre
  const { id } = useLocalSearchParams<{ id: string }>(); // « l1 » dans /demande/l1
  const logement = useLogement(id); // Logement concerné, ou undefined
  const { control, handleSubmit, setValue } = useForm({
    // Le formulaire et ses outils
    resolver: zodResolver(schemaDemandeVisite), // Validation par le schéma Zod
    defaultValues: { date: "", creneau: "", message: "" }, // Tous les champs vides au départ
    mode: "onTouched", // Un champ est validé quand on le quitte, puis à chaque frappe
  }); // Fin de useForm
  const creneau = useWatch({ control, name: "creneau" }); // Créneau choisi, pour colorer la bonne pastille

  if (!logement) {
    // Adresse inconnue : tous les hooks ont déjà été appelés au-dessus
    return (
      <Ecran>
        <Retour titre="Demande de visite" />
        <Texte couleur="texteSecondaire" style={styles.introuvable}>
          {"Ce logement n'existe plus ou a été retiré."}
        </Texte>
      </Ecran>
    );
  }

  const envoyer = (valeurs: ValeursDemandeVisite) => {
    // Appelée seulement si tous les champs respectent le schéma
    Alert.alert(
      "Demande envoyée", // Titre de la fenêtre
      `Visite de « ${logement.nom} » le ${valeurs.date}, ${valeurs.creneau}.`, // Résumé des valeurs validées
      [{ text: "OK", onPress: () => router.back() }], // Pour l'instant on revient au Détail ; le Paiement arrive à l'étape 10
    ); // Fin de l'alerte
  }; // Fin d'envoyer

  return (
    // En-tête fixe, puis le formulaire qui défile au-dessus du clavier
    <Ecran>
      <Retour titre="Demande de visite" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.plein} /* Remonte le contenu au-dessus du clavier */
      >
        <ScrollView
          contentContainerStyle={styles.contenu}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false} /* Cadre « Contenu » */
        >
          <ResumeLogement logement={logement} />

          <View style={[styles.encart, { backgroundColor: palette.surface, borderColor: palette.bordure }]}>
            <Ionicons name="shield-checkmark-outline" size={20} color={palette.texteSecondaire} />
            <Texte variante="legende" couleur="texteSecondaire" style={styles.extensible}>
              Visite 100% gratuite & sans engagement. Vous pourrez échanger directement avec le gestionnaire agréé sur
              place.
            </Texte>
          </View>

          <ChampFormulaire
            control={control}
            nom="date"
            etiquette="Date souhaitée pour la visite"
            obligatoire // « * » et « Requis »
            iconeFin="calendar-outline" // Calendrier à droite
            keyboardType="numbers-and-punctuation" // Chiffres et « / »
            placeholder="JJ/MM/AAAA"
          />

          <View style={styles.groupe} /* Champ du créneau, puis les pastilles */>
            <ChampFormulaire
              control={control}
              nom="creneau"
              etiquette="Créneau horaire"
              iconeFin="time-outline" // Horloge à droite
              editable={false} // Le créneau se choisit avec les pastilles
              placeholder="Choisissez un créneau ci-dessous"
            />
            <ChoixCreneau
              creneaux={creneauxVisite} // Créneaux de la maquette
              choisi={creneau} // Pastille rose
              surChoix={(choix) => setValue("creneau", choix, { shouldValidate: true, shouldTouch: true })} // Remplit le champ et le valide
            />
          </View>

          <ChampFormulaire
            control={control}
            nom="message"
            etiquette="Message pour le bailleur"
            indication="Optionnel"
            multiline // Zone de texte sur plusieurs lignes
            placeholder="Bonjour, je suis étudiant en L2 et souhaiterais visiter le logement..."
          />

          <View style={styles.bas} /* Bouton et mention, à la fin du formulaire */>
            <Bouton
              libelle="Envoyer la demande"
              icone="send-outline"
              positionIcone="fin"
              onPress={() => void handleSubmit(envoyer)()} // handleSubmit valide d'abord ; envoyer n'est appelée que si tout est juste
            />
            <Texte variante="legende" couleur="texteSecondaire" style={styles.centre}>
              En confirmant, vous acceptez les règles de bienséance et de visite du campus.
            </Texte>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Ecran>
  ); // Fin du rendu
}

const styles = StyleSheet.create({
  // Styles créés une seule fois
  plein: { flex: 1 }, // Toute la hauteur sous l'en-tête
  contenu: { gap: espacements.l, paddingTop: espacements.m, paddingBottom: espacements.m }, // Écart l entre les blocs
  encart: {
    // Cadre « Visite gratuite »
    flexDirection: "row", // Icône puis texte
    gap: espacements.s + espacements.xs, // 12 dp
    padding: espacements.m - 1, // Marge m moins le contour
    borderWidth: 1, // Contour de 1
    borderRadius: rayons.moyen, // Rayon moyen
  }, // Fin de l'encart
  groupe: { gap: espacements.s + espacements.xs }, // Champ puis pastilles, 12 dp
  bas: { gap: espacements.s }, // Bouton puis mention
  extensible: { flex: 1 }, // Le texte passe à la ligne
  centre: { textAlign: "center" }, // Mention centrée
  introuvable: { paddingTop: espacements.m }, // Air sous l'en-tête
}); // Fin des styles
