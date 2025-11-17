import { View } from "react-native";
import DeleteItem from "./DeleteItem";

interface FabBarProps {
  id?: number;
  itemType: "book" | "author" | "editor";
}

export default function FabBar({ id, itemType }: FabBarProps) {
  if (!id) return null;

  return (
    <View className="flex-column space-around items-center gap-5 absolute bottom-8 right-3">
      <DeleteItem id={id} itemType={itemType} />
    </View>
  );
}
