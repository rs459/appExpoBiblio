import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useAuthors } from "@/hooks/useApi";

export default function authorList() {
  const { data: authors, isLoading, isError, error } = useAuthors();

  if (isLoading) {
    return <Text>Chargement des auteurs...</Text>;
  }

  if (isError) {
    return <Text>Erreur: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des auteurs</Text>
      <FlatList
        data={authors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.firstName} {item.lastName}
          </Text>
        )}
        ListEmptyComponent={<Text>Aucun auteur n'a été trouvé.</Text>}
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
