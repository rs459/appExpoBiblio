import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
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

// Hook pour récupérer la liste de tous les livres
export const useBooks = (page = 1) => {
  return useQuery<PaginatedResponse<Book>, Error>({
    queryKey: ["books", page],
    queryFn: () => getBooks(page),
    placeholderData: (previousData) => previousData,
  });
};

// Hook avec infinite scroll pour les livres
export const useBooksInfinite = () => {
  return useInfiniteQuery<PaginatedResponse<Book>, Error>({
    queryKey: ["books", "infinite"],
    queryFn: ({ pageParam = 1 }) => getBooks(pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      // Si view.next existe, il y a une page suivante
      if (lastPage.view?.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
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

// Hook avec infinite scroll pour les auteurs
export const useAuthorsInfinite = () => {
  return useInfiniteQuery<PaginatedResponse<Author>, Error>({
    queryKey: ["authors", "infinite"],
    queryFn: ({ pageParam = 1 }) => getAuthors(pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      // Si view.next existe, il y a une page suivante
      if (lastPage.view?.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
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

// Hook avec infinite scroll pour les éditeurs
export const useEditorsInfinite = () => {
  return useInfiniteQuery<PaginatedResponse<Editor>, Error>({
    queryKey: ["editors", "infinite"],
    queryFn: ({ pageParam = 1 }) => getEditors(pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      // Si view.next existe, il y a une page suivante
      if (lastPage.view?.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
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
