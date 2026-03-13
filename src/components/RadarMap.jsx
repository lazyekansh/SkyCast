"use client";

export default function RadarMap({ weather }) {
  if (!weather?.location) return null;
  const { lat, lon } = weather.location;

  return (
    <div className="animate-slide-up">
      {/* Rain Radar */}
      <div className="glass-card rounded-3xl p-5 overflow-hidden">
        <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Rain Radar
        </h3>
        <div className="rounded-2xl overflow-hidden aspect-video">
          <iframe
            src={`https://www.rainviewer.com/map.html?loc=${lat},${lon},8&oFa=0&oC=1&oU=0&oCS=1&oF=0&oAP=1&c=1&o=83&lm=1&layer=radar&sm=1&sn=1`}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            title="Rain Radar"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
