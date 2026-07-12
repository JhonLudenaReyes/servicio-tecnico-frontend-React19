import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal, Button, Form } from "react-bootstrap";
import type { Tipo } from "../../../types/entities/Tipo";
import { useEffect } from "react";

const tipoSchema = z.object({
  nombre: z
    .string()
    .min(3, "El tipo debe tener al menos 3 caracteres")
    .max(100),
});

type TipoFormData = z.infer<typeof tipoSchema>;

interface TipoFormProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: TipoFormData) => void;
  initialData?: Tipo | null;
  isLoading?: boolean;
}

export default function TipoForm({
  show,
  onHide,
  onSubmit,
  initialData,
  isLoading,
}: TipoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TipoFormData>({
    resolver: zodResolver(tipoSchema),
    defaultValues: {
      nombre: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        nombre: initialData.nombre,
      });
    } else {
      reset({
        nombre: "",
      });
    }
  }, [initialData, reset, show]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Editar Tipo" : "Nuevo Tipo"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Tipo</Form.Label>
            <Form.Control
              type="text"
              {...register("nombre")}
              isInvalid={!!errors.nombre}
              placeholder="Ej. Laptop"
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
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
