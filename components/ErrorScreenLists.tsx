import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ErrorProps {
  error: Error;
  children?: React.ReactNode;
}

export default function ErrorPerso({ error, children }: ErrorProps) {
  return (
    <View className="flex flex-1 justify-center items-center bg-gray-100">
      <MaterialIcons name="error" size={24} color="red" />
      <Text>Erreur: {error.message}</Text>
      {children}
    </View>
  );
}
