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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      swal({
        title: "Warning!",
        icon: "warning",
        text: "Input an username!",
      });
    } else {
      try {
        await axios.post("/api/users", { name: name.trim() });
        mutate();
        swal({
          title: "Added!",
          icon: "success",
        });
        setName("");
      } catch (error) {
        console.error("Error:", error);
        swal({
          title: "Error!",
          icon: "error",
          text: "Failed to add user. Please try again.",
        });
      }
    }
  };

  return (
    <Layout>
      <div className=" h-fullx-8 lg:px-16 py-8 self-center mx-auto mt-5 lg:rounded-md w-full lg:w-[90%]">
        {currentUser?.isAdmin === "true" ? (
          <>
            <h2 className=" text-4xl mb-8 text-center font-semibold">
              Dodaj użytkownika
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mx-auto gap-4 w-[90%] lg:w-[50%] md:w-[70%]"
            >
              <Input
                label="Nazwa"
                name="name"
                onChange={(event) => setName(event.currentTarget.value)}
                id="name"
                type="text"
                value={name}
              />
              <button
                type="submit"
                className="bg-orange-600 py-3 text-white rounded-md w-full mt-5 hover:bg-orange-700 transition"
              >
                Dodaj
              </button>
            </form>
          </>
        ) : null}

        <h2 className=" mt-10 text-center text-2xl">Użytkownicy</h2>
        <UserList />
      </div>
    </Layout>
  );
};

export default Users;
