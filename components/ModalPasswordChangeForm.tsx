import React, { useState } from "react";
import Input from "./Input";
import swal from "sweetalert";
import axios from "axios";
import { KeyedMutator } from "swr";

interface ModalPasswordChangeFormProps {
  mutate: KeyedMutator<any>;
}

const ModalPasswordChangeForm: React.FC<ModalPasswordChangeFormProps> = ({
  mutate,
}) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handlePasswordChange = async (event: any) => {
    event.preventDefault();

    if (newPassword.length < 8) {
      swal({
        title: "Warning!",
        icon: "warning",
        text: "Password must be at least 8 characters long.",
      });
      setNewPassword("");
      return;
    }

    if (newPassword !== confirmedPassword) {
      swal({
        title: "Warning!",
        icon: "warning",
        text: "Passwords are different",
      });
      setNewPassword("");
      setConfirmedPassword("");
    } else if (password === newPassword) {
      swal({
        title: "Warning!",
        icon: "warning",
        text: "The old password is the same as the new one",
      });
      setPassword("");
      setNewPassword("");
      setConfirmedPassword("");
    } else {
      try {
        await axios.put("/api/current", { password, newPassword });
        mutate();
        swal({
          title: "Changed!",
          icon: "success",
        });
      } catch (error) {
        console.error("Error:", error);
        swal({
          title: "Warning!",
          icon: "warning",
          text: "Old password does not match",
        });
      }
      setPassword("");
      setNewPassword("");
      setConfirmedPassword("");
    }
  };

  return (
    <form onSubmit={handlePasswordChange} className="pb-12">
      <h2 className="text-white text-2xl mb-8 text-center font-semibold">
        Change password
      </h2>
      <div className="w-[70%] mx-auto h-64 flex flex-col justify-between">
        <Input
          label="Password"
          name="password"
          onChange={(event: any) => setPassword(event.target.value)}
          id="password"
          type="password"
          value={password}
        />
        <Input
          label="New Password"
          name="newPassword"
          onChange={(event: any) => setNewPassword(event.target.value)}
          id="newPassword"
          type="password"
          value={newPassword}
        />
        <Input
          label="Confirm Password"
          name="confirmedPassword"
          onChange={(event: any) => setConfirmedPassword(event.target.value)}
          id="confirmedPassword"
          type="password"
          value={confirmedPassword}
        />
        <button
          type="submit"
          className="bg-orange-600 py-3 text-white rounded-md w-full mt-5 hover:bg-orange-700 transition"
        >
          Change
        </button>
      </div>
    </form>
  );
};

export default ModalPasswordChangeForm;
