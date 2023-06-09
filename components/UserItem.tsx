import { useRouter } from "next/router";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineDown } from "react-icons/ai";
import { useCallback, useState } from "react";
import UserInfo from "./UserInfo";
import useCurrentUser from "@/hooks/useCurrentUser";

interface UserItemProps {
  data: Record<string, any>;
  deleteButton: (id: string, name: string) => void;
}

const UserItem: React.FC<UserItemProps> = ({ data, deleteButton }) => {
  const { data: currentUser } = useCurrentUser();

  const router = useRouter();

  const [showUserInfo, setShowUserInfo] = useState(false);

  const toggleUserInfo = useCallback(() => {
    setShowUserInfo((current) => !current);
  }, []);

  return (
    <div
      className="
        shadow-lg 
        group
        mx-5
        rounded-md
        bg-white
        bg-opacity-80
        mt-10
        w-[60vw]
        md:w-[25vw]
        lg:w-[20%]
        transition
        duration
        delay-100
        hover:scale-[115%]
        h-max"
      key={data?.id}
    >
      <div className=" rounded-md   ">
        <div className="">
          <HiOutlineUserCircle className="mx-auto" size={150} />
          <div className="mt-3 mb-5">
            <p className="mx-auto text-lg w-full items-center justify-center flex">
              {data.name}
              <AiOutlineDown
                onClick={toggleUserInfo}
                className={`ml-4 cursor-pointer hover:opacity-50 transition ${
                  showUserInfo ? "rotate-180" : "rotate-0"
                }`}
                size={20}
              />
            </p>
          </div>
          <UserInfo visible={showUserInfo} data={data} />
          {currentUser?.isAdmin === "true" ? (
            <button
              onClick={() => deleteButton(data.id, data.name)}
              className="bg-gray-500 w-full rounded-b-md py-3 hover:bg-gray-700 cursor-pointer transition"
            >
              Delete
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserItem;
