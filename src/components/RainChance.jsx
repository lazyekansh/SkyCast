"use client";

export default function RainChance({ weather }) {
  if (!weather?.forecast?.forecastday?.[0]) return null;
  const today = weather.forecast.forecastday[0].day;
  const chance = today.daily_chance_of_rain;
  const precip = today.totalprecip_mm;

  // Get hourly rain chances for a mini chart
  const hours = weather.forecast.forecastday[0].hour;
  const currentHour = new Date().getHours();
  const nextHours = hours.filter((h) => new Date(h.time).getHours() >= currentHour).slice(0, 12);

  return (
    <div className="glass-card rounded-3xl p-5 animate-slide-up">
      <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        Precipitation
      </h3>

      <div className="flex items-end gap-6 mb-4">
        <div>
          <span className="text-4xl font-bold text-white">{chance}%</span>
          <p className="text-white/50 text-sm">chance of rain</p>
        </div>
        <div>
          <span className="text-2xl font-bold text-blue-300">{precip} mm</span>
          <p className="text-white/50 text-sm">expected</p>
        </div>
      </div>

      {/* Rain probability bar */}
      <div className="w-full h-3 bg-white/10 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-blue-400 to-blue-600"
          style={{ width: `${chance}%` }}
        ></div>
      </div>

      {/* Mini hourly rain chart */}
      {nextHours.length > 0 && (
        <div className="flex items-end gap-1 h-16">
          {nextHours.map((h, i) => {
            const rainPct = h.chance_of_rain;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm bg-blue-400/60 transition-all duration-500 min-h-[2px]"
                  style={{ height: `${Math.max(rainPct * 0.6, 2)}px` }}
                  title={`${rainPct}% at ${new Date(h.time).getHours()}:00`}
                ></div>
                {i % 3 === 0 && (
                  <span className="text-white/40 text-[8px]">
                    {new Date(h.time).getHours()}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
