import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface UserListProps {
    users: Record<string, any>[]
}



const OverhoursChart: React.FC<UserListProps> = ({ users }) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
    
      
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Overhours',
          },
        },
      };
      
      const labels = users.map((user) => {return user.name})


    const data = {
        labels,
        datasets: [
          {
            label: 'Overhours',
            data: users.map((user) => {return user.overhours}),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
    console.log(users);
    
    return (
        <div className='w-full h-full'>
            <Bar
                options={options}
                data={data}
                className='w-[70%] text-2xl'
            />
        </div>
    )
}

export default OverhoursChart