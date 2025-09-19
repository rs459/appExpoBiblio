import { View, Text } from "react-native";
import React from "react";
import { useBook } from "@/hooks/useApi";
import { Link, useLocalSearchParams } from "expo-router";

export default function book() {
  const { id } = useLocalSearchParams();

  const { data: book, isLoading, isError, error } = useBook(Number(id));
  console.log(book);

  if (isLoading) {
    return <Text>Chargement du livre...</Text>;
  }

  if (isError) {
    return <Text>Erreur: {error.message}</Text>;
  }

  if (!book) {
    return <Text>Aucun livre trouvé.</Text>;
  }

  return (
    <View>
      <Link href="/bookListScreen">Retour à la liste des livres</Link>

      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{book.title}</Text>
      <Text>{book.description}</Text>
    </View>
  );
}
