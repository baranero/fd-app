import Layout from "@/components/Layout"
import VacationsChart from "@/components/VacationsChart"
import useUserList from "@/hooks/useUserList"
import useVacations from "@/hooks/useVacations"
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

    let holderHoliday: any = [];
    let holderAdditional: any = [];

    console.log(Vacations);

    Vacations.forEach((element: any) => {
        if (element.type === 'holiday') {
            holderHoliday.push(element)   
        } else if (element.type === 'additional')
            holderAdditional.push(element)
    })
    

    console.log(holderHoliday);
    console.log(holderAdditional);

    let holiday: any = {}
    let additional: any = {}
    
    

    holderHoliday.forEach(function(d: {userId: string, amount: number, type: string}) {

      if (holiday.hasOwnProperty(d.userId)) {
        holiday[d.userId] = holiday[d.userId] + d.amount;
      } 
      else {
        holiday[d.userId] = d.amount;
      }

      
    });

    holderAdditional.forEach(function(d: {userId: string, amount: number, type: string}) {

        if (additional.hasOwnProperty(d.userId)) {
          additional[d.userId] = additional[d.userId] + d.amount;
        } 
        else {
          additional[d.userId] = d.amount;
        }
  
        
      });

    

    let sumVacationsHoliday = [];
    let sumVacationsAdditional = [];
    
    for (let prop in holiday) {
      sumVacationsHoliday.push({ userId: prop, amount: holiday[prop] });
    }

    for (let prop in additional) {
        sumVacationsAdditional.push({ userId: prop, amount: additional[prop] });
      }

    let mergedSumHoliday = [];

    for(let i=0; i<Firefighters.length; i++) {
        
      mergedSumHoliday.push({
       ...Firefighters[i],
       ...(sumVacationsHoliday.find((itmInner) => itmInner.userId === Firefighters[i].id)),
    }
      );
    }

    let mergedSumAdditional = [];

    for(let i=0; i<Firefighters.length; i++) {
        
      mergedSumAdditional.push({
       ...Firefighters[i],
       ...(sumVacationsAdditional.find((itmInner) => itmInner.userId === Firefighters[i].id)),
    }
      );
    }
    
    

    return (
        <Layout>
            <VacationsChart holiday={mergedSumHoliday} additional={mergedSumAdditional}/>
        </Layout>
    )
}

export default Vacations