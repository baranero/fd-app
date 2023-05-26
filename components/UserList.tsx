import axios from 'axios';
import UserItem from './UserItem';
import useUserList from '@/hooks/useUserList';

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
    
    return (
        <div className='flex flex-wrap w-full justify-center'>
            {Firefighters.map((user : Record<string, number>) => (
                <UserItem key={user.id} data={user} onHandleDelete={handleDelete}/>
            )
                
            )}
        </div>
    )
}

export default UserList