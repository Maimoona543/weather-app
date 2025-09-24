"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Wind } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const WindChart = ({ windspeed }: { windspeed: number}) => {

  const chartData = {
    labels: Array(12).fill(""),
    datasets: [
      {
        data: [2, 4, 6, 5, 7, 9, 8, 6, 7, 5, 4, 3], // sample line data
        borderColor: "rgba(55, 65, 81, 0.4)",
        borderWidth: 1,
        fill: false,
        tension: 0.5, // smooth curve
        pointRadius: 0, // hide points
      },
    ],
  };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
  legend: { display: false },
  tooltip: { enabled: false },
  datalabels: { display: false } 
},
  scales: {
    x: { 
      display: false, 
      grid: { display: false }, 
      ticks: { display: false },
    },
    y: { 
      display: false, 
      grid: { display: false }, 
      ticks: { display: false },  
    },
  },
};

  return (
 <div className="w-70 h-43 p-1 rounded-5xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg flex flex-col justify-between">
  {/* Top Section */}
  <div className="flex justify-between items-center text-white">
    <div className="flex items-center gap-1">
      <Wind className="w-5 h-5" />
      <img className="w-8 h-4 ml-[-1.6rem] object-cover" src="wind.png" alt="" />
      <span className="text-sm font-semibold text-gray-400">Wind status</span>
    </div>
    <span className="text-lg  text-gray-400">{windspeed.toFixed(2)} km/h</span>
  </div>

  {/* Line Chart */}
  <div className="flex-1 mt-2 relative w-full h-24">
    <Line data={chartData} options={options} />
  </div>

  {/* Bottom Bars */}
  <div className="flex justify-between items-end">
    {Array.from({ length: 12 }, (_, i) => (
      <div
        key={i}
        className="w-5 bg-gray-400 "
        style={{ height: `${Math.random() * 20 + 5}px` }}
      />
    ))}
  </div>
</div>

  );
};

export default WindChart;
