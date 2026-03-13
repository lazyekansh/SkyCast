"use client";
import { uvLabel, windDirection } from "@/utils/helpers";

function DetailCard({ icon, label, value, subtext, color }) {
  return (
    <div className="glass-card-inner rounded-2xl p-4 flex flex-col gap-1 hover:bg-white/15 transition-all">
      <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
        <span>{icon}</span>
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
          icon="🌡️"
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
          icon="💨"
          label="Wind"
          value={`${Math.round(c.wind_kph)} km/h`}
          subtext={`${windDirection(c.wind_degree)} · Gusts ${Math.round(c.gust_kph)} km/h`}
        />
        <DetailCard
          icon="💧"
          label="Humidity"
          value={`${c.humidity}%`}
          subtext={`Dew point ${Math.round(c.dewpoint_c)}°`}
        />
        <DetailCard
          icon="👁️"
          label="Visibility"
          value={`${c.vis_km} km`}
          subtext={c.vis_km >= 10 ? "Clear visibility" : c.vis_km >= 5 ? "Moderate" : "Low visibility"}
        />
        <DetailCard
          icon="🔵"
          label="Pressure"
          value={`${c.pressure_mb} mb`}
          subtext={c.pressure_mb > 1013 ? "High pressure" : "Low pressure"}
        />
        <DetailCard
          icon="☀️"
          label="UV Index"
          value={c.uv}
          subtext={uv.text}
          color={`text-white`}
        />
      </div>
    </div>
  );
}
