import Layout from "@/components/Layout"
import UserList from "@/components/UserList"
import useOverhours from "@/hooks/useOverhours"
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

    return (
        <div className="w-full bg-[url('/images/background.jpg')] bg-fixed bg-no-repeat bg-center bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <Layout>
                    <h2 className="text-white mt-5 text-center text-2xl">Users</h2>
                    <UserList />
                </Layout>
            </div>
        </div>
    )
}

export default Users