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
        <div className='grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 w-full justify-center'>
            {data.map((user) => (
                <div className='bg-white group bg-opacity-80 rounded-md shadow-lg mx-auto mt-10 lg:w-72 sm:w-96 transition duration delay-300 h-max' key={user.id}>
                    <HiOutlineUserCircle className='mx-auto' size={150}/>
                    <p className='text-center my-2'>{user.name}</p>
                    <div className='
                        
                        hidden
                        transition-opacity
                        opacity-0
                        duration-150
                        z-10
                        delay-300
                        w-full
                        invisible
                        scale-0
                        group-hover:visible
                        group-hover:block
                        group-hover:scale-100
                        group-hover:opacity-100
                    '>
                        <p className='m-4 '><strong>Overhours:</strong> {user.overhours}</p>
                        <p className='m-4'><strong>Vacations:</strong> {user.vacations}</p>
                    </div>
                    <button className='bg-gray-500 w-full rounded-b-md py-3 hover:bg-gray-700 cursor-pointer transition'>View profile</button>
                </div>
            )
                
            )}
        </div>
    )
}

export default UserList