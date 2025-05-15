import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../actions/request";
import { Rental } from "../types/rentals";
import { RentalSchemaType } from "../schemas/rental.schema";

export const useRentals = () => {
  const queryClient = useQueryClient();

  const fetchRentals = async (): Promise<Rental[]> => {
    const res = await request("rentals", "GET");
    if (res.status !== 200)
      throw new Error(res.error || "Error al obtener rentas");
    return res.data;
  };

  const createRental = async (data: RentalSchemaType): Promise<Rental> => {
    const res = await request("rentals", "POST", data);
    if (res.error) {
      throw new Error(res.error || "Error al crear la renta");
    }
    return res.data || res;
  };

  const updateRental = async ({
    id,
    data,
  }: {
    id: number;
    data: RentalSchemaType;
  }): Promise<Rental> => {
    const res = await request(`rentals/${id}`, "PUT", data);
    if (res.status !== 200)
      throw new Error(res.error || "Error al actualizar la renta");
    return res.data;
  };

  const deleteRental = async (id: number): Promise<void> => {
    const res = await request(`rentals/${id}`, "DELETE");
    if (res.status !== 200 && res.status !== 204) {
      throw new Error(res.error || "Error al eliminar la renta");
    }
  };

  const rentalsQuery = useQuery({
    queryKey: ["rentals"],
    queryFn: fetchRentals,
    staleTime: 1000 * 60 * 60,
  });

  const createMutation = useMutation({
    mutationFn: createRental,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rentals"] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateRental,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rentals"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRental,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rentals"] });
    },
  });

  return {
    rentals: rentalsQuery.data || [],
    isLoadingRentals: rentalsQuery.isLoading,
    isErrorRentals: rentalsQuery.isError,
    createRental: createMutation.mutateAsync,
    updateRental: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    deleteRental: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
