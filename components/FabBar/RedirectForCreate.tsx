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
      className="h-[50] w-[50] rounded-full bg-blue-800 items-center justify-center"
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
