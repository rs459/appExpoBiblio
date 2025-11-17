import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import { PaginatedResponse } from "@/types/paginatedType";
import { Book } from "@/types/Book";
import { Author } from "@/types/Author";
import { Editor } from "@/types/Editor";
import User from "@/types/User";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // On ne traite que les erreurs 401. On s'assure aussi de ne pas
    // tomber dans une boucle infinie si le refresh échoue lui-même avec une 401.
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Si un refresh est déjà en cours, on met la requête en attente.
    if (isRefreshing) {
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers["Authorization"] = "Bearer " + token;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (!refreshToken) {
        // Ici, logique de déco
        return Promise.reject(error);
      }

      // !api.post -> axios.post
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/token/refresh`,
        {
          refresh_token: refreshToken,
        }
      );

      // On s'attend à recevoir un nouvel access ET un nouveau refresh token.
      const newAccessToken = data.token;
      const newRefreshToken = data.refresh_token;

      // On stocke les nouveaux tokens de manière sécurisée.
      await SecureStore.setItemAsync("accessToken", newAccessToken);
      if (newRefreshToken) {
        await SecureStore.setItemAsync("refreshToken", newRefreshToken);
      }

      // On met à jour le header par défaut pour les futures requêtes.
      api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
      // On met à jour le header de la requête originale qui a échoué.
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      // On relance les requêtes qui étaient en attente avec le nouveau token.
      processQueue(null, newAccessToken);

      // On relance la requête originale qui a échoué.
      return api(originalRequest);
    } catch (refreshError) {
      // Si le refresh échoue, on abandonne, on vide la file d'attente et on déconnecte.

      processQueue(refreshError as AxiosError, null);
      // Ici, déco
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
//Auth TEST
// User:
// password: "test@test.fr",
// email: "test82@T",
// Admin:
// password: "test@test.com",
// email: "test82@T",

export const postAuth = async (credentials: {
  email: string;
  password: string;
}) => {
  // !api.post -> axios.post (pas d'intercepteur ici)
  const { data } = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/api/login_check`,
    credentials
  );
  if (data.token) {
    await SecureStore.setItemAsync("accessToken", data.token);
    await SecureStore.setItemAsync("refreshToken", data.refresh_token);
  }
  return data;
};

export const registerUser = async (user: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post(`/api/register`, user);
  return data;
};

// Livres
export const getBooks = async (page = 1): Promise<PaginatedResponse<Book>> => {
  const { data } = await api.get(`/api/books?page=${page}`);
  return {
    items: data["member"],
    total: data["totalItems"],
    view: data["view"],
  };
};

export const getBook = async (id: number) => {
  const { data } = await api.get(`/api/books/${id}`);
  return data;
};

export const deleteBook = async (id: number) => {
  const { data } = await api.delete(`/api/books/${id}`);
  return data;
};

// Auteurs
export const getAuthors = async (
  page = 1
): Promise<PaginatedResponse<Author>> => {
  const { data } = await api.get(`/api/authors?page=${page}`);
  return {
    items: data["member"],
    total: data["totalItems"],
    view: data["view"],
  };
};

export const getAuthor = async (id: number) => {
  const { data } = await api.get(`/api/authors/${id}`);
  return data;
};

// Editeurs

export const getEditors = async (
  page = 1
): Promise<PaginatedResponse<Editor>> => {
  const { data } = await api.get(`/api/editors?page=${page}`);
  return {
    items: data["member"],
    total: data["totalItems"],
    view: data["view"],
  };
};

export const getEditor = async (id: number) => {
  const { data } = await api.get(`/api/editors/${id}`);
  return data;
};

// Google Books
export interface GoogleBookSearchResult {
  googleId: string;
  title: string;
  description: string;
  pageCount: number;
  thumbnail: string;
  authors: string[];
  publisher: string | null;
  publishedDate: string | null;
  isbn10: string | null;
  isbn13: string | null;
}

export const searchGoogleBooks = async (
  query: string,
  maxResults = 10
): Promise<GoogleBookSearchResult[]> => {
  const { data } = await api.get(`/api/google-books/search`, {
    params: { q: query, maxResults },
  });
  return data.items || [];
};

export const importBookFromGoogle = async (googleId: string): Promise<Book> => {
  const { data } = await api.post(`/api/google-books/import`, { googleId });
  return data.book;
};

export const deleteAccount = async (): Promise<void> => {
  await api.delete(`/api/users/me`);
};

// Admin - User management
export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await api.get(`/api/users`);
  return data;
};

export const blockUser = async (userId: number): Promise<User> => {
  const { data } = await api.patch(`/api/users/${userId}/block`);
  return data.user;
};

export const unblockUser = async (userId: number): Promise<User> => {
  const { data } = await api.patch(`/api/users/${userId}/unblock`);
  return data.user;
};
