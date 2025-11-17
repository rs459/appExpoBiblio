import { Editor } from "@/types/Editor";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ItemEditorsList({ item }: { item: Editor }) {
  return (
    <Pressable
      onPress={() => router.push(`/editor/${item.id}`)}
      className="mx-4 mb-2 bg-white p-4 border-b border-gray-200"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">
            {item.name}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">Éditeur</Text>
        </View>
        <Text className="text-gray-400 text-xl">›</Text>
      </View>
    </Pressable>
  );
}
