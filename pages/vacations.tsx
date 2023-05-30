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
import { useState, useCallback } from "react";
import swal from "sweetalert";
import { mergeArr } from "@/utils/mergeArrays";
import { AiFillDelete } from "react-icons/ai";
import useCurrentUser from "@/hooks/useCurrentUser";

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
  const { data: currentUser } = useCurrentUser();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("Holiday");

  const holiday = outputVacations(Vacations, Firefighters, "Holiday");
  const additional = outputVacations(Vacations, Firefighters, "Additional");

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/vacations/${id}`);
      mutate();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const adminColumns = [
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
    {
      field: "action",
      headerName: "Delete",
      width: 100,
      renderCell: (params: any) => (
        <button className="mx-3" onClick={() => handleDelete(params.row.id)}>
          <AiFillDelete size={25} />
        </button>
      ),
    },
  ];

  const userColumns = [
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

  const columns = currentUser?.isAdmin === "true" ? adminColumns : userColumns;

  const rows = mergeArr(Vacations, Firefighters);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!name) {
      swal({
        title: "Warning!",
        icon: "warning",
        text: "Select a user!",
      });
    } else if (!amount) {
      swal({
        title: "Warning!",
        icon: "warning",
        text: "Amount has to be greater than 0!",
      });

      return;
    } else {
      swal({
        title: "Added!",
        icon: "success",
      });

      try {
        await axios.post("/api/vacations", { amount, name, type });
        mutate();
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setAmount(0);
  };

  return (
    <Layout>
      <div className="bg-zinc-700 bg-opacity-70 mb-10 px-8 lg:px-16 py-8 self-center mx-auto mt-5 lg:rounded-md w-full lg:w-[80%]">
        {currentUser?.isAdmin === "true" ? (
          <>
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
                onChange={(event: any) => setName(event.target.value.trim())}
                value={name}
                option={Firefighters.map((user: any) => {
                  return (
                    <option value={user.name} key={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              />
              <Input
                label="Amount"
                name="amount"
                onChange={(event: any) => setAmount(event.target.value.trim())}
                id="amount"
                type="text"
                value={amount}
                min={0}
              />
              <SelectInput
                id="type"
                name="type"
                label="Type"
                onChange={(event: any) => setType(event.target.value.trim())}
                value={type}
                option={
                  <>
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
          </>
        ) : (
          <></>
        )}
        <VacationsChart holiday={holiday} additional={additional} />
        <DetailsList columns={columns} rows={rows} />
      </div>
    </Layout>
  );
};

export default Vacations;
