import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RentalSchemaType, RentalSchema } from "../schemas/rental.schema";
import MyDatePicker from "./elements/MyDatePicker";
import { useLocations } from "../hooks/useLocations";

type Mode = "create" | "edit";

interface RentalModalProps {
  show: boolean;
  onHide: () => void;
  mode: Mode;
  defaultValues?: Partial<RentalSchemaType>;
  onSubmitForm: (data: RentalSchemaType) => void;
  isLoading: boolean;
}

const RentalModal: React.FC<RentalModalProps> = ({
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
    control,
    formState: { errors },
  } = useForm<RentalSchemaType>({
    resolver: zodResolver(RentalSchema),
    defaultValues,
    mode: "onChange",
  });

  console.log(errors);

  const { locations } = useLocations();

  useEffect(() => {
    if (defaultValues) {
      const values = { ...defaultValues };
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key as keyof RentalSchemaType, value);
        }
      });
    } else {
      reset();
    }
  }, [defaultValues, setValue, reset]);

  const onSubmit = (data: RentalSchemaType) => {
    onSubmitForm(data);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered className="modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "create" ? "Registrar Alquiler" : "Editar Alquiler"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Car ID</Form.Label>
                <Form.Control
                  {...register("car_id", { valueAsNumber: true })}
                  isInvalid={!!errors.car_id}
                  type="number"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.car_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  {...register("user_id", { valueAsNumber: true })}
                  isInvalid={!!errors.user_id}
                  type="number"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.user_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Total a pagar</Form.Label>
                <Form.Control
                  type="number"
                  {...register("total_price", { valueAsNumber: true })}
                  isInvalid={!!errors.total_price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.total_price?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Tipo de Entrega</Form.Label>
                <Form.Select
                  {...register("delivery_type")}
                  isInvalid={!!errors.delivery_type}
                >
                  <option value="">Selecciona tipo de entrega</option>
                  <option value="physical">Física</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.delivery_type?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Origen de Renta</Form.Label>
                <Form.Select
                  {...register("rented_by")}
                  isInvalid={!!errors.rented_by}
                >
                  <option value="">Selecciona origen</option>
                  <option value="web">Web</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.rented_by?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Código de Reserva</Form.Label>
                <Form.Control
                  {...register("reserve_code")}
                  isInvalid={!!errors.reserve_code}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.reserve_code?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Fecha de inicio</Form.Label>
                <div className="input-calendar">
                  <Controller
                    control={control}
                    name="start_date"
                    render={({ field }) => {
                      const dateValue = field.value
                        ? new Date(field.value)
                        : null;
                      return (
                        <>
                          <MyDatePicker
                            form
                            disablePastDays
                            value={dateValue}
                            onChange={(date: Date | null) =>
                              field.onChange(date ? date.toISOString() : "")
                            }
                          />
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.5312 1.3828H13.8595V0.703125C13.8595 0.314789 13.5448 0 13.1564 0C12.7681 0 12.4533 0.314789 12.4533 0.703125V1.3828H5.55469V0.703125C5.55469 0.314789 5.2399 0 4.85156 0C4.46323 0 4.14844 0.314789 4.14844 0.703125V1.3828H3.47678C1.55967 1.3828 0 2.94247 0 4.85954V14.5232C0 16.4403 1.55967 18 3.47678 18H14.5313C16.4483 18 18.008 16.4403 18.008 14.5232V4.85954C18.008 2.94247 16.4483 1.3828 14.5312 1.3828ZM3.47678 2.78905H4.14844V4.16014C4.14844 4.54848 4.46323 4.86327 4.85156 4.86327C5.2399 4.86327 5.55469 4.54848 5.55469 4.16014V2.78905H12.4533V4.16014C12.4533 4.54848 12.7681 4.86327 13.1565 4.86327C13.5448 4.86327 13.8596 4.54848 13.8596 4.16014V2.78905H14.5313C15.6729 2.78905 16.6018 3.71788 16.6018 4.85954V5.53124H1.40625V4.85954C1.40625 3.71788 2.33508 2.78905 3.47678 2.78905ZM14.5312 16.5938H3.47678C2.33508 16.5938 1.40625 15.6649 1.40625 14.5232V6.93749H16.6018V14.5232C16.6018 15.6649 15.6729 16.5938 14.5312 16.5938ZM6.24611 9.70312C6.24611 10.0915 5.93132 10.4062 5.54298 10.4062H4.16018C3.77184 10.4062 3.45705 10.0915 3.45705 9.70312C3.45705 9.31479 3.77184 9 4.16018 9H5.54298C5.93128 9 6.24611 9.31479 6.24611 9.70312ZM14.551 9.70312C14.551 10.0915 14.2362 10.4062 13.8479 10.4062H12.4651C12.0767 10.4062 11.7619 10.0915 11.7619 9.70312C11.7619 9.31479 12.0767 9 12.4651 9H13.8479C14.2362 9 14.551 9.31479 14.551 9.70312ZM10.3945 9.70312C10.3945 10.0915 10.0798 10.4062 9.69142 10.4062H8.30862C7.92028 10.4062 7.60549 10.0915 7.60549 9.70312C7.60549 9.31479 7.92028 9 8.30862 9H9.69142C10.0797 9 10.3945 9.31479 10.3945 9.70312ZM6.24611 13.8516C6.24611 14.2399 5.93132 14.5547 5.54298 14.5547H4.16018C3.77184 14.5547 3.45705 14.2399 3.45705 13.8516C3.45705 13.4632 3.77184 13.1484 4.16018 13.1484H5.54298C5.93128 13.1484 6.24611 13.4632 6.24611 13.8516ZM14.551 13.8516C14.551 14.2399 14.2362 14.5547 13.8479 14.5547H12.4651C12.0767 14.5547 11.7619 14.2399 11.7619 13.8516C11.7619 13.4632 12.0767 13.1484 12.4651 13.1484H13.8479C14.2362 13.1484 14.551 13.4632 14.551 13.8516ZM10.3945 13.8516C10.3945 14.2399 10.0798 14.5547 9.69142 14.5547H8.30862C7.92028 14.5547 7.60549 14.2399 7.60549 13.8516C7.60549 13.4632 7.92028 13.1484 8.30862 13.1484H9.69142C10.0797 13.1484 10.3945 13.4632 10.3945 13.8516Z"
                              fill="currentColor"
                            />
                          </svg>
                        </>
                      );
                    }}
                  />
                </div>
                {errors.start_date && (
                  <div className="invalid-feedback d-block">
                    {errors.start_date.message}
                  </div>
                )}
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Fecha de fin</Form.Label>
                <div className="input-calendar">
                  <Controller
                    control={control}
                    name="end_date"
                    render={({ field }) => {
                      const dateValue = field.value
                        ? new Date(field.value)
                        : null;
                      return (
                        <>
                          <MyDatePicker
                            form
                            disablePastDays
                            value={dateValue}
                            onChange={(date: Date | null) =>
                              field.onChange(date ? date.toISOString() : "")
                            }
                          />
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.5312 1.3828H13.8595V0.703125C13.8595 0.314789 13.5448 0 13.1564 0C12.7681 0 12.4533 0.314789 12.4533 0.703125V1.3828H5.55469V0.703125C5.55469 0.314789 5.2399 0 4.85156 0C4.46323 0 4.14844 0.314789 4.14844 0.703125V1.3828H3.47678C1.55967 1.3828 0 2.94247 0 4.85954V14.5232C0 16.4403 1.55967 18 3.47678 18H14.5313C16.4483 18 18.008 16.4403 18.008 14.5232V4.85954C18.008 2.94247 16.4483 1.3828 14.5312 1.3828ZM3.47678 2.78905H4.14844V4.16014C4.14844 4.54848 4.46323 4.86327 4.85156 4.86327C5.2399 4.86327 5.55469 4.54848 5.55469 4.16014V2.78905H12.4533V4.16014C12.4533 4.54848 12.7681 4.86327 13.1565 4.86327C13.5448 4.86327 13.8596 4.54848 13.8596 4.16014V2.78905H14.5313C15.6729 2.78905 16.6018 3.71788 16.6018 4.85954V5.53124H1.40625V4.85954C1.40625 3.71788 2.33508 2.78905 3.47678 2.78905ZM14.5312 16.5938H3.47678C2.33508 16.5938 1.40625 15.6649 1.40625 14.5232V6.93749H16.6018V14.5232C16.6018 15.6649 15.6729 16.5938 14.5312 16.5938ZM6.24611 9.70312C6.24611 10.0915 5.93132 10.4062 5.54298 10.4062H4.16018C3.77184 10.4062 3.45705 10.0915 3.45705 9.70312C3.45705 9.31479 3.77184 9 4.16018 9H5.54298C5.93128 9 6.24611 9.31479 6.24611 9.70312ZM14.551 9.70312C14.551 10.0915 14.2362 10.4062 13.8479 10.4062H12.4651C12.0767 10.4062 11.7619 10.0915 11.7619 9.70312C11.7619 9.31479 12.0767 9 12.4651 9H13.8479C14.2362 9 14.551 9.31479 14.551 9.70312ZM10.3945 9.70312C10.3945 10.0915 10.0798 10.4062 9.69142 10.4062H8.30862C7.92028 10.4062 7.60549 10.0915 7.60549 9.70312C7.60549 9.31479 7.92028 9 8.30862 9H9.69142C10.0797 9 10.3945 9.31479 10.3945 9.70312ZM6.24611 13.8516C6.24611 14.2399 5.93132 14.5547 5.54298 14.5547H4.16018C3.77184 14.5547 3.45705 14.2399 3.45705 13.8516C3.45705 13.4632 3.77184 13.1484 4.16018 13.1484H5.54298C5.93128 13.1484 6.24611 13.4632 6.24611 13.8516ZM14.551 13.8516C14.551 14.2399 14.2362 14.5547 13.8479 14.5547H12.4651C12.0767 14.5547 11.7619 14.2399 11.7619 13.8516C11.7619 13.4632 12.0767 13.1484 12.4651 13.1484H13.8479C14.2362 13.1484 14.551 13.4632 14.551 13.8516ZM10.3945 13.8516C10.3945 14.2399 10.0798 14.5547 9.69142 14.5547H8.30862C7.92028 14.5547 7.60549 14.2399 7.60549 13.8516C7.60549 13.4632 7.92028 13.1484 8.30862 13.1484H9.69142C10.0797 13.1484 10.3945 13.4632 10.3945 13.8516Z"
                              fill="currentColor"
                            />
                          </svg>
                        </>
                      );
                    }}
                  />
                </div>
                {errors.end_date && (
                  <div className="invalid-feedback d-block">
                    {errors.end_date.message}
                  </div>
                )}
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Método de pago</Form.Label>
                <Form.Select
                  {...register("payment_method")}
                  isInvalid={!!errors.payment_method}
                >
                  <option value="">Selecciona método de pago</option>
                  <option value="cash">Efectivo</option>
                  <option value="card">Tarjeta</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.payment_method?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Conductor</Form.Label>
                <Form.Control
                  {...register("driver")}
                  isInvalid={!!errors.driver}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.driver?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Licencia del conductor</Form.Label>
                <Form.Control
                  type="number"
                  {...register("driver_lic", { valueAsNumber: true })}
                  isInvalid={!!errors.driver_lic}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.driver_lic?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Informe de daños</Form.Label>
                <Form.Control
                  {...register("damage_report")}
                  isInvalid={!!errors.damage_report}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.damage_report?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Conductor adicional</Form.Label>
                <Form.Control
                  {...register("ad_driver")}
                  isInvalid={!!errors.ad_driver}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ad_driver?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Licencia conductor adicional</Form.Label>
                <Form.Control
                  type="number"
                  {...register("ad_driver_lic", { valueAsNumber: true })}
                  isInvalid={!!errors.ad_driver_lic}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ad_driver_lic?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>¿Con gasolina?</Form.Label>
                <Form.Check
                  type="checkbox"
                  {...register("with_gas")}
                  isInvalid={!!errors.with_gas}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.with_gas?.message}
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
                  <option value="active">Activo</option>
                  <option value="completed">Completado</option>
                  <option value="cancelled">Cancelado</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.status?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Ubicación de recogida</Form.Label>
                <Form.Select
                  {...register("pickup_location_id", { valueAsNumber: true })}
                  isInvalid={!!errors.pickup_location_id}
                >
                  <option value="">Selecciona ubicación</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.pickup_location_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Ubicación de entrega</Form.Label>
                <Form.Select
                  {...register("return_location_id", { valueAsNumber: true })}
                  isInvalid={!!errors.return_location_id}
                >
                  <option value="">Selecciona ubicación</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.return_location_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-2">
                <Form.Label>Comentarios</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ resize: "none", height: "120px" }}
                  {...register("comments")}
                  isInvalid={!!errors.comments}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.comments?.message}
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

export default RentalModal;
