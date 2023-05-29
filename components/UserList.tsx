import axios from "axios";
import UserItem from "./UserItem";
import useUserList from "@/hooks/useUserList";
import Swal from "sweetalert2";
import useCurrentUser from "@/hooks/useCurrentUser";

const UserList = () => {
  const { data: Firefighters = [], mutate } = useUserList();
  const { data: currentUser } = useCurrentUser();

  const handleDelete = async (id: string, name: string) => {
    try {
      await axios.delete(`/api/users/${id}`, { data: { name } });
      mutate();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const userAlert = (id: string, name: string) => {
    Swal.fire({
      title: "Are You sure?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (currentUser.name === name) {
        Swal.fire("You can not delete yourself!", "", "error");
      } else if (result.isConfirmed) {
        handleDelete(id, name);
        Swal.fire("User deleted", "", "success");
      } else Swal.fire(" Cancelled", "", "error");
    });
  };

  return (
    <div className="flex flex-wrap w-full justify-center">
      {Firefighters.map((user: Record<string, number>) => (
        <UserItem key={user.id} data={user} deleteButton={userAlert} />
      ))}
    </div>
  );
};

export default UserList;
