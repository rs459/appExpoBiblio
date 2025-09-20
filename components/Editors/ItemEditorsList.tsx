import { Editor } from "@/types/Editor";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";

export default function ItemEditorsList({ item }: { item: Editor }) {
  return (
    <Pressable
      className="flex items-start p-4"
      onPress={() => router.push(`/editor/${item.id}`)}
    >
      <Text className="text-lg p-4">{item.name}</Text>
    </Pressable>
  );
}
