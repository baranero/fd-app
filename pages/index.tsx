import Description from '@/components/Description'
import Layout from '@/components/Layout'
import Navbar from '@/components/Navbar'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut, getSession } from 'next-auth/react'
import Image from 'next/image'
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
            <div className="w-full bg-[url('/images/background.jpg')] bg-fixed bg-no-repeat bg-center bg-cover">
                <div className="bg-black w-full h-full lg:bg-opacity-50">
                    <Layout>
                        <Description title='Work smart not hard!' text="Check how much vacation you have left or how many overtime hours you have already worked!" src="/images/schedule.jpg" alt="Schedule photo"/>
                        <Description title='Work smart not hard!' text="Check how much vacation you have left or how many overtime hours you have already worked!" src="/images/schedule.jpg" alt="Schedule photo"/>
                    </Layout>
                </div>
            </div>
    )

}