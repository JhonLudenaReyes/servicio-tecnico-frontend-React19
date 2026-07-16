import type { Tipo } from "./Tipo";

export interface Equipo {
  idEquipo?: number;
  idTipo?: number;
  marca: string;
  modelo: string;
  serie: string;
  mainboard?: string;
  procesador?: string;
  memoria?: string;
  discoDuro?: string;
  fuente?: string;
  casePc?: string;
  estado?: string;

  // Relaciones
  tipo?: Tipo;
}
