import useSwr from 'swr'
import fetcher from '@/lib/fetcher'

const useVacations = () => {
    const { data, error, isLoading } = useSwr('/api/vacations', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    return {
        data,
        error,
        isLoading
    }
}

export default useVacations