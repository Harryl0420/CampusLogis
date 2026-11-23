// Couleurs qui restent identiques en mode clair et en mode sombre : elles ne passent donc pas par la palette
export const couleursFixes = {
  // Seul endroit, avec tokens.ts, où une couleur s'écrit en hexadécimal
  avatar: "#F4C7D6", // Photo factice du profil (rose pâle de CampusLogis)
  voilePhoto: "#000000", // Voile sombre posé sur le bas d'une photo, pour lire le texte blanc
  texteSurPhoto: "#FFFFFF", // Texte écrit sur une photo : blanc dans les deux modes
} as const; // Valeurs figées : TypeScript connaît chaque nom
