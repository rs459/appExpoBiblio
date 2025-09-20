import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ErrorProps {
  error: Error;
  children?: React.ReactNode;
}

export default function ErrorPerso({ error, children }: ErrorProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MaterialIcons name="error" size={24} color="red" />
      <Text>Erreur: {error.message}</Text>
      {children}
    </View>
  );
}
