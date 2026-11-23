// Outils de date partagés : la saisie se fait au format JJ/MM/AAAA, l'affichage en toutes lettres

const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]; // getDay() : 0 = dimanche
const mois = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
]; // getMonth() : 0 = janvier

// Transforme « 25/11/2026 » en date, ou null si le jour n'existe pas (31/02/2026 par exemple)
export function lireDate(texte: string): Date | null {
  const [j, m, a] = texte.split("/").map(Number); // Trois nombres : jour, mois, année
  const date = new Date(a, m - 1, j); // En JavaScript, janvier est le mois 0
  const existe = date.getFullYear() === a && date.getMonth() === m - 1 && date.getDate() === j; // Le 31/02 deviendrait le 03/03 : on le refuse
  return existe ? date : null; // La date, ou null
}

// « 25/11/2026 » devient « Mercredi 25 novembre 2026 » ; un texte illisible est rendu tel quel
export function formaterDateLongue(texte: string): string {
  const date = lireDate(texte); // Date lue
  if (!date) return texte; // Rien à mettre en forme
  return `${jours[date.getDay()]} ${date.getDate()} ${mois[date.getMonth()]} ${date.getFullYear()}`; // Jour, numéro, mois, année
}
