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
      <div className='bg-neutral-700 p-6 my-14 lg:mx-14 rounded-xl bg-opacity-50'>
      <div className='w-[90%] h-[70vh] mx-auto flex items-center'>
          <Bar
              options={options}
              data={data}
              className='w-[80%] h-full text-white'
          />
      </div>
    </div>
    )
}

export default VacationsChart