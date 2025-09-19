import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="bookList"
          options={{
            title: "Livres",
          }}
        />
        <Tabs.Screen
          name="authorList"
          options={{
            title: "Auteurs",
          }}
        />
        <Tabs.Screen
          name="editorList"
          options={{
            title: "Editeurs",
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
