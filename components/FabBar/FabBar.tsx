import { View, StyleSheet } from "react-native";
import RedirectForCreate from "./RedirectForCreate";
import RedirectForEdit from "./RedirectForEdit";
import DeleteItem from "./DeleteItem";
import { Href } from "expo-router";

interface FabBarProps {
  id?: number;
  itemType: "book" | "author" | "editor";
}

export default function FabBar({ id, itemType }: FabBarProps) {
  const isEdit = id !== undefined;

  return (
    <View style={styles.container}>
      {isEdit ? (
        <>
          <DeleteItem id={id} itemType={itemType} />
          <RedirectForEdit id={id} itemType={itemType} />
        </>
      ) : (
        <RedirectForCreate itemType={itemType} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 32,
    right: 12,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 18,
  },
});
