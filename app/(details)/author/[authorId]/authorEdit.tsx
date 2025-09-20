import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAuthor } from "@/hooks/useApi";
import LoaderPerso from "@/components/LoaderScreenLists";
import ErrorPerso from "@/components/ErrorScreenLists";
import Perso404 from "@/components/Perso404ScreenLists";

export default function authorEdit() {
  const { authorId } = useLocalSearchParams();
  const {
    data: author,
    isLoading,
    isError,
    error,
  } = useAuthor(Number(authorId));

  if (isLoading)
    return <LoaderPerso message="Chargement du formulaire d'édition..." />;

  if (isError) return <ErrorPerso error={error} />;

  if (!author) return <Perso404 />;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>authorEdit</Text>
      <Text>{authorId}</Text>
      <Text>{author?.firstName}</Text>
      <Text>{author?.lastName}</Text>
    </View>
  );
}
