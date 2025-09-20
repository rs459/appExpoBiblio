import { Pressable, Text } from "react-native";
import { PaginatedResponse } from "@/types/paginatedType";
import { Editor } from "@/types/Editor";

export default function FooterEditorsList({
  page,
  setPage,
  data,
}: {
  page: number;
  setPage: Function;
  data: PaginatedResponse<Editor>;
}) {
  return (
    data.view?.next && (
      <Pressable onPress={() => setPage(page + 1)}>
        <Text className="text-blue-500, text-center, font-bold, size-5">
          Charger plus d'auteur
        </Text>
      </Pressable>
    )
  );
}
