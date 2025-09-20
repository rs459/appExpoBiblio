import { Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Href, router } from "expo-router";

interface RedirectForCreateProps {
  itemType: "book" | "author" | "editor";
}

export default function RedirectForCreate({
  itemType,
}: RedirectForCreateProps) {
  const accessibilityHint = {
    book: "Ajouter un livre",
    author: "Ajouter un auteur",
    editor: "Ajouter un éditeur",
  };

  const url: Record<typeof itemType, Href> = {
    book: `/book/bookCreate`,
    author: `/author/authorCreate`,
    editor: `/editor/editorCreate`,
  };

  return (
    <Pressable
      style={styles.fabButton}
      onPress={() => router.push(url[itemType])}
    >
      <MaterialIcons
        name="add"
        size={24}
        color="white"
        accessibilityHint={accessibilityHint[itemType]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fabButton: {
    backgroundColor: "black",
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
    shadowRadius: 3.84,
    elevation: 5,
  },
});
