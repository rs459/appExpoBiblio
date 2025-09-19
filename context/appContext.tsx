// Abandonné pour TANSTACK

import React, { createContext, useState, ReactNode, useMemo } from "react";

// On définit la structure de nos objets en se basant sur l'API
export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
}

export interface Editor {
  id: number;
  name: string;
  headquarter: string;
  creationDate: string; // Les dates sont souvent transmises comme des chaînes de caractères (ISO 8601)
}

export interface Book {
  id: number;
  title: string;
  description: string;
  pages: number;
  image: string;
  author: Author; // Relation imbriquée
  editor: Editor; // Relation imbriquée
}

interface AppContextType {
  bookList: Book[];
  setBookList: (books: Book[]) => void;
  authorList: Author[];
  setAuthorList: (authors: Author[]) => void;
  editorList: Editor[];
  setEditorList: (editors: Editor[]) => void;
  currentBook: Book | null;
  setCurrentBook: (book: Book | null) => void;
  currentAuthor: Author | null;
  setCurrentAuthor: (author: Author | null) => void;
  currentEditor: Editor | null;
  setCurrentEditor: (editor: Editor | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [authorList, setAuthorList] = useState<Author[]>([]);
  const [editorList, setEditorList] = useState<Editor[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentAuthor, setCurrentAuthor] = useState<Author | null>(null);
  const [currentEditor, setCurrentEditor] = useState<Editor | null>(null);

  // On utilise useMemo pour éviter de recréer l'objet `value` à chaque rendu.
  // Cela empêche les re-rendus inutiles des composants qui consomment ce contexte.
  const contextValue = useMemo(
    () => ({
      bookList,
      setBookList,
      authorList,
      setAuthorList,
      editorList,
      setEditorList,
      currentAuthor,
      setCurrentAuthor,
      currentBook,
      setCurrentBook,
      currentEditor,
      setCurrentEditor,
    }),
    // La valeur ne sera recalculée que si l'un de ces états change.
    [
      bookList,
      authorList,
      editorList,
      currentAuthor,
      currentBook,
      currentEditor,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
