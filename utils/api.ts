import API_BASE_URL from "@/config.js";
import axios from "axios";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Livres
export const getBooks = async () => {
  const { data } = await api.get(`${API_BASE_URL}/api/books`);
  console.log(data);
  return data;
};

export const getBook = async (id: number) => {
  const { data } = await api.get(`${API_BASE_URL}/api/books/${id}`);
  return data;
};

// Auteurs
export const getAuthors = async () => {
  const { data } = await api.get(`${API_BASE_URL}/api/authors`);
  return data;
};

export const getAuthor = async (id: number) => {
  const { data } = await api.get(`${API_BASE_URL}/api/authors/${id}`);
  return data;
};

// Editeurs
export const getEditors = async () => {
  const { data } = await api.get(`${API_BASE_URL}/api/editors`);
  return data;
};

export const getEditor = async (id: number) => {
  const { data } = await api.get(`${API_BASE_URL}/api/editors/${id}`);
  return data;
};
