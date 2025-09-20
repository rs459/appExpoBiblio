import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useBook } from "@/hooks/useApi";
import LoaderPerso from "@/components/LoaderScreenLists";
import ErrorPerso from "@/components/ErrorScreenLists";
import Perso404 from "@/components/Perso404ScreenLists";

export default function bookEdit() {
  const { bookId } = useLocalSearchParams();
  const { data: book, isLoading, isError, error } = useBook(Number(bookId));

  if (isLoading)
    return <LoaderPerso message="Chargement du formulaire d'édition..." />;

  if (isError) return <ErrorPerso error={error} />;

  if (!book) return <Perso404 />;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>bookEdit</Text>
      <Text>{bookId}</Text>
      <Text>{book?.title}</Text>
      <Text>{book?.description}</Text>
      <Text>{book?.author?.firstName}</Text>
      <Text>{book?.author?.lastName}</Text>
      <Text>{book?.editor?.name}</Text>
      <Text>{book?.image}</Text>
    </View>
  );
}
