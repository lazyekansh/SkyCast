"use client";
import Image from "next/image";
import { formatDay } from "@/utils/helpers";

export default function DailyForecast({ weather }) {
  if (!weather?.forecast?.forecastday) return null;
  const days = weather.forecast.forecastday;

  // Find global min/max for temperature bar scaling
  const allMin = Math.min(...days.map((d) => d.day.mintemp_c));
  const allMax = Math.max(...days.map((d) => d.day.maxtemp_c));
  const range = allMax - allMin || 1;

  return (
    <div className="glass-card rounded-3xl p-5 animate-slide-up">
      <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {days.length}-Day Forecast
      </h3>
      <div className="space-y-3">
        {days.map((d, i) => {
          const minPct = ((d.day.mintemp_c - allMin) / range) * 100;
          const maxPct = ((d.day.maxtemp_c - allMin) / range) * 100;

          return (
            <div
              key={i}
              className="flex items-center gap-3 py-2 border-b border-white/10 last:border-0"
            >
              <span className="text-white/80 text-sm w-20 shrink-0 font-medium">
                {formatDay(d.date)}
              </span>
              <div className="relative w-7 h-7 shrink-0">
                <Image
                  src={`https:${d.day.condition.icon}`}
                  alt={d.day.condition.text}
                  fill
                  className="object-contain"
                />
              </div>
              {d.day.daily_chance_of_rain > 0 && (
                <span className="text-blue-300 text-xs w-10 shrink-0">
                  💧{d.day.daily_chance_of_rain}%
                </span>
              )}
              {d.day.daily_chance_of_rain === 0 && (
                <span className="w-10 shrink-0"></span>
              )}
              <span className="text-white/60 text-sm w-8 text-right shrink-0">
                {Math.round(d.day.mintemp_c)}°
              </span>
              {/* Temperature bar */}
              <div className="flex-1 h-1.5 bg-white/10 rounded-full relative mx-2">
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 transition-all duration-500"
                  style={{
                    left: `${minPct}%`,
                    right: `${100 - maxPct}%`,
                  }}
                ></div>
              </div>
              <span className="text-white text-sm w-8 shrink-0 font-semibold">
                {Math.round(d.day.maxtemp_c)}°
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
