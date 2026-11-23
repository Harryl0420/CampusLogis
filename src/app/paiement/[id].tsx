// Route dynamique « /paiement/[id] » : hors du groupe (onglets), elle s'affiche par-dessus les onglets, sans barre
export { EcranPaiement as default } from "@/features/logements/ecrans/EcranPaiement"; // L'écran lit id, date et créneau avec useLocalSearchParams
