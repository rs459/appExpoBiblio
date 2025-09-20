import { Book } from "@/types/Book";
import { router } from "expo-router";
import { Pressable, Image, View, Text } from "react-native";

export default function ItemBooksList({ item }: { item: Book }) {
  return (
    <Pressable
      className="flex flex-row items-center"
      onPress={() => router.push(`/book/${item.id}`)}
    >
      <Image
        source={{
          uri: item.image,
        }}
        className="w-[100] h-[150] rounded-lg m-3"
      />
      <View className="flex">
        <Text className="font-bold">{item.title}</Text>
        <Text className="text-sm color-gray-500 mt-1">
          {item.author.firstName} {item.author.lastName}
        </Text>
      </View>
    </Pressable>
  );
}
