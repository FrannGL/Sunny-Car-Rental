"use client";
import Layout from "@/src/components/layout/Layout";
import { useAuth } from "@/src/context/AuthContext";
import { useRentalById } from "@/src/hooks/useRentalById";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import { BsFillCalendarPlusFill } from "react-icons/bs";

export default function Rentals() {
  const { user } = useAuth();
  const { data, isLoading, error } = useRentalById(user?.id);

  const router = useRouter();

  if (isLoading) {
    return (
      <Layout footerStyle={1}>
        <Container className="py-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout footerStyle={1}>
        <Container className="py-5">
          <div className="alert alert-danger">
            Error al cargar las reservas. Por favor, intente nuevamente.
          </div>
        </Container>
      </Layout>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Layout footerStyle={1}>
        <Container className="py-5">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <p className="text-center text-muted">No tienes reservas activas</p>
            <Button
              variant="warning"
              size="sm"
              className="custom-booking-button d-flex align-items-center gap-2"
              style={{
                width: "fit-content",
                margin: "auto",
                padding: "10px 20px",
              }}
              onClick={() => router.push("/booking")}
            >
              <BsFillCalendarPlusFill size={18} />
              Reservar ahora
            </Button>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout footerStyle={1}>
      <Container className="py-5">
        <h1 className="mb-4">Mis Reservas</h1>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Código de Reserva</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
              <th>Estado</th>
              <th>Método de Pago</th>
              <th>Conductor</th>
              <th>Tipo de Entrega</th>
              <th>Con Gasolina</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((rental) => {
              const statusColor =
                rental.status === "active"
                  ? "success"
                  : rental.status === "completed"
                  ? "info"
                  : rental.status === "cancelled"
                  ? "danger"
                  : "secondary";

              const statusText =
                rental.status === "active"
                  ? "Activa"
                  : rental.status === "completed"
                  ? "Completada"
                  : rental.status === "cancelled"
                  ? "Cancelada"
                  : "Desconocido";

              const paymentMethodText =
                rental.payment_method === "cash"
                  ? "Efectivo"
                  : rental.payment_method === "card"
                  ? "Tarjeta"
                  : rental.payment_method || "N/A";

              const deliveryTypeText =
                rental.delivery_type === "physical"
                  ? "Físico"
                  : rental.delivery_type || "N/A";

              return (
                <tr key={rental.id}>
                  <td>{rental.reserve_code || "N/A"}</td>
                  <td>
                    {rental.start_date
                      ? format(new Date(rental.start_date), "dd/MM/yyyy", {
                          locale: es,
                        })
                      : "N/A"}
                  </td>
                  <td>
                    {rental.end_date
                      ? format(new Date(rental.end_date), "dd/MM/yyyy", {
                          locale: es,
                        })
                      : "N/A"}
                  </td>
                  <td>
                    <span className={`badge bg-${statusColor}`}>
                      {statusText}
                    </span>
                  </td>
                  <td>{paymentMethodText}</td>
                  <td>{rental.driver || "N/A"}</td>
                  <td>{deliveryTypeText}</td>
                  <td>
                    {rental.with_gas !== undefined
                      ? rental.with_gas
                        ? "Sí"
                        : "No"
                      : "N/A"}
                  </td>
                  <td>${(rental.total_price || 0).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
}
