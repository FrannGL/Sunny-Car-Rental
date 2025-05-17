import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../actions/request";
import { Season } from "../types/season";
import { SeasonSchemaType } from "../schemas/season.schema";

export const useSeasons = () => {
  const queryClient = useQueryClient();

  const fetchSeasons = async (): Promise<Season[]> => {
    const res = await request("seasons", "GET");
    if (res.status !== 200)
      throw new Error(res.error || "Error al obtener temporadas");
    return res.data;
  };

  const createSeason = async (data: SeasonSchemaType): Promise<Season> => {
    const res = await request("seasons", "POST", data);
    if (res.error) {
      throw new Error(res.error || "Error al crear la temporada");
    }
    return res.data || res;
  };

  const updateSeason = async ({
    id,
    data,
  }: {
    id: number;
    data: SeasonSchemaType;
  }): Promise<Season> => {
    const res = await request(`seasons/${id}`, "PUT", data);
    if (res.status !== 200)
      throw new Error(res.error || "Error al actualizar la temporada");
    return res.data;
  };

  const deleteSeason = async (id: number): Promise<void> => {
    const res = await request(`seasons/${id}`, "DELETE");
    if (res.status !== 200 && res.status !== 204) {
      throw new Error(res.error || "Error al eliminar la temporada");
    }
  };

  const seasonsQuery = useQuery({
    queryKey: ["seasons"],
    queryFn: fetchSeasons,
    staleTime: 1000 * 60 * 60, // 1 hora
  });

  const createMutation = useMutation({
    mutationFn: createSeason,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["seasons"] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateSeason,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["seasons"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSeason,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
    },
  });

  return {
    seasons: seasonsQuery.data || [],
    isLoadingSeasons: seasonsQuery.isLoading,
    isErrorSeasons: seasonsQuery.isError,
    createSeason: createMutation.mutateAsync,
    updateSeason: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    deleteSeason: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
