import { Rental } from "@/src/types/rentals";
import { Badge, Container, Row, Col, Modal, Button } from "react-bootstrap";

interface RentalDetailProps {
  rental: Rental | null;
  show: boolean;
  onHide: () => void;
}

const RentalDetail = ({ onHide, rental, show }: RentalDetailProps) => {
  if (!rental) {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Renta</Modal.Title>
        </Modal.Header>
        <Modal.Body>Renta no encontrada.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalles de la Renta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="mb-3">
            <Col sm={6}>
              <strong>ID:</strong> {rental.id}
            </Col>
            <Col sm={6}>
              <strong>Vehículo:</strong> {rental.car_id}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={6}>
              <strong>Cliente:</strong> {rental.user_id}
            </Col>
            <Col sm={6}>
              <strong>Inicio:</strong>{" "}
              {new Date(rental.start_date).toLocaleDateString()}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={6}>
              <strong>Fin:</strong>{" "}
              {new Date(rental.end_date).toLocaleDateString()}
            </Col>
            <Col sm={6}>
              <strong>Método de Pago:</strong> {rental.payment_method}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={6}>
              <strong>Con Conductor:</strong> {rental.driver ? "Sí" : "No"}
            </Col>
            <Col sm={6}>
              <strong>Licencia de Conductor:</strong>{" "}
              {rental.driver_lic || "N/A"}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={6}>
              <strong>Reporte de Daños:</strong>{" "}
              {rental.damage_report || "Ninguno"}
            </Col>
            <Col sm={6}>
              <strong>Comentarios:</strong> {rental.comments || "Ninguno"}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={6}>
              <strong>Con Gas:</strong> {rental.with_gas ? "Sí" : "No"}
            </Col>
            <Col sm={6}>
              <strong>Precio Total:</strong> ${rental.total_price}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={6}>
              <strong>Estado:</strong>{" "}
              <Badge
                bg={
                  rental.status === "active"
                    ? "success"
                    : rental.status === "cancelled"
                    ? "danger"
                    : "secondary"
                }
              >
                {rental.status.toUpperCase()}
              </Badge>
            </Col>
            <Col sm={6}>
              <strong>Ubicación de Recogida:</strong>{" "}
              {rental.pickup_location_id || "No especificada"}
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <strong>Ubicación de Retorno:</strong>{" "}
              {rental.return_location_id || "No especificada"}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RentalDetail;
