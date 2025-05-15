"use client";

import ConfirmationModal from "@/src/components/ConfirmationModal";
import CouponModal from "@/src/components/CouponsModal";

import { useCoupons } from "@/src/hooks/useCoupons";
import { CouponSchemaType } from "@/src/schemas/coupon-schema";
import { Coupon } from "@/src/types/coupon";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { Button, Container, Stack, Table, Badge } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";

const CouponsTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState<Coupon | null>(null);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

  const {
    coupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    isLoadingCoupons,
    isDeleting,
  } = useCoupons();

  const handleNewClick = () => {
    setCurrentCoupon(null);
    setShowModal(true);
  };

  const handleEditClick = (coupon: Coupon) => {
    setCurrentCoupon(coupon);
    setShowModal(true);
  };

  const handleDeleteClick = (coupon: Coupon) => {
    setCouponToDelete(coupon);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentCoupon(null);
  };

  const confirmDelete = async () => {
    if (couponToDelete) {
      try {
        await deleteCoupon(couponToDelete.id);
        toast.success("Cupón eliminado");
      } catch (err) {
        toast.error("Error al eliminar el cupón");
      } finally {
        setCouponToDelete(null);
      }
    }
  };

  const cancelDelete = () => setCouponToDelete(null);

  const handleSubmit = async (data: CouponSchemaType) => {
    try {
      if (currentCoupon) {
        await updateCoupon({ id: currentCoupon.id, data });
        toast.success("Cupón actualizado correctamente!", {
          duration: 3000,
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      } else {
        await createCoupon(data);
        toast.success("Cupón creado correctamente!", {
          duration: 3000,
          style: { backgroundColor: "#28a745", color: "#fff" },
        });
      }
      handleCloseModal();
    } catch (err: any) {
      toast.error(err.message || "Error al guardar");
    }
  };

  if (isLoadingCoupons) {
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
            <h2>Cupones</h2>
            <Button onClick={handleNewClick} variant="primary">
              <Icon icon="material-symbols-light:add" width={20} />
              Nuevo cupón
            </Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Código</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Descuento</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-4">
                    No hay cupones registrados
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id}>
                    <td>{coupon.code}</td>
                    <td>{new Date(coupon.start_date).toLocaleDateString()}</td>
                    <td>{new Date(coupon.end_date).toLocaleDateString()}</td>
                    <td>$ {coupon.discount}</td>
                    <td>
                      <Stack direction="horizontal" gap={1}>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          title="Editar"
                          style={{ padding: "0.2rem 0.5rem" }}
                          onClick={() => handleEditClick(coupon)}
                        >
                          <Icon icon="mdi:pencil-outline" width={16} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          title="Eliminar"
                          style={{ padding: "0.2rem 0.5rem" }}
                          onClick={() => handleDeleteClick(coupon)}
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

      <CouponModal
        show={showModal}
        onHide={handleCloseModal}
        mode={currentCoupon ? "edit" : "create"}
        defaultValues={currentCoupon as unknown as Partial<CouponSchemaType>}
        onSubmitForm={handleSubmit}
        isLoading={isLoadingCoupons}
      />

      <ConfirmationModal
        show={!!couponToDelete}
        onHide={cancelDelete}
        onConfirm={confirmDelete}
        title="Eliminar cupón"
        message={`¿Seguro que deseas eliminar el cupón ${couponToDelete?.code}?`}
        isProcessing={isDeleting}
      />
    </Container>
  );
};

export default CouponsTable;
