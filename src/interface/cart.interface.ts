export interface Cart {
  message: string;
  data: {
    id: number;
    session_id: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  };
}