import { Author } from "@/types/Author";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function ItemAuthorsList({ item }: { item: Author }) {
  return (
    <Pressable
      onPress={() => router.push(`/author/${item.id}`)}
      className="mx-4 mb-2 bg-white p-4 border-b border-gray-200"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">
            {item.firstName} {item.lastName}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">Auteur</Text>
        </View>
        <Text className="text-gray-400 text-xl">›</Text>
      </View>
    </Pressable>
  );
}
