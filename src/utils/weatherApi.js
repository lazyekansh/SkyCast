const API_KEY = process.env.WEATHER_API_KEY || "fec68ebf3d3341e09f295825251712";
const BASE = "https://api.weatherapi.com/v1";

export async function fetchForecast(query, days = 7) {
  const res = await fetch(
    `${BASE}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=${days}&aqi=yes&alerts=yes`,
    { next: { revalidate: 600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch forecast");
  return res.json();
}

export async function searchCities(query) {
  const res = await fetch(
    `${BASE}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Failed to search cities");
  return res.json();
}

export async function fetchCurrentBulk(cities) {
  const results = await Promise.allSettled(
    cities.map((city) =>
      fetch(
        `${BASE}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
      ).then((r) => {
        if (!r.ok) throw new Error(`Failed for ${city}`);
        return r.json();
      })
    )
  );
  return results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);
}
