// Vérificateur de la convention du cours (TP3, étapes 14 et 15) : lancé par « npm run verifier »
// ERREUR : règle non respectée, la commande échoue. À VÉRIFIER : point à examiner, la commande réussit.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"; // Lecture des fichiers
import { join, relative, sep } from "node:path"; // Chemins de fichiers

const racine = process.cwd(); // Dossier du projet (là où l'on tape la commande)
const src = join(racine, "src"); // Le code de l'application
const erreurs = []; // Règles non respectées
const aVerifier = []; // Points à examiner

// Parcourt un dossier et renvoie tous ses fichiers .ts et .tsx
function fichiers(dossier) {
  if (!existsSync(dossier)) return []; // Dossier absent : aucun fichier
  return readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom); // Chemin complet
    if (statSync(chemin).isDirectory()) return fichiers(chemin); // Sous-dossier : on descend
    return /\.(ts|tsx)$/.test(nom) ? [chemin] : []; // On garde seulement le code TypeScript
  });
}

const rel = (chemin) => relative(racine, chemin).split(sep).join("/"); // Chemin lisible : src/app/index.tsx
const signaler = (liste, chemin, ligne, message) => liste.push(`${rel(chemin)}${ligne ? `:${ligne}` : ""}  ${message}`);

// 1. Les trois composants de la convention et leurs props (noms de la maquette)
const convention = {
  Bouton: ["libelle", "type", "etat"],
  ChampSaisie: ["etiquette", "valeur", "etat", "message"],
  Carte: ["titre", "info", "photo", "action"],
};
for (const [nom, props] of Object.entries(convention)) {
  const chemin = join(src, "composants", `${nom}.tsx`); // src/composants/Bouton.tsx...
  if (!existsSync(chemin)) {
    signaler(aVerifier, chemin, 0, `composant ${nom} absent (convention du cours)`);
    continue;
  }
  const code = readFileSync(chemin, "utf8");
  if (!new RegExp(`export function ${nom}\\b`).test(code))
    signaler(erreurs, chemin, 0, `doit exporter la fonction ${nom}`);
  for (const p of props) {
    if (!new RegExp(`\\b${p}\\??:`).test(code)) signaler(erreurs, chemin, 0, `prop « ${p} » absente du type Props`);
  }
}

// 2. Règles ligne par ligne sur tout le dossier src
const interdits = [
  // Erreurs fréquentes du tableau de l'étape 14, partie 5
  [/\bTouchableOpacity\b/, "TouchableOpacity : utiliser Pressable ou le composant Bouton"],
  [
    /import\s*\{[^}]*\bSafeAreaView\b[^}]*\}\s*from\s*["']react-native["']/,
    "SafeAreaView de react-native : utiliser le composant Ecran",
  ],
  [/\bas any\b/, "« as any » cache l'erreur : corriger le type"],
  [/@ts-ignore|@ts-expect-error/, "commentaire qui fait taire TypeScript : corriger le type"],
  [/key=\{(index|i|idx)\}/, "key={index} : utiliser l'identifiant de l'élément"],
  [/fontWeight\s*:\s*["']bold["']/, 'fontWeight "bold" : utiliser le composant Texte'],
  [/from\s*["']@react-navigation\//, "React Navigation installé à part : utiliser expo-router"],
  [
    /from\s*["'](nativewind|react-native-paper|styled-components)/,
    "bibliothèque de style étrangère : utiliser StyleSheet et tokens.ts",
  ],
];
for (const chemin of fichiers(src)) {
  const r = rel(chemin); // Chemin lisible
  const dansTheme = r.startsWith("src/theme/"); // Le thème est la seule source des valeurs
  const estEcran = /^src\/(app|features\/[^/]+\/ecrans)\//.test(r); // Écrans et routes
  const feature = r.match(/^src\/features\/([^/]+)\//)?.[1]; // Fonctionnalité du fichier, s'il y en a une
  const lignes = readFileSync(chemin, "utf8").split(/\r?\n/);
  lignes.forEach((texte, i) => {
    const n = i + 1; // Numéro de ligne
    const code = texte.replace(/\/\/.*$/, ""); // On ignore les commentaires de fin de ligne
    for (const [motif, message] of interdits) if (motif.test(code)) signaler(erreurs, chemin, n, message);
    const photoFactice = /couleurPhoto/.test(code); // Couleur de remplacement d'une photo : elle ne change pas avec le mode
    if (!dansTheme && /\b(margin|padding|gap|fontSize|borderRadius)\w*\s*:\s*[1-9]/.test(code)) {
      signaler(
        estEcran ? erreurs : aVerifier,
        chemin,
        n,
        "couleur écrite en hexadécimal : utiliser palette.xxx (useTheme)",
      );
    }
    if (!dansTheme && /\b(margin|padding|gap|fontSize|borderRadius)\w*\s*:\s*\d/.test(code)) {
      signaler(aVerifier, chemin, n, "valeur écrite en chiffres : utiliser espacements, rayons ou typographie");
    }
    if (/\bconsole\.log\(/.test(code))
      signaler(aVerifier, chemin, n, "console.log : ne jamais afficher une donnée saisie");
    if (/&&\s*</.test(code))
      signaler(aVerifier, chemin, n, "« condition && <Composant /> » : préférer « condition ? <Composant /> : null »");
    const imp = code.match(/from\s*["']@\/features\/([^/"']+)/); // Import d'une fonctionnalité par l'alias
    if (imp && feature && imp[1] !== feature)
      signaler(erreurs, chemin, n, `import depuis la fonctionnalité « ${imp[1]} » : interdit entre fonctionnalités`);
    if (imp && feature && imp[1] === feature)
      signaler(aVerifier, chemin, n, "dans sa propre fonctionnalité, importer avec un chemin relatif (../)");
  });
}

// 3. Routes minces : un fichier de src/app (sauf _layout) désigne seulement l'écran à afficher
for (const chemin of fichiers(join(src, "app"))) {
  if (/_layout\.tsx$/.test(chemin)) continue; // Le layout contient du vrai code
  const code = readFileSync(chemin, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "") // Sans commentaires de bloc
    .split(/\r?\n/)
    .map((l) => l.replace(/\/\/.*$/, "").trim()) // Sans commentaires de ligne
    .filter(Boolean); // Sans lignes vides
  if (!code.every((l) => /^export\s*\{[^}]*\}\s*from\s*["'][^"']+["'];?$/.test(l))) {
    signaler(
      erreurs,
      chemin,
      0,
      'route trop épaisse : le fichier doit seulement faire export { EcranX as default } from "@/features/..."',
    );
  }
}

// Bilan
for (const ligne of aVerifier) console.log(`À VÉRIFIER  ${ligne}`);
for (const ligne of erreurs) console.log(`ERREUR      ${ligne}`);
if (erreurs.length) {
  console.log(`\n${erreurs.length} erreur(s), ${aVerifier.length} point(s) à vérifier.`);
  process.exit(1); // Échec : la commande s'arrête en erreur
}
console.log(`\nConvention respectée. ${aVerifier.length} point(s) à vérifier.`);
