import Layout from "@/components/Layout"
import VacationsChart from "@/components/VacationsChart"
import useUserList from "@/hooks/useUserList"
import useVacations from "@/hooks/useVacations"
import { outputVacations } from "@/utils/outputVacations"
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
    const { data: Vacations = [] } = useVacations()

    const holiday = outputVacations(Vacations, Firefighters, 'holiday')
    const additional = outputVacations(Vacations, Firefighters, 'additional')

    return (
        <Layout>
            <VacationsChart holiday={holiday} additional={additional}/>
        </Layout>
    )
}

export default Vacations