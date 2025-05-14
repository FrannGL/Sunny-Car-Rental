import { CouponSchemaType, couponSchema } from "@/src/schemas/coupon-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import MyDatePicker from "./elements/MyDatePicker";
import { useEffect } from "react";

interface CouponModalProps {
  show: boolean;
  onHide: () => void;
  mode: "create" | "edit";
  defaultValues?: Partial<CouponSchemaType>;
  onSubmitForm: (data: CouponSchemaType) => Promise<void>;
  isLoading?: boolean;
}

const CouponModal = ({
  show,
  onHide,
  mode,
  defaultValues,
  onSubmitForm,
  isLoading,
}: CouponModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CouponSchemaType>({
    resolver: zodResolver(couponSchema),
    defaultValues,
  });

  useEffect(() => {
    if (show && mode === "edit" && defaultValues) {
      reset(defaultValues);
    } else if (show && mode === "create") {
      reset({
        code: "",
        discount: 0,
        start_date: "",
        end_date: "",
      });
    }
  }, [show, mode, defaultValues, reset]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "create" ? "Crear Cupón" : "Editar Cupón"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Código</Form.Label>
                <Form.Control {...register("code")} isInvalid={!!errors.code} />
                <Form.Control.Feedback type="invalid">
                  {errors.code?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Descuento</Form.Label>
                <Form.Control
                  type="number"
                  {...register("discount", { valueAsNumber: true })}
                  isInvalid={!!errors.discount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.discount?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Fecha de inicio</Form.Label>
                <Controller
                  control={control}
                  name="start_date"
                  render={({ field }) => (
                    <MyDatePicker
                      form
                      disablePastDays
                      value={field.value ? new Date(field.value) : null}
                      onChange={(date: Date | null) =>
                        field.onChange(date ? date.toISOString() : "")
                      }
                    />
                  )}
                />
                {errors.start_date && (
                  <div className="invalid-feedback d-block">
                    {errors.start_date.message}
                  </div>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label>Fecha de fin</Form.Label>
                <Controller
                  control={control}
                  name="end_date"
                  render={({ field }) => (
                    <MyDatePicker
                      form
                      disablePastDays
                      value={field.value ? new Date(field.value) : null}
                      onChange={(date: Date | null) =>
                        field.onChange(date ? date.toISOString() : "")
                      }
                    />
                  )}
                />
                {errors.end_date && (
                  <div className="invalid-feedback d-block">
                    {errors.end_date.message}
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
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CouponModal;
