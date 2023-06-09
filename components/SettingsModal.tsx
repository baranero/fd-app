import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SelectInput from "./SelectInput";
import Input from "./Input";
import useRegisteredUsers from "@/hooks/useRegisteredUsers";
import axios from "axios";
import swal from "sweetalert";
import useCurrentUser from "@/hooks/useCurrentUser";

interface SettingsModalProps {
  visible?: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
  const { data: registeredUsers = [] } = useRegisteredUsers();
  const { data: currentUser = [], mutate } = useCurrentUser();

  const [isVisible, setIsVisible] = useState(!!visible);
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

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
  
  const handlePasswordChange = async (event: any) => {
    event.preventDefault();

    if (newPassword.length < 8 ) {
      swal({
        title: "Warning!",
        icon: "warning",
        text: "Password must be at least 8 characters long.",
      });
      setNewPassword('')
      return;
    }

    if (newPassword !== confirmedPassword) {
      swal({
        title: "Warning!",
        icon: "warning",
        text: "Passwords are different",
      });
      setNewPassword('')
      setConfirmedPassword('')
    } else if (password === newPassword) {
      swal({
        title: "Warning!",
        icon: "warning",
        text: "The old password is the same as the new one",
      });
      setPassword('')
      setNewPassword('')
      setConfirmedPassword('')
    }  else {

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
      setPassword('')
      setNewPassword('')
      setConfirmedPassword('')
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="
                z-50
                transition
                duration-300
                bg-black
                bg-opacity-80
                flex
                justify-center
                items-center
                overflow-x-hidden
                overflow-y-auto
                fixed
                inset-0
                w-full
            "
    >
      <div
        className="
                    relative
                    mx-auto
                    w-full
                    lg:w-[70%]
                    rounded-md
                    overflow-hidden
                "
      >
        <div
          className={`
                    ${isVisible ? "scale-80" : "scale-0"}
                    transform
                    duration-300
                    relative
                    flex-auto
                    bg-zinc-900
                    drop-shadow-md
                `}
        >
          <div
            className="
                        relative h-12
                    "
          >
            <div
              className="
                            cursor-pointer
                            absolute
                            top-3
                            right-3
                            h-10
                            w-10
                            rounded-full
                            bg-black
                            bg-opacity-70
                            flex
                            items-center
                            justify-center
                        "
              onClick={handleClose}
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>
          </div>
          {currentUser?.isAdmin === "true" ? (
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
                    { value: "false", label: "False" }
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
          ) : (
            <></>
          )}
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
                onChange={(event: any) =>
                  setConfirmedPassword(event.target.value)
                }
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
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
