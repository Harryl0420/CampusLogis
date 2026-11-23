// Les types de données de la fonctionnalité « auth »
import type { ValeursInscription } from "./schemas"; // Type déduit du schéma de l'inscription

export type Role = ValeursInscription["role"]; // "etudiant" | "bailleur" : écrit une seule fois, dans le schéma
