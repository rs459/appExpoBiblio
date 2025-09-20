import { useQuery } from "@tanstack/react-query";
import {
  getBooks,
  getBook,
  getAuthors,
  getAuthor,
  getEditors,
  getEditor,
} from "@/utils/api";

import { Author } from "@/types/Author";
import { Editor } from "@/types/Editor";
import { Book } from "@/types/Book";
import { PaginatedResponse } from "@/types/paginatedType";

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
  });
};

// Hook pour récupérer la liste de tous les auteurs
export const useAuthors = (page = 1) => {
  return useQuery<PaginatedResponse<Author>, Error>({
    queryKey: ["authors"],
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
  });
};

export const useEditors = (page = 1) => {
  return useQuery<PaginatedResponse<Editor>, Error>({
    queryKey: ["editors"],
    queryFn: () => getEditors(page),
    placeholderData: (previousData) => previousData,
  });
};

export const useEditor = (id: number) => {
  return useQuery<Editor, Error>({
    queryKey: ["editor", id],
    queryFn: () => getEditor(id),
    enabled: !!id,
  });
};
