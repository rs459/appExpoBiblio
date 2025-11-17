import { Book } from "./Book";

export interface Editor {
  id: number;
  name: string;
  books?: Book[];
}
