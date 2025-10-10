import { View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "@/hooks/useApi";

export default function TabsIndex() {
  const { mutateAsync: postAuth, isPending } = useAuth();

  return (
    <View className="flex flex-1 justify-center items-center bg-gray-100">
      <MaterialIcons name="book" size={128} color="black" />
      <Text className="text-2xl font-bold">Accueil</Text>
      <Pressable
        onPress={() => {
          postAuth({ email: "test@test.fr", password: "test82@T" });
        }}
        disabled={isPending}
      >
        <Text className="mt-4 text-blue-500">S'authentifier</Text>
      </Pressable>
    </View>
  );
}
