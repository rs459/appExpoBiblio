import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEditor } from "@/hooks/useApi";
import LoaderPerso from "@/components/LoaderScreenLists";
import ErrorPerso from "@/components/ErrorScreenLists";
import Perso404 from "@/components/Perso404ScreenLists";

export default function editorEdit() {
  const { editorId } = useLocalSearchParams();
  const {
    data: editor,
    isLoading,
    isError,
    error,
  } = useEditor(Number(editorId));

  if (isLoading)
    return <LoaderPerso message="Chargement du formulaire d'édition..." />;

  if (isError) return <ErrorPerso error={error} />;

  if (!editor) return <Perso404 />;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>editorEdit</Text>
      <Text>{editorId}</Text>
      <Text>{editor?.name}</Text>
      <Text>{editor?.headquarter}</Text>
    </View>
  );
}
