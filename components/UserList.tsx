import { isEmpty } from 'lodash';
import Image from 'next/image';
import { HiOutlineUserCircle } from 'react-icons/hi'

interface UserListProps {
    data: Record<string, any>[]
}

const UserList: React.FC<UserListProps> = ({ data }) => {

    if (isEmpty(data)) {
        return null
    }

    return (
        <div className='grid grid-cols-5 w-full justify-center'>
            {data.map((user) => (
                <div className='bg-white bg-opacity-50 rounded-md shadow-lg mx-auto mt-10 w-72' key={user.id}>
                    <HiOutlineUserCircle className='mx-auto' size={150}/>
                    <p className='text-center my-2'>{user.name}</p>
                    <p className='my-2'><strong>Overhours:</strong> {user.overhours}</p>
                    <p className='my-2'><strong>Vacations:</strong> {user.vacations}</p>
                    <button className='bg-gray-500 w-full rounded-b-md py-3 hover:bg-gray-700 cursor-pointer transition'>View profile</button>
                </div>
            )
                
            )}
        </div>
    )
}

export default UserList