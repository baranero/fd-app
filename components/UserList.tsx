import UserItem from './UserItem';
import useUserList from '@/hooks/useUserList';

const UserList = () => {

    const { data: Firefighters = [] } = useUserList()
    
    return (
        <div className='flex flex-wrap p-8 w-full justify-center'>
            {Firefighters.map((user : Record<string, number>) => (
                <UserItem key={user.id} data={user}/>
            )
                
            )}
        </div>
    )
}

export default UserList