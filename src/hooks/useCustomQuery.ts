import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { request } from "../actions/request";
import { useClientSession } from "./useClientSession";

export function useCustomQuery(endpoint: string, isPublic = false) {
  const { token } = useClientSession();

  const queryKey = [endpoint];

  const fetchFn = async () => {
    const response = await request(
      endpoint,
      "GET",
      undefined,
      undefined,
      isPublic
    );
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  };

  const { data, isPending, error, isFetching, refetch } = useQuery({
    queryKey,
    queryFn: fetchFn,
    enabled: isPublic || !!token,
    staleTime: 15 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  return { data, isPending, error, isFetching, refetch };
}
