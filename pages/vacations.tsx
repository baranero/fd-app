import Input from "@/components/Input";
import Layout from "@/components/Layout";
import SelectInput from "@/components/SelectInput";
import VacationsChart from "@/components/VacationsChart";
import DetailsList from "@/components/DetailsList";
import useUserList from "@/hooks/useUserList";
import useVacations from "@/hooks/useVacations";
import { outputVacations } from "@/utils/outputVacations";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import swal from "sweetalert";
import { DataGrid } from '@mui/x-data-grid';
import { mergeArr } from "@/utils/mergeArrays";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Vacations = () => {
  const { data: Firefighters = [] } = useUserList();
  const { data: Vacations = [], mutate } = useVacations();

  const [name, setName] = useState(Firefighters[0]?.name);
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("Holiday");

  const holiday = outputVacations(Vacations, Firefighters, "Holiday");
  const additional = outputVacations(Vacations, Firefighters, "Additional");

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.5,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.7,
    },
  ];

  const rows = mergeArr(Vacations, Firefighters);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    swal({
      title: "Added!",
      icon: "success",
      
    })

    try {
      await axios.post("/api/vacations", { amount, name, type });
      mutate();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    
    <Layout>
      <div className="bg-zinc-700 bg-opacity-70 mb-10 px-8 lg:px-16 py-16 self-center mx-auto mt-5 lg:rounded-md w-full lg:w-[80%]">
      <h2 className="text-white text-4xl mb-8 text-center font-semibold">
          Add vacations
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto gap-4 w-[90%] lg:w-[50%] md:w-[70%]"
        >
          <SelectInput
            id="name"
            name="name"
            label="Name"
            onChange={(event: any) => setName(event.target.value)}
            value={name}
            option={Firefighters.map((user: any) => {
              return <option value={user.name} key={user.id}>{user.name}</option>;
            })}
          />
          <Input
            label="Amount"
            name="amount"
            onChange={(event: any) => setAmount(event.target.value)}
            id="amount"
            type="text"
            value={amount}
            min={0}
          />
          <SelectInput
            id="type"
            name="type"
            label="Type"
            onChange={(event: any) => setType(event.target.value)}
            value={type}
            option={<>
              <option value="Holiday">Holiday</option>
              <option value="Additional">Additional</option>
              </>
            }
          />
         
          <button
            type="submit"
            className="bg-orange-600 py-3 text-white rounded-md w-full mt-5 hover:bg-orange-700 transition"
          >
            Add
          </button>
        </form>
        <VacationsChart holiday={holiday} additional={additional} />
        <DetailsList columns={columns} rows={rows}/>
        
      </div>
    </Layout>
  );
};

export default Vacations;
