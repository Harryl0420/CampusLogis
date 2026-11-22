// Affiche une distance : 350 devient « 350 m », 1500 devient « 1,5 km »
export function formaterDistance(metres: number): string {
  // metres : distance en mètres
  if (metres < 1000) return `${Math.round(metres)}\u00A0m`; // Moins d'un kilomètre : en mètres
  return `${(metres / 1000).toFixed(1).replace(".", ",")}\u00A0km`; // Sinon en kilomètres, virgule française
}
