import User from "@/types/User";
import { postAuth, registerUser } from "@/utils/api";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { decodeJwt } from "@/utils/jwtUtils";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAdmin: boolean;

  // Actions
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isAdmin: false,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const data = await postAuth(credentials);

      // Décoder le JWT pour extraire les rôles
      const decodedToken = decodeJwt(data.token);
      const roles = decodedToken?.roles || [];
      const isAdmin = roles.includes("ROLE_ADMIN");

      // Sauvegarde des tokens, email et rôles
      await SecureStore.setItemAsync("accessToken", data.token);
      await SecureStore.setItemAsync("refreshToken", data.refresh_token);
      await SecureStore.setItemAsync("userEmail", credentials.email);
      await SecureStore.setItemAsync("userRoles", JSON.stringify(roles));

      set({
        user: { email: credentials.email, roles },
        token: data.token,
        refreshToken: data.refresh_token,
        isAuthenticated: true,
        isAdmin,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Échec de l'authentification",
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      await registerUser(userData);

      // Connexion automatique après l'inscription
      const data = await postAuth(userData);

      // Décoder le JWT pour extraire les rôles
      const decodedToken = decodeJwt(data.token);
      const roles = decodedToken?.roles || [];
      const isAdmin = roles.includes("ROLE_ADMIN");

      // Sauvegarde des tokens, email et rôles
      await SecureStore.setItemAsync("accessToken", data.token);
      await SecureStore.setItemAsync("refreshToken", data.refresh_token);
      await SecureStore.setItemAsync("userEmail", userData.email);
      await SecureStore.setItemAsync("userRoles", JSON.stringify(roles));

      set({
        user: { email: userData.email, roles },
        token: data.token,
        refreshToken: data.refresh_token,
        isAuthenticated: true,
        isAdmin,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Échec de l'inscription",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      // Suppression des tokens, email et rôles du SecureStore
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      await SecureStore.deleteItemAsync("userEmail");
      await SecureStore.deleteItemAsync("userRoles");

      set({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isAdmin: false,
        error: null,
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  },

  restoreSession: async () => {
    set({ isLoading: true });
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      const userEmail = await SecureStore.getItemAsync("userEmail");
      const userRolesJson = await SecureStore.getItemAsync("userRoles");

      if (token && refreshToken && userEmail) {
        const roles = userRolesJson ? JSON.parse(userRolesJson) : [];
        const isAdmin = roles.includes("ROLE_ADMIN");

        set({
          user: { email: userEmail, roles },
          token,
          refreshToken,
          isAuthenticated: true,
          isAdmin,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Erreur lors de la restauration de session:", error);
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
