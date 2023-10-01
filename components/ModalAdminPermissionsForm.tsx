import React, { useState } from "react";
import SelectInput from "./SelectInput";
import swal from "sweetalert";
import { KeyedMutator } from "swr";
import axios from "axios";

interface ModalAdminPermissionsFormProps {
  registeredUsers: any[];
  mutate: KeyedMutator<any>;
}

const ModalAdminPermissionsForm: React.FC<ModalAdminPermissionsFormProps> = ({
  registeredUsers,
  mutate,
}) => {
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState("");

  const handleAdminPerm = async (event: any) => {
    event.preventDefault();
    swal({
      title: "Changed!",
      icon: "success",
    });

    try {
      await axios.put("/api/usersList", { name, admin });
      mutate();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleAdminPerm} className="pb-12">
      <h2 className="text-white text-2xl mb-8 text-center font-semibold">
        Set administrator permissions
      </h2>
      <div className="w-[70%] mx-auto h-48 flex flex-col justify-between">
        <SelectInput
          id="name"
          name="name"
          label="Name"
          onChange={(event: any) => setName(event.target.value)}
          value={name}
          options={registeredUsers.map((user: any) => ({
            value: user.name,
            label: user.name,
          }))}
        />
        <SelectInput
          id="isAdmin"
          name="isAdmin"
          label="Admin"
          onChange={(event: any) => setAdmin(event.target.value)}
          value={admin}
          options={[
            { value: "true", label: "True" },
            { value: "false", label: "False" },
          ]}
        />
        <button
          type="submit"
          className="bg-orange-600 py-3 text-white rounded-md w-full mt-5 hover:bg-orange-700 transition"
        >
          Set
        </button>
      </div>
    </form>
  );
};

export default ModalAdminPermissionsForm;
