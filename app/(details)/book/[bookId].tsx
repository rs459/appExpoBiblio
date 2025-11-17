import { Text, Image, Pressable, ScrollView, View } from "react-native";
import { router } from "expo-router";
import { useBook } from "@/hooks/useApi";
import { useLocalSearchParams } from "expo-router";
import LoaderPerso from "@/components/LoaderScreenLists";
import ErrorPerso from "@/components/ErrorScreenLists";
import FabBar from "@/components/FabBar/FabBar";

export default function book() {
  const { bookId } = useLocalSearchParams();

  const { data: book, isLoading, isError, error } = useBook(Number(bookId));

  if (isLoading) {
    return <LoaderPerso message="Chargement du livre..." />;
  }

  if (isError) {
    return <ErrorPerso error={error} />;
  }

  if (!book) {
    return <Text>Aucun livre trouvé.</Text>;
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        {/* Image et titre */}
        <Image
          source={{ uri: book.image }}
          className="w-40 h-60 self-center rounded-lg mb-4"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold text-center mb-6 text-gray-800">
          {book.title}
        </Text>

        {/* Description */}
        <View className="mb-6">
          <Text className="text-base text-gray-700 leading-6">
            {book.description}
          </Text>
        </View>

        {/* Nombre de pages */}
        <Text className="text-sm text-gray-600 mb-4">{book.pages} pages</Text>

        {/* Auteur */}
        <Pressable
          className="mb-3 pb-3 border-b border-gray-200"
          onPress={() => router.push(`/author/${book.author.id}`)}
        >
          <Text className="text-sm text-gray-500 mb-1">Auteur</Text>
          <Text className="text-base font-semibold text-blue-600">
            {book.author.firstName} {book.author.lastName}
          </Text>
        </Pressable>

        {/* Éditeur */}
        {book.editor && (
          <Pressable
            className="mb-20"
            onPress={() => router.push(`/editor/${book.editor.id}`)}
          >
            <Text className="text-sm text-gray-500 mb-1">Éditeur</Text>
            <Text className="text-base font-semibold text-blue-600">
              {book.editor.name}
            </Text>
          </Pressable>
        )}
      </ScrollView>
      <FabBar id={book.id} itemType={"book"} />
    </View>
  );
}
