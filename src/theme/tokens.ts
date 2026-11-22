// Les variables de la maquette Figma, recopiées telles quelles : seule source des couleurs, espacements, rayons et styles de texte
export const couleurs = {
  // Variables de la collection « Couleurs » de Figma
  clair: {
    // Groupe « clair » de la collection
    fond: "#FFFFFF", // Arrière-plan des écrans
    surface: "#F5F7F6", // Cartes, lignes de réglage, barre d'onglets
    texte: "#1A1A1A", // Texte principal
    texteSecondaire: "#5C6670", // Texte d'appoint (quartier, date)
    primaire: "#BE185D", // Boutons principaux et éléments actifs (rose CampusLogis)
    surPrimaire: "#FFFFFF", // Texte posé sur la couleur primaire
    teinte: "#FBE7EF", // Fond pâle des éléments mis en évidence
    bordure: "#D5DBD8", // Contours décoratifs des cartes
    contourChamp: "#7D8790", // Contour des champs
    erreur: "#C62828", // Messages et contours d'erreur
  }, // Fin du groupe clair
  sombre: {
    // Groupe « sombre » : mêmes noms, autres valeurs
    fond: "#121417", // Arrière-plan des écrans
    surface: "#1E2226", // Cartes, lignes de réglage, barre d'onglets
    texte: "#F2F4F5", // Texte principal
    texteSecondaire: "#9AA4AE", // Texte d'appoint
    primaire: "#F483B5", // Rose éclairci, lisible sur fond sombre
    surPrimaire: "#121417", // Texte foncé sur le rose clair
    teinte: "#35202A", // Fond pâle, version sombre
    bordure: "#2E353B", // Contours décoratifs des cartes
    contourChamp: "#8A949C", // Contour des champs
    erreur: "#EF6C6C", // Rouge éclairci pour le fond sombre
  }, // Fin du groupe sombre
} as const; // Valeurs figées : TypeScript connaît chaque nom

export const espacements = { xs: 4, s: 8, m: 16, l: 24, xl: 32 } as const; // Grille de 8 points (dp)
export const rayons = { petit: 8, moyen: 12, pilule: 999 } as const; // Arrondis (dp)

export const typographie = {
  // Styles de texte définis dans Figma
  titre: { fontSize: 24, fontWeight: "700", lineHeight: 32 }, // Titres d'écran
  sousTitre: { fontSize: 18, fontWeight: "600", lineHeight: 24 }, // Titres de section
  corps: { fontSize: 16, fontWeight: "400", lineHeight: 24 }, // Texte courant
  legende: { fontSize: 13, fontWeight: "400", lineHeight: 16 }, // Petits textes d'appoint
  libelle: { fontSize: 16, fontWeight: "700", lineHeight: 24 }, // Boutons et liens
} as const; // Fin des styles de texte

export const tailleTactileMin = 48; // Hauteur minimale d'une zone touchable, en dp
export type NomCouleur = keyof typeof couleurs.clair; // "fond" | "surface" | "texte"...
