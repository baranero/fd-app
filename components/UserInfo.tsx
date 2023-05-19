interface UserInfoProps {
    visible: boolean;
    data: Record<string, any>
}

const UserInfo: React.FC<UserInfoProps> = ({ visible, data }) => {

    if (!visible) {
        return null
    }

    return (
        <div>
                        <div className='
                        '>
                            <p className='m-4 '><strong>Overhours:</strong> {data?.amount ? data?.amount : 0}</p>
                            <p className='m-4'><strong>Vacations:</strong> {data?.vacations}</p>
                        </div>
        </div>
    )
}

export default UserInfo