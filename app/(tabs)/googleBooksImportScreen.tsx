import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  searchGoogleBooks,
  importBookFromGoogle,
  GoogleBookSearchResult,
} from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";

export default function GoogleBooksImportScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GoogleBookSearchResult[]>(
    []
  );
  const [isSearching, setIsSearching] = useState(false);
  const [importingId, setImportingId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un terme de recherche");
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchGoogleBooks(searchQuery, 20);
      setSearchResults(results);
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Impossible de rechercher des livres. Vérifiez votre connexion."
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleImport = async (googleId: string, title: string) => {
    Alert.alert(
      "Confirmer l'import",
      `Voulez-vous importer le livre "${title}" dans votre bibliothèque ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Importer",
          onPress: async () => {
            setImportingId(googleId);
            try {
              await importBookFromGoogle(googleId);
              Alert.alert("Succès", "Le livre a été importé avec succès !");
              // Invalider tous les caches de livres, auteurs et éditeurs
              queryClient.invalidateQueries({ queryKey: ["books"] });
              queryClient.invalidateQueries({ queryKey: ["book"] });
              queryClient.invalidateQueries({ queryKey: ["authors"] });
              queryClient.invalidateQueries({ queryKey: ["author"] });
              queryClient.invalidateQueries({ queryKey: ["editors"] });
              queryClient.invalidateQueries({ queryKey: ["editor"] });
            } catch (error: any) {
              Alert.alert(
                "Erreur",
                error.response?.data?.error || "Impossible d'importer le livre"
              );
            } finally {
              setImportingId(null);
            }
          },
        },
      ]
    );
  };

  const renderBookItem = ({ item }: { item: GoogleBookSearchResult }) => {
    const isImporting = importingId === item.googleId;

    return (
      <View className="flex-row bg-white m-2 p-3 rounded-lg shadow-sm">
        <Image
          source={{ uri: item.thumbnail }}
          className="w-20 h-28 rounded"
          resizeMode="cover"
        />
        <View className="flex-1 ml-3">
          <Text className="font-bold text-base" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="text-gray-600 text-sm mt-1">
            {item.authors?.join(", ") || "Auteur inconnu"}
          </Text>
          {item.publisher && (
            <Text className="text-gray-500 text-xs mt-1">{item.publisher}</Text>
          )}
          <Text className="text-gray-400 text-xs mt-1">
            {item.pageCount} pages
          </Text>

          <TouchableOpacity
            className="mt-2 bg-blue-500 py-2 px-4 rounded-lg flex-row items-center justify-center"
            onPress={() => handleImport(item.googleId, item.title)}
            disabled={isImporting}
          >
            {isImporting ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Ionicons name="cloud-download" size={16} color="white" />
                <Text className="text-white font-semibold ml-2">Importer</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">
          Rechercher sur Google Books
        </Text>

        <View className="flex-row items-center bg-white rounded-lg shadow-sm mb-4">
          <TextInput
            className="flex-1 p-3"
            placeholder="Titre, auteur, ISBN..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-r-lg"
            onPress={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Ionicons name="search" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>

        {searchResults.length > 0 && (
          <Text className="text-gray-600 mb-2">
            {searchResults.length} résultat(s) trouvé(s)
          </Text>
        )}
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.googleId}
        renderItem={renderBookItem}
        ListEmptyComponent={
          !isSearching ? (
            <View className="items-center justify-center p-8">
              <Ionicons name="book-outline" size={64} color="#9CA3AF" />
              <Text className="text-gray-500 mt-4 text-center">
                Recherchez des livres à importer dans votre bibliothèque
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
