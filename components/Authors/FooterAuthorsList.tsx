import { Author } from "@/types/Author";
import { PaginatedResponse } from "@/types/paginatedType";
import { Pressable, Text } from "react-native";

export default function FooterAuthorsList({
  page,
  setPage,
  data,
}: {
  page: number;
  setPage: Function;
  data: PaginatedResponse<Author>;
}) {
  return (
    data.view?.next && (
      <Pressable onPress={() => setPage(page + 1)}>
        <Text className="text-blue-500, text-center, px-4">
          Charger plus d'auteurs
        </Text>
      </Pressable>
    )
  );
}
