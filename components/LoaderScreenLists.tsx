import { View, Text, ActivityIndicator } from "react-native";

interface loaderProps {
  children?: React.ReactNode;
  message: string;
}

export default function LoaderPerso({ children, message }: loaderProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text>{message}</Text>
      {children}
    </View>
  );
}
