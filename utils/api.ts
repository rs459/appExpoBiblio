import API_BASE_URL from "@/config.js";
import axios from "axios";

// Livres
export const getBooks = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/books`);
  return data["hydra:member"];
};

export const getBook = async (id: number) => {
  const { data } = await axios.get(`${API_BASE_URL}/books/${id}`);
  return data;
};

// Auteurs
export const getAuthors = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/authors`);
  return data["hydra:member"];
};

export const getAuthor = async (id: number) => {
  const { data } = await axios.get(`${API_BASE_URL}/authors/${id}`);
  return data;
};

// Editeurs
export const getEditors = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/editors`);
  return data["hydra:member"];
};

export const getEditor = async (id: number) => {
  const { data } = await axios.get(`${API_BASE_URL}/editors/${id}`);
  return data;
};
