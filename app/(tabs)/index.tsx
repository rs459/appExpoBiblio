import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabsIndex() {
  return (
    <View className="flex flex-1 justify-center items-center bg-gray-100">
      <MaterialIcons name="book" size={128} color="black" />
      <Text className="text-2xl font-bold">Accueil</Text>
    </View>
  );
}
