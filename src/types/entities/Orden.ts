import type { Persona } from "./Persona";
import type { Usuario } from "./Usuario";
import type { Equipo } from "./Equipo";
import type { EstadoOrden } from "./EstadoOrden";

export interface Orden {
  idOrden: number;
  idPersona: number;
  idUsuario: number;
  idEquipo: number;
  idEstadoOrden: number;
  fechaRecepcion: string;
  posibleProblema: string;
  trabajoRealizar: string;
  observaciones: string;
  condicionFisicaIngreso?: string;
  fechaReparacion?: string;
  fechaAproximada?: string;
  fechaEntrega?: string;
  reporteTecnico?: string;
  estado: string;

  // Relaciones
  Persona?: Persona;
  Usuario?: Usuario;
  Equipo?: Equipo;
  EstadoOrden?: EstadoOrden;
}
