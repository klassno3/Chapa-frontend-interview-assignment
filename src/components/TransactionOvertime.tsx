"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend
);

const TransactionOvertime = () => {
  const labels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "2024",
        data: [90, 90, 85, 76, 36, 562, 163, 430, 320, 380, 250, 470],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
        fill: false,
      },
      {
        label: "2025",
        data: [560, 600, 580, 620, 580, 590, 610],
        borderColor: "#0caf6b",
        backgroundColor: "#0caf6b",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,

      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl  max-w-4xl mx-auto">
      <Line data={ data } options={ options } />
    </div>
  );
};

export default TransactionOvertime;
