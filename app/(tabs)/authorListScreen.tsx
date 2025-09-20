import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useAuthors } from "@/hooks/useApi";
import { router } from "expo-router";
import ErrorPerso from "@/components/ErrorScreenLists";
import Perso404 from "@/components/Perso404ScreenLists";
import LoaderPerso from "@/components/LoaderScreenLists";
import RedirectForCreate from "@/components/FabBar/RedirectForCreate";
import FabBar from "@/components/FabBar/FabBar";
import { PaginatedResponse } from "@/types/paginatedType";
import { Author } from "@/types/Author";

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
    <View style={styles.container}>
      <Text style={styles.header}>Liste des auteurs</Text>
      <FlatList
        data={allAuthors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderItemComp item={item} />}
        ListFooterComponent={
          <FooterForList page={page} data={data} setPage={setPage} />
        }
        ListEmptyComponent={<Text>Aucun auteur n'a été trouvé.</Text>}
      />
      <FabBar itemType="author" />
    </View>
  );
}

const RenderItemComp = ({ item }: { item: Author }) => {
  return (
    <Pressable onPress={() => router.push(`/author/${item.id}`)}>
      <Text style={styles.item}>
        {item.firstName} {item.lastName}
      </Text>
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
  data: PaginatedResponse<Author>;
}) =>
  data.view?.next && (
    <Pressable onPress={() => setPage(page + 1)}>
      <Text
        style={{
          paddingVertical: 16,
          textAlign: "center",
          color: "blue",
        }}
      >
        Charger plus d'auteurs
      </Text>
    </Pressable>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  item: {
    fontSize: 18,
    fontWeight: "500",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
