import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { locationSchema, LocationSchemaType } from "../schemas/location-schema";

type Mode = "create" | "edit";

interface LocationModalProps {
  show: boolean;
  onHide: () => void;
  mode: Mode;
  defaultValues?: Partial<LocationSchemaType>;
  onSubmitForm: (data: LocationSchemaType) => void;
  isLoading: boolean;
}

const LocationModal: React.FC<LocationModalProps> = ({
  show,
  onHide,
  mode,
  defaultValues,
  onSubmitForm,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LocationSchemaType>({
    resolver: zodResolver(locationSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (defaultValues) {
      const values = { ...defaultValues };
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key as keyof LocationSchemaType, value);
        }
      });
    } else {
      reset();
    }
  }, [defaultValues, setValue, reset]);

  const onSubmit = (data: LocationSchemaType) => {
    onSubmitForm(data);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered className="modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "create" ? "Registrar Ubicación" : "Editar Ubicación"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control {...register("name")} isInvalid={!!errors.name} />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>País</Form.Label>
                <Form.Control
                  {...register("country")}
                  isInvalid={!!errors.country}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.country?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-2">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("description")}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Latitud</Form.Label>
                <Form.Control
                  type="text"
                  {...register("lat", {
                    setValueAs: (value) => value.toString(),
                  })}
                  isInvalid={!!errors.lat}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lat?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Longitud</Form.Label>
                <Form.Control
                  type="text"
                  {...register("lon", {
                    setValueAs: (value) => value.toString(),
                  })}
                  isInvalid={!!errors.lon}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lon?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="url"
                  {...register("url")}
                  isInvalid={!!errors.url}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.url?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>URL de la imagen</Form.Label>
                <Form.Control
                  type="url"
                  {...register("image")}
                  isInvalid={!!errors.image}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.image?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {mode === "create" ? "Registrar" : "Guardar cambios"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LocationModal;
