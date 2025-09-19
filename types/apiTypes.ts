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
  creationDate: string; // (ISO 8601)
}

export interface Book {
  id: number;
  title: string;
  description: string;
  pages: number;
  image: string;
  author: Author;
  editor: Editor;
}
