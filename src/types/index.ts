export interface Tipo {
  idTipo: number;
  tipo: string;
  estado: string;
}

export interface Ciudad {
  idCiudad: number;
  ciudad: string;
  estado: string;
}

export interface Equipo {
  idEquipo: number;
  idTipo: number;
  marca: string;
  modelo: string;
  serie: string;
  mainboard?: string;
  procesador?: string;
  memoria?: string;
  discoDuro?: string;
  fuente?: string;
  casePc?: string;
  estado: string;
  tipo?: Tipo;
}

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
  ciudad?: Ciudad;
}

export interface Usuario {
  idUsuario: number;
  idPersona: number;
  usuario: string;
  contrasenia?: string;
  estado: string;
  persona?: Persona;
}

export interface EstadoOrden {
  idEstadoOrden: number;
  estadoOrden: string;
  descripcion?: string;
  estado: string;
}

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
  persona?: Persona;
  usuario?: Usuario;
  equipo?: Equipo;
  estadoOrden?: EstadoOrden;
}

export interface Rol {
  idRol: number;
  rol: string;
  estado: string;
}

export interface Permiso {
  idPermiso: number;
  permiso: string;
  estado: string;
}
