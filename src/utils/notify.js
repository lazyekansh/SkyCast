/** Send location access notification to backend (non-critical, silent fail) */
export async function notifyLocationAccess(lat, lon, city) {
  try {
    const body = { lat, lon };
    if (city) body.city = city;
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // Silent fail — notification is non-critical
  }
}
