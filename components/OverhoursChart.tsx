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
            text: 'Chart.js Bar Chart',
          },
        },
      };
      
      const labels = users.map((user) => {return user.name})


    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: users.map((user) => {return user.overhours}),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
    console.log(users);
    
    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}

export default OverhoursChart