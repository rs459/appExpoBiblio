import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { useBooksInfinite } from "@/hooks/useApi";
import LoaderPerso from "@/components/LoaderScreenLists";
import ErrorPerso from "@/components/ErrorScreenLists";
import Perso404 from "@/components/Perso404ScreenLists";
import FabBar from "@/components/FabBar/FabBar";
import ItemBooksList from "@/components/Books/ItemBooksList";

export default function BookListScreen() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBooksInfinite();

  if (isLoading) return <LoaderPerso message="Chargement des livres..." />;

  if (isError) return <ErrorPerso error={error} />;

  if (!data) return <Perso404 />;

  // Fusionner toutes les pages de résultats
  const allBooks = data.pages.flatMap((page) => page.items);

  return (
    <View className="flex flex-1 bg-gray-100">
      <Text className="text-2xl font-bold p-4">Bibliothèque</Text>

      <FlatList
        data={allBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemBooksList item={item} />}
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
            <Text>Aucun livre n'a été trouvé.</Text>
          </View>
        }
      />
      <FabBar itemType="book" />
    </View>
  );
}
