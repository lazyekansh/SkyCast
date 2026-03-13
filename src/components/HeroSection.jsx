"use client";
import Image from "next/image";

export default function HeroSection({ weather }) {
  if (!weather) return null;
  const { location, current, forecast } = weather;
  const today = forecast?.forecastday?.[0]?.day;

  return (
    <div className="text-center py-6 sm:py-10 animate-fade-in">
      <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-1">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {location.name}
      </h1>
      <p className="text-white/60 text-sm mb-6">
        {location.region}, {location.country}
      </p>

      <div className="flex items-center justify-center gap-4 mb-4">
        {current.condition?.icon && (
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 drop-shadow-xl">
            <Image
              src={`https:${current.condition.icon.replace("64x64", "128x128")}`}
              alt={current.condition.text}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
        <div>
          <span className="text-7xl sm:text-8xl font-thin text-white tracking-tighter">
            {Math.round(current.temp_c)}°
          </span>
        </div>
      </div>

      <p className="text-white/90 text-lg font-medium mb-2">
        {current.condition.text}
      </p>

      {today && (
        <div className="flex items-center justify-center gap-4 text-sm text-white/70">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            H: {Math.round(today.maxtemp_c)}°
          </span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            L: {Math.round(today.mintemp_c)}°
          </span>
          <span>Feels like {Math.round(current.feelslike_c)}°</span>
        </div>
      )}
    </div>
  );
}
