"use client";

export default function SunMoon({ weather }) {
  if (!weather?.forecast?.forecastday?.[0]?.astro) return null;
  const astro = weather.forecast.forecastday[0].astro;
  const isDay = weather.current.is_day;

  // Parse sunrise/sunset to calculate sun position
  const parseTime = (t) => {
    const [time, period] = t.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };

  const sunriseMin = parseTime(astro.sunrise);
  const sunsetMin = parseTime(astro.sunset);
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const dayLength = sunsetMin - sunriseMin;
  const sunProgress = isDay
    ? Math.max(0, Math.min(1, (nowMin - sunriseMin) / dayLength))
    : nowMin < sunriseMin
    ? 0
    : 1;

  // Arc path for sun
  const arcStartX = 20;
  const arcEndX = 140;
  const arcTopY = 15;
  const arcBottomY = 75;
  const sunX = arcStartX + (arcEndX - arcStartX) * sunProgress;
  const sunY =
    arcBottomY -
    (arcBottomY - arcTopY) * Math.sin(sunProgress * Math.PI);

  return (
    <div className="glass-card rounded-3xl p-5 animate-slide-up">
      <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
        <span>{isDay ? "☀️" : "🌙"}</span>
        Sun &amp; Moon
      </h3>

      {/* Sun arc */}
      <div className="relative w-full h-24 mb-4">
        <svg viewBox="0 0 160 90" className="w-full h-full">
          {/* Horizon line */}
          <line x1="15" y1="75" x2="145" y2="75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4,4" />
          {/* Arc path */}
          <path
            d={`M ${arcStartX} ${arcBottomY} Q 80 ${arcTopY - 10} ${arcEndX} ${arcBottomY}`}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          {/* Traveled arc */}
          <path
            d={`M ${arcStartX} ${arcBottomY} Q 80 ${arcTopY - 10} ${arcEndX} ${arcBottomY}`}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeDasharray={`${sunProgress * 200} 999`}
            opacity="0.6"
          />
          {/* Sun dot */}
          {isDay && (
            <>
              <circle cx={sunX} cy={sunY} r="8" fill="#fbbf24" opacity="0.3" />
              <circle cx={sunX} cy={sunY} r="5" fill="#fbbf24" />
            </>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-xl">
            🌅
          </div>
          <div>
            <p className="text-white/50 text-xs">Sunrise</p>
            <p className="text-white font-semibold">{astro.sunrise}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-xl">
            🌇
          </div>
          <div>
            <p className="text-white/50 text-xs">Sunset</p>
            <p className="text-white font-semibold">{astro.sunset}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl">
            🌙
          </div>
          <div>
            <p className="text-white/50 text-xs">Moon Phase</p>
            <p className="text-white font-semibold text-sm">{astro.moon_phase}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-xl">
            ✨
          </div>
          <div>
            <p className="text-white/50 text-xs">Illumination</p>
            <p className="text-white font-semibold">{astro.moon_illumination}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
