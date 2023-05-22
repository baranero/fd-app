import Layout from "@/components/Layout"
import OverhoursChart from "@/components/OverhoursChart"
import useOverhours from "@/hooks/useOverhours"
import useUserList from "@/hooks/useUserList"
import { outputOverhours } from "@/utils/outputOverhours"
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

    const over = prismadb.overhours.findMany({
        where: {

        }
    })
  
    return {
        props: {}
    }
  }
  
const Overhours = () => {

    const { data: Firefighters = [] } = useUserList()
    const { data: Overhours = [] } = useOverhours()
    

    return (
        <Layout>
            <OverhoursChart users={outputOverhours(Overhours, Firefighters)}/>
        </Layout>
    )
}

export default Overhours