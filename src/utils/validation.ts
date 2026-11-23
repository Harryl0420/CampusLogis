import { z } from "zod"; // Bibliothèque de validation : on décrit la forme attendue des données, elle vérifie

// Retire les espaces et l'indicatif +237 : « +237 690 00 00 00 » devient « 690000000 »
export function nettoyerTelephone(valeur: string): string {
  return valeur.replace(/\s/g, "").replace(/^(\+?237)/, ""); // Le numéro local seul
}

// Règles de validation partagées par plusieurs fonctionnalités : écrites une seule fois pour toute l'application
export const champTelephone = z // Numéro camerounais, saisi avec ou sans espaces, avec ou sans +237
  .string() // Ce qu'on tape dans un champ est toujours un texte
  .min(1, "Indiquez votre numéro de téléphone") // Champ obligatoire
  .refine(
    (valeur) => /^6\d{8}$/.test(nettoyerTelephone(valeur)), // 9 chiffres commençant par 6
    "Le numéro doit contenir 9 chiffres et commencer par 6",
  ); // Fin de la règle
