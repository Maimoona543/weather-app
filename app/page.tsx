"use client";
import { useEffect, useState } from "react";
import WeatherData from "./component/WeatherData";
import WindChart from "./component/WindChart";
import SunArcCard from "./component/Sun";
import TemperatureChart from "./component/TemperatureChart";
import Detail from "./component/Detail";
import { motion, AnimatePresence } from "framer-motion";


interface WeatherData {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
    windspeed_10m_max: number[];
    winddirection_10m_dominant: number[];
    sunrise: string[];
    sunset: string[];
  };
  hourly: {
    time: string[];
    temperature_2m:number[];
    weathercode: number[];
    windspeed_10m: number[];
    winddirection: number[];
  };

 
}

export default function HomePage() {
  const [input,setInput] = useState("paris")
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [message, setMessage] = useState<string>("");
  const [daily,setDaily] = useState(true)

  async function fetchWeather(cityName: string) {
    setMessage(""); // reset previous message
    setWeather(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setMessage("City not found");
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      const res = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,winddirection_10m_dominant,sunrise,sunset&hourly=temperature_2m,weathercode,windspeed_10m,winddirection&timezone=auto`
);

      const data = await res.json();

      if (!data || !data.daily) {
        setMessage("City not found");
        return;
      }

      setWeather(data);
    } catch {
      setMessage("City not found");
    }
  }

  useEffect(() => {
    fetchWeather(city);

  }, []);

  const selection = city
  return (
    <div className="p-4 w-full" >
      <div className="flex flex-row justify-between items-center">
       <div className="flex flex-row  items-center">
        <img className="h-9 w-9 object-cover bg-black" src="/weatherIcon.png" alt="" />
        <p>Weather Forecast</p>
       </div>

      {/* Search Bar */}
      <div className=" flex gap-2 mb-4 border rounded-3xl p-1 h-13 w-[73%]" >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city name"
          className="border-none p-2 w-[88%] rounded-4xl"
        />
        <button
          onClick={() =>{ fetchWeather(input); setCity(input)}}
          className="bg-blue-500 text-white text-lg px-7 py-2 rounded-4xl hover:bg-blue-300 "
        >
          Search
        </button>
      </div>

      {/* day/date */}
   
<div>
  {!weather || message ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <div>
      <p>
        {weather.daily.time.length
          ? new Date(weather.daily.time[0]).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })
          : "Loading..."}
      </p>
    </div>
  )}
</div>


      </div>

      {/* Friendly Message */}
      {message && <p className="text-red-500 font-semibold">{message}</p>}

      {/* Weather Data */}
      {weather && !message && (
        <>
    
        <div className="flex flex-row justify-between items-center \">
       <WeatherData weather={weather} city={selection} />
          <div className="mr-4 ">
   <div className="mb-6  mt-[20%]">
            <WindChart windspeed={weather.daily.windspeed_10m_max[0]} />
          </div>
          <div className="my-6">
            <SunArcCard
              sunrise={new Date(weather.daily.sunrise[0]).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              sunset={new Date(weather.daily.sunset[0]).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          </div>
          </div>
        </div>
   
       

<div className="ml-11 my-4 text-xl font-semibold ">
  <button className="mr-4 border rounded-3xl px-7 py-2" onClick={() => setDaily(true)}>Daily</button>
  <button className=" border rounded-3xl px-7 py-2" onClick={() => setDaily(false)}>Hourly</button>
</div>


{daily ? (
  <AnimatePresence mode="wait">
    <motion.div
      key="daily"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <TemperatureChart
        dates={weather.daily.time}
        tempMax={weather.daily.temperature_2m_max}
        tempMin={weather.daily.temperature_2m_min}
        weatherCode={weather.daily.weathercode}
      />
    </motion.div>
  </AnimatePresence>
) : (
  <AnimatePresence mode="wait">
    <motion.div
      key="hourly"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <Detail
        weathercode={weather.hourly.weathercode}
        winddirection={weather.hourly.winddirection}
        windspeed_10m={weather.hourly.windspeed_10m}
        temperature_2m={weather.hourly.temperature_2m}
        time={weather.hourly.time}
      />
    </motion.div>
  </AnimatePresence>
)}

        </>
      )}
    </div>
  );
}
