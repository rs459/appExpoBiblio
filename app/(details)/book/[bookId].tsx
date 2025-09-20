import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useBook } from "@/hooks/useApi";
import { useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LoaderPerso from "@/components/LoaderScreenLists";
import ErrorPerso from "@/components/ErrorScreenLists";

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
    <View style={{ flex: 1, padding: 24 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        {book.title}
      </Text>
      <Image
        source={{
          uri: book.image,
        }}
        style={{ width: 200, height: 300, alignSelf: "center" }}
      />
      <Text
        style={{
          fontSize: 16,
          padding: 8,
          borderRadius: 8,
          margin: 16,
          borderWidth: 1,
          borderColor: "#0000000c",
        }}
      >
        {book.description}
      </Text>
      <View style={{}}>
        <Pressable
          style={{ margin: 10 }}
          onPress={() => router.push(`/author/${book.author.id}`)}
        >
          <Text style={{ textDecorationLine: "underline" }}>
            Auteur: {book.author.firstName} {book.author.lastName}
          </Text>
        </Pressable>
        <Pressable
          style={{ margin: 10 }}
          onPress={() => router.push(`/editor/${book.editor.id}`)}
        >
          <Text style={{ textDecorationLine: "underline" }}>
            Editeur: {book.editor.name}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
