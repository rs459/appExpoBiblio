import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useEditors } from "@/hooks/useApi";
import { Editor } from "@/types/Editor";
import { router } from "expo-router";
import LoaderPerso from "@/components/LoaderScreenLists";
import Perso404 from "@/components/Perso404ScreenLists";
import ErrorPerso from "@/components/ErrorScreenLists";
import { PaginatedResponse } from "@/types/paginatedType";

export default function EditorList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useEditors();
  const [allEditors, setAllEditors] = useState<Editor[]>([]);

  useEffect(() => {
    if (data && data.items && page > 1) {
      setAllEditors((prevEditors) => [...prevEditors, ...data.items]);
    } else if (data && data.items) {
      setAllEditors(data.items);
    }
  }, [data]);

  if (isLoading) return <LoaderPerso message="Chargement des éditeurs..." />;

  if (isError) return <ErrorPerso error={error} />;

  if (!data) return <Perso404 />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des Editeurs</Text>
      <FlatList
        data={allEditors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderItemComp item={item} />}
        ListFooterComponent={
          <FooterForList page={page} data={data} setPage={setPage} />
        }
        ListEmptyComponent={<Text>Aucun éditeur n'a été trouvé.</Text>}
      />
    </View>
  );
}

const RenderItemComp = ({ item }: { item: Editor }) => {
  return (
    <Pressable onPress={() => router.push(`/editor/${item.id}`)}>
      <Text style={styles.item}>{item.name}</Text>
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
  data: PaginatedResponse<Editor>;
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
          Charger plus d'auteurs
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
  },
  item: {
    fontSize: 18,
    fontWeight: "500",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
