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


interface Props{
  windspeed:number;
  windspeedData:number[];
}
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const WindChart = ({ windspeed , windspeedData} : Props) => {

  const chartData = {
    labels: Array(12).fill(""),
    datasets: [
      {
        data: windspeedData, // sample line data
        borderColor: "#ffffff",
        borderWidth: 1,
        fill: true,
        tension: 0.4, // smooth curve
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
 <div className="lg:w-74 sm:w-65 xs:h-36  ml-3 sm:ml-0 xs:w-37 smx:w-39 smx:h-39  lg:h-48 sm:h-45 p-3  backdrop-blur-md border rounded-2xl bg-transparent   border-white/23 shadow-lg flex flex-col justify-between">
  {/* Top Section */}
  <div className="flex justify-between items-center text-white">
    <div className="flex items-center gap-1">
      <Wind className="sm:w-5 sm:h-5 w-3 h-3" />
      <img className="sm:w-8 sm:h-4 w-4 h-2 ml-[-1.6rem] object-cover" src="wind.png" alt="" />
      <span className="sm:text-sm text-[10px] font-semibold text-white">Wind status</span>
    </div>
    <span className="sm:text-lg text-[10px] text-white">{windspeed.toFixed(2)} km/h</span>
  </div>

  {/* Line Chart */}
  <div className="flex-1 mt-2 relative w-full h-24">
    <Line data={chartData} options={options} />
  </div>

{/* Bottom Bars */}
<div className="flex items-end gap-2 h-24   overflow-x-auto">
  {windspeedData.slice(0, 12).map((val, i) => {
    console.log("bar", i, val);
    return (
      <div
        key={i}
        className="w-4  bg-white "
        style={{ height: `${val * 4}px` }}
      />
    );
  })}
</div>



</div>

  );
};

export default WindChart;
