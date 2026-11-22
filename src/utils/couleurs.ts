// Ajoute une opacité à une couleur #RRGGBB, comme le réglage d'opacité d'un remplissage dans Figma
export function avecOpacite(couleur: string, opacite: number): string {
  // opacite va de 0 (transparent) à 1 (opaque)
  const alpha = Math.round(opacite * 255); // Conversion vers une valeur de 0 à 255
  return couleur + alpha.toString(16).padStart(2, "0").toUpperCase(); // Format #RRGGBBAA, compris par React Native
}
