import type { Persona } from "./Persona";

export interface Usuario {
  idUsuario: number;
  idPersona: number;
  usuarioLogin: string; // "usuario" coincide con la tabla, usamos UsuarioLogin o UsuarioNombre
  contrasenia: string;
  estado: string;

  // Relaciones
  Persona?: Persona;
}
