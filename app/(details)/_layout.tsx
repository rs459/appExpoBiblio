import { View, Text, Pressable } from "react-native";
import { router, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function DetailsLayout() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Pressable
          onPress={() => router.back()}
          className="flex flex-row justify-start items-center p-4"
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
          <Text className="ml-2">Retour</Text>
        </Pressable>
        <Slot />
      </View>
    </SafeAreaView>
  );
}
