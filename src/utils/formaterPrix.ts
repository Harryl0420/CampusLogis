// Affiche un prix en francs CFA avec une espace entre les milliers : 45000 devient « 45 000 FCFA »
export function formaterPrix(montant: number): string {
  // montant : nombre entier de francs CFA
  const chiffres = String(Math.round(montant)); // "45000"
  const groupes = chiffres.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0"); // Espace insécable tous les trois chiffres en partant de la droite
  return `${groupes}\u00A0FCFA`; // L'espace insécable empêche « FCFA » de passer seul à la ligne
}
