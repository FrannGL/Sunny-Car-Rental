import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { request } from "../actions/request";
import { useClientSession } from "./useClientSession";

function useCustomQuery(endpoint: string) {
  const { token } = useClientSession();

  const queryKey = [endpoint];

  const fetchFn = async () => {
    if (!token) return null;
    const response = await request(endpoint, "GET");
    return response.data;
  };

  const { data, isPending, error, isFetching, refetch } = useQuery({
    queryKey,
    queryFn: fetchFn,
    enabled: !!token,
    staleTime: 15 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  return { data, isPending, error, isFetching, refetch };
}

export default useCustomQuery;
