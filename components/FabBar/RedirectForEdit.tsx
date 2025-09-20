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
      className="h-[50] w-[50] rounded-full bg-green-800 items-center justify-center"
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
