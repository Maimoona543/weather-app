"use client";

import { Sunrise, Sunset } from "lucide-react";

const SunArcCard = ({ sunrise, sunset }: { sunrise: string; sunset: string }) => {
  return (
 <div className="w-74 h-48 p-3  backdrop-blur-md bg-white/10 border rounded-2xl  border-white/20 shadow-lg flex flex-col justify-between">
      {/* Top Labels */}
      <div className="flex  justify-between text-sm">
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-row justify-center items-center">
          <Sunrise className="w-3 h-3 text-yellow-800" />
          <span className="text-white text-sm">Sunrise</span>
          </div>
          <div>
          <span className="opacity-80 text-white text-sm">{sunrise}</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
           <div className="flex flex-row justify-center items-center">

          <Sunset className="w-3 h-3 text-orange-800" />
          <span className="text-white text-sm">Sunset</span>
          </div>
          <div>
          <span className="opacity-80 text-sm text-white">{sunset}</span>
          </div>
         
        </div>
      </div>

      {/* Sun Path Arc */}
      <div className="flex-1 flex items-center justify-center relative">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Arc Path */}
          <path
            d="M 10 90 A 80 80 0 0 1 190 90"
            stroke="#ffffff"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3 3"
          />
          {/* Sunrise dot */}
          <circle cx="10" cy="90" r="5" fill="orange" />
          {/* Sunset dot */}
          <circle cx="190" cy="90" r="5" fill="skyblue" />
        </svg>

        {/* Sun Icon */}
        <div className="absolute bottom-0">
         <img className="w-40 h-25  object-contain " src="sunrise.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SunArcCard;
