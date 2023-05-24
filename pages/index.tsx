import Description from '@/components/Description'
import Layout from '@/components/Layout'
import useCurrentUser from '@/hooks/useCurrentUser'
import { getSession } from 'next-auth/react'
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
                        <Description title='Work smart not hard!' text="Check how much vacation you have left or how many overtime hours you have already worked!" src="/images/schedule.jpg" alt="Schedule photo"/>
                        <Description title='Keep your team under control' text="All necessary elements visualized on charts." src="/images/chart.jpg" alt="Chart photo"/>
                    </Layout>

    )

}

// Zdjęcie dodane przez Burak The Weekender: https://www.pexels.com/pl-pl/zdjecie/czarny-niebieski-i-czerwony-wykres-ilustracja-186461/