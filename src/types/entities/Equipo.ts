import type { Tipo } from "./Tipo";

export interface Equipo {
  IdEquipo: number;
  IdTipo: number;
  Marca: string;
  Modelo: string;
  Serie: string;
  Mainboard?: string;
  Procesador?: string;
  Memoria?: string;
  DiscoDuro?: string;
  Fuente?: string;
  CasePc?: string;
  Estado: string;

  // Relaciones
  Tipo?: Tipo;
}
