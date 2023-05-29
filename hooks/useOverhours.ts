import useSwr from "swr";
import fetcher from "@/lib/fetcher";

const useOverhours = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/overhours", fetcher, {
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

export default useOverhours;
