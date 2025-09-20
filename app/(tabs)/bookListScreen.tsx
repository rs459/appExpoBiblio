import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  AccessibilityInfo,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useBooks } from "@/hooks/useApi";
import { router } from "expo-router";
import { Book } from "@/types/Book";
import LoaderPerso from "@/components/LoaderScreenLists";
import ErrorPerso from "@/components/ErrorScreenLists";
import Perso404 from "@/components/Perso404ScreenLists";
import { PaginatedResponse } from "@/types/paginatedType";
import FabBar from "@/components/FabBar/FabBar";

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
    <View style={styles.container}>
      <Text style={styles.header}>Bibliothèque</Text>

      <FlatList
        data={allBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderItemComp item={item} />}
        ListFooterComponent={
          <FooterForList page={page} data={data} setPage={setPage} />
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text>Aucun livre n'a été trouvé.</Text>
          </View>
        }
      />
      <FabBar itemType="book" />
    </View>
  );
}

const RenderItemComp = ({ item }: { item: Book }) => {
  return (
    <Pressable
      style={styles.itemContainer}
      onPress={() => router.push(`/book/${item.id}`)}
    >
      <Image
        source={{
          uri: item.image,
        }}
        style={{ width: 75, height: 100 }}
      />
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemAuthor}>
          {item.author.firstName} {item.author.lastName}
        </Text>
      </View>
    </Pressable>
  );
};

const FooterForList = ({
  page,
  setPage,
  data,
}: {
  page: number;
  setPage: Function;
  data: PaginatedResponse<Book>;
}) => {
  return (
    data.view?.next && (
      <Pressable onPress={() => setPage(page + 1)}>
        <Text
          style={{
            paddingVertical: 16,
            textAlign: "center",
            color: "blue",
          }}
        >
          Charger plus de livres
        </Text>
      </Pressable>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: "white",
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 16,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  itemAuthor: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});
