import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Button, Card, Spinner, Row, Col } from "react-bootstrap";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import { equiposApi } from "../../api/equipos";
import { tiposApi } from "../../api/tipos";
import type { Equipo } from "../../types/entities/Equipo";
import EquipoForm, { type EquipoFormData } from "./components/EquipoForm";
import { toast } from "sonner";

const columnHelper = createColumnHelper<Equipo>();

export default function EquiposPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedEquipo, setSelectedEquipo] = useState<Equipo | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const queryClient = useQueryClient();

  const { data: tipos = [] } = useQuery({
    queryKey: ["tipos"],
    queryFn: tiposApi.listado,
  });

  const { data: equipos = [], isLoading } = useQuery({
    queryKey: ["equipos"],
    queryFn: equiposApi.listado,
  });

  const createMutation = useMutation({
    mutationFn: equiposApi.guardar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos"] });
      toast.success("Equipo creado exitosamente");
      handleCloseForm();
    },
    onError: () => toast.error("Error al crear el equipo"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Equipo }) =>
      equiposApi.actualizar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos"] });
      toast.success("Equipo actualizado exitosamente");
      handleCloseForm();
    },
    onError: () => toast.error("Error al actualizar el equipo"),
  });

  const deleteMutation = useMutation({
    mutationFn: equiposApi.eliminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipos"] });
      toast.success("Equipo eliminado exitosamente");
    },
    onError: () => toast.error("Error al eliminar el equipo"),
  });

  const handleEdit = (equipo: Equipo) => {
    setSelectedEquipo(equipo);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el equipo de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEquipo(null);
  };

  const handleSubmit = (data: EquipoFormData) => {
    const payload: Omit<Equipo, "idEquipo"> = {
      idTipo: data.idTipo,
      marca: data.marca.trim(),
      modelo: data.modelo.trim(),
      serie: data.serie.trim(),
      mainboard: data.mainboard?.trim() || undefined,
      procesador: data.procesador?.trim() || undefined,
      memoria: data.memoria?.trim() || undefined,
      discoDuro: data.discoDuro?.trim() || undefined,
      fuente: data.fuente?.trim() || undefined,
      casePc: data.casePc?.trim() || undefined,
      estado: data.estado,
    };

    if (selectedEquipo) {
      updateMutation.mutate({
        id: selectedEquipo.idEquipo || 0,
        data: {
          ...payload,
          idEquipo: selectedEquipo.idEquipo,
        },
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("idEquipo", {
        header: "ID",
        cell: (info) => <span className="text-muted">#{info.getValue()}</span>,
      }),
      columnHelper.accessor((row) => `#${row.idTipo}`, {
        id: "idTipo",
        header: "Tipo",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("marca", {
        header: "Marca",
        cell: (info) => <span className="fw-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("modelo", {
        header: "Modelo",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("serie", {
        header: "Serie",
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor("estado", {
        header: "Estado",
        cell: (info) => {
          const value = info.getValue();
          const badgeClass =
            value === "Activo"
              ? "bg-success"
              : value === "Inactivo"
                ? "bg-secondary"
                : "bg-warning text-dark";
          return (
            <span className={`badge ${badgeClass} py-2 px-3`}>{value}</span>
          );
        },
      }),
      columnHelper.display({
        id: "acciones",
        header: () => <div className="text-end px-4">Acciones</div>,
        cell: (info) => (
          <div className="text-end px-4">
            <Button
              variant="link"
              className="text-primary p-1 me-2"
              onClick={() => handleEdit(info.row.original)}
            >
              <Pencil size={18} />
            </Button>
            <Button
              variant="link"
              className="text-danger p-1"
              onClick={() => handleDelete(info.row.original.idEquipo || 0)}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ),
      }),
    ],
    [handleEdit],
  );

  const table = useReactTable({
    data: equipos,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

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
      <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row gap-3">
        <div>
          <h2 className="fw-bold mb-1">Equipos</h2>
          <p className="text-muted small mb-0">
            Administra los equipos registrados y consulta sus especificaciones.
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2 align-items-center">
          <Button
            variant="primary"
            className="d-flex align-items-center shadow-sm"
            onClick={() => setShowForm(true)}
          >
            <Plus size={18} className="me-2" />
            Nuevo Equipo
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <Card.Header className="bg-white py-3">
          <Row className="align-items-center">
            <Col md={6}>
              <div className="position-relative" style={{ maxWidth: "360px" }}>
                <Search
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  size={18}
                />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Buscar equipo..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(String(e.target.value))}
                />
              </div>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <span className="text-muted small">
                {equipos.length} {equipos.length === 1 ? "equipo" : "equipos"}
              </span>
            </Col>
          </Row>
        </Card.Header>

        <div className="table-responsive">
          <Table hover className="align-middle mb-0">
            <thead className="bg-light">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-3 border-0 px-4 text-start"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center text-muted py-5" colSpan={7}>
                    No se encontraron equipos.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <Card.Footer className="bg-white py-3">
          <div className="d-flex justify-content-between align-items-center flex-column flex-md-row gap-2">
            <div className="text-muted small">
              Mostrando {table.getRowModel().rows.length} de {equipos.length}{" "}
              equipos
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>

      <EquipoForm
        show={showForm}
        onHide={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={selectedEquipo}
        tipos={tipos}
        isLoading={createMutation.isLoading || updateMutation.isLoading}
      />
    </div>
  );
}
