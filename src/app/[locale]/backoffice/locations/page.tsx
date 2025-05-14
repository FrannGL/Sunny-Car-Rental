"use client";

import ConfirmationModal from "@/src/components/ConfirmationModal";
import LocationModal from "@/src/components/LocationModal";
import { useLocations } from "@/src/hooks/useLocations";
import { LocationSchemaType } from "@/src/schemas/location-schema";
import { Location } from "@/src/types/locations";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";
import { Button, Container, Stack, Table } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const LocationsTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locationToDelete, setLocationToDelete] = useState<Location | null>(
    null
  );

  const {
    locations,
    createLocation,
    updateLocation,
    deleteLocation,
    isLoadingLocations,
    isDeleting,
  } = useLocations();

  const handleNewClick = () => {
    setCurrentLocation(null);
    setShowModal(true);
  };

  const handleEditClick = (location: Location) => {
    setCurrentLocation(location);
    setShowModal(true);
  };

  const handleDeleteClick = (location: Location) => {
    setLocationToDelete(location);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentLocation(null);
  };

  const confirmDelete = async () => {
    if (locationToDelete) {
      try {
        await deleteLocation(locationToDelete.id);
        toast.success("Ubicación eliminada");
      } catch (err) {
        toast.error("Error al eliminar la ubicación");
      } finally {
        setLocationToDelete(null);
      }
    }
  };

  const cancelDelete = () => setLocationToDelete(null);

  const handleSubmit = async (data: LocationSchemaType) => {
    try {
      if (currentLocation) {
        await updateLocation({ id: currentLocation.id, data });
        toast.success("Ubicación actualizada correctamente!", {
          duration: 3000,
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      } else {
        await createLocation(data);
        toast.success("Ubicación creada correctamente!", {
          duration: 3000,
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      }
      handleCloseModal();
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    }
  };

  if (isLoadingLocations) {
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
            <h2>Ubicaciones</h2>
            <Button onClick={handleNewClick} variant="primary">
              <Icon icon="material-symbols-light:add" width={20} />
              Nueva ubicación
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>País</th>
                <th>Descripción</th>
                <th>Latitud</th>
                <th>Longitud</th>

                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {locations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-4">
                    No hay ubicaciones registradas
                  </td>
                </tr>
              ) : (
                locations.map((location) => (
                  <tr key={location.id}>
                    <td>
                      <Zoom>
                        <img
                          src={location.image}
                          alt={location.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </Zoom>
                    </td>
                    <td>{location.name}</td>
                    <td>{location.country}</td>
                    <td>{location.description}</td>
                    <td>{location.lat}</td>
                    <td>{location.lon}</td>

                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          title="Editar"
                          style={{ padding: "0.2rem 0.5rem" }}
                          onClick={() => handleEditClick(location)}
                        >
                          <Icon icon="mdi:pencil-outline" width={16} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          title="Eliminar"
                          style={{ padding: "0.2rem 0.5rem" }}
                          onClick={() => handleDeleteClick(location)}
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

      <LocationModal
        show={showModal}
        onHide={handleCloseModal}
        mode={currentLocation ? "edit" : "create"}
        defaultValues={
          currentLocation as unknown as Partial<LocationSchemaType>
        }
        onSubmitForm={handleSubmit}
        isLoading={isLoadingLocations}
      />

      <ConfirmationModal
        show={!!locationToDelete}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
        title="Eliminar ubicación"
        message={`¿Seguro que deseas eliminar la ubicación ${locationToDelete?.name}?`}
        isProcessing={isDeleting}
      />
    </Container>
  );
};

export default LocationsTable;
