import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Perso404() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>404 - Page non trouvée</Text>
      <Link href="/">Retour à l'écran principal</Link>
    </View>
  );
}
