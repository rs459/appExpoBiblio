import { Alert, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDeleteBook } from "@/hooks/useApi";
import { router } from "expo-router";

interface DeleteItemProps {
  id: number;
  itemType: "book" | "author" | "editor";
}

export default function DeleteItem({ id, itemType }: DeleteItemProps) {
  const deleteBookMutation = useDeleteBook();
  //   const deleteAuthorMutation = useDeleteAuthor();
  //   const deleteEditorMutation = useDeleteEditor();

  const handleDelete = () => {
    switch (itemType) {
      case "book":
        Alert.alert(
          "Suppresion d'un livre",
          "Voulez vous supprimer ce livre ?",
          [
            {
              text: "Oui",
              onPress: () => {
                deleteBookMutation.mutate(id, {
                  onSuccess: () => {
                    router.back();
                  },
                });
              },
            },
            {
              text: "Non",
              style: "cancel",
            },
          ]
        );

        break;
      case "author":
        Alert.alert(
          "Suppresion d'un auteur",
          "Voulez vous supprimer cet auteur ?",
          [
            {
              text: "Oui",
              onPress: () => console.log("Oui"),
            },
            {
              text: "Non",
              onPress: () => console.log("Non"),
              style: "cancel",
            },
          ]
        );
        break;
      case "editor":
        Alert.alert(
          "Suppresion d'un éditeur",
          "Voulez vous supprimer cet éditeur ?",
          [
            {
              text: "Oui",
              onPress: () => console.log("Oui"),
            },
            {
              text: "Non",
              onPress: () => console.log("Non"),
              style: "cancel",
            },
          ]
        );
        break;
      default:
        break;
    }
  };

  const message = {
    book: "Supprimer ce livre",
    author: "Supprimer cet auteur",
    editor: "Supprimer cet éditeur",
  };

  return (
    <Pressable
      className="h-[50] w-[50] rounded-full bg-red-500 items-center justify-center"
      onPress={handleDelete}
    >
      <MaterialIcons
        name="delete"
        size={24}
        color="white"
        accessibilityHint={`${message[itemType]}`}
      />
    </Pressable>
  );
}
