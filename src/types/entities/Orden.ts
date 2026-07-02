import type { Persona } from "./Persona";
import type { Usuario } from "./Usuario";
import type { Equipo } from "./Equipo";
import type { EstadoOrden } from "./EstadoOrden";

export interface Orden {
  IdOrden: number;
  IdPersona: number;
  IdUsuario: number;
  IdEquipo: number;
  IdEstadoOrden: number;
  FechaRecepcion: string;
  PosibleProblema: string;
  TrabajoRealizar: string;
  Observaciones: string;
  CondicionFisicaIngreso?: string;
  FechaReparacion?: string;
  FechaAproximada?: string;
  FechaEntrega?: string;
  ReporteTecnico?: string;
  Estado: string;

  // Relaciones
  Persona?: Persona;
  Usuario?: Usuario;
  Equipo?: Equipo;
  EstadoOrden?: EstadoOrden;
}
