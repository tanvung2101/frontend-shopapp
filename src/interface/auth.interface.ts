export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: Profile;
  access_token: string;
}

export interface RegisterResponse {
  message: string;
  data: {
    id: number;
    email: string;
    name: string;
    role: number;
  };
}

export interface Profile {
    id: number;
    email: string;
    name?: string;
    role: number;
    avatar?: string;
    phone?: string ;
}
