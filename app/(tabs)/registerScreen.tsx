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
const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    )
    .required("Le mot de passe est requis"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est requise"),
});

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen() {
  const { register, isLoading, isAuthenticated, error, clearError } =
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

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      await register({
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.error("Erreur d'inscription:", error);
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
        <View className="flex-1 justify-center px-6 py-8">
          {/* En-tête */}
          <View className="items-center mb-8">
            <MaterialIcons name="person-add" size={80} color="#10b981" />
            <Text className="text-3xl font-bold mt-4 text-gray-800">
              Inscription
            </Text>
            <Text className="text-gray-600 mt-2 text-center">
              Créez votre compte pour accéder à votre bibliothèque
            </Text>
          </View>

          {/* Formulaire Formik */}
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
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
                {/* Message d'erreur global */}
                {error && (
                  <View className="bg-red-100 border border-red-400 rounded-lg p-3 mb-4">
                    <Text className="text-red-700">{error}</Text>
                  </View>
                )}

                {/* Champ Email */}
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

                {/* Champ Mot de passe */}
                <View className="mb-4">
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

                {/* Champ Confirmation du mot de passe */}
                <View className="mb-6">
                  <Text className="text-gray-700 font-semibold mb-2">
                    Confirmer le mot de passe
                  </Text>
                  <TextInput
                    className={`bg-white px-4 py-3 rounded-lg border ${
                      touched.confirmPassword && errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                    editable={!isLoading}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>

                {/* Bouton d'inscription */}
                <Pressable
                  onPress={() => handleSubmit()}
                  disabled={isLoading || !isValid}
                  className={`py-4 rounded-lg ${
                    isLoading || !isValid ? "bg-green-300" : "bg-green-500"
                  }`}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white text-center font-bold text-lg">
                      S'inscrire
                    </Text>
                  )}
                </Pressable>

                {/* Lien vers la connexion */}
                <View className="mt-6 flex-row justify-center">
                  <Text className="text-gray-600">Déjà un compte ? </Text>
                  <Pressable
                    onPress={() => router.push("/(tabs)/loginScreen")}
                    disabled={isLoading}
                  >
                    <Text className="text-green-500 font-semibold">
                      Se connecter
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
