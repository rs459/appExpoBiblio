import { Book } from "./Book";

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  books?: Book[];
}
