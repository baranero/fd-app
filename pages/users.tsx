import Layout from "@/components/Layout"
import UserList from "@/components/UserList"
import useUserList from "@/hooks/useUserList"

const Users = () => {

    const { data: users = [] } = useUserList()

    return (
        <Layout>
            <h2 className="text-white mt-5 text-center text-2xl">Users</h2>
            <UserList data={users}/>
        </Layout>
    )
}

export default Users