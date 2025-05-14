"use client";

import ConfirmationModal from "@/src/components/ConfirmationModal";
import RentalDetail from "@/src/components/RentalDetail";
import RentalModal from "@/src/components/RentalModal";
import { useRentals } from "@/src/hooks/useRentals";
import { RentalSchemaType } from "@/src/schemas/rental.schema";
import { Rental } from "@/src/types/rentals";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Badge, Button, Container, Stack, Table } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const statusVariant = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "cancelled":
      return "danger";
    case "completed":
      return "secondary";
    default:
      return "warning";
  }
};

const RentalTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentRental, setCurrentRental] = useState<Rental | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [rentalToDelete, setRentalToDelete] = useState<Rental | null>(null);

  const {
    rentals,
    createRental,
    updateRental,
    deleteRental,
    isLoadingRentals,
    isDeleting,
  } = useRentals();

  const handleNewClick = () => {
    setCurrentRental(null);
    setShowModal(true);
  };

  const handleEditClick = (rental: Rental) => {
    setCurrentRental(rental);
    setShowModal(true);
  };

  const handleDeleteClick = (rental: Rental) => {
    setRentalToDelete(rental);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentRental(null);
  };

  const handleViewDetails = (rental: Rental) => {
    setCurrentRental(rental);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setCurrentRental(null);
  };

  const confirmDelete = async () => {
    if (rentalToDelete) {
      try {
        await deleteRental(rentalToDelete.id);
        toast.success("Renta eliminada");
      } catch (err) {
        toast.error("Error al eliminar la renta");
      } finally {
        setRentalToDelete(null);
      }
    }
  };

  const cancelDelete = () => setRentalToDelete(null);

  const handleSubmit = async (data: RentalSchemaType) => {
    try {
      if (currentRental) {
        await updateRental({ id: currentRental.id, data });
        toast.success("Renta actualizada correctamente!", {
          duration: 3000,
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      } else {
        await createRental(data);
        toast.success("Renta creada correctamente!", {
          duration: 3000,
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      }
      handleCloseModal();
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    }
  };

  if (isLoadingRentals) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <ClipLoader size={40} color="#36d7b7" />
      </div>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: "1200px" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Rentas</h2>
            <Button onClick={handleNewClick} variant="primary">
              <Icon icon="material-symbols-light:add" width={20} />
              Nueva renta
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Vehículo</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Método de Pago</th>
                <th>Tipo de Entrega</th>
                <th>Origen</th>
                <th>Código</th>
                <th>Estado</th>
                <th>Precio total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rentals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    No hay rentas registradas
                  </td>
                </tr>
              ) : (
                rentals.map((rental) => (
                  <tr key={rental.id}>
                    <td>{rental.user_id}</td>
                    <td>{rental.car_id}</td>
                    <td>{new Date(rental.start_date).toLocaleDateString()}</td>
                    <td>{new Date(rental.end_date).toLocaleDateString()}</td>
                    <td>{rental.payment_method.toUpperCase()}</td>
                    <td>
                      <Badge bg="info">
                        {rental.delivery_type.toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg="secondary">
                        {rental.rented_by.toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg="dark">{rental.reserve_code}</Badge>
                    </td>
                    <td>
                      <Badge bg={statusVariant(rental.status)}>
                        {rental.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td>${rental.total_price}</td>
                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <Button
                          variant="outline-dark"
                          size="sm"
                          title="Ver detalles"
                          style={{ padding: "0.2rem 0.5rem" }}
                          onClick={() => handleViewDetails(rental)}
                        >
                          <Icon icon="mdi:external-link" width={16} />
                        </Button>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          title="Editar"
                          style={{ padding: "0.2rem 0.5rem" }}
                          onClick={() => handleEditClick(rental)}
                        >
                          <Icon icon="mdi:pencil-outline" width={16} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          title="Eliminar"
                          style={{ padding: "0.2rem 0.5rem" }}
                          onClick={() => handleDeleteClick(rental)}
                        >
                          <Icon icon="mdi:trash-can-outline" width={16} />
                        </Button>
                      </Stack>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <RentalDetail
        rental={currentRental}
        show={showDetailModal}
        onHide={handleCloseDetailModal}
      />

      <RentalModal
        show={showModal}
        onHide={handleCloseModal}
        mode={currentRental ? "edit" : "create"}
        defaultValues={currentRental as unknown as Partial<RentalSchemaType>}
        onSubmitForm={handleSubmit}
        isLoading={isLoadingRentals}
      />

      <ConfirmationModal
        show={!!rentalToDelete}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
        title="Eliminar renta"
        message={`¿Seguro que deseas eliminar la renta de ${rentalToDelete?.id}?`}
        isProcessing={isDeleting}
      />
    </Container>
  );
};

export default RentalTable;
