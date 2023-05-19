import Layout from "@/components/Layout"
import OverhoursChart from "@/components/OverhoursChart"
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
        <Layout>
            <OverhoursChart users={mergedSumOverhours}/>
        </Layout>
    )
}

export default Overhours