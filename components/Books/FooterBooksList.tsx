import { Book } from "@/types/Book";
import { PaginatedResponse } from "@/types/paginatedType";
import { Pressable, Text } from "react-native";

export default function FooterBooksList({
  page,
  setPage,
  data,
}: {
  page: number;
  setPage: Function;
  data: PaginatedResponse<Book>;
}) {
  return (
    data.view?.next && (
      <Pressable onPress={() => setPage(page + 1)}>
        <Text className="text-blue-500, text-center, font-bold, size-5">
          Charger plus de livres
        </Text>
      </Pressable>
    )
  );
}
