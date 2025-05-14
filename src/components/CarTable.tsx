"use client";

import { Car } from "@/src/types/car";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Badge, Button, Container, Stack, Table } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useCars } from "../hooks/useCars";
import { Link } from "../i18n/navigation";
import { CarSchema } from "../schemas/car.schema";
import CarModal from "./CarModal";
import ConfirmationModal from "./ConfirmationModal";

const statusVariant = (status: string) => {
  switch (status) {
    case "available":
      return "success";
    case "rented":
      return "danger";
    case "maintenance":
      return "warning";
    default:
      return "secondary";
  }
};

const gamaVariant = (gama: string) => {
  switch (gama) {
    case "low":
      return "light";
    case "medium":
      return "info";
    case "high":
      return "primary";
    case "premium":
      return "warning";
    default:
      return "secondary";
  }
};

const CarTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentCar, setCurrentCar] = useState<Car | null>(null);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);

  const {
    cars,
    locations,
    updateCar,
    createCar,
    deleteCar,
    isCreating,
    isLoadingCars,
    isDeleting,
  } = useCars();

  const handleNewClick = () => {
    setCurrentCar(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCar(null);
  };

  const handleEditClick = (car: Car) => {
    setCurrentCar(car);
    setShowModal(true);
  };

  const handleDeleteClick = (car: Car) => {
    setCarToDelete(car);
  };

  const confirmDelete = async () => {
    if (carToDelete) {
      try {
        await deleteCar(carToDelete.id);
      } catch (error) {
        console.error("Error al eliminar:", error);
      } finally {
        setCarToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setCarToDelete(null);
  };

  const handleSubmitNew = async (data: CarSchema) => {
    try {
      await createCar(data);
      toast.success("Vehículo creado correctamente");
      handleCloseModal();
    } catch (err: any) {
      toast.error(err.message || "Error al crear");
    }
  };

  const handleSubmitEdit = async (data: CarSchema) => {
    try {
      if (currentCar) {
        const updatedData = {
          ...data,
          location_id: data.location.id,
        };

        await updateCar({ id: currentCar.id, data: updatedData });
        toast.success("Vehículo actualizado correctamente!", {
          duration: 3000,
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
        handleCloseModal();
      } else {
        toast.error("No se pudo actualizar el vehículo", {
          duration: 3000,
          style: { backgroundColor: "#dc3545", color: "#fff" },
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Error al actualizar el vehículo");
    }
  };

  if (isLoadingCars) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "50vh",
          width: "100%",
          position: "relative",
        }}
      >
        <ClipLoader
          size={40}
          color="#36d7b7"
          cssOverride={{
            display: "block",
            margin: "0 auto",
            borderWidth: "4px",
          }}
        />
      </div>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: "1400px" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Vehículos</h2>
            <Button
              variant="primary"
              onClick={handleNewClick}
              className="d-flex align-items-center gap-1"
              disabled={isLoadingCars}
            >
              <Icon icon="material-symbols-light:add" width={20} />
              {isLoadingCars ? "Procesando..." : "Nuevo vehículo"}
            </Button>
          </div>
          <Table
            striped
            bordered
            hover
            responsive
            className="align-middle"
            style={{ fontSize: "1rem" }}
          >
            <thead>
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Placa</th>
                <th>Estado</th>
                <th>Precio/día</th>
                <th>Gama</th>
                <th>Transmisión</th>
                <th>Pasajeros</th>
                <th>Equipaje</th>
                <th>Kilometraje</th>
                <th>Código</th>
                <th>Ubicación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cars.length === 0 ? (
                <tr>
                  <td colSpan={14} className="text-center text-muted py-4">
                    No hay autos registrados
                  </td>
                </tr>
              ) : (
                cars.map((car) => (
                  <tr key={car.id}>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                    <td>
                      <Badge bg="dark">{car.plate_number}</Badge>
                    </td>
                    <td>
                      <Badge pill bg={statusVariant(car.status)}>
                        {car.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      <strong>${car.price_per_day}</strong>
                    </td>
                    <td>
                      <Badge bg={gamaVariant(car.gama)}>
                        {car.gama.toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg="info">{car.transmission.toUpperCase()}</Badge>
                    </td>
                    <td>
                      <Badge bg="secondary">
                        {car.passenger_capacity} PASAJEROS
                      </Badge>
                    </td>
                    <td>
                      <Badge bg="secondary">
                        {car.luggage_capacity} MALETAS
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={car.unlimited_mileage ? "success" : "warning"}>
                        {car.unlimited_mileage ? "ILIMITADO" : "LIMITADO"}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg="dark">{car.car_code}</Badge>
                    </td>
                    <td>{car.location?.name || "N/A"}</td>
                    <td>
                      <Stack
                        direction="horizontal"
                        gap={1}
                        className="justify-content-center"
                      >
                        <Link
                          href={`/cars-details/${car.id}`}
                          className="text-decoration-none"
                        >
                          <Button
                            variant="outline-dark"
                            size="sm"
                            title="Ver detalles"
                            style={{ padding: "0.2rem 0.5rem" }}
                            disabled={isLoadingCars}
                          >
                            <Icon icon="mdi:external-link" width={16} />
                          </Button>
                        </Link>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          title="Editar"
                          onClick={() => handleEditClick(car)}
                          style={{ padding: "0.2rem 0.5rem" }}
                          disabled={isLoadingCars}
                        >
                          <Icon icon="mdi:pencil-outline" width={16} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          title="Eliminar"
                          style={{ padding: "0.2rem 0.5rem" }}
                          disabled={isLoadingCars}
                          onClick={() => handleDeleteClick(car)}
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

      <ConfirmationModal
        show={!!carToDelete}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
        title="Confirmar eliminación"
        message={`¿Estás seguro que deseas eliminar el vehículo ${carToDelete?.brand} ${carToDelete?.model}?`}
        confirmText="Eliminar"
        isProcessing={isDeleting}
      />

      <CarModal
        show={showModal}
        onHide={handleCloseModal}
        mode={currentCar ? "edit" : "create"}
        defaultValues={
          currentCar ? (currentCar as Partial<CarSchema>) : undefined
        }
        locations={locations}
        onSubmitForm={currentCar ? handleSubmitEdit : handleSubmitNew}
        isLoading={isLoadingCars}
      />
    </Container>
  );
};

export default CarTable;
