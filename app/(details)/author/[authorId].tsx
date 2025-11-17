import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useAuthor } from "@/hooks/useApi";
import { useLocalSearchParams, router } from "expo-router";

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
    return <Text>Aucun auteur trouvé.</Text>;
  }

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-3xl font-bold text-center mb-6">
          {author.firstName} {author.lastName}
        </Text>

        {/* Section des livres */}
        {author.books && author.books.length > 0 && (
          <View className="mt-4">
            <Text className="text-lg font-semibold mb-3">
              Livres de cet auteur ({author.books.length})
            </Text>
            {author.books.map((book) => (
              <Pressable
                key={book.id}
                className="flex-row bg-white p-3 mb-2 border-b border-gray-200"
                onPress={() => router.push(`/book/${book.id}`)}
              >
                <Image
                  source={{ uri: book.image }}
                  className="w-16 h-24 rounded mr-3"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <Text className="font-semibold text-base">{book.title}</Text>
                  <Text
                    className="text-gray-600 text-sm mt-1"
                    numberOfLines={2}
                  >
                    {book.description}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-1">
                    {book.pages} pages
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {(!author.books || author.books.length === 0) && (
          <View className="mt-4 p-4 bg-gray-100 rounded-lg">
            <Text className="text-gray-600 text-center">
              Aucun livre de cet auteur dans votre bibliothèque
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
