import { Author } from "@/types/Author";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";

export default function ItemAuthorsList({ item }: { item: Author }) {
  return (
    <Pressable onPress={() => router.push(`/author/${item.id}`)}>
      <Text className="text-2xl font-bold p-4">
        {item.firstName} {item.lastName}
      </Text>
    </Pressable>
  );
}
