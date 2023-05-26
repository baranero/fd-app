import useSettingsModal from "@/hooks/useSettingsModal";
import React, { useCallback, useEffect, useState } from "react"
import prismadb from '@/lib/prismadb';
import { AiOutlineClose } from "react-icons/ai";
import SelectInput from "./SelectInput";
import Input from "./Input";
import { NextPageContext } from "next";
import useRegisteredUsers from "@/hooks/useRegisteredUsers";
import axios from "axios";
import swal from "sweetalert";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signIn } from "next-auth/react";



interface SettingsModalProps {
    visible?: boolean;
    onClose: any;
}


const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {

    const { data: registeredUsers = [] } = useRegisteredUsers()
    const { data: currentUser = [], mutate } = useCurrentUser()

    const [isVisible, setIsVisible] = useState(!!visible)
    const [name, setName] = useState(registeredUsers[0]?.name);
    const [admin, setAdmin] = useState("false")
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    

    useEffect(() => {
        setIsVisible(!!visible)
    }, [visible])

    const handleClose = useCallback(() => {
        setIsVisible(false)
        setTimeout(() => {
            onClose()
        }, 300)
    }, [onClose])

    const handleAdminPerm = async (event: any) => {
        event.preventDefault();
        swal({
            title: "Changed!",
            icon: "success",
            
          })
        
        try {
          await axios.put("/api/usersList", { name, admin });
        } catch (error) {
          console.error("Error:", error);
        }
    }

    const handlePasswordChange = async (event: any) => {
        event.preventDefault();
        swal({
            title: "Changed!",
            icon: "success",
            
          })
        
        try {
          await axios.put("/api/current", { password, newPassword });
        } catch (error) {
          console.error("Error:", error);
        }
    }

    if (!visible) {
        return null
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
                    w-[70%]
                    rounded-md
                    overflow-hidden
                "
            >
                <div className={`
                    ${isVisible ? 'scale-80' : 'scale-0'}
                    transform
                    duration-300
                    relative
                    flex-auto
                    bg-zinc-900
                    drop-shadow-md
                `}>
                    <div className="
                        relative h-12
                    " >



                        <div className="
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
                        " onClick={handleClose}>
                            <AiOutlineClose className="text-white" size={20}/>
                        </div>

                        

                    </div>
                    <form onSubmit={handleAdminPerm} className="pb-12">
                        <h2 className="text-white text-2xl mb-8 text-center font-semibold">Set administrator permissions</h2>
                        <div className="w-[70%] mx-auto h-48 flex flex-col justify-between">
                            <SelectInput
                                            id="name"
                                            name="name"
                                            label="Name"
                                            onChange={(event: any) => setName(event.target.value)}
                                            value={name}
                                            option={registeredUsers.map((user: any) => {
                                                return <option key={user.id} value={user.name} >{user.name}</option>
                                            })}
                            />
                            <SelectInput
                                            id="isAdmin"
                                            name="isAdmin"
                                            label="Admin"
                                            onChange={(event: any) => setAdmin(event.target.value)}
                                            value={admin}
                                            option={<>
                                                <option value="true">True</option>
                                                <option value="false">False</option>
                                                </>}
                            />
                            <button
            type="submit"
            className="bg-orange-600 py-3 text-white rounded-md w-full mt-5 hover:bg-orange-700 transition"
          >
            Set
          </button>
                        </div>
                    </form>
                    <form onSubmit={handlePasswordChange} className="pb-12">
                        <h2 className="text-white text-2xl mb-8 text-center font-semibold">Change password</h2>
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
                </div>
            </div>
        </div>
    )
}

export default SettingsModal