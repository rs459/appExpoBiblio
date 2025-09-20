export interface View {
  first: string;
  last: string;
  next?: string;
  previous?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  view?: View;
}
