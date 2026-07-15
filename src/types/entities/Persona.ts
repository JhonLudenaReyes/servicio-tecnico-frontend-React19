import type { Ciudad } from "./Ciudad";

export interface Persona {
  idPersona: number;
  idCiudad: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  ruc?: string;
  direccion?: string;
  celular: string;
  email?: string;
  telefono?: string;
  telefonoAdicional?: string;
  estado: string;

  // Relaciones
  Ciudad?: Ciudad;
}
