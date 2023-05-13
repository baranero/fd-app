import useSwr from 'swr'
import fetcher from '@/lib/fetcher'

const useUserList = () => {
    const { data, error, isLoading } = useSwr('/api/users', fetcher, {
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

export default useUserList