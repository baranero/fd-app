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

    const { data: Firefighters = [] } = useUserList()
    const { data: Overhours = [] } = useOverhours()

    let holder: any = {};

    Overhours.forEach(function(d: {userId: string, amount: number}) {
      if (holder.hasOwnProperty(d.userId)) {
        
        holder[d.userId] = holder[d.userId] + d.amount;
      } else {
        holder[d.userId] = d.amount;
      }
      
    });
    
    let sumOverhours = [];
    
    for (let prop in holder) {
        
      sumOverhours.push({ userId: prop, amount: holder[prop] });
    }

    let mergedSumOverhours = [];

    for(let i=0; i<Firefighters.length; i++) {
        
      mergedSumOverhours.push({
       ...Firefighters[i],
       ...(sumOverhours.find((itmInner) => itmInner.userId === Firefighters[i].id)),
    }
      );
    }

    return (
        <div className="w-full bg-[url('/images/background.jpg')] bg-fixed bg-no-repeat bg-center bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <Layout>
                    <h2 className="text-white mt-5 text-center text-2xl">Users</h2>
                    <UserList data={mergedSumOverhours}/>
                </Layout>
            </div>
        </div>
    )
}

export default Users