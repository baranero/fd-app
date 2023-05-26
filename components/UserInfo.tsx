import useOverhours from "@/hooks/useOverhours";
import useUserList from "@/hooks/useUserList";
import useVacations from "@/hooks/useVacations";
import { outputOverhours } from "@/utils/outputOverhours";
import { outputVacations } from "@/utils/outputVacations";

interface UserInfoProps {
    visible: boolean;
    data: Record<string, number>
}

const UserInfo: React.FC<UserInfoProps> = ({ visible, data }) => {


    const { data: Firefighters = [] } = useUserList()
    const { data: Vacations = [] } = useVacations()
    const { data: Overhours = [] } = useOverhours()

    const overhours = outputOverhours(Overhours, Firefighters)
    const holiday = outputVacations(Vacations, Firefighters, 'Holiday')
    const additional = outputVacations(Vacations, Firefighters, 'Additional')
    
    let index = overhours.findIndex((item) => item.name === data.name)

    if (!visible) {
        return null
    }

    return (
        <div>
                        <div className='
                        '>
                            <p className='m-4 text-lg'><strong>Overhours:</strong> {overhours[index].amount ? overhours[index].amount : 0} </p>
                            <p className='mt-4 ml-4 mb-2 text-lg'><strong>Vacations:</strong> </p>
                                <div>
                                    <p className="text-sm ml-10 mb-1">Holiday: {holiday[index].amount ? holiday[index].amount : 0}</p>
                                    <p className="text-sm ml-10 mb-2">Additional: {additional[index].amount ? additional[index].amount : 0}</p>
                                </div>
                            
                        </div>
        </div>
    )
}

export default UserInfo