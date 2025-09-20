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
    <View style={{ flex: 1, padding: 24 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        {editor.name}
      </Text>
      <View>
        <Text>Siege social: {editor.headquarter}</Text>
        <Text>Année de création: {getYear(editor.creationDate)}</Text>
      </View>
      <FabBar id={editor.id} itemType={"editor"} />
    </View>
  );
}
