import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Button, Card, Spinner, Form } from "react-bootstrap";
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
import Swal from "sweetalert2"; // <-- Importamos SweetAlert2
import { tiposApi } from "../../api/tipos";
import type { Tipo } from "../../types/entities/Tipo";
import TipoForm from "./components/TipoForm";
import { toast } from "sonner";

const columnHelper = createColumnHelper<Tipo>();

export default function TiposPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState<Tipo | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const queryClient = useQueryClient();

  // Queries
  const { data: tipos = [], isLoading } = useQuery({
    queryKey: ["tipos"],
    queryFn: tiposApi.listado,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: tiposApi.guardar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipos"] });
      toast.success("Tipo creado exitosamente");
      handleCloseForm();
    },
    onError: () => toast.error("Error al crear el tipo"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Tipo }) =>
      tiposApi.actualizar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipos"] });
      toast.success("Tipo actualizado exitosamente");
      handleCloseForm();
    },
    onError: () => toast.error("Error al actualizar el tipo"),
  });

  const deleteMutation = useMutation({
    mutationFn: tiposApi.eliminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tipos"] });
      toast.success("Tipo eliminado exitosamente");
    },
    onError: () => toast.error("Error al eliminar el tipo"),
  });

  // Handlers
  const handleEdit = (tipo: Tipo) => {
    setSelectedTipo(tipo);
    setShowForm(true);
  };

  // --- INTEGRACIÓN DE SWEETALERT2 ---
  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd", // Color Primary de Bootstrap
      cancelButtonColor: "#dc3545", // Color Danger de Bootstrap
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true, // Pone el botón de confirmar a la derecha (opcional, estilo Windows)
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedTipo(null);
  };

  const handleSubmit = (data: Tipo) => {
    if (selectedTipo) {
      updateMutation.mutate({
        id: selectedTipo.idTipo || 0,
        data: { ...data, idTipo: selectedTipo.idTipo },
      });
    } else {
      createMutation.mutate(data);
    }
  };

  // Definición de Columnas
  const columns = useMemo(
    () => [
      columnHelper.accessor("idTipo", {
        header: "ID",
        cell: (info) => <span className="text-muted">#{info.getValue()}</span>,
      }),
      columnHelper.accessor("nombre", {
        header: "Nombre",
        cell: (info) => <span className="fw-medium">{info.getValue()}</span>,
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
              onClick={() => handleDelete(info.row.original.idTipo || 0)}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ),
      }),
    ],
    [],
  );

  // Instancia de TanStack Table
  const table = useReactTable({
    data: tipos,
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Tipos</h2>
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
          Nuevo Tipo
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
              placeholder="Buscar tipo..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(String(e.target.value))}
            />
          </div>
        </Card.Header>

        <div className="table-responsive">
          <Table hover className="align-middle mb-0">
            <thead className="bg-light">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="py-3 border-0 px-4">
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
                      <td key={cell.id} className="px-4">
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
                  <td
                    colSpan={columns.length}
                    className="text-center py-5 text-muted"
                  >
                    No se encontraron tipos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Controles de Paginación */}
        <Card.Footer className="bg-white py-3 border-top">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted small d-none d-sm-block">
                Mostrando página{" "}
                <strong>{table.getState().pagination.pageIndex + 1}</strong> de{" "}
                <strong>{table.getPageCount()}</strong>
              </span>
              <Form.Select
                size="sm"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                style={{ width: "auto" }}
                className="text-muted"
              >
                {[5, 10, 20, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Mostrar {pageSize}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                className="d-flex align-items-center"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft size={16} />
                <span className="d-none d-sm-inline ms-1">Anterior</span>
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                className="d-flex align-items-center"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="d-none d-sm-inline me-1">Siguiente</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>

      <TipoForm
        show={showForm}
        onHide={handleCloseForm}
        onSubmit={handleSubmit}
        initialData={selectedTipo}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
