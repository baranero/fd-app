import Description from '@/components/Description'
import Navbar from '@/components/Navbar'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut, getSession } from 'next-auth/react'
import { NextPageContext } from 'next/types'

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context)
    
    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default function Home() {

    const { data: user } = useCurrentUser()
    

    return (
        <>
            <Navbar/>
            <Description/>
        </>
    )

}