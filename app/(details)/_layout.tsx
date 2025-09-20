import { View, Text, Pressable } from "react-native";
import { router, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function DetailsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Pressable
          onPress={() => router.back()}
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 16,
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
          <Text style={{ marginLeft: 8, color: "black" }}>Retour</Text>
        </Pressable>
        <Slot />
      </View>
    </SafeAreaView>
  );
}
