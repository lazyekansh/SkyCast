"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const POPULAR_CITIES = [
  "New Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata",
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Bhopal", "Chandigarh", "Patna", "Thiruvananthapuram", "Bhubaneswar",
  "Dehradun", "Ranchi", "Raipur", "Guwahati", "Shimla",
  "Gangtok", "Imphal", "Shillong", "Panaji",
];

export default function CityList({ onSelectCity, fetchCityWeather }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const results = await Promise.allSettled(
        POPULAR_CITIES.map((city) => fetchCityWeather(city))
      );
      if (!cancelled) {
        setCities(
          results
            .filter((r) => r.status === "fulfilled" && r.value)
            .map((r) => r.value)
        );
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [fetchCityWeather]);

  return (
    <div className="glass-card rounded-3xl p-5 animate-slide-up">
      <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Popular Cities
      </h3>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="glass-card-inner rounded-2xl p-4 animate-pulse">
              <div className="h-4 bg-white/10 rounded mb-2 w-20"></div>
              <div className="h-8 bg-white/10 rounded w-12"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {cities.map((c, i) => (
            <button
              key={i}
              onClick={() => onSelectCity(c.location.name)}
              className="glass-card-inner rounded-2xl p-3 text-left hover:bg-white/20 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-sm font-semibold truncate">
                  {c.location.name}
                </span>
                <div className="relative w-8 h-8 shrink-0">
                  <Image
                    src={`https:${c.current.condition.icon}`}
                    alt={c.current.condition.text}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-white text-2xl font-bold">
                {Math.round(c.current.temp_c)}°
              </span>
              <p className="text-white/50 text-xs truncate mt-0.5">
                {c.current.condition.text}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
