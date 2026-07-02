import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal, Button, Form } from "react-bootstrap";
import type { Ciudad } from "../../../types/entities/Ciudad";
import { useEffect } from "react";

const ciudadSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100),
  estado: z.string().min(1, "El estado es requerido"),
});

type CiudadFormData = z.infer<typeof ciudadSchema>;

interface CiudadFormProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: CiudadFormData) => void;
  initialData?: Ciudad | null;
  isLoading?: boolean;
}

export default function CiudadForm({
  show,
  onHide,
  onSubmit,
  initialData,
  isLoading,
}: CiudadFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CiudadFormData>({
    resolver: zodResolver(ciudadSchema),
    defaultValues: {
      nombre: "",
      estado: "A",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        nombre: initialData.nombre,
        estado: initialData.estado,
      });
    } else {
      reset({
        nombre: "",
        estado: "A",
      });
    }
  }, [initialData, reset, show]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? "Editar Ciudad" : "Nueva Ciudad"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la Ciudad</Form.Label>
            <Form.Control
              type="text"
              {...register("nombre")}
              isInvalid={!!errors.nombre}
              placeholder="Ej. Guayaquil"
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select {...register("estado")} isInvalid={!!errors.estado}>
              <option value="A">Activo</option>
              <option value="I">Inactivo</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.estado?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
