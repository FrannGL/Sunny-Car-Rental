"use client";

import ConfirmationModal from "@/src/components/ConfirmationModal";
import SeasonModal from "@/src/components/SeasonModal";
import { useSeasons } from "@/src/hooks/useSeasons";
import { SeasonSchemaType } from "@/src/schemas/season.schema";

import { Season } from "@/src/types/season";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { Button, Container, Stack, Table } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const SeasonTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentSeason, setCurrentSeason] = useState<Season | null>(null);
  const [seasonToDelete, setSeasonToDelete] = useState<Season | null>(null);

  const {
    seasons,
    createSeason,
    updateSeason,
    deleteSeason,
    isLoadingSeasons,
    isDeleting,
  } = useSeasons();

  const handleNewClick = () => {
    setCurrentSeason(null);
    setShowModal(true);
  };

  const handleEditClick = (season: Season) => {
    setCurrentSeason(season);
    setShowModal(true);
  };

  const handleDeleteClick = (season: Season) => {
    setSeasonToDelete(season);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentSeason(null);
  };

  const confirmDelete = async () => {
    if (seasonToDelete) {
      try {
        await deleteSeason(seasonToDelete.id);
        toast.success("Temporada eliminada");
      } catch (err) {
        toast.error("Error al eliminar la temporada");
      } finally {
        setSeasonToDelete(null);
      }
    }
  };

  const cancelDelete = () => setSeasonToDelete(null);

  const handleSubmit = async (data: SeasonSchemaType) => {
    try {
      if (currentSeason) {
        await updateSeason({ id: currentSeason.id, data });
        toast.success("Temporada actualizada correctamente!", {
          duration: 3000,
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      } else {
        await createSeason(data);
        toast.success("Temporada creada correctamente!", {
          duration: 3000,
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      }
      handleCloseModal();
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    }
  };

  if (isLoadingSeasons) {
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
            <h2>Temporadas</h2>
            <Button onClick={handleNewClick} variant="primary">
              <Icon icon="material-symbols-light:add" width={20} />
              Nueva temporada
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Ajuste Gama Alta</th>
                <th>Ajuste Gama Media</th>
                <th>Ajuste Gama Económica</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {seasons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    No hay temporadas registradas
                  </td>
                </tr>
              ) : (
                seasons.map((season) => (
                  <tr key={season.id}>
                    <td>{season.nombre}</td>
                    <td>
                      {new Date(season.fecha_inicio).toLocaleDateString()}
                    </td>
                    <td>{new Date(season.fecha_fin).toLocaleDateString()}</td>
                    <td>{season.ajuste_gama_alta}%</td>
                    <td>{season.ajuste_gama_media}%</td>
                    <td>{season.ajuste_gama_economica}%</td>
                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          title="Editar"
                          style={{ padding: "0.2rem 0.5rem" }}
                          onClick={() => handleEditClick(season)}
                        >
                          <Icon icon="mdi:pencil-outline" width={16} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          title="Eliminar"
                          style={{ padding: "0.2rem 0.5rem" }}
                          onClick={() => handleDeleteClick(season)}
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

      <SeasonModal
        show={showModal}
        onHide={handleCloseModal}
        mode={currentSeason ? "edit" : "create"}
        defaultValues={currentSeason as unknown as Partial<SeasonSchemaType>}
        onSubmitForm={handleSubmit}
        isLoading={isLoadingSeasons}
      />

      <ConfirmationModal
        show={!!seasonToDelete}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
        title="Eliminar temporada"
        message={`¿Seguro que deseas eliminar la temporada ${seasonToDelete?.nombre}?`}
        isProcessing={isDeleting}
      />
    </Container>
  );
};

export default SeasonTable;
