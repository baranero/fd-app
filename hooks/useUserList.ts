import useSwr from "swr";
import fetcher from "@/lib/fetcher";

const useUserList = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/users", fetcher, {
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

export default useUserList;
