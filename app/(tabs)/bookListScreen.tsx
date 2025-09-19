import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useBooks } from "@/hooks/useApi";
import { router } from "expo-router";

export default function BookListScreen() {
  const { data: books, isLoading, isError, error } = useBooks();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Chargement des livres...</Text>
      </View>
    );
  }

  if (isError) {
    // Afficher l'erreur dans la console aide énormément au débogage.
    console.error("Erreur de chargement des livres:", error);
    return <Text>Erreur: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bibliothèque</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => router.push(`/book/${item.id}`)}
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text>Aucun livre n'a été trouvé.</Text>
          </View>
        }
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
    backgroundColor: "white",
  },
  itemContainer: {
    backgroundColor: "white",
    padding: 16,
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
