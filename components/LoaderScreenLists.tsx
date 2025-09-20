import { View, Text, ActivityIndicator } from "react-native";

interface loaderProps {
  children?: React.ReactNode;
  message: string;
}

export default function LoaderPerso({ children, message }: loaderProps) {
  return (
    <View className="flex flex-1 justify-center items-center bg-gray-100">
      <ActivityIndicator size="large" />
      <Text>{message}</Text>
      {children}
    </View>
  );
}
