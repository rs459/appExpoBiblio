import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialsIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialsIcons name="home" size={24} color={color} />
            ),
          }}
        />
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
      </Tabs>
    </SafeAreaView>
  );
}
