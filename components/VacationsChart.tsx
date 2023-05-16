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
    users: Record<string, any>[];
}



const VacationsChart: React.FC<UserListProps> = ({ users }) => {

    ChartJS.defaults.color = '#FFF';
    ChartJS.defaults.borderColor = '#7a7a7a';

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
      );
    
      
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          
          title: {
            display: true,
            text: 'Vacations',
            font: {
              size: 30
            },
            padding: {
              bottom: 40
            }
          },
        },
      };
      
      const labels = users.map((user) => {return user.name})


    const data = {
        labels,
        datasets: [
          {
            label: 'Vacations',
            data: users.map((user) => {return user.vacations}),
            backgroundColor: 'rgba(50, 200, 132, 0.9)',
          },
        ],
      };

    return (
        <div className='p-6 bg-neutral-700 w-[80%] mx-auto my-14 rounded-xl bg-opacity-50'>
            <Bar
                options={options}
                data={data}
                className='w-[60%] mx-auto my-20 text-white'
            />
        </div>
    )
}

export default VacationsChart