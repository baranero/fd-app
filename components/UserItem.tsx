import { useRouter } from "next/router"
import { HiOutlineUserCircle } from "react-icons/hi"
import { AiOutlineDown } from "react-icons/ai"
import { useCallback, useState } from "react";
import UserInfo from "./UserInfo";
import axios from "axios";
import { mutate } from "swr";

interface UserItemProps {
    data: Record<string, any>;
    onHandleDelete: (id: string) => void;
    deleteButton: (id: string) => void;
}

const UserItem: React.FC<UserItemProps> = ({ data, onHandleDelete, deleteButton }) => {
    
    const router = useRouter()

    const [showUserInfo, setShowUserInfo] = useState(false)

    

    const toggleUserInfo = useCallback(() => {
        setShowUserInfo((current) => !current)
    }, [])

    return (
        <div className='
        
        group
        mx-5
        rounded-md
        shadow-lg
        mt-10
        w-[60vw]
        md:w-[25vw]
        lg:w-[15vw]
        transition
        duration
        delay-300
        h-max' key={data?.id}>
            <div className="bg-opacity-80 rounded-md bg-white group-hover:scale-[115%] ">
                <div className="">
                        <HiOutlineUserCircle className='mx-auto' size={150}/>
                        <div className="mt-3 mb-5">
                            <p className='mx-auto text-lg w-max flex'>{data.name}<AiOutlineDown onClick={toggleUserInfo} className={`ml-4 cursor-pointer hover:opacity-50 transition ${showUserInfo ? 'rotate-180' : 'rotate-0'}`} size={20}/></p> 
                        </div>
                        <UserInfo visible={showUserInfo} data={data}/>
                        <button onClick={() => deleteButton(data.id)} className='bg-gray-500 w-full rounded-b-md py-3 hover:bg-gray-700 cursor-pointer transition'>Delete</button>
                    </div>
            </div>
        </div>
    )
}

export default UserItem