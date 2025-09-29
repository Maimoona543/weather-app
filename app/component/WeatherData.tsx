'use client'
import { span } from 'framer-motion/client';
import React, { use, useEffect, useState } from 'react'


interface Props{
    weather:any;
    city:string;
}

function getWeatherDescription(code: number) {

 const map: { [key: number]: { title: string; sub: string; desc: string } } = {
  0: {
    title: "Clear Sky",
    sub: "Bright & Sunny",
    desc: "The sky will remain completely clear with plenty of sunshine throughout the day. Perfect conditions for outdoor activities 🌞."
  },
  1: {
    title: "Mainly Clear",
    sub: "Mostly Sunny",
    desc: "Mostly sunny with just a few clouds scattered across the sky. Overall, a bright and pleasant day ☁️."
  },
  2: {
    title: "Partly Cloudy",
    sub: "Mildly Cloudy",
    desc: "A balanced mix of sun and clouds, giving occasional shade but still comfortable ⛅."
  },
  3: {
    title: "Overcast",
    sub: "Cloud-Dominated",
    desc: "Thick clouds covering the sky with very little sunshine expected. A rather dull and grey day 🌥️."
  },
  45: {
    title: "Foggy",
    sub: "Low Visibility",
    desc: "Dense fog reducing visibility, especially during the early morning and late evening hours 🌫️."
  },
  48: {
    title: "Rime Fog",
    sub: "Icy Fog",
    desc: "Foggy weather with icy deposits forming on surfaces, creating slippery conditions ❄️."
  },
  51: {
    title: "Light Drizzle",
    sub: "Slight Wetness",
    desc: "A few drops of drizzle expected, not very intense but enough to dampen the ground 🌦️."
  },
  53: {
    title: "Moderate Drizzle",
    sub: "Steady Drizzle",
    desc: "Consistent light drizzle throughout the day. Carrying an umbrella is advised 🌦️."
  },
  55: {
    title: "Dense Drizzle",
    sub: "Almost Rain",
    desc: "Heavier drizzle that may feel like light rain. Roads and surfaces may become wet 🌧️."
  },
  61: {
    title: "Light Rain",
    sub: "Gentle Showers",
    desc: "Occasional light rain showers; not too heavy but may interrupt outdoor plans 🌦️."
  },
  63: {
    title: "Moderate Rain",
    sub: "Steady Showers",
    desc: "Steady rainfall expected, lasting for several hours. Keep your rain gear handy 🌧️."
  },
  65: {
    title: "Heavy Rain",
    sub: "Intense Downpour",
    desc: "Strong downpours likely, with the chance of localized flooding in low-lying areas 🌧️."
  },
  71: {
    title: "Light Snow",
    sub: "Gentle Snowfall",
    desc: "Gentle snow showers with light accumulation. Roads may remain clear but surfaces could be slippery ❄️."
  },
  73: {
    title: "Moderate Snow",
    sub: "Steady Snow",
    desc: "Snow will fall at a steady rate, with noticeable accumulation expected. Dress warmly ❄️."
  },
  75: {
    title: "Heavy Snow",
    sub: "Blizzard-like",
    desc: "Blizzard-like conditions with heavy snowfall. Travel disruptions are likely 🌨️."
  },
  77: {
    title: "Snow Grains",
    sub: "Tiny Snow Particles",
    desc: "Tiny snow particles falling lightly, often during very cold conditions ❄️."
  },
  80: {
    title: "Light Showers",
    sub: "Quick Rain",
    desc: "Short-lived, scattered rain showers that may come and go quickly 🌦️."
  },
  81: {
    title: "Moderate Showers",
    sub: "Frequent Showers",
    desc: "Frequent rain showers that may last for a few hours 🌧️."
  },
  82: {
    title: "Violent Showers",
    sub: "Stormy Rain",
    desc: "Heavy, storm-like showers with strong gusts of wind 🌧️."
  },
  95: {
    title: "Thunderstorm",
    sub: "Stormy Weather",
    desc: "Expect thunder and lightning, possibly with bursts of heavy rain. Stay indoors during peak activity ⛈️."
  },
  96: {
    title: "Thunderstorm with Hail",
    sub: "Severe Storm",
    desc: "Severe thunderstorm conditions with both lightning and hail. Outdoor activity is highly discouraged ⛈️."
  },
  99: {
    title: "Severe Thunderstorm",
    sub: "Extreme Danger",
    desc: "Intense thunderstorm with hail and heavy downpours. Dangerous weather — take proper precautions ⛈️."
  }
};

return map[code] || {
  title: "Unknown",
  sub: "Unclassified Weather",
  desc: "Weather information is currently unavailable for this condition 🌍."
};
}

const WeatherChart = ({weather , city}:Props) => {
   const [temp, setTemp] = useState<number | null>(null);

  useEffect(() => {
    if (weather?.daily?.temperature_2m_max) {
      setTemp(Math.floor(weather.daily.temperature_2m_max[0]));
    }
  }, [weather]);

   return (
    <>
       {/* title + description */}
   <div className=' pl-7 text-white'>
    {weather && (
        <div>
            <div>
               <h1 className='text-7xl font-bold-md pb-3' >
                {getWeatherDescription(weather.daily.weathercode[0]).title }
            </h1>
           <h2 className='text-3xl pl-3 pb-3'>
            {getWeatherDescription(weather.daily.weathercode[0]).sub}
           </h2>
            <h3 className='text-lg w-[55%] pl-3 leading-none'>
                {getWeatherDescription(weather.daily.weathercode[0]).desc}
            </h3>
            </div>
           
  <div>
  <h3 className="pl-3 pb-2 pt-[7%] text-6xl font-bold text-white">
    {temp !== null ? (
      <div className="flex items-center">
        {/* Sign */}
        <div className="text-2xl font-extralight mr-1">
          {temp > 0 ? "+" : "-"}
        </div>

        {/* Temperature */}
        <div className="text-7xl font-bold ">
          {Math.abs(temp)}
          <span className='font-extralight'>°</span>
        </div>
      </div>
    ) : (
      "Loading..."
    )}
  </h3>
</div>
      <div className='flex flex-row  items-center'>

       <img className='w-3 h-4 object-cover ml-4 mr-1 ' src="pin.png" alt="" />
       <h3 className='text-xl font-normal  '>{city}</h3>
      </div>
        </div>

    )}


   </div>


    </>
  )
}

export default WeatherChart


