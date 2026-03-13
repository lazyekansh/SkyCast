"use client";
import { indianAQI, aqiLabel, outdoorAdvice } from "@/utils/helpers";

export default function AirQuality({ weather }) {
  if (!weather?.current?.air_quality) return null;

  const aq = weather.current.air_quality;
  const pm25 = aq.pm2_5 || 0;
  const aqi = indianAQI(pm25);
  const label = aqiLabel(aqi);
  const rainChance = weather.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain || 0;
  const advice = outdoorAdvice(aqi, rainChance);

  // AQI gauge arc (0-500 scale)
  const pct = Math.min(aqi / 500, 1);
  const arcAngle = pct * 180;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-up">
      {/* AQI Card */}
      <div className="glass-card rounded-3xl p-5">
        <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          Air Quality
        </h3>
        <div className="flex flex-col items-center gap-3">
          {/* Gauge */}
          <div className="relative w-40 h-24 mx-auto">
            <svg viewBox="0 0 160 90" className="w-full h-full">
              {/* Background arc */}
              <path
                d="M 15 80 A 65 65 0 0 1 145 80"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Colored arc */}
              <path
                d="M 15 80 A 65 65 0 0 1 145 80"
                fill="none"
                stroke={label.color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${arcAngle * 1.14} 999`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
              <span className="text-3xl font-bold text-white">{aqi}</span>
              <span className="text-xs font-medium" style={{ color: label.color }}>
                {label.text}
              </span>
            </div>
          </div>

          {/* Pollutant details */}
          <div className="w-full grid grid-cols-3 gap-2 mt-2">
            <div className="text-center">
              <p className="text-white/50 text-[10px] uppercase">PM2.5</p>
              <p className="text-white text-sm font-semibold">{pm25.toFixed(1)}</p>
            </div>
            <div className="text-center">
              <p className="text-white/50 text-[10px] uppercase">PM10</p>
              <p className="text-white text-sm font-semibold">{(aq.pm10 || 0).toFixed(1)}</p>
            </div>
            <div className="text-center">
              <p className="text-white/50 text-[10px] uppercase">O₃</p>
              <p className="text-white text-sm font-semibold">{(aq.o3 || 0).toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Outdoor Advice Card */}
      <div className="glass-card rounded-3xl p-5 flex flex-col justify-between">
        <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Outdoor Activity
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
          {advice.level === "good" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : advice.level === "moderate" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          )}
          <p className="text-white font-semibold text-lg">{advice.text}</p>
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
            advice.level === "good"
              ? "bg-green-500/20 text-green-300"
              : advice.level === "moderate"
              ? "bg-yellow-500/20 text-yellow-300"
              : "bg-red-500/20 text-red-300"
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              advice.level === "good"
                ? "bg-green-400"
                : advice.level === "moderate"
                ? "bg-yellow-400"
                : "bg-red-400"
            }`}></span>
            {advice.level === "good" ? "Safe" : advice.level === "moderate" ? "Caution" : "Unsafe"}
          </div>
        </div>
      </div>
    </div>
  );
}
