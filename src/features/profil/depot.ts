import { utilisateur } from "./donnees"; // Données fictives de la séance 4

// Le dépôt du profil : seul fichier qui sait d'où vient l'utilisateur ; à la séance 5, ce sera celui qui s'est connecté
export function lireUtilisateur() {
  // L'utilisateur affiché sur l'écran 8. Profil
  return utilisateur; // Pour l'instant, l'utilisateur fictif
}