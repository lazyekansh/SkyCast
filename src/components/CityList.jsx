"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const POPULAR_CITIES = [
  "New Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata",
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Bhopal", "Chandigarh", "Patna", "Thiruvananthapuram", "Bhubaneswar",
  "Dehradun", "Ranchi", "Raipur", "Guwahati", "Shimla",
  "Gangtok", "Imphal", "Shillong", "Agartala", "Panaji",
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
        <span>🏙️</span>
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
