import { useState } from "react";
import { Table, Button, Container, Badge, Stack } from "react-bootstrap";
import { Car } from "@/src/types/car";
import { Icon } from "@iconify/react";
import { Link } from "../i18n/navigation";
import { useCarStore } from "../store/useCarStore";
import CarModal from "./CarModal";
import { CarSchema } from "../schemas/car.schema";

interface CarTableProps {
  cars: Car[];
}

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

const CarTable = ({ cars }: CarTableProps) => {
  const [showModal, setShowModal] = useState(false);
  const [currentCar, setCurrentCar] = useState<Car | null>(null);

  const { locations } = useCarStore();

  const handleEditClick = (car: Car) => {
    setCurrentCar(car);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCar(null);
  };

  const handleSubmitPost = async (data: CarSchema) => {
    try {
      const response = await fetch(`/api/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al crear el auto");
      }

      const newCar = await response.json();
      console.log("Auto creado correctamente:", newCar);

      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitEdit = async (data: CarSchema) => {
    if (!currentCar) return;

    try {
      const response = await fetch(`/api/cars/${currentCar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el auto");
      }

      const updatedCar = await response.json();
      console.log("Actualizado correctamente:", updatedCar);

      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-center">
        <div className="w-100" style={{ maxWidth: "1200px" }}>
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
                <th>Ubicación</th>
                <th>Creado</th>
                <th>Actualizado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cars.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center text-muted py-4">
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
                    <td>{car.location?.name || "N/A"}</td>
                    <td>{new Date(car.created_at).toLocaleDateString()}</td>
                    <td>{new Date(car.updated_at).toLocaleDateString()}</td>
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
                        >
                          <Icon icon="mdi:pencil-outline" width={16} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          title="Eliminar"
                          style={{ padding: "0.2rem 0.5rem" }}
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

      <CarModal
        show={showModal}
        onHide={handleCloseModal}
        mode={currentCar ? "edit" : "create"}
        defaultValues={
          currentCar ? (currentCar as Partial<CarSchema>) : undefined
        }
        locations={locations}
        onSubmitForm={currentCar ? handleSubmitEdit : handleSubmitPost}
      />
    </Container>
  );
};

export default CarTable;
