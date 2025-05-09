import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carSchema, CarSchema } from "../schemas/car.schema";
import { Location } from "@/src/types/locations";
import { useDropzone } from "react-dropzone";

type Mode = "create" | "edit";

interface CarModalProps {
  show: boolean;
  onHide: () => void;
  mode: Mode;
  defaultValues?: Partial<CarSchema>;
  locations: Location[];
  onSubmitForm: (data: CarSchema) => void;
  isLoading: boolean;
}

const CarModal: React.FC<CarModalProps> = ({
  show,
  onHide,
  mode,
  defaultValues,
  locations,
  onSubmitForm,
  isLoading,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CarSchema>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      ...defaultValues,
      location: defaultValues?.location || undefined,
    },
    mode: "onChange",
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
        setValue("image_base64", reader.result as string);
      };
      reader.readAsDataURL(file);
    },
  });

  useEffect(() => {
    if (defaultValues) {
      const values = {
        ...defaultValues,
        location: defaultValues?.location || undefined,
      };

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key as keyof CarSchema, value);
        }
      });

      if (defaultValues.image_base64) {
        setPreviewImage(defaultValues.image_base64);
      }
    } else {
      reset();
      setPreviewImage(null);
      setFile(null);
    }
  }, [defaultValues, setValue, reset]);

  const onSubmit = (data: CarSchema) => {
    onSubmitForm(data);
    onHide();
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFile(null);
    setValue("image_base64", "");
  };

  return (
    <Modal show={show} onHide={onHide} centered className="modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "create" ? "Registrar Auto" : "Editar Auto"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="g-3">
            {/* Fila 1 */}
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  {...register("brand")}
                  isInvalid={!!errors.brand}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.brand?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  {...register("model")}
                  isInvalid={!!errors.model}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.model?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Año</Form.Label>
                <Form.Control
                  type="number"
                  {...register("year", { valueAsNumber: true })}
                  isInvalid={!!errors.year}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.year?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Fila 2 */}
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Placa</Form.Label>
                <Form.Control
                  {...register("plate_number")}
                  isInvalid={!!errors.plate_number}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.plate_number?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  {...register("status")}
                  isInvalid={!!errors.status}
                >
                  <option value="">Selecciona estado</option>
                  <option value="available">Disponible</option>
                  <option value="unavailable">No disponible</option>
                  <option value="rented">Rentado</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.status?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Precio por día</Form.Label>
                <Form.Control
                  type="number"
                  {...register("price_per_day", { valueAsNumber: true })}
                  isInvalid={!!errors.price_per_day}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price_per_day?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Fila 3 */}
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Gama</Form.Label>
                <Form.Select {...register("gama")} isInvalid={!!errors.gama}>
                  <option value="">Selecciona gama</option>
                  <option value="economica">Economica</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gama?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Ubicación</Form.Label>
                <Form.Select
                  isInvalid={!!errors.location}
                  disabled={isLoading}
                  onChange={(e) => {
                    const selectedLocation = locations.find(
                      (loc) => loc.id === Number(e.target.value)
                    );
                    if (selectedLocation) {
                      setValue("location", selectedLocation, {
                        shouldValidate: true,
                      });
                    }
                  }}
                  value={watch("location")?.id ?? ""}
                >
                  <option value="">Selecciona ubicación</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.location?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Dropzone para imágenes */}
            <Col md={12}>
              <Form.Group className="mb-2">
                <Form.Label>Imagen del vehículo</Form.Label>
                {!file && (
                  <div
                    {...getRootProps()}
                    className={`dropzone ${isDragActive ? "active" : ""}`}
                    style={{
                      border: "2px dashed #ced4da",
                      borderRadius: "4px",
                      padding: "20px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: isDragActive ? "#f8f9fa" : "white",
                      minHeight: "100px",
                    }}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Suelta la imagen aquí...</p>
                    ) : (
                      <p>
                        Arrastra una imagen aquí o haz clic para seleccionar
                      </p>
                    )}
                    <small className="text-muted">
                      Formatos aceptados: JPEG, JPG, PNG, WEBP
                    </small>
                  </div>
                )}

                {/* Vista previa de la imagen */}
                {previewImage && (
                  <div className="mt-3">
                    <div
                      className="position-relative"
                      style={{ width: "150px" }}
                    >
                      <img
                        src={previewImage}
                        alt="preview"
                        className="img-thumbnail"
                        style={{ height: "100px", objectFit: "cover" }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0 p-0"
                        style={{ width: "24px", height: "24px" }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveImage();
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {mode === "create" ? "Registrar" : "Guardar cambios"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CarModal;
