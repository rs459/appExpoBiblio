import { useAuthStore } from "@/hooks/useAuthStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";

// Schéma de validation avec Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est requis"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const { login, isLoading, isAuthenticated, error, clearError } =
    useAuthStore();
  const router = useRouter();

  // Redirection si déjà authentifié
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/bookListScreen");
    }
  }, [isAuthenticated]);

  // Nettoyer l'erreur au démontage
  useEffect(() => {
    return () => {
      clearError();
    };
  }, []);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await login(values);
    } catch (error) {
      // L'erreur est déjà gérée dans le store
      console.error("Erreur de connexion:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6">
          {/* En-tête */}
          <View className="items-center mb-8">
            <MaterialIcons name="book" size={80} color="#3b82f6" />
            <Text className="text-3xl font-bold mt-4 text-gray-800">
              Connexion
            </Text>
            <Text className="text-gray-600 mt-2">
              Bienvenue dans votre bibliothèque
            </Text>
          </View>

          {/* Formulaire Formik */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <View className="w-full">
                {error && (
                  <View className="bg-red-100 border border-red-400 rounded-lg p-3 mb-4">
                    <Text className="text-red-700">{error}</Text>
                  </View>
                )}
                <View className="mb-4">
                  <Text className="text-gray-700 font-semibold mb-2">
                    Email
                  </Text>
                  <TextInput
                    className={`bg-white px-4 py-3 rounded-lg border ${
                      touched.email && errors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="exemple@email.com"
                    placeholderTextColor="#9ca3af"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    editable={!isLoading}
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </Text>
                  )}
                </View>

                <View className="mb-6">
                  <Text className="text-gray-700 font-semibold mb-2">
                    Mot de passe
                  </Text>
                  <TextInput
                    className={`bg-white px-4 py-3 rounded-lg border ${
                      touched.password && errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                    editable={!isLoading}
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </Text>
                  )}
                </View>

                {/* Bouton de connexion */}
                <Pressable
                  onPress={() => handleSubmit()}
                  disabled={isLoading || !isValid}
                  className={`py-4 rounded-lg ${
                    isLoading || !isValid ? "bg-blue-300" : "bg-blue-500"
                  }`}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white text-center font-bold text-lg">
                      Se connecter
                    </Text>
                  )}
                </Pressable>

                {/* Lien vers l'inscription */}
                <View className="mt-6 flex-row justify-center">
                  <Text className="text-gray-600">Pas encore de compte ? </Text>
                  <Pressable
                    onPress={() => router.push("/(tabs)/registerScreen")}
                    disabled={isLoading}
                  >
                    <Text className="text-blue-500 font-semibold">
                      S'inscrire
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
