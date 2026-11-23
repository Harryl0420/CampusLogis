import { z } from "zod"; // Bibliothèque de validation
import { champTelephone } from "@/utils/validation"; // Règle partagée du numéro de téléphone

// Schéma de l'écran 3. Inscription : la forme attendue des données, règle par règle
export const schemaInscription = z.object({
  role: z.enum(["etudiant", "bailleur"]), // Une des deux cartes « Vous êtes ? » (valeurs techniques, sans accent)
  nom: z.string().trim().min(2, "Entrez votre nom complet"), // Au moins deux caractères, espaces du début et de la fin retirés
  telephone: champTelephone, // 9 chiffres commençant par 6, avec ou sans espaces ni +237
  motDePasse: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"), // Longueur minimale
}); // Fin du schéma

export type ValeursInscription = z.infer<typeof schemaInscription>; // Type déduit du schéma, jamais écrit à la main
