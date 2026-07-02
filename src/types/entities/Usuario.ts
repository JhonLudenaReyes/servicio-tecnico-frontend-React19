import type { Persona } from "./Persona";

export interface Usuario {
  IdUsuario: number;
  IdPersona: number;
  UsuarioLogin: string; // "usuario" coincide con la tabla, usamos UsuarioLogin o UsuarioNombre
  Contrasenia: string;
  Estado: string;

  // Relaciones
  Persona?: Persona;
}
