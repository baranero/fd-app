import Input from "@/components/Input"
import Layout from "@/components/Layout"
import VacationsChart from "@/components/VacationsChart"
import useUserList from "@/hooks/useUserList"
import useVacations from "@/hooks/useVacations"
import { outputVacations } from "@/utils/outputVacations"
import axios from "axios"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import { useState } from "react"

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
    const { data: Vacations = [], mutate } = useVacations()

    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState('')

    const holiday = outputVacations(Vacations, Firefighters, 'holiday')
    const additional = outputVacations(Vacations, Firefighters, 'additional')

     const handleSubmit = async (event: any) => {
        event.preventDefault();

          try {
            await axios.post('/api/vacations', {amount, name, type});
            mutate();
          } catch (error) {
            console.error('Error:', error);
          }
        };

    return (
        <Layout>
            <div className="bg-zinc-700 bg-opacity-70 mb-10 px-8 lg:px-16 py-16 self-center mx-auto mt-5 lg:rounded-md w-full lg:w-[80%]">
                <h2 className="text-white text-4xl mb-8 text-center font-semibold">Add vacations</h2>
                <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4 w-[90%] lg:w-[50%] md:w-[70%]">
                    <Input
                                        label="Name"
                                        name="name"
                                        onChange={(event: any) => setName(event.target.value)}
                                        id="name"
                                        type="select"
                                        value={name}
                    />
                    <Input
                                        label="Amount"
                                        name="amount"
                                        onChange={(event: any) => setAmount(event.target.value)}
                                        id="amount"
                                        type="number"
                                        value={amount}
                                        min={0}
                    />
                                        <Input
                                        label="Type"
                                        name="type"
                                        onChange={(event: any) => setType(event.target.value)}
                                        id="type"
                                        type="text"
                                        value={type}
                    />
                    <button type="submit" className="bg-orange-600 py-3 text-white rounded-md w-full mt-10 hover:bg-orange-700 transition">Add</button>
                </form>
            <VacationsChart holiday={holiday} additional={additional}/>
            </div>
        </Layout>
    )
}

export default Vacations