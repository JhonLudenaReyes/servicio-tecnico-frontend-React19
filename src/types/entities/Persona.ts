import type { Ciudad } from "./Ciudad";

export interface Persona {
  IdPersona: number;
  IdCiudad: number;
  Nombres: string;
  Apellidos: string;
  Cedula: string;
  Ruc?: string;
  Direccion?: string;
  Celular: string;
  Email?: string;
  Telefono?: string;
  TelefonoAdicional?: string;
  Estado: string;

  // Relaciones
  Ciudad?: Ciudad;
}
