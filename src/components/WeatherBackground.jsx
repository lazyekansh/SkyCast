"use client";
import { getWeatherTheme } from "@/utils/helpers";

export default function WeatherBackground({ weather, children }) {
  let theme = "sunny";
  if (weather?.current) {
    theme = getWeatherTheme(weather.current.condition.text, weather.current.is_day);
  }

  return (
    <div className={`weather-bg weather-${theme} min-h-screen transition-all duration-1000`}>
      {/* Animated elements */}
      {theme === "rain" && (
        <div className="rain-overlay pointer-events-none fixed inset-0 z-0" />
      )}
      {theme === "night" && (
        <div className="stars-overlay pointer-events-none fixed inset-0 z-0" />
      )}
      {theme === "snow" && (
        <div className="snow-overlay pointer-events-none fixed inset-0 z-0" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
