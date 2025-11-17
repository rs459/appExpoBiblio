import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { useEditor } from "@/hooks/useApi";
import { useLocalSearchParams, router } from "expo-router";

export default function book() {
  const { editorId } = useLocalSearchParams();

  const {
    data: editor,
    isLoading,
    isError,
    error,
  } = useEditor(Number(editorId));

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Chargement de l'éditeur...</Text>
      </View>
    );
  }

  if (isError) {
    return <Text>Erreur: {error.message}</Text>;
  }

  if (!editor) {
    return <Text>Aucun éditeur trouvé.</Text>;
  }

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Text className="text-3xl font-bold text-center mb-6">
          {editor.name}
        </Text>

        {/* Section des livres */}
        {editor.books && editor.books.length > 0 && (
          <View className="mt-4">
            <Text className="text-lg font-semibold mb-3">
              Livres de cet éditeur ({editor.books.length})
            </Text>
            {editor.books.map((book) => (
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

        {(!editor.books || editor.books.length === 0) && (
          <View className="mt-4 p-4 bg-gray-100 rounded-lg">
            <Text className="text-gray-600 text-center">
              Aucun livre de cet éditeur dans votre bibliothèque
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
