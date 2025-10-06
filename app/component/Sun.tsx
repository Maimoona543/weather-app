"use client";

import { Sunrise, Sunset } from "lucide-react";

const SunArcCard = ({ sunrise, sunset }: { sunrise: string; sunset: string }) => {
  return (
 <div className="lg:w-74 sm:w-65 w-39 h-38  lg:h-48 sm:h-45 p-3 backdrop-blur-md bg-transparent border-white/23 shadow-lg border rounded-2xl flex flex-col justify-between">
  {/* Top Labels */}
  <div className="flex justify-between text-sm">
    <div className="flex flex-col items-center gap-1">
      <div className="flex flex-row justify-center items-center">
        <Sunrise className="w-3 h-3 text-yellow-800" />
        <span className="text-white sm:text-sm text-[12px]  ml-1">Sunrise</span>
      </div>
      <span className="opacity-80 text-white sm:text-sm text-[12px]">{sunrise}</span>
    </div>

    <div className="flex flex-col items-center gap-1">
      <div className="flex flex-row justify-center items-center">
        <Sunset className="w-3 h-3 text-orange-800" />
        <span className="text-white sm:text-sm text-[12px] ml-1">Sunset</span>
      </div>
      <span className="opacity-80 text-white sm:text-sm text-[12px]">{sunset}</span>
    </div>
  </div>

  {/* Sun Path Arc */}
  <div className="flex-1 flex items-center justify-center relative">
   <svg viewBox="0 0 200 100" className="w-full h-auto">
  {/* Arc Path */}
  <path
    d="M 10 90 A 80 80 0 0 1 190 90"
    stroke="white"
    strokeWidth="1"
    fill="none"
    strokeDasharray="3 3"
  />
  {/* Sunrise dot (start of arc) */}
  <circle cx="10" cy="90" r="5" fill="orange" />
  {/* Sunset dot (end of arc) */}
  <circle cx="190" cy="90" r="5" fill="skyblue" />
</svg>

    {/* Sun Icon */}
    <div className="absolute bottom-0">
      <img
        className="w-12 h-12 object-contain"
        src="sunrise.png"
        alt="sun"
      />
    </div>
  </div>
</div>
  )
}

export default SunArcCard;
