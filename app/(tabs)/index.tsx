import { View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function tabsIndex() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <MaterialIcons name="book" size={128} color="black" />
        <Text style={styles.text}>Accueil</Text>
      </View>
      {/* <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Livres</Text>
          <MaterialIcons name="book" size={32} />
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Auteurs</Text>
          <MaterialIcons name="person" size={32} />
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Editeurs</Text>
          <MaterialIcons name="domain" size={32} />
        </Pressable>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
