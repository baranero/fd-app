import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HiOutlineUserCircle } from 'react-icons/hi'
import UserItem from './UserItem';

interface UserListProps {
    data: Record<string, any>[]
}

const UserList: React.FC<UserListProps> = ({ data }) => {

    

    if (isEmpty(data)) {
        return null
    }

    return (
        <div className='flex flex-wrap p-8 w-full justify-center'>
            {data.map((user) => (
                <UserItem key={user.id} data={user}/>
            )
                
            )}
        </div>
    )
}

export default UserList