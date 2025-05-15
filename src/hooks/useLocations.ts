import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../actions/request";
import { Location } from "../types/locations";
import { LocationSchemaType } from "../schemas/location-schema";

export const useLocations = () => {
  const queryClient = useQueryClient();

  const fetchLocations = async (): Promise<Location[]> => {
    const res = await request("locations", "GET");
    if (res.status !== 200)
      throw new Error(res.error || "Error al obtener ubicaciones");
    return res.data;
  };

  const createLocation = async (
    data: LocationSchemaType
  ): Promise<Location> => {
    const res = await request("locations", "POST", data);
    if (res.status !== 201)
      throw new Error(res.error || "Error al crear la ubicación");
    return res.data;
  };

  const updateLocation = async ({
    id,
    data,
  }: {
    id: number;
    data: LocationSchemaType;
  }): Promise<Location> => {
    const res = await request(`locations/${id}`, "PUT", data);
    if (res.status !== 200)
      throw new Error(res.error || "Error al actualizar la ubicación");
    return res.data;
  };

  const deleteLocation = async (id: number): Promise<void> => {
    const res = await request(`locations/${id}`, "DELETE");
    if (res.status !== 200 && res.status !== 204) {
      throw new Error(res.error || "Error al eliminar la ubicación");
    }
  };

  const locationsQuery = useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    staleTime: 1000 * 60 * 60, // 1 hora
  });

  const createMutation = useMutation({
    mutationFn: createLocation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["locations"] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateLocation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["locations"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });

  return {
    locations: locationsQuery.data || [],
    isLoadingLocations: locationsQuery.isLoading,
    isErrorLocations: locationsQuery.isError,
    createLocation: createMutation.mutateAsync,
    updateLocation: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    deleteLocation: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
