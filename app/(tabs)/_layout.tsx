import SafeAreaContainer from "@/components/SafeAreaContainer";
import { useAuthStore } from "@/hooks/useAuthStore";
import MaterialsIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { useEffect } from "react";

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();

  return (
    <SafeAreaContainer className="flex-1">
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Protected guard={!isAuthenticated}>
          <Tabs.Screen
            name="loginScreen"
            options={{
              title: "Se connecter",
              tabBarIcon: ({ color }) => (
                <MaterialsIcons name="login" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="registerScreen"
            options={{
              title: "S'inscrire",
              tabBarIcon: ({ color }) => (
                <MaterialsIcons name="person-add" size={24} color={color} />
              ),
            }}
          />
        </Tabs.Protected>
        <Tabs.Protected guard={isAuthenticated}>
          <Tabs.Screen
            name="bookListScreen"
            options={{
              title: "Livres",
              tabBarIcon: ({ color }) => (
                <MaterialsIcons name="book" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="authorListScreen"
            options={{
              title: "Auteurs",
              tabBarIcon: ({ color }) => (
                <MaterialsIcons name="person" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="editorListScreen"
            options={{
              title: "Editeurs",
              tabBarIcon: ({ color }) => (
                <MaterialsIcons name="domain" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profileScreen"
            options={{
              title: "Profil",
              tabBarIcon: ({ color }) => (
                <MaterialsIcons name="account-circle" size={24} color={color} />
              ),
            }}
          />
        </Tabs.Protected>
      </Tabs>
    </SafeAreaContainer>
  );
}
