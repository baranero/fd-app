import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HiOutlineUserCircle } from 'react-icons/hi'
import UserItem from './UserItem';
import useUserList from '@/hooks/useUserList';
import useOverhours from '@/hooks/useOverhours';
import { outputOverhours } from '@/utils/outputOverhours';

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