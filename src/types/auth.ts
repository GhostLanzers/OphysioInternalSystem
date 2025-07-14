export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'doctor';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'admin' | 'doctor';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}