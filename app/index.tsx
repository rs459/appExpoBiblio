import { useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuthStore } from "@/hooks/useAuthStore";
import { View, ActivityIndicator, Text } from "react-native";

export default function Index() {
  const { isAuthenticated, isLoading, restoreSession } = useAuthStore();

  useEffect(() => {
    // Restaurer la session au démarrage
    restoreSession();
  }, []);

  // Afficher un loader pendant la vérification de la session
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-600">Chargement...</Text>
      </View>
    );
  }

  // Rediriger vers l'écran approprié une fois la session restaurée
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/bookListScreen" />;
  }

  return <Redirect href="/(tabs)/loginScreen" />;
}
