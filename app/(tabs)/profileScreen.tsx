import { View, Text, Pressable, Alert } from "react-native";
import { useAuthStore } from "@/hooks/useAuthStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { deleteAccount } from "@/utils/api";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "Cette action est irréversible. Toutes vos données seront définitivement supprimées. Voulez-vous vraiment supprimer votre compte ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount();
              await logout();
            } catch (error) {
              Alert.alert(
                "Erreur",
                "Une erreur est survenue lors de la suppression du compte"
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="bg-white p-6 mb-4">
        <View className="border-t border-gray-200 pt-4">
          <Text className="text-gray-600 mb-2">Email</Text>
          <Text className="text-gray-800">{user?.email}</Text>
        </View>
      </View>

      <Pressable
        onPress={handleLogout}
        className="bg-red-500 py-4 rounded-lg flex-row items-center justify-center mb-3"
      >
        <MaterialIcons name="logout" size={24} color="white" />
        <Text className="text-white font-bold text-lg ml-2">
          Se déconnecter
        </Text>
      </Pressable>

      <Pressable onPress={handleDeleteAccount} className="py-2 items-center">
        <Text className="text-gray-400 text-sm underline">
          Supprimer mon compte
        </Text>
      </Pressable>
    </View>
  );
}
