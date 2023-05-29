import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useRegisteredUsers = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/usersList", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useRegisteredUsers;
