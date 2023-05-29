import axios from 'axios';
import UserItem from './UserItem';
import useUserList from '@/hooks/useUserList';
import Swal from 'sweetalert2';
import swal from 'sweetalert';

const UserList = () => {

    const { data: Firefighters = [], mutate } = useUserList()

    const handleDelete = async (id: string) => {
      try {
        await axios.delete(`/api/users/${id}`);
        mutate();
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const userAlert = (id: string) => {
      Swal.fire({
          title: 'Are You sure?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          icon: 'warning'
      }
      ).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
              handleDelete(id)
              Swal.fire('User deleted', '', 'success');

          } else
              Swal.fire(' Cancelled', '', 'error')

      })
  }

    return (
        <div className='flex flex-wrap w-full justify-center'>
          
            {Firefighters.map((user : Record<string, number>) => (
                <UserItem key={user.id} data={user} onHandleDelete={handleDelete} deleteButton={userAlert}/>
            )
                
            )}
        </div>
    )
}

export default UserList