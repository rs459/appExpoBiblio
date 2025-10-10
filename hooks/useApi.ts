import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBooks,
  getBook,
  deleteBook,
  getAuthors,
  getAuthor,
  getEditors,
  getEditor,
  postAuth,
} from "@/utils/api";

import { Author } from "@/types/Author";
import { Editor } from "@/types/Editor";
import { Book } from "@/types/Book";
import { PaginatedResponse } from "@/types/paginatedType";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { extractApiErrorMessage } from "@/utils/errorUtils";

//Hook pour s'authentifier
export const useAuth = () => {
  return useMutation<
    { token: string },
    AxiosError,
    { email: string; password: string }
  >({
    mutationFn: (credentials) => postAuth(credentials),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Authentification réussie",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Échec de l'authentification",
        text2: extractApiErrorMessage(error),
      });
    },
  });
};

// Hook pour récupérer la liste de tous les livres
export const useBooks = (page = 1) => {
  return useQuery<PaginatedResponse<Book>, Error>({
    queryKey: ["books", page],
    queryFn: () => getBooks(page),
    placeholderData: (previousData) => previousData,
  });
};

// Hook pour récupérer un livre spécifique par son ID
export const useBook = (id: number) => {
  return useQuery<Book, Error>({
    queryKey: ["book", id],
    queryFn: () => getBook(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5min
  });
};

// Hook pour supprimer un livre
export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBook(id),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Livre supprimé avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

// Hook pour récupérer la liste de tous les auteurs
export const useAuthors = (page = 1) => {
  return useQuery<PaginatedResponse<Author>, Error>({
    queryKey: ["authors", page],
    queryFn: () => getAuthors(page),
    placeholderData: (previousData) => previousData,
  });
};

// Hook pour récupérer un auteur spécifique par son ID
export const useAuthor = (id: number) => {
  return useQuery<Author, Error>({
    queryKey: ["author", id],
    queryFn: () => getAuthor(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5min
  });
};

export const useEditors = (page = 1) => {
  return useQuery<PaginatedResponse<Editor>, Error>({
    queryKey: ["editors", page],
    queryFn: () => getEditors(page),
    placeholderData: (previousData) => previousData,
  });
};

export const useEditor = (id: number) => {
  return useQuery<Editor, Error>({
    queryKey: ["editor", id],
    queryFn: () => getEditor(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5min
  });
};
