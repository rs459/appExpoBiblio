import { View, Text, ActivityIndicator } from "react-native";
import { useEditor } from "@/hooks/useApi";
import { useLocalSearchParams } from "expo-router";
import getYear from "@/utils/isoDateTo";
import FabBar from "@/components/FabBar/FabBar";

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
    <View className="flex flex-1 p-6">
      <Text className="text-2xl font-bold mb-4 text-center">{editor.name}</Text>
      <View>
        <Text>Siege social: {editor.headquarter}</Text>
        <Text>Année de création: {getYear(editor.creationDate)}</Text>
      </View>
      <FabBar id={editor.id} itemType={"editor"} />
    </View>
  );
}
