import { NextResponse } from "next/server";

const API_KEY = process.env.WEATHER_API_KEY || "fec68ebf3d3341e09f295825251712";
const BASE = "https://api.weatherapi.com/v1";

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
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}
