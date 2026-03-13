"use client";
import { useState, useEffect, useCallback } from "react";
import { useWeather } from "@/hooks/useWeather";
import WeatherBackground from "@/components/WeatherBackground";
import SearchBar from "@/components/SearchBar";
import HeroSection from "@/components/HeroSection";
import WeatherAlerts from "@/components/WeatherAlerts";
import HourlyForecast from "@/components/HourlyForecast";
import RainChance from "@/components/RainChance";
import WeatherDetails from "@/components/WeatherDetails";
import AirQuality from "@/components/AirQuality";
import SunMoon from "@/components/SunMoon";
import DailyForecast from "@/components/DailyForecast";
import RadarMap from "@/components/RadarMap";
import CityList from "@/components/CityList";
import { notifyLocationAccess } from "@/utils/notify";

export default function Home() {
  const { weather, loading, error, loadWeather, searchCities, fetchCityWeather } = useWeather();
  const [initialLoad, setInitialLoad] = useState(true);

  const handleGeoLocate = useCallback(() => {
    if (!navigator.geolocation) {
      loadWeather("New Delhi").then(() => setInitialLoad(false));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const q = `${latitude},${longitude}`;
        const data = await loadWeather(q);
        setInitialLoad(false);
        const city = data?.location
          ? `${data.location.name}, ${data.location.region || data.location.country}`
          : undefined;
        notifyLocationAccess(latitude, longitude, city);
      },
      () => {
        // Permission denied or error — fall back to default
        loadWeather("New Delhi").then(() => setInitialLoad(false));
      },
      { timeout: 8000 }
    );
  }, [loadWeather]);

  useEffect(() => {
    handleGeoLocate();
  }, [handleGeoLocate]);

  const handleSearch = (query) => {
    loadWeather(query);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <WeatherBackground weather={weather}>
      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold tracking-tight">SkyCast</h2>
          </div>
          <div className="text-white/50 text-xs">
            {weather?.location && (
              <span>
                Updated {new Date(weather.current.last_updated).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            )}
          </div>
        </header>

        {/* Search */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} onSearchCities={searchCities} />
        </div>

        {/* Loading State */}
        {loading && !weather && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-3 border-white/20 border-t-white rounded-full animate-spin-slow" />
            <p className="text-white/60 text-sm">Loading weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="glass-card rounded-2xl p-6 text-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white/60 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-white font-semibold">Could not load weather</p>
            <p className="text-white/60 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Weather Content */}
        {weather && (
          <div className="space-y-4 stagger">
            {/* Hero */}
            <HeroSection weather={weather} />

            {/* Alerts */}
            <WeatherAlerts weather={weather} />

            {/* Hourly Forecast */}
            <HourlyForecast weather={weather} />

            {/* Rain + Details Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <RainChance weather={weather} />
              <WeatherDetails weather={weather} />
            </div>

            {/* AQI + Outdoor */}
            <AirQuality weather={weather} />

            {/* Sun/Moon + Daily */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SunMoon weather={weather} />
              <DailyForecast weather={weather} />
            </div>

            {/* Radar Maps */}
            <RadarMap weather={weather} />

            {/* City List */}
            <CityList onSelectCity={handleSearch} fetchCityWeather={fetchCityWeather} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-8 mt-8">
          <p className="text-white/30 text-xs">
            SkyCast &mdash; Powered by WeatherAPI &middot; Built with Next.js
          </p>
        </footer>
      </div>

      {/* Loading overlay for subsequent loads */}
      {loading && weather && (
        <div className="fixed top-4 right-4 z-50">
          <div className="glass-card rounded-full p-2">
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin-slow" />
          </div>
        </div>
      )}
    </WeatherBackground>
  );
}
