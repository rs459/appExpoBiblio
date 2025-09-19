import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import { useEditors } from "@/hooks/useApi";

export default function EditorList() {
  const { data: editors, isLoading, isError, error } = useEditors();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Chargement des éditeurs...</Text>
      </View>
    );
  }

  if (isError) {
    return <Text>Erreur: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des Editeurs</Text>
      <FlatList
        data={editors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
        ListEmptyComponent={<Text>Aucun éditeur n'a été trouvé.</Text>}
      />
    </View>
  );
}

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
