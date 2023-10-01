import Input from "@/components/Input";
import Layout from "@/components/Layout";
import UserList from "@/components/UserList";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserList from "@/hooks/useUserList";
import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useState, FormEvent } from "react";
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

const Users = () => {
  const { mutate } = useUserList();
  const { data: currentUser } = useCurrentUser();

  const [name, setName] = useState("")

  const trimmedName = name.trimEnd();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!name) {
      swal({
        title: "Warning!",
        icon: "warning",
        text: "Input an username!",
      });
    } else {
      swal({
        title: "Added!",
        icon: "success",
      });

      try {
        await axios.post("/api/users", { name: trimmedName });
        mutate();
      } catch (error) {
        console.error("Error:", error);
      }
    }
    setName("");
  };

  return (
    <Layout>
      <div className="bg-zinc-700 h-full bg-opacity-70 px-8 lg:px-16 py-8 self-center mx-auto mt-5 lg:rounded-md w-full lg:w-[90%]">
        {currentUser?.isAdmin === "true" ? (
          <>
            <h2 className="text-white text-4xl mb-8 text-center font-semibold">
              Add user
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mx-auto gap-4 w-[90%] lg:w-[50%] md:w-[70%]"
            >
              <Input
                label="Name"
                name="name"
                onChange={(event: FormEvent<HTMLInputElement>) => setName(event.currentTarget.value)}
                id="name"
                type="select"
                value={name}
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

        <h2 className="text-white mt-10 text-center text-2xl">Users</h2>
        <UserList />
      </div>
    </Layout>
  );
};

export default Users;
