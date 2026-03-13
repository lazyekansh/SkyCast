/** Convert PM2.5 to Indian AQI */
export function indianAQI(pm) {
  if (pm <= 30) return Math.round((pm / 30) * 50);
  if (pm <= 60) return Math.round(50 + ((pm - 30) / 30) * 50);
  if (pm <= 90) return Math.round(100 + ((pm - 60) / 30) * 100);
  if (pm <= 120) return Math.round(200 + ((pm - 90) / 30) * 100);
  if (pm <= 250) return Math.round(300 + ((pm - 120) / 130) * 100);
  return Math.round(400 + ((pm - 250) / 130) * 100);
}

/** AQI label from numeric value */
export function aqiLabel(aqi) {
  if (aqi <= 50) return { text: "Good", color: "#22c55e", emoji: "😊" };
  if (aqi <= 100) return { text: "Satisfactory", color: "#84cc16", emoji: "🙂" };
  if (aqi <= 200) return { text: "Moderate", color: "#eab308", emoji: "😐" };
  if (aqi <= 300) return { text: "Poor", color: "#f97316", emoji: "😷" };
  if (aqi <= 400) return { text: "Very Poor", color: "#ef4444", emoji: "🤢" };
  return { text: "Severe", color: "#991b1b", emoji: "☠️" };
}

/** Get UV label */
export function uvLabel(uv) {
  if (uv <= 2) return { text: "Low", color: "#22c55e" };
  if (uv <= 5) return { text: "Moderate", color: "#eab308" };
  if (uv <= 7) return { text: "High", color: "#f97316" };
  if (uv <= 10) return { text: "Very High", color: "#ef4444" };
  return { text: "Extreme", color: "#7c3aed" };
}

/** Get outdoor recommendation */
export function outdoorAdvice(aqi, rainChance) {
  if (aqi > 200 || rainChance > 70)
    return { text: "Stay indoors — conditions are unfavorable", icon: "🏠", level: "bad" };
  if (aqi > 100 || rainChance > 40)
    return { text: "Limit outdoor activities", icon: "⚠️", level: "moderate" };
  return { text: "Great conditions to go outside!", icon: "🌿", level: "good" };
}

/** Get weather theme class */
export function getWeatherTheme(conditionText, isDay) {
  const t = conditionText.toLowerCase();
  if (!isDay) return "night";
  if (t.includes("rain") || t.includes("drizzle") || t.includes("thunder")) return "rain";
  if (t.includes("cloud") || t.includes("overcast")) return "cloudy";
  if (t.includes("mist") || t.includes("fog") || t.includes("haze") || t.includes("smoke")) return "mist";
  if (t.includes("snow") || t.includes("sleet") || t.includes("blizzard") || t.includes("ice")) return "snow";
  return "sunny";
}

/** Format time from "2024-01-01 14:00" to "2 PM" */
export function formatHour(timeStr) {
  const date = new Date(timeStr);
  return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
}

/** Get wind direction from degrees */
export function windDirection(deg) {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return dirs[Math.round(deg / 22.5) % 16];
}

/** Format date for daily forecast */
export function formatDay(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.getTime() === today.getTime()) return "Today";
  if (date.getTime() === tomorrow.getTime()) return "Tomorrow";
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}
