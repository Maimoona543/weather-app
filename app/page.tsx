"use client";
import { useEffect, useState } from "react";
import WeatherData from "./component/WeatherData";
import WindChart from "./component/WindChart";
import SunArcCard from "./component/Sun";
import TemperatureChart from "./component/TemperatureChart";
import Detail from "./component/Detail";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "./component/LoadingSpinner";


// fetching data for charts... 
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
  const [input,setInput] = useState("")
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [message, setMessage] = useState<string>("");
  const [daily,setDaily] = useState(true)
  const [bgCode, setBgCode] = useState<number>(0);


  async function fetchWeather(cityName: string) {
    setMessage(""); // reset previous message
    // setWeather(null);

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
        setBgCode(data.daily.weathercode[0]);
  } catch {
    setMessage("City not found");
  }
  }

  useEffect(() => {
    fetchWeather(city);

  }, []);


  function getWeatherVideo(code: number) {
  if (code <= 1) return "/clear-sky.mp4";
  if (code === 2) return "/partly-cloudy.mp4";
  if (code === 3) return "/cloudy.mp4";
  if (code >= 45 && code <= 48) return "/foggy.mp4";
  if (code >= 51 && code <= 67) return "/heavy-drizzle.mp4";
  if (code >= 71 && code <= 77) return "/heavy-snow.mp4";
  if (code >= 95) return "/81.mp4";
  return "/clear-sky.mp4";
}

  const selection = city
  return (
<>
{!weather ? (
  
  <div className="h-min-screen ">
    < LoadingSpinner/>
  </div>
  
  
):(
  
  <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden">


{/* Blurred background video */}
<AnimatePresence mode="wait">
  {weather && (
    <motion.video
      key={bgCode}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      initial={{ opacity: 0, filter: "blur(12px) brightness(70%)" }}
      animate={{ opacity: 1, filter: "blur(8px) brightness(100%)" }}
      exit={{ opacity: 0, filter: "blur(12px) brightness(60%)" }}
      transition={{
        duration: 2.8, // smoother & slower fade
        ease: [0.45, 0, 0.55, 1], // natural ease curve
      }}
      className="absolute inset-0 w-full h-full object-cover sm:rounded-2xl -z-10 blur-md"
    >
      <source
        src={getWeatherVideo(weather?.daily.weathercode[0] ?? 0)}
        type="video/mp4"
      />
    </motion.video>
  )}
</AnimatePresence>


{/* Main content card */}
<div className="relative xs:w-full sm:w-[85%] sm:my-4 pt-2 h-full sm:rounded-2xl overflow-hidden ">
  <AnimatePresence mode="wait">
  {weather && (
    <motion.video
      key={bgCode} // triggers animation when bgCode changes
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 2.8, // longer fade for smoothness
        ease: [0.45, 0, 0.55, 1], // smoother easing curve
      }}
      className="absolute inset-0 w-full h-full object-cover sm:rounded-2xl -z-10"
    >
      <source
        src={getWeatherVideo(weather?.daily.weathercode[0] ?? 0)}
        type="video/mp4"
      />
    </motion.video>
  )}
</AnimatePresence>




    <div className="flex flex-row smx:justify-between items-center">
     <div className="flex flex-row  items-center">
      <img className="sm:h-9 sm:w-9 xs:h-6  xs:w-6 h-7 w-7 object-cover pr-1" src="/weatherIcon.png" alt="" />
        <p className="text-white smx:w-25 sm:w-30  sm:text-[14px] xs:mr-2  xs:text-[10px] smx:text-[12px]">
          Weather Forecast
        </p>       
      </div>

    {/* Search Bar */}
    <div className=" flex gap-2  items-center border border-white rounded-3xl  p-1 lg:h-13 xs:h-10  h-11 w-[50%] xs:w-[39%] sm:w-[59%] lg:w-[65%] xl:w-[73%]" >
      <img className="sm:w-5 ml-1 sm:h-5 w-4 h-4 object-cover" src="magnifying-glass.png" alt="" />
      <input
      
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name"
        className="border-none p-1 text-white sm:w-[88%] w-[80%] rounded-4xl outline-none focus:ring-0 focus:outline-none"
      />
      <button
           onClick={() => {
  setCity(input);      // update the label "Weather in Paris"
  fetchWeather(input); // fetch new weather only on search
}}
        className=" border  btn-bg text-white  sm:text-lg sm:px-7  sx:px[2] px-[9%]    text-md  py-1  lg:py-2 rounded-4xl"
      >
        Search
      </button>
    </div>

    {/* day/date */}
 
<div className="p-2">
{!weather || message ? (
  <div>
    <p className='text-white'>Loading...</p>
  </div>
) : (
  <div className="text-white sm:text-sm text-[12px]">
    <p>
      {weather.daily.time.length
        ? new Date(weather.daily.time[0]).toLocaleDateString("en-US", {
            weekday: "short",
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
  
      <div className="flex flex-col sm:flex-row justify-between mt-5 sm:mt-14">
        <div>
     <WeatherData  weather={weather} city={selection}  />
        </div>
        <div className="mr-4">
          <div className="w-60 text-center mb-2 hidden sm:block">
            <p className="sm:text-md text-sm ml-6 leading-none text-color font-semibold pb-2">Get real-time weather updates with live temperature, wind, and sky conditions.</p>
          </div>
          <div className="flex flex-row  sm:flex-col gap-2 sm:gap-0 justify-center sm:justify-between">
 <div className="mb-3 ">
          <WindChart windspeed={weather.daily.windspeed_10m_max[0]} windspeedData={weather.hourly.windspeed_10m} />
        </div>
        <div className="sm:mt-1">
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
      </div>
 
     

<div className="sm:ml-11   ml-2  mb-4 text-xl font-semibold ">
<button className="sm:mr-4  mr-2 border rounded-3xl px-7  text-white py-2" onClick={() => setDaily(true)}>Daily</button>
<button className=" border rounded-3xl px-7  py-2 text-white" onClick={() => setDaily(false)}>Hourly</button>
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
</div>
)

}
</>

  );
}

