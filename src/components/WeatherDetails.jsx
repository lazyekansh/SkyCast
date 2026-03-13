"use client";
import { uvLabel, windDirection } from "@/utils/helpers";

function DetailCard({ icon, label, value, subtext, color }) {
  return (
    <div className="glass-card-inner rounded-2xl p-4 flex flex-col gap-1 hover:bg-white/15 transition-all">
      <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <span className={`text-2xl font-bold ${color || "text-white"}`}>{value}</span>
      {subtext && <span className="text-white/50 text-xs">{subtext}</span>}
    </div>
  );
}

export default function WeatherDetails({ weather }) {
  if (!weather?.current) return null;
  const c = weather.current;
  const uv = uvLabel(c.uv);

  return (
    <div className="glass-card rounded-3xl p-5 animate-slide-up">
      <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Weather Details
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <DetailCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          label="Feels Like"
          value={`${Math.round(c.feelslike_c)}°`}
          subtext={
            Math.abs(c.feelslike_c - c.temp_c) > 3
              ? c.feelslike_c > c.temp_c
                ? "Feels warmer"
                : "Feels cooler"
              : "Similar to actual"
          }
        />
        <DetailCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
          label="Wind"
          value={`${Math.round(c.wind_kph)} km/h`}
          subtext={`${windDirection(c.wind_degree)} · Gusts ${Math.round(c.gust_kph)} km/h`}
        />
        <DetailCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
          label="Humidity"
          value={`${c.humidity}%`}
          subtext={`Dew point ${Math.round(c.dewpoint_c)}°`}
        />
        <DetailCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
          label="Visibility"
          value={`${c.vis_km} km`}
          subtext={c.vis_km >= 10 ? "Clear visibility" : c.vis_km >= 5 ? "Moderate" : "Low visibility"}
        />
        <DetailCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
          label="Pressure"
          value={`${c.pressure_mb} mb`}
          subtext={c.pressure_mb > 1013 ? "High pressure" : "Low pressure"}
        />
        <DetailCard
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          label="UV Index"
          value={c.uv}
          subtext={uv.text}
          color={`text-white`}
        />
      </div>
    </div>
  );
}
