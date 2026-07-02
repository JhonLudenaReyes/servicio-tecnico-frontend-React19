import type { Usuario } from "./entities/Usuario";

export interface AuthState {
  User: Usuario | null;
  Token: string | null;
  IsAuthenticated: boolean;
  Loading: boolean;
}

export interface LoginResponse {
  User: Usuario;
  Token: string;
}
