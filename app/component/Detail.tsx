import React from "react";

interface Props {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
  windspeed_10m: number[];
  winddirection: number[];
}

function getWeatherIcon(code: number) {
  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return "⛅";
  if (code >= 45 && code <= 48) return "☁️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 95) return "⛈️";
  return "🌍";
}

const Detail = ({ time, temperature_2m, weathercode, windspeed_10m, winddirection }: Props) => {
     const today = new Date().toLocaleDateString();
  const nowHour = new Date().getHours();


 const todayHours = time
    .map((t, i) => ({ t, i }))
    .filter(({ t }) => new Date(t).toLocaleDateString() === today);

return (
<div className="border rounded-lg p-4 shadow-md bg-transparent border-white/60  mb-4">
    <h3 className="font-bold mb-2 text-white">
        Today
    </h3>

    <div className="flex flex-row gap-2 overflow-x-auto">
        {todayHours.map(({t,i}) => {
        const hours = new Date(t).getHours()
        const current = hours === nowHour;


        return (
<div
  key={i}
  className={`flex flex-col items-center p-2 border rounded-lg min-w-[55px] lg:min-w-[60px] 
    ${current ? "bg-blue-200/40 border-blue-400 backdrop-blur-md" : "bg-white/40 backdrop-blur-md"}`}
>
              <span>{new Date(t).toLocaleTimeString([], { hour: "2-digit" })}</span>
              <span className="text-2xl">{getWeatherIcon(weathercode[i])}</span>
              <span>{Math.floor(temperature_2m[i])}°C</span>
              <span className="text-[10px]">💨 {Math.floor(windspeed_10m[i])} m/s</span>
              <span>🧭 {winddirection[i]}°</span>

            </div>
        )
        }
    )
    }
    </div>
</div>
)
};

export default Detail;
