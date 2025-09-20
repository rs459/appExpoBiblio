import { View } from "react-native";
import RedirectForCreate from "./RedirectForCreate";
import RedirectForEdit from "./RedirectForEdit";
import DeleteItem from "./DeleteItem";

interface FabBarProps {
  id?: number;
  itemType: "book" | "author" | "editor";
}

export default function FabBar({ id, itemType }: FabBarProps) {
  const isEdit = id !== undefined;

  return (
    <View className="flex-column space-around items-center gap-5 absolute bottom-8 right-3">
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
