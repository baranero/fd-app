import Description from '@/components/Description'
import Layout from '@/components/Layout'
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
        <Layout>
            <Description text="Check how much vacation you have left or how many overtime hours you have already worked!" src="/images/schedule.jpg" alt="Schedule photo"/>
            <Description text="Check how much vacation you have left or how many overtime hours you have already worked!" src="/images/schedule.jpg" alt="Schedule photo"/>
            <Description text="Check how much vacation you have left or how many overtime hours you have already worked!" src="/images/schedule.jpg" alt="Schedule photo"/>
        </Layout>
    )

}