import DetailsList from "@/components/DetailsList";
import Input from "@/components/Input";
import Layout from "@/components/Layout";
import OverhoursChart from "@/components/OverhoursChart";
import SelectInput from "@/components/SelectInput";
import useCurrentUser from "@/hooks/useCurrentUser";
import useOverhours from "@/hooks/useOverhours";
import useUserList from "@/hooks/useUserList";
import { mergeArr } from "@/utils/mergeArrays";
import { outputOverhours } from "@/utils/outputOverhours";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useState, FormEvent } from "react";
import { AiFillDelete } from "react-icons/ai";
import swal from "sweetalert";

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

const Overhours = () => {
  const { data: Firefighters = [] } = useUserList();
  const { data: Overhours = [], mutate } = useOverhours();
  const { data: currentUser } = useCurrentUser();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/overhours/${id}`);
      mutate();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!amount) {
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
        await axios.post("/api/overhours", { amount, name });
        mutate();
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setAmount(0);
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
  ];

  const columns = currentUser?.isAdmin === "true" ? adminColumns : userColumns;

  const rows = mergeArr(Overhours, Firefighters);

  const sumOverhours = outputOverhours(Overhours, Firefighters);

  return (
    <Layout>
      <div className="bg-zinc-700 bg-opacity-70 mb-10 px-8 lg:px-16 py-8 self-center mx-auto mt-5 lg:rounded-md w-full lg:w-[80%]">
        {currentUser?.isAdmin === "true" ? (
          <>
            <h2 className="text-white text-4xl mb-8 text-center font-semibold">
              Add overhours
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mx-auto gap-4 w-[90%] lg:w-[50%] md:w-[70%]"
            >
              <SelectInput
                id="name"
                name="name"
                label="Name"
                onChange={(event: FormEvent<HTMLSelectElement>) =>
                  setName(event.currentTarget.value.trim())
                }
                value={name}
                options={Firefighters.map((user: any) => ({
                  value: user.name,
                  label: user.name,
                }))}
              />

              <Input
                label="Amount"
                name="amount"
                onChange={(event: FormEvent<HTMLInputElement>) =>
                  setAmount(Number(event.currentTarget.value.trim()))
                }
                id="amount"
                type="text"
                value={amount}
                min={0}
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

        <OverhoursChart overhours={sumOverhours} />
        <DetailsList columns={columns} rows={rows} />
      </div>
    </Layout>
  );
};

export default Overhours;
