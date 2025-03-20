export interface Category {
  id: number;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Categories {
  message: string;
  data: Category[];
  current_age: number;
  total_pages: number;
  total: number;
}
