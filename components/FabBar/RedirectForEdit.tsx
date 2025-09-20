import { Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Href, router } from "expo-router";

interface RedirectForEditProps {
  id: number;
  itemType: "book" | "author" | "editor";
}

export default function RedirectForEdit({
  id,
  itemType,
}: RedirectForEditProps) {
  const url: Record<typeof itemType, Href> = {
    book: `/book/${id}/bookEdit`,
    author: `/author/${id}/authorEdit`,
    editor: `/editor/${id}/editorEdit`,
  };

  const accessibilityHint = {
    book: "Modifier le livre",
    author: "Modifier l'auteur",
    editor: "Modifier l'éditeur",
  };

  return (
    <Pressable
      style={styles.fabButton}
      onPress={() => router.push(url[itemType])}
    >
      <MaterialIcons
        name="edit"
        size={24}
        color="white"
        accessibilityHint={accessibilityHint[itemType]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fabButton: {
    backgroundColor: "green",
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
