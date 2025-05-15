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
              <strong>Método de Pago:</strong>{" "}
              <Badge bg="info">{rental.payment_method.toUpperCase()}</Badge>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={6}>
              <strong>Conductor:</strong> {rental.driver}
            </Col>
            <Col sm={6}>
              <strong>Licencia:</strong>{" "}
              <Badge bg="dark">{rental.driver_lic || "N/A"}</Badge>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={6}>
              <strong>Conductor Adicional:</strong> {rental.ad_driver || "No"}
            </Col>
            <Col sm={6}>
              <strong>Licencia Adicional:</strong>{" "}
              <Badge bg="dark">{rental.ad_driver_lic || "N/A"}</Badge>
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
              <strong>Con Gas:</strong>{" "}
              <Badge bg={rental.with_gas ? "success" : "danger"}>
                {rental.with_gas ? "SÍ" : "NO"}
              </Badge>
            </Col>
            <Col sm={6}>
              <strong>Precio Total:</strong>{" "}
              <Badge bg="success">${rental.total_price}</Badge>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={6}>
              <strong>Tipo de Entrega:</strong>{" "}
              <Badge bg="info">{rental.delivery_type.toUpperCase()}</Badge>
            </Col>
            <Col sm={6}>
              <strong>Origen de Renta:</strong>{" "}
              <Badge bg="secondary">{rental.rented_by.toUpperCase()}</Badge>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={6}>
              <strong>Código de Reserva:</strong>{" "}
              <Badge bg="dark">{rental.reserve_code}</Badge>
            </Col>
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
