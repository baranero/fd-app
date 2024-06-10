import useSwr from "swr";
import fetcher from "@/lib/fetcher";

const useWarehouse = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/warehouse", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useWarehouse;
