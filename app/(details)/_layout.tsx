import { View, Text, Pressable } from "react-native";
import { router, Slot } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SafeAreaContainer from "@/components/SafeAreaContainer";

export default function DetailsLayout() {
  return (
    <SafeAreaContainer className="flex-1 bg-gray-100">
      <View className="flex-row items-center p-2 bg-white border-b border-gray-200">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
          <Text className="ml-2 text-lg">Retour</Text>
        </Pressable>
      </View>
      <Slot />
    </SafeAreaContainer>
  );
}
