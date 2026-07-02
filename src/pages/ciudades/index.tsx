import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Button, Card, Badge, Spinner } from "react-bootstrap";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { ciudadesApi } from "../../api/ciudades";
import type { Ciudad } from "../../types/entities/Ciudad";
import CiudadForm from "./components/CiudadForm";
import { toast } from "sonner";

export default function CiudadesPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedCiudad, setSelectedCiudad] = useState<Ciudad | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  // Queries
  const { data: ciudades = [], isLoading } = useQuery({
    queryKey: ["ciudades"],
    queryFn: ciudadesApi.listado,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: ciudadesApi.guardar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ciudades"] });
      toast.success("Ciudad creada exitosamente");
      handleCloseForm();
    },
    onError: () => toast.error("Error al crear la ciudad"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Ciudad }) =>
      ciudadesApi.actualizar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ciudades"] });
      toast.success("Ciudad actualizada exitosamente");
      handleCloseForm();
    },
    onError: () => toast.error("Error al actualizar la ciudad"),
  });

  const deleteMutation = useMutation({
    mutationFn: ciudadesApi.eliminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ciudades"] });
      toast.success("Ciudad eliminada exitosamente");
    },
    onError: () => toast.error("Error al eliminar la ciudad"),
  });

  const handleEdit = (ciudad: Ciudad) => {
    setSelectedCiudad(ciudad);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Está seguro de eliminar esta ciudad?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedCiudad(null);
  };

  const handleSubmit = (data: Ciudad) => {
    if (selectedCiudad) {
      updateMutation.mutate({
        id: selectedCiudad.idCiudad || 0,
        data: { ...data, idCiudad: selectedCiudad.idCiudad },
      });
    } else {
      createMutation.mutate(data);
    }
  };

  const filteredCiudades = ciudades.filter((c) =>
    c.nombre?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="animate-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Ciudades</h2>
          <p className="text-muted small mb-0">
            Gestión de ubicaciones del sistema
          </p>
        </div>
        <Button
          variant="primary"
          className="d-flex align-items-center shadow-sm"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} className="me-2" />
          Nueva Ciudad
        </Button>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <Card.Header className="bg-white py-3">
          <div className="position-relative" style={{ maxWidth: "300px" }}>
            <Search
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              size={18}
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Buscar ciudad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Card.Header>
        <div className="table-responsive">
          <Table hover className="align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 border-0">ID</th>
                <th className="py-3 border-0">Nombre</th>
                <th className="py-3 border-0">Estado</th>
                <th className="py-3 border-0 text-end px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCiudades.length > 0 ? (
                filteredCiudades.map((ciudad) => (
                  <tr key={ciudad.idCiudad}>
                    <td className="px-4 text-muted">#{ciudad.idCiudad}</td>
                    <td className="fw-medium">{ciudad.nombre}</td>
                    <td>
                      <Badge
                        bg={ciudad.estado === "A" ? "success" : "danger"}
                        pill
                      >
                        {ciudad.estado === "A" ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
                    <td className="text-end px-4">
                      <Button
                        variant="link"
                        className="text-primary p-1 me-2"
                        onClick={() => handleEdit(ciudad)}
                      >
                        <Pencil size={18} />
                      </Button>
                      <Button
                        variant="link"
                        className="text-danger p-1"
                        onClick={() => handleDelete(ciudad.idCiudad || 0)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-5 text-muted">
                    No se encontraron ciudades
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      <CiudadForm
        show={showForm}
        onHide={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={selectedCiudad}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
