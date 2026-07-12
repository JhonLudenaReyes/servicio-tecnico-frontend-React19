import { api } from "../lib/api-client";
import type { Tipo } from "../types/entities/Tipo";

export const tiposApi = {
  listado: async () => {
    const { data } = await api.get<Tipo[]>("/Tipos/listado");
    return data;
  },
  buscar: async (id: number) => {
    const { data } = await api.get<Tipo>(`/Tipos/tipo/buscar/${id}`);
    return data;
  },
  guardar: async (tipo: Omit<Tipo, "IdTipo">) => {
    const { data } = await api.post<Tipo>("/Tipos/tipo/guardar", tipo);
    return data;
  },
  actualizar: async (id: number, tipo: Tipo) => {
    const { data } = await api.put<Tipo>(`/Tipos/tipo/actualizar/${id}`, tipo);
    return data;
  },
  eliminar: async (id: number) => {
    const { data } = await api.delete(`/Tipos/tipo/eliminar/${id}`);
    return data;
  },
};
