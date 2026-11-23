import { z } from "zod"; // Bibliothèque de validation
import { lireDate } from "@/utils/dates"; // Lecture d'une date JJ/MM/AAAA
import { champTelephone } from "@/utils/validation"; // Règle partagée du numéro de téléphone
import { creneauxVisite } from "./constantes"; // Créneaux proposés

// Vrai si la date est aujourd'hui ou plus tard
function pasDansLePasse(texte: string): boolean {
  const date = lireDate(texte); // Date saisie
  const aujourdhui = new Date(); // Maintenant
  aujourdhui.setHours(0, 0, 0, 0); // Début de la journée : aujourd'hui est accepté
  return date !== null && date >= aujourdhui; // Une date inexistante est refusée par la règle précédente
}

// Schéma de l'écran 6. Formulaire « Demande de visite » : une règle par champ, avec le message du calque Message
export const schemaDemandeVisite = z.object({
  date: z // Champ obligatoire de la maquette
    .string() // Texte saisi
    .trim() // Espaces du début et de la fin retirés
    .min(1, "Indiquez la date souhaitée pour la visite") // Champ vide
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Écrivez la date sous la forme JJ/MM/AAAA, par exemple 25/11/2026") // Format
    .refine((valeur) => lireDate(valeur) !== null, "Cette date n'existe pas. Vérifiez le jour et le mois.") // 31/02 refusé
    .refine(pasDansLePasse, "Cette date est déjà passée. Veuillez choisir une date future."), // Message de la maquette
  creneau: z // Rempli par les pastilles
    .string() // Créneau choisi
    .refine((valeur) => creneauxVisite.some((c) => c === valeur), "Choisissez un créneau horaire"), // Un des créneaux proposés
  message: z.string().trim().max(300, "Votre message ne doit pas dépasser 300 caractères"), // Optionnel
}); // Fin du schéma

export type ValeursDemandeVisite = z.infer<typeof schemaDemandeVisite>; // Type déduit du schéma

// Schéma de l'écran 7. Paiement : l'opérateur choisi et le numéro à débiter
export const schemaPaiement = z.object({
  operateur: z.enum(["mtn", "orange"]), // Une des deux lignes de la maquette
  numero: champTelephone, // Même règle que l'inscription, écrite une seule fois dans src/utils/validation.ts
}); // Fin du schéma

export type ValeursPaiement = z.infer<typeof schemaPaiement>; // { operateur: "mtn" | "orange"; numero: string }
