import useSwr from 'swr'
import fetcher from '@/lib/fetcher'

const useOverhours = () => {
    const { data, error, isLoading } = useSwr('/api/overhours', fetcher, {
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

export default useOverhours