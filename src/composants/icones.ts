import type { Ionicons } from "@expo/vector-icons"; // Jeu d'icônes Ionicons, inclus dans Expo
import type { ComponentProps } from "react"; // Outil qui lit les props d'un composant

export type NomIcone = ComponentProps<typeof Ionicons>["name"]; // Nom d'une icône Ionicons : TypeScript refuse un nom qui n'existe pas
