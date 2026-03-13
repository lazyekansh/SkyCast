"use client";
import Image from "next/image";
import { formatHour } from "@/utils/helpers";

export default function HourlyForecast({ weather }) {
  if (!weather?.forecast?.forecastday?.[0]) return null;

  const now = new Date();
  const currentHour = now.getHours();

  // Get remaining hours today + hours from tomorrow
  const todayHours = weather.forecast.forecastday[0].hour.filter(
    (h) => new Date(h.time).getHours() >= currentHour
  );
  const tomorrowHours = weather.forecast.forecastday[1]?.hour || [];
  const hours = [...todayHours, ...tomorrowHours].slice(0, 24);

  return (
    <div className="glass-card rounded-3xl p-5 animate-slide-up">
      <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Hourly Forecast
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {hours.map((h, i) => {
          const isNow = i === 0;
          return (
            <div
              key={i}
              className={`flex flex-col items-center gap-2 min-w-[60px] py-3 px-2 rounded-2xl transition-all ${
                isNow ? "bg-white/20 shadow-lg" : "hover:bg-white/10"
              }`}
            >
              <span className="text-white/70 text-xs font-medium">
                {isNow ? "Now" : formatHour(h.time)}
              </span>
              <div className="relative w-8 h-8">
                <Image
                  src={`https:${h.condition.icon}`}
                  alt={h.condition.text}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white text-sm font-semibold">
                {Math.round(h.temp_c)}°
              </span>
              {h.chance_of_rain > 0 && (
                <span className="text-blue-300 text-[10px] font-medium flex items-center gap-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" />
                  </svg>
                  {h.chance_of_rain}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
