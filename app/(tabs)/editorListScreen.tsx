import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useEditors } from "@/hooks/useApi";
import { Editor } from "@/types/Editor";
import LoaderPerso from "@/components/LoaderScreenLists";
import Perso404 from "@/components/Perso404ScreenLists";
import ErrorPerso from "@/components/ErrorScreenLists";
import FabBar from "@/components/FabBar/FabBar";
import FooterEditorsList from "@/components/Editors/FooterEditorsList";
import ItemEditorsList from "@/components/Editors/ItemEditorsList";

export default function EditorList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useEditors(page);
  const [allEditors, setAllEditors] = useState<Editor[]>([]);

  useEffect(() => {
    if (data && data.items && page > 1) {
      setAllEditors((prevEditors) => [...prevEditors, ...data.items]);
    } else if (data && data.items) {
      setAllEditors(data.items);
    }
  }, [data]);

  if (isLoading) return <LoaderPerso message="Chargement des éditeurs..." />;

  if (isError) return <ErrorPerso error={error} />;

  if (!data) return <Perso404 />;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text className="text-2xl font-bold px-4">Liste des Editeurs</Text>
      <FlatList
        data={allEditors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemEditorsList item={item} />}
        ListFooterComponent={
          <FooterEditorsList page={page} data={data} setPage={setPage} />
        }
        ListEmptyComponent={<Text>Aucun éditeur n'a été trouvé.</Text>}
      />
      <FabBar itemType="editor" />
    </View>
  );
}

{
  /* <ItemEditorsList item={item} /> */
}
