"use client";

export default function RadarMap({ weather }) {
  if (!weather?.location) return null;
  const { lat, lon } = weather.location;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-up">
      {/* Rain Radar */}
      <div className="glass-card rounded-3xl p-5 overflow-hidden">
        <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
          <span>📡</span>
          Rain Radar
        </h3>
        <div className="rounded-2xl overflow-hidden aspect-square">
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

      {/* Air Quality Map */}
      <div className="glass-card rounded-3xl p-5 overflow-hidden">
        <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
          <span>🗺️</span>
          Air Quality Map
        </h3>
        <div className="rounded-2xl overflow-hidden aspect-square">
          <iframe
            src={`https://www.iqair.com/air-quality-map?lat=${lat}&lng=${lon}&zoomLevel=10`}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            title="Air Quality Map"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
