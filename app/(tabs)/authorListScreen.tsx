import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useAuthors } from "@/hooks/useApi";
import ErrorPerso from "@/components/ErrorScreenLists";
import Perso404 from "@/components/Perso404ScreenLists";
import LoaderPerso from "@/components/LoaderScreenLists";
import FabBar from "@/components/FabBar/FabBar";
import { Author } from "@/types/Author";
import ItemAuthorsList from "@/components/Authors/ItemAuthorsList";
import FooterAuthorsList from "@/components/Authors/FooterAuthorsList";

export default function authorList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useAuthors(page);
  const [allAuthors, setAllAuthors] = useState<Author[]>([]);

  useEffect(() => {
    if (data && data.items && page > 1) {
      setAllAuthors((prevAuthors) => [...prevAuthors, ...data.items]);
    } else if (data && data.items) {
      setAllAuthors(data.items);
    }
  }, [data]);

  if (isLoading) return <LoaderPerso message="Chargement des auteurs..." />;

  if (isError) return <ErrorPerso error={error} />;

  if (!data) return <Perso404 />;

  return (
    <View className="flex flex-1 bg-gray-100">
      <Text className="text-2xl font-bold p-4">Liste des auteurs</Text>
      <FlatList
        data={allAuthors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemAuthorsList item={item} />}
        ListFooterComponent={
          <FooterAuthorsList page={page} data={data} setPage={setPage} />
        }
        ListEmptyComponent={<Text>Aucun auteur n'a été trouvé.</Text>}
      />
      <FabBar itemType="author" />
    </View>
  );
}
