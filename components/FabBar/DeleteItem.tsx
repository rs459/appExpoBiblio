import { Alert, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import {
//   useDeleteAuthor,
//   useDeleteBook,
//   useDeleteEditor,
// } from "@/hooks/useApi";

interface DeleteItemProps {
  id: number;
  itemType: "book" | "author" | "editor";
}

export default function DeleteItem({ id, itemType }: DeleteItemProps) {
  //   const deleteBookMutation = useDeleteBook();
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
              onPress: () => console.log("Oui"),
            },
            {
              text: "Non",
              onPress: () => console.log("Non"),
              style: "cancel",
            },
          ]
        );
        // deleteBookMutation.mutate(id, {
        //   onSuccess: () => {
        //     router.back();
        //   },
        // });
        break;
      case "author":
        // Alert.alert(
        //   "Confirmation de suppresion",
        //   "Êtes-vous sûr de vouloir supprimer cet auteur ?"
        // );
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
        // deleteAuthorMutation.mutate(id, {
        //   onSuccess: () => {
        //     router.back();
        //   },
        // });
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
        // deleteEditorMutation.mutate(id, {
        //   onSuccess: () => {
        //     router.back();
        //   },
        // });
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
    <Pressable style={styles.fabButton} onPress={handleDelete}>
      <MaterialIcons
        name="delete"
        size={24}
        color="white"
        accessibilityHint={`${message[itemType]}`}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fabButton: {
    backgroundColor: "red",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
});
