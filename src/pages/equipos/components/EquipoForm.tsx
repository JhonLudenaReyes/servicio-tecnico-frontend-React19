import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import type { Equipo } from "../../../types/entities/Equipo";
import type { Tipo } from "../../../types/entities/Tipo";

const equipoSchema = z.object({
  idTipo: z.number().min(1, "Selecciona el tipo de equipo"),
  marca: z
    .string()
    .min(2, "La marca debe tener al menos 2 caracteres")
    .max(100),
  modelo: z.string().min(1, "El modelo es obligatorio").max(100),
  serie: z.string().min(1, "La serie es obligatoria").max(100),
  mainboard: z.string().max(100).optional(),
  procesador: z.string().max(100).optional(),
  memoria: z.string().max(100).optional(),
  discoDuro: z.string().max(100).optional(),
  fuente: z.string().max(100).optional(),
  casePc: z.string().max(100).optional(),
  estado: z.string().min(2, "El estado es obligatorio").max(50),
});

export type EquipoFormData = z.infer<typeof equipoSchema>;

interface EquipoFormProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: EquipoFormData) => void;
  initialData?: Equipo | null;
  tipos: Tipo[];
  isLoading?: boolean;
}

export default function EquipoForm({
  show,
  onHide,
  onSubmit,
  initialData,
  tipos,
  isLoading,
}: EquipoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EquipoFormData>({
    resolver: zodResolver(equipoSchema),
    defaultValues: {
      idTipo: 0,
      marca: "",
      modelo: "",
      serie: "",
      mainboard: "",
      procesador: "",
      memoria: "",
      discoDuro: "",
      fuente: "",
      casePc: "",
      estado: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        idTipo: initialData.idTipo,
        marca: initialData.marca,
        modelo: initialData.modelo,
        serie: initialData.serie,
        mainboard: initialData.mainboard ?? "",
        procesador: initialData.procesador ?? "",
        memoria: initialData.memoria ?? "",
        discoDuro: initialData.discoDuro ?? "",
        fuente: initialData.fuente ?? "",
        casePc: initialData.casePc ?? "",
        estado: initialData.estado,
      });
    } else {
      reset({
        idTipo: 0,
        marca: "",
        modelo: "",
        serie: "",
        mainboard: "",
        procesador: "",
        memoria: "",
        discoDuro: "",
        fuente: "",
        casePc: "",
        estado: "",
      });
    }
  }, [initialData, reset, show]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? "Editar Equipo" : "Nuevo Equipo"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Tipo de Equipo</Form.Label>
                <Form.Select
                  {...register("idTipo", { valueAsNumber: true })}
                  isInvalid={!!errors.idTipo}
                >
                  <option value={0}>Selecciona el tipo</option>
                  {tipos.map((tipo) => (
                    <option key={tipo.idTipo} value={tipo.idTipo}>
                      {tipo.nombre}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.idTipo?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Dell"
                  {...register("marca")}
                  isInvalid={!!errors.marca}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.marca?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Inspiron 15"
                  {...register("modelo")}
                  isInvalid={!!errors.modelo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.modelo?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Serie</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. ABC123456"
                  {...register("serie")}
                  isInvalid={!!errors.serie}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.serie?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  {...register("estado")}
                  isInvalid={!!errors.estado}
                >
                  <option value="">Selecciona un estado</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="En reparación">En reparación</option>
                  <option value="En espera">En espera</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.estado?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Mainboard</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. ASUS TUF"
                  {...register("mainboard")}
                  isInvalid={!!errors.mainboard}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mainboard?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Procesador</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Intel Core i7"
                  {...register("procesador")}
                  isInvalid={!!errors.procesador}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.procesador?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Memoria</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. 16 GB DDR4"
                  {...register("memoria")}
                  isInvalid={!!errors.memoria}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.memoria?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Disco Duro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. 512 GB SSD"
                  {...register("discoDuro")}
                  isInvalid={!!errors.discoDuro}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.discoDuro?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Fuente</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. 650W"
                  {...register("fuente")}
                  isInvalid={!!errors.fuente}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fuente?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Case</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Mid Tower"
                  {...register("casePc")}
                  isInvalid={!!errors.casePc}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.casePc?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
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
