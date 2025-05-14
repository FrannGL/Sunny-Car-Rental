import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../actions/request";
import { CouponSchemaType } from "../schemas/coupon-schema";
import { Coupon } from "../types/coupon";

export const useCoupons = () => {
  const queryClient = useQueryClient();

  const fetchCoupons = async (): Promise<Coupon[]> => {
    const res = await request("coupons", "GET");
    if (res.status !== 200)
      throw new Error(res.error || "Error al obtener cupones");
    return res.data;
  };

  const createCoupon = async (data: CouponSchemaType): Promise<Coupon> => {
    const res = await request("coupons", "POST", data);
    if (res.status !== 201)
      throw new Error(res.error || "Error al crear el cupón");
    return res.data;
  };

  const updateCoupon = async ({
    id,
    data,
  }: {
    id: number;
    data: CouponSchemaType;
  }): Promise<Coupon> => {
    const res = await request(`coupons/${id}`, "PUT", data);
    if (res.status !== 200)
      throw new Error(res.error || "Error al actualizar el cupón");
    return res.data;
  };

  const deleteCoupon = async (id: number): Promise<void> => {
    const res = await request(`coupons/${id}`, "DELETE");
    if (res.status !== 200 && res.status !== 204) {
      throw new Error(res.error || "Error al eliminar el cupón");
    }
  };

  const couponsQuery = useQuery({
    queryKey: ["coupons"],
    queryFn: fetchCoupons,
    staleTime: 1000 * 60 * 60, // 1 hora
  });

  const createMutation = useMutation({
    mutationFn: createCoupon,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["coupons"] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateCoupon,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["coupons"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });

  return {
    coupons: couponsQuery.data || [],
    isLoadingCoupons: couponsQuery.isLoading,
    isErrorCoupons: couponsQuery.isError,
    createCoupon: createMutation.mutateAsync,
    updateCoupon: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    deleteCoupon: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
