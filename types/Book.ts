import { Author } from "./Author";
import { Editor } from "./Editor";

export interface Book {
  id: number;
  title: string;
  description: string;
  pages: number;
  image: string;
  author: Author;
  editor: Editor;
}
