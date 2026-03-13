import { NextResponse } from "next/server";

const API_KEY = process.env.WEATHER_API_KEY || "fec68ebf3d3341e09f295825251712";
const BASE = "https://api.weatherapi.com/v1";

function generateMockForecast(q) {
  const now = new Date();
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const h = new Date(now);
    h.setHours(i, 0, 0, 0);
    hours.push({
      time: h.toISOString().slice(0, 16).replace("T", " "),
      temp_c: 28 + Math.round(Math.sin(i / 4) * 6),
      condition: { text: i > 6 && i < 18 ? "Partly Cloudy" : "Clear", icon: "//cdn.weatherapi.com/weather/64x64/" + (i > 6 && i < 18 ? "day/116.png" : "night/113.png") },
      chance_of_rain: i > 14 && i < 18 ? 40 : 10,
    });
  }
  const forecastDays = [];
  for (let d = 0; d < 7; d++) {
    const day = new Date(now);
    day.setDate(day.getDate() + d);
    forecastDays.push({
      date: day.toISOString().slice(0, 10),
      day: {
        maxtemp_c: 34 - d, mintemp_c: 22 + d,
        condition: { text: "Partly Cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" },
        daily_chance_of_rain: 20 + d * 5,
        totalprecip_mm: d * 0.5,
      },
      astro: {
        sunrise: "06:15 AM", sunset: "06:45 PM",
        moon_phase: "Waxing Crescent", moon_illumination: "35",
      },
      hour: hours,
    });
  }
  return {
    location: { name: q || "New Delhi", region: "Delhi", country: "India", lat: 28.6, lon: 77.2 },
    current: {
      temp_c: 31, feelslike_c: 34, humidity: 55, wind_kph: 12, wind_degree: 180,
      gust_kph: 20, vis_km: 8, pressure_mb: 1008, uv: 6, dewpoint_c: 21,
      is_day: 1, last_updated: now.toISOString().slice(0, 16).replace("T", " "),
      condition: { text: "Partly Cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" },
      air_quality: { pm2_5: 65, pm10: 95, o3: 42 },
    },
    forecast: { forecastday: forecastDays },
    alerts: { alert: [] },
  };
}

function generateMockCurrent(q) {
  return {
    location: { name: q, region: "", country: "India" },
    current: {
      temp_c: 28 + Math.round(Math.random() * 8),
      condition: { text: "Partly Cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" },
    },
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  try {
    let url;
    switch (action) {
      case "search":
        url = `${BASE}/search.json?key=${API_KEY}&q=${encodeURIComponent(q)}`;
        break;
      case "current":
        url = `${BASE}/current.json?key=${API_KEY}&q=${encodeURIComponent(q)}&aqi=no`;
        break;
      case "forecast":
      default:
        const days = searchParams.get("days") || "7";
        url = `${BASE}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(q)}&days=${days}&aqi=yes&alerts=yes`;
        break;
    }

    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.error?.message || "Weather API error" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    // Fallback to mock data when API is unreachable (e.g. during development/preview)
    if (action === "search") {
      return NextResponse.json([{ name: q, region: "", country: "India" }]);
    }
    if (action === "current") {
      return NextResponse.json(generateMockCurrent(q));
    }
    return NextResponse.json(generateMockForecast(q));
  }
}
