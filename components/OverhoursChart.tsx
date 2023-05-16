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



const OverhoursChart: React.FC<UserListProps> = ({ users }) => {

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
            text: 'Overhours',
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
            label: 'Overhours',
            data: users.map((user) => {return user.overhours}),
            backgroundColor: 'rgba(255, 99, 132, 0.9)',
          },
        ],
      };

    return (
        <div className='bg-neutral-700 my-14 rounded-xl bg-opacity-50'>
          <div className='lg:p-6 md:p-6 lg:w-[70%] md:w-[85%] sm:w-full sm:p-1 lg:h-max sm:h-[800px] mx-auto '>
              <Bar
                  options={options}
                  data={data}
                  className='w-full mx-10 my-20 text-white'
              />
          </div>
        </div>
    )
}

export default OverhoursChart