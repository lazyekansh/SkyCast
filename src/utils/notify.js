/** Send location access notification to backend (non-critical, silent fail) */
export async function notifyLocationAccess(lat, lon) {
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, lon }),
    });
  } catch {
    // Silent fail — notification is non-critical
  }
}
