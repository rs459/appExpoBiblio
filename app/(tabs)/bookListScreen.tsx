import { View, Text, FlatList, AccessibilityInfo } from "react-native";
import React, { useEffect, useState } from "react";
import { useBooks } from "@/hooks/useApi";
import { Book } from "@/types/Book";
import LoaderPerso from "@/components/LoaderScreenLists";
import ErrorPerso from "@/components/ErrorScreenLists";
import Perso404 from "@/components/Perso404ScreenLists";
import FabBar from "@/components/FabBar/FabBar";
import ItemBooksList from "@/components/Books/ItemBooksList";
import FooterBooksList from "@/components/Books/FooterBooksList";

export default function BookListScreen() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useBooks(page);
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (data && data.items && page > 1) {
      setAllBooks((prevBooks) => [...prevBooks, ...data.items]);
      AccessibilityInfo.announceForAccessibility(
        data.items.length + "Livres ajoutées à la liste"
      );
    } else if (data && data.items) {
      setAllBooks(data.items);
    }
  }, [data]);

  if (isLoading) return <LoaderPerso message="Chargement des livres..." />;

  if (isError) return <ErrorPerso error={error} />;

  if (!data) return <Perso404 />;

  return (
    <View className="flex flex-1 bg-gray-100">
      <Text className="text-2xl font-bold p-4">Bibliothèque</Text>

      <FlatList
        data={allBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemBooksList item={item} />}
        ListFooterComponent={
          <FooterBooksList page={page} data={data} setPage={setPage} />
        }
        ListEmptyComponent={
          <View className="text-center">
            <Text>Aucun livre n'a été trouvé.</Text>
          </View>
        }
      />
      <FabBar itemType="book" />
    </View>
  );
}
