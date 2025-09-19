import { useQuery } from "@tanstack/react-query";
import {
  getBooks,
  getBook,
  getAuthors,
  getAuthor,
  getEditors,
  getEditor,
} from "@/utils/api";

import { Book, Author, Editor } from "@/types/apiTypes";

// Hook pour récupérer la liste de tous les livres
export const useBooks = () => {
  return useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: getBooks,
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
export const useAuthors = () => {
  return useQuery<Author[], Error>({
    queryKey: ["authors"],
    queryFn: getAuthors,
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

export const useEditors = () => {
  return useQuery<Editor[], Error>({
    queryKey: ["editors"],
    queryFn: getEditors,
  });
};

export const useEditor = (id: number) => {
  return useQuery<Editor, Error>({
    queryKey: ["editor", id],
    queryFn: () => getEditor(id),
    enabled: !!id,
  });
};
