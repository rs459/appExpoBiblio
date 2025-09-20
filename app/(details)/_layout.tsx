import { View, Text, Pressable } from "react-native";
import { router, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailsLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Pressable onPress={() => router.back()} style={{ padding: 16 }}>
          <Text>← Retour</Text>
        </Pressable>
        <Slot />
      </View>
    </SafeAreaView>
  );
}
