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
import { AxiosError } from "axios";

export const useBooks = () => {
  return useQuery<Book[], AxiosError>({
    queryKey: ["books"],
    queryFn: getBooks,
  });
};

export const useBook = (id: number) => {
  return useQuery<Book, AxiosError>({
    queryKey: ["book", id],
    queryFn: () => getBook(id),
    enabled: !!id,
  });
};

export const useAuthors = () => {
  return useQuery<Author[], AxiosError>({
    queryKey: ["authors"],
    queryFn: getAuthors,
  });
};

export const useAuthor = (id: number) => {
  return useQuery<Author, AxiosError>({
    queryKey: ["author", id],
    queryFn: () => getAuthor(id),
    enabled: !!id,
  });
};

export const useEditors = () => {
  return useQuery<Editor[], AxiosError>({
    queryKey: ["editors"],
    queryFn: getEditors,
  });
};

export const useEditor = (id: number) => {
  return useQuery<Editor, AxiosError>({
    queryKey: ["editor", id],
    queryFn: () => getEditor(id),
    enabled: !!id,
  });
};
