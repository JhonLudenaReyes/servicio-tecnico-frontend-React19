import { api } from "../lib/api-client";
import type { Equipo } from "../types/entities/Equipo";

export const equiposApi = {
  listado: async () => {
    const { data } = await api.get<Equipo[]>("/Equipos/listado");
    return data;
  },
  buscar: async (id: number) => {
    const { data } = await api.get<Equipo>(`/Equipos/equipo/buscar/${id}`);
    return data;
  },
  guardar: async (equipo: Omit<Equipo, "IdEquipo">) => {
    const { data } = await api.post<Equipo>("/Equipos/equipo/guardar", equipo);
    return data;
  },
  actualizar: async (id: number, equipo: Equipo) => {
    const { data } = await api.put<Equipo>(
      `/Equipos/equipo/actualizar/${id}`,
      equipo,
    );
    return data;
  },
  eliminar: async (id: number) => {
    const { data } = await api.delete(`/Equipos/equipo/eliminar/${id}`);
    return data;
  },
};
