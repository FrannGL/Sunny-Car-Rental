import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Car } from "../types/car";
import { CarSchema } from "../schemas/car.schema";
import { request } from "../actions/request";

export const useCars = () => {
  const queryClient = useQueryClient();

  const fetchCars = async (): Promise<Car[]> => {
    const res = await request("cars", "GET");
    if (res.status !== 200)
      throw new Error(res.error || "Error al obtener vehículos");
    return res.data;
  };

  const fetchLocations = async (): Promise<any[]> => {
    const res = await request("locations", "GET");
    if (res.status !== 200)
      throw new Error(res.error || "Error al obtener ubicaciones");
    return res.data;
  };

  const createCar = async (data: CarSchema): Promise<Car> => {
    const res = await request("cars", "POST", data);
    if (res.status !== 201)
      throw new Error(res.error || "Error al crear el vehículo");
    return res.data;
  };

  const updateCar = async ({
    id,
    data,
  }: {
    id: number;
    data: CarSchema;
  }): Promise<Car> => {
    const res = await request(`cars/${id}`, "PUT", data);
    if (res.status !== 200)
      throw new Error(res.error || "Error al actualizar el vehículo");
    return res.data;
  };

  const deleteCar = async (id: number): Promise<void> => {
    const res = await request(`cars/${id}`, "DELETE");
    if (res.status !== 200 && res.status !== 204) {
      throw new Error(res.error || "Error al eliminar el vehículo");
    }
  };

  const carsQuery = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
    staleTime: 1000 * 60 * 60,
  });

  const locationsQuery = useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    staleTime: 1000 * 60 * 60,
  });

  const createMutation = useMutation({
    mutationFn: createCar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cars"] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateCar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cars"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  return {
    cars: carsQuery.data || [],
    locations: locationsQuery.data || [],
    isLoadingCars: carsQuery.isLoading,
    isLoadingLocations: locationsQuery.isLoading,
    isErrorCars: carsQuery.isError,
    isErrorLocations: locationsQuery.isError,
    createCar: createMutation.mutateAsync,
    updateCar: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    deleteCar: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
