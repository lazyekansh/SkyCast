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
          <span>🌬️</span>
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
                {label.text} {label.emoji}
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
          <span>🏃</span>
          Outdoor Activity
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
          <span className="text-5xl">{advice.icon}</span>
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
