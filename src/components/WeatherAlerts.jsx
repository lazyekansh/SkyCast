"use client";
import { useState } from "react";

export default function WeatherAlerts({ weather }) {
  const [dismissed, setDismissed] = useState(new Set());

  if (!weather?.alerts?.alert?.length) return null;

  const activeAlerts = weather.alerts.alert.filter(
    (_, i) => !dismissed.has(i)
  );

  if (activeAlerts.length === 0) return null;

  return (
    <div className="space-y-2 animate-slide-up">
      {weather.alerts.alert.map((alert, i) => {
        if (dismissed.has(i)) return null;
        return (
          <div
            key={i}
            className="glass-card rounded-2xl p-4 border border-amber-400/30 bg-amber-500/10"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">⚠️</span>
              <div className="flex-1 min-w-0">
                <h4 className="text-amber-200 font-semibold text-sm">
                  {alert.headline || alert.event}
                </h4>
                {alert.desc && (
                  <p className="text-white/60 text-xs mt-1 line-clamp-2">
                    {alert.desc}
                  </p>
                )}
              </div>
              <button
                onClick={() => setDismissed((prev) => new Set([...prev, i]))}
                className="text-white/40 hover:text-white/70 transition-colors shrink-0"
                aria-label="Dismiss alert"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
