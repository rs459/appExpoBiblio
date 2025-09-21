import axios from "axios";
import { PaginatedResponse } from "@/types/paginatedType";
import { Book } from "@/types/Book";
import { Author } from "@/types/Author";
import { Editor } from "@/types/Editor";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

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
