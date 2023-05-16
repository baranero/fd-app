import Layout from "@/components/Layout"
import VacationsChart from "@/components/VacationsChart"
import useUserList from "@/hooks/useUserList"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

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
  
const Vacations = () => {

    const { data: Firefighters = [] } = useUserList()

    return (
        <Layout>
            <VacationsChart users={Firefighters}/>
        </Layout>
    )
}

export default Vacations