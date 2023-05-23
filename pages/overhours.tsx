import Input from "@/components/Input"
import Layout from "@/components/Layout"
import OverhoursChart from "@/components/OverhoursChart"
import useOverhours from "@/hooks/useOverhours"
import useUserList from "@/hooks/useUserList"
import { outputOverhours } from "@/utils/outputOverhours"
import axios from "axios"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import { useState, useCallback } from "react"


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

    const [name, setName] = useState('')
    const [hours, setHours] = useState(0)

    const { data: Firefighters = [] } = useUserList()
    const { data: Overhours = [], mutate } = useOverhours()
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();

          try {
            await axios.post('/api/overhours', {amount: hours});
            mutate();
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
    
  
    
    const sumOverhours = outputOverhours(Overhours, Firefighters)

    return (
        <Layout>
            <div className="bg-zinc-700 bg-opacity-70 mb-10 px-8 lg:px-16 py-16 self-center mx-auto mt-5 lg:rounded-md w-full lg:w-[80%]">
                <h2 className="text-white text-4xl mb-8 text-center font-semibold">Add overhours</h2>
                <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4 w-[50%]">
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
                                        onChange={(event: any) => setHours(event.target.value)}
                                        id="amount"
                                        type="number"
                                        value={hours}
                                        min={0}
                    />
                    <button type="submit" className="bg-orange-600 py-3 text-white rounded-md w-full mt-10 hover:bg-orange-700 transition">Add</button>
                </form>
            

            <OverhoursChart overhours={sumOverhours}/>
            </div>
        </Layout>
    )
}

export default Overhours