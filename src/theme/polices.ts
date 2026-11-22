// Correspondance entre la graisse d'un style de texte (tokens.ts) et le fichier de police Roboto chargé dans _layout.tsx
export const polices = {
  // Une police personnalisée se désigne par le nom de son fichier, pas par fontWeight
  "400": "Roboto_400Regular", // Regular : styles Corps et Légende
  "600": "Roboto_600SemiBold", // SemiBold : style Sous-titre
  "700": "Roboto_700Bold", // Bold : styles Titre et Libellé
} as const; // Valeurs figées : TypeScript connaît chaque nom
export type Graisse = keyof typeof polices; // "400" | "600" | "700"
