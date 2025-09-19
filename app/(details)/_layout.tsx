import { Slot } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
        <Slot />
      </View>
    </SafeAreaView>
  );
}
