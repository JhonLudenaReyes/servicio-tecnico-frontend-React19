import { api } from '../lib/api-client';
import type { Ciudad } from '../types/entities/Ciudad';

export const ciudadesApi = {
  listado: async () => {
    const { data } = await api.get<Ciudad[]>('/Ciudades/listado');
    return data;
  },
  buscar: async (id: number) => {
    const { data } = await api.get<Ciudad>(`/Ciudades/ciudad/buscar/${id}`);
    return data;
  },
  guardar: async (ciudad: Omit<Ciudad, 'IdCiudad'>) => {
    const { data } = await api.post<Ciudad>('/Ciudades/ciudad/guardar', ciudad);
    return data;
  },
  actualizar: async (id: number, ciudad: Ciudad) => {
    const { data } = await api.put<Ciudad>(`/Ciudades/ciudad/actualizar/${id}`, ciudad);
    return data;
  },
  eliminar: async (id: number) => {
    const { data } = await api.delete(`/Ciudades/ciudad/eliminar/${id}`);
    return data;
  },
};
