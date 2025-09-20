import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { useAuthor } from "@/hooks/useApi";
import { Link, useLocalSearchParams } from "expo-router";

export default function book() {
  const { authorId } = useLocalSearchParams();

  const {
    data: author,
    isLoading,
    isError,
    error,
  } = useAuthor(Number(authorId));

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Chargement de l'auteur...</Text>
      </View>
    );
  }

  if (isError) {
    return <Text>Erreur: {error.message}</Text>;
  }

  if (!author) {
    return <Text>Aucun éditeur trouvé.</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        {author.firstName} {author.lastName}
      </Text>

      <View style={{}}>
        <Text></Text>
      </View>
    </View>
  );
}
