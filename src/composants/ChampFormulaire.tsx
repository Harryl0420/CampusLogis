import type { ComponentProps } from "react"; // Type des props d'un composant existant
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"; // Liaison entre un champ et le formulaire
import { ChampSaisie } from "./ChampSaisie"; // Le composant de la maquette

type PropsChamp = ComponentProps<typeof ChampSaisie>; // Toutes les props de ChampSaisie

type Props<T extends FieldValues> = Omit<PropsChamp, "valeur" | "etat" | "message" | "onChangeText" | "onBlur"> & {
  // Le formulaire fournit ces cinq props
  control: Control<T>; // L'objet control renvoyé par useForm
  nom: Path<T>; // Nom du champ dans le schéma, par exemple "date"
}; // Fin des props

// Un ChampSaisie relié à React Hook Form : valeur, saisie, sortie du champ et message d'erreur sont gérés par le formulaire
export function ChampFormulaire<T extends FieldValues>({ control, nom, ...autres }: Props<T>) {
  // Composant générique : il s'adapte au type de chaque formulaire
  return (
    // Controller fait le lien entre le formulaire et un composant qui n'est pas un champ HTML
    <Controller
      control={control} // Le formulaire auquel appartient le champ
      name={nom} // La clé du champ dans les valeurs du formulaire
      render={({ field, fieldState }) => (
        // field : valeur et fonctions du champ ; fieldState : son erreur éventuelle
        <ChampSaisie
          {...autres} // etiquette, placeholder, keyboardType, icones...
          valeur={typeof field.value === "string" ? field.value : ""} // Calque Valeur : le texte gardé par le formulaire
          onChangeText={field.onChange} // Chaque frappe met à jour la valeur du formulaire
          onBlur={field.onBlur} // En quittant le champ, le formulaire le marque comme touché et le valide
          etat={fieldState.error ? "erreur" : "normal"} // État Erreur de la maquette si la règle n'est pas respectée
          message={fieldState.error?.message} // Calque Message : le texte écrit dans le schéma Zod
        />
      )}
    />
  ); // Fin du rendu
}
