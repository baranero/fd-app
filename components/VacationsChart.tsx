import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface UserListProps {
  holiday: Record<string, any>[];
  additional: Record<string, any>[];
}

const VacationsChart: React.FC<UserListProps> = ({ holiday, additional }) => {
  ChartJS.defaults.color = "#FFF";
  ChartJS.defaults.borderColor = "#7a7a7a";

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Magazyn",
        font: {
          size: 30,
        },
        padding: {
          bottom: 40,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = holiday.map((user) => {
    return user.name;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Vacations - Holiday",
        data: holiday.map((user) => {
          return user.amount;
        }),
        backgroundColor: "rgba(150, 200, 232, 0.9)",
      },
      {
        label: "Vacations - Additional",
        data: additional.map((user) => {
          return user.amount;
        }),
        backgroundColor: "rgba(50, 200, 132, 0.9)",
      },
    ],
  };

  return (
    <div className="bg-zinc-700 p-6 my-14 lg:mx-14 rounded-xl bg-opacity-50">
      <div className="w-[90%] h-[70vh] mx-auto flex items-center">
        <Bar
          options={options}
          data={data}
          className="w-[80%] h-full text-white"
        />
      </div>
    </div>
  );
};

export default VacationsChart;
