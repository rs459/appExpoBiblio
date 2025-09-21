import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React from "react";
import { useAuthor } from "@/hooks/useApi";
import { useLocalSearchParams } from "expo-router";
import FabBar from "@/components/FabBar/FabBar";

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
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 16,
        }}
      >
        <Text className="text-2xl font-bold text-center mb-6">
          {author.firstName} {author.lastName}
        </Text>
        <FabBar id={author.id} itemType={"author"} />
      </ScrollView>
    </View>
  );
}
