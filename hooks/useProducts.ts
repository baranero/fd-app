import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useProducts = () => {
  const { data, error, mutate } = useSWR('/api/products', fetcher);

  return {
    data,
    error,
    mutate,
  };
};

export default useProducts;
