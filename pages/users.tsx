import Layout from "@/components/Layout"
import UserList from "@/components/UserList"
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

const Users = () => {

    const { data: Firefighters = [] } = useUserList()

    return (
        <Layout>
            <h2 className="text-white mt-5 text-center text-2xl">Users</h2>
            <UserList data={Firefighters}/>
        </Layout>
    )
}

export default Users