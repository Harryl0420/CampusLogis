import { z } from "zod"; // Bibliothèque de validation
import { creneauxVisite } from "./constantes"; // Créneaux proposés

// Transforme « 25/11/2026 » en date, ou null si le jour n'existe pas (31/02/2026 par exemple)
function lireDate(texte: string): Date | null {
  const [jour, mois, annee] = texte.split("/").map(Number); // Trois nombres : jour, mois, année
  const date = new Date(annee, mois - 1, jour); // En JavaScript, janvier est le mois 0
  const existe = date.getFullYear() === annee && date.getMonth() === mois - 1 && date.getDate() === jour; // Le 31/02 deviendrait le 03/03 : on le refuse
  return existe ? date : null; // La date, ou null
}

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
