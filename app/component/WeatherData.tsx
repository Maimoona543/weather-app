"use client";
import React, { use, useEffect, useState } from "react";

interface Props {
  weather: any;
  city: string;
}

function getWeatherDescription(code: number) {
  const map: { [key: number]: { title: string; sub: string; } } = {
    0: {
      title: "Clear Sky",
      sub: "Bright & Sunny",
    },
    1: {
      title: "Mainly Clear",
      sub: "Mostly Sunny",
    },
    2: {
      title: "Partly Cloudy",
      sub: "Mildly Cloudy",
    },
    3: {
      title: "Overcast",
      sub: "Cloud-Dominated",
    },
    45: {
      title: "Foggy",
      sub: "Low Visibility",
    },
    48: {
      title: "Rime Fog",
      sub: "Icy Fog",
    },
    51: {
      title: "Light Drizzle",
      sub: "Slight Wetness",
    },
    53: {
      title: "Moderate Drizzle",
      sub: "Steady Drizzle",
    },
    55: {
      title: "Dense Drizzle",
      sub: "Almost Rain",
    },
    61: {
      title: "Light Rain",
      sub: "Gentle Showers",
    },
    63: {
      title: "Moderate Rain",
      sub: "Steady Showers",
    },
    65: {
      title: "Heavy Rain",
      sub: "Intense Downpour",
    },
    71: {
      title: "Light Snow",
      sub: "Gentle Snowfall",
    },
    73: {
      title: "Moderate Snow",
      sub: "Steady Snow",
    },
    75: {
      title: "Heavy Snow",
      sub: "Blizzard-like",
    },
    77: {
      title: "Snow Grains",
      sub: "Tiny Snow Particles",
    },
    80: {
      title: "Light Showers",
      sub: "Quick Rain",
    },
    81: {
      title: "Moderate Showers",
      sub: "Frequent Showers",
    },
    82: {
      title: "Violent Showers",
      sub: "Stormy Rain",
    },
    95: {
      title: "Thunderstorm",
      sub: "Stormy Weather",
    },
    96: {
      title: "Thunderstorm with Hail",
      sub: "Severe Storm",
    },
    99: {
      title: "Severe Thunderstorm",
      sub: "Extreme Danger",
    },
  };

  return (
    map[code] || {
      title: "Unknown",
      sub: "Unclassified Weather",
      desc: "Weather information is currently unavailable for this condition 🌍.",
    }
  );
}

const WeatherChart = ({ weather, city }: Props) => {
  const [temp, setTemp] = useState<number | null>(null);
  const highTemp = Math.floor(weather.daily.temperature_2m_max[0]);
  const lowTemp = Math.floor(weather.daily.temperature_2m_min[0]);

  useEffect(() => {
    if (weather?.daily?.temperature_2m_max) {
      setTemp(Math.floor(weather.hourly.temperature_2m[0]));
    }
  }, [weather]);

  return (
    <>
      {/* title + description */}
      <div className="sm:pl-7 smx:pl-4 flex pl-2 text-white">
        {weather && (
          <div>
            <div>
              <h1 className="lg:text-7xl text-4xl sm:text-6xl font-bold-md sm:pb-3 pb-1">
                {getWeatherDescription(weather.daily.weathercode[0]).title}
              </h1>
              <h2 className="lg:text-3xl md:text-2xl  text-xl sm:pl-3 sm:pb-3 pb-1">
                {getWeatherDescription(weather.daily.weathercode[0]).sub}
              </h2>
            
            </div>

            <div className="flex flex-row items-center mt-2 ">
              <div>
              <h3 className="sm:pl-3 pb-2 pt-[7%] sm:text-6xl text-xl font-bold text-color">
                {temp !== null ? (
                  <div className="flex items-center">
                    {/* Sign */}
                    <div className="text-2xl  font-extralight mr-1">
                      {temp > 0 ? "+" : "-"}
                    </div>

                    {/* Temperature */}
                    <div className="sm:text-9xl text-color  text-8xl text-color font-bold ">
                      {Math.floor(temp)}
                      <span className="font-extralight">°</span>
                    </div>
                  </div>
                ) : (
                  "Loading..."
                )}
              </h3>
              </div>


              {/* low and high temp */}
              <div className="text-xl ml-2 ">
                {/* high temp */}
                <div className="border rounded-xl border-white pl-3 pr-3 sm:px-6    py-1">
                <h2 className="flex justify-center flex-row">
                  <p className="pr-3">H</p>
                  <div className="flex items-center">
                    {/* Sign */}
                    <div className="text-sm">{highTemp > 0 ? "+" : "-"}</div>

                    {/* Temperature */}
                    <div className=" ">
                      {Math.floor(highTemp)}
                      <span className="font-extralight">°</span>
                    </div>
                  </div>
                </h2>
                </div>

                {/* low tmep */}
                <div className="border  rounded-xl  border-white  mt-2 pl-3 pr-3 sm:px-6 py-1">
                <h3 className="flex flex-row">
                  <p className="pr-3">H</p>
                  <div className="flex items-center">
                    {/* Sign */}
                    <div className="">{lowTemp > 0 ? "+" : "-"}</div>

                    {/* Temperature */}
                    <div className=" ">
                      {Math.floor(lowTemp)}
                      <span className="font-extralight">°</span>
                    </div>
                  </div>
                </h3>
                </div>
              </div>
            </div>
            <div className="flex mb-3 sm:mb-0mb-3 sm:mb-0 flex-row  items-center">
              <img
                className="w-3 h-4 object-cover sm:ml-4 mr-1 "
                src="pin.png"
                alt=""
              />
              <h3 className="text-xl  font-normal">{city}</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherChart;