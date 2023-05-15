import Layout from "@/components/Layout"
import OverhoursChart from "@/components/OverhoursChart"
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
  
const Overhours = () => {

    const { data: Firefighters = [] } = useUserList()

    return (
        <Layout>
            <OverhoursChart users={Firefighters}/>
        </Layout>
    )
}

export default Overhours