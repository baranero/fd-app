import { isEmpty } from 'lodash';

interface UserListProps {
    data: Record<string, any>[]
}

const UserList: React.FC<UserListProps> = ({ data }) => {

    if (isEmpty(data)) {
        return null
    }

    return (
        <div>
            {data.map((user) => (
                <div key={user.id}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    <p>{}</p>
                </div>
            )
                
            )}
        </div>
    )
}

export default UserList