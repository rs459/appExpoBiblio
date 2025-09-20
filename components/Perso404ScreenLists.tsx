import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Perso404() {
  return (
    <View className="flex flex-1 justify-center items-center bg-gray-100">
      <Text>404 - Page non trouvée</Text>
      <Link href="/">Retour à l'écran principal</Link>
    </View>
  );
}
