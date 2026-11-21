// Configuration d'ESLint (format « flat config ») : règles d'Expo, puis Prettier pour la mise en forme
const { defineConfig } = require("eslint/config"); // Fonction d'aide d'ESLint
const expoConfig = require("eslint-config-expo/flat"); // Règles recommandées par Expo (React, hooks, imports)
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended"); // Signale tout écart avec Prettier
module.exports = defineConfig([
  // Les configurations s'appliquent dans l'ordre
  expoConfig, // 1. Règles d'Expo
  eslintPluginPrettierRecommended, // 2. Mise en forme vérifiée par Prettier
  { ignores: ["dist/*"] }, // 3. Dossiers à ne pas analyser
]); // Fin de la configuration
