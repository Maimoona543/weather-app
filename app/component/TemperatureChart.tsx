import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartOptions,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale,ChartDataLabels, PointElement, LineElement, Tooltip, Legend);

function getWeatherIcon(code: number) {
  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return "⛅";
  if (code >= 45 && code <= 48) return "☁️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 95) return "⛈️";
  return "🌍";
}



// chnaging emoji to canvas as chart.js only recognizes circle triangle rectangle or canvas img..
function createEmojiIcon(emoji: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  ctx.font = "27px sans-serif";     // font size
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, 16, 16);      // draw emoji in the middle
  return canvas;
}


interface Props {
  dates: string[];
  tempMax: number[];
  weatherCode: number[];
}

const TemperatureChart = ({ dates, tempMax, weatherCode }: Props) => {
  // Point style: circle for today, icons for others
const pointStyles = weatherCode.map((code, i) => (i === 0 ? "circle" : createEmojiIcon(getWeatherIcon(code))));
const pointRadii = weatherCode.map((_, i) => (i === 0 ? 8 : 18));


  // Customize today's circle color
  const pointBackgroundColors = weatherCode.map((_, i) => (i === 0 ? "#FFFFFF  " : "transparent")); 
  const pointBorderColors = weatherCode.map((_, i) => (i === 0 ? "#FFFFFF " : "transparent"));

  const chartData = {
    labels: dates.map((date: string) =>
      new Date(date).toLocaleDateString("en-US", { weekday: "short", day: "numeric" })
    ),
datasets: [
  {
    label: "",
    data: tempMax,
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
     borderWidth: 1,
    tension: 0.4,
    fill: true,
    pointStyle: pointStyles,          // emoji or "circle"
    pointRadius: pointRadii,          
    pointBackgroundColor: pointBackgroundColors,     
    pointBorderColor: pointBorderColors,  
  },
]
  };
const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  
    layout: {
  padding: {
    left: 35,   
    right: 26,
    top: 75,
    bottom: 10,
  },

  },
  animation: {
    duration: 2000,          // total animation time
    easing: "linear",        // smooth forward motion
    delay: (ctx) => ctx.dataIndex * 150,
  },
  animations: {
    x: {
      duration: 2000,
      easing: "linear",
      from: 0,               // start from left
    },
    y: {
      duration: 2000,
      easing: "linear",
      from: 0,               // smoothly grow upwards
    },
  },
plugins: {
  legend: { display: false },
 datalabels: {
  align: "top",
  anchor: "end",
  labels: {
    day: {
      formatter: (_: string, ctx: { dataIndex: number } ) => {
        const day = new Date(dates[ctx.dataIndex]).toLocaleDateString("en-US", {
          weekday: "short",
        });
        return day;
      },
      font: { size: 12, weight: 400 },
      color: "#fff",
       offset: 15,
       
    },
    temp: {
      formatter: (value: number) => `${Math.round(value)}°`,
      font: { size: 20, weight: "bold" },
      color: "#fff",
       offset: -10,
       padding:{
        bottom: 12,
       }
    },
  },


  },
  tooltip: {
    enabled: true,
    backgroundColor: "rgba(0,0,0,0.7)",
    titleFont: { size: 20, weight: "bold" as const },
    bodyFont: { size: 12, weight: "normal" as const },
    padding: 8,
    cornerRadius: 8,
    displayColors: false,
  },
  },
  scales: {
    y: { display: false, grid: { display: false }, border: { display: false } },
    x: { display: false, grid: { display: false }, border: { display: false } },
  },
};


  return (
    <div className="w-full h-75 sm:p-1 rounded-lg `shadow-md bg-transparent border-white/22 ">
      <Line data={chartData} options={options} />
    </div>
  );
};

// react.memo ensures that it only rerenders onlt if props chnages
export default React.memo(TemperatureChart); 





