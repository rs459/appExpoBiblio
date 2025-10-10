// utils/errorUtils.ts
import axios from "axios";

interface ApiErrorResponse {
  message: string;
}

export const extractApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    // Message spécifique de l'API
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) {
    // Erreur JavaScript standard
    return error.message;
  }
  // Cas où l'erreur n'est pas un objet Error
  return "Une erreur inattendue est survenue.";
};
