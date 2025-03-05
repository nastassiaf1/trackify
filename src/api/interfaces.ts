export interface AuthResponse {
  message: string;
  token?: string;
}

export interface User {
  id: number;
  email: string;
  displayName?: string;
  avatar?: string;
}
