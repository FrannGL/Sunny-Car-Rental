import { useQuery } from "@tanstack/react-query";
import { request } from "../actions/request";
import { Rental } from "../types/rentals";

export const useRentalById = (id?: number) => {
  const { data, isLoading, error } = useQuery<Rental[]>({
    queryKey: ["rental", id],
    queryFn: async () => {
      if (!id) throw new Error("ID no proporcionado");

      const res = await request(`rentals/by-user/${id}`, "GET");
      if (res.status !== 200)
        throw new Error(res.error || "Error al obtener la renta");

      return res.data;
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });

  return { data, isLoading, error };
};
