import { useEffect, useState } from "react"; // Effet de bord et état local
import { Keyboard } from "react-native"; // Événements du clavier virtuel

// Hook personnalisé : vrai tant que le clavier virtuel est affiché
export function useClavierVisible(): boolean {
  // Renvoie un simple booléen
  const [visible, setVisible] = useState(false); // Le clavier est fermé au départ
  useEffect(() => {
    // S'exécute après le premier affichage de l'écran
    const ouverture = Keyboard.addListener("keyboardDidShow", () => setVisible(true)); // Le clavier vient de s'ouvrir
    const fermeture = Keyboard.addListener("keyboardDidHide", () => setVisible(false)); // Le clavier vient de se fermer
    return () => {
      // Nettoyage : appelé quand l'écran disparaît
      ouverture.remove(); // On cesse d'écouter l'ouverture
      fermeture.remove(); // On cesse d'écouter la fermeture
    }; // Fin du nettoyage
  }, []); // Tableau vide : l'abonnement n'est créé qu'une fois
  return visible; // L'écran décide quoi faire de cette information
}
