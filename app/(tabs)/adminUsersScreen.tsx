import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, blockUser, unblockUser } from "@/utils/api";
import LoaderScreenLists from "@/components/LoaderScreenLists";
import ErrorScreenLists from "@/components/ErrorScreenLists";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import User from "@/types/User";

export default function AdminUsersScreen() {
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const blockMutation = useMutation({
    mutationFn: blockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.error || "Impossible de bloquer l'utilisateur"
      );
    },
  });

  const unblockMutation = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleToggleBlock = (user: User) => {
    if (user.isBlocked) {
      Alert.alert(
        "Débloquer l'utilisateur",
        `Voulez-vous débloquer ${user.email} ?`,
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Débloquer",
            onPress: () => user.id && unblockMutation.mutate(user.id),
          },
        ]
      );
    } else {
      Alert.alert(
        "Bloquer l'utilisateur",
        `Voulez-vous bloquer ${user.email} ?`,
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Bloquer",
            style: "destructive",
            onPress: () => user.id && blockMutation.mutate(user.id),
          },
        ]
      );
    }
  };

  if (isLoading) {
    return <LoaderScreenLists />;
  }

  if (isError) {
    return <ErrorScreenLists />;
  }

  const renderUser = ({ item }: { item: User }) => {
    const isAdmin = item.roles?.includes("ROLE_ADMIN");

    return (
      <View className="bg-white p-4 border-b border-gray-200">
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-base font-medium text-gray-800">
                {item.email}
              </Text>
              {isAdmin && (
                <View className="bg-blue-100 px-2 py-0.5 rounded">
                  <Text className="text-xs text-blue-700">Admin</Text>
                </View>
              )}
              {item.isBlocked && (
                <View className="bg-red-100 px-2 py-0.5 rounded">
                  <Text className="text-xs text-red-700">Bloqué</Text>
                </View>
              )}
            </View>
            <Text className="text-sm text-gray-500 mt-1">ID: {item.id}</Text>
          </View>

          {!isAdmin && (
            <Pressable onPress={() => handleToggleBlock(item)} className="ml-4">
              <MaterialIcons
                name={item.isBlocked ? "lock-open" : "block"}
                size={24}
                color={item.isBlocked ? "#16a34a" : "#dc2626"}
              />
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">
          Gestion des utilisateurs
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          {users?.length} utilisateur{users && users.length > 1 ? "s" : ""}
        </Text>
      </View>

      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id?.toString() || ""}
        contentContainerClassName="pb-4"
      />
    </View>
  );
}
