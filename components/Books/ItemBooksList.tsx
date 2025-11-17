import { Book } from "@/types/Book";
import { router } from "expo-router";
import { Pressable, Image, View, Text } from "react-native";

export default function ItemBooksList({ item }: { item: Book }) {
  return (
    <Pressable
      className="flex-row bg-white p-3 mx-4 mb-2 border-b border-gray-200"
      onPress={() => router.push(`/book/${item.id}`)}
    >
      <Image
        source={{
          uri: item.image,
        }}
        className="w-16 h-24 rounded mr-3"
      />
      <View className="flex-1">
        <Text className="font-semibold text-base">{item.title}</Text>
        <Text className="text-sm text-gray-500 mt-1">
          {item.author.firstName} {item.author.lastName}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-xs text-gray-500">{item.pages} pages</Text>
          {item.editor && (
            <>
              <Text className="text-xs text-gray-400 mx-2">•</Text>
              <Text className="text-xs text-gray-500">{item.editor.name}</Text>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
}
