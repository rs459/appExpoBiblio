import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useAuthorsInfinite } from "@/hooks/useApi";
import ErrorPerso from "@/components/ErrorScreenLists";
import Perso404 from "@/components/Perso404ScreenLists";
import LoaderPerso from "@/components/LoaderScreenLists";
import FabBar from "@/components/FabBar/FabBar";
import ItemAuthorsList from "@/components/Authors/ItemAuthorsList";

export default function AuthorList() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAuthorsInfinite();

  if (isLoading) return <LoaderPerso message="Chargement des auteurs..." />;

  if (isError) return <ErrorPerso error={error} />;

  if (!data) return <Perso404 />;

  // Fusionner toutes les pages de résultats
  const allAuthors = data.pages.flatMap((page) => page.items);

  return (
    <View className="flex flex-1 bg-gray-100">
      <Text className="text-2xl font-bold p-4">Liste des auteurs</Text>
      <FlatList
        data={allAuthors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemAuthorsList item={item} />}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-4">
              <ActivityIndicator size="large" color="#3b82f6" />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View className="items-center p-4">
            <Text>Aucun auteur n'a été trouvé.</Text>
          </View>
        }
      />
      <FabBar itemType="author" />
    </View>
  );
}
