# SkyCast ☁️

A modern, beautiful weather application built with **Next.js** and **Tailwind CSS**. SkyCast delivers real-time weather information with a stunning, responsive UI that rivals Google and Samsung weather apps.

## Features

- 🌤️ **Real-time Weather** — Current conditions, temperature, feels-like, and more
- 📊 **7-Day Forecast** — Extended daily forecast with temperature range bars
- ⏰ **24-Hour Hourly Forecast** — Scrollable hourly predictions with rain chances
- 🌧️ **Precipitation Details** — Rain probability with hourly rain chart
- 🌬️ **Air Quality Index** — AQI gauge with pollutant breakdown (Indian standard)
- 🌅 **Sun & Moon** — Sunrise/sunset arc visualization, moon phase & illumination
- 📡 **Rain Radar** — Interactive RainViewer precipitation map
- 🗺️ **Air Quality Map** — IQAir embedded air quality map
- 🏙️ **Popular Cities** — Quick-access weather for 25 major Indian cities
- 🔍 **City Search** — Real-time autocomplete city search
- 📍 **Geolocation** — Auto-detect your location
- ⚠️ **Weather Alerts** — Dismissible severe weather notifications
- 🎨 **Dynamic Themes** — Background changes based on weather (sunny, cloudy, rain, night, snow, mist)
- 📱 **PWA Support** — Installable as a Progressive Web App
- 🏃 **Outdoor Activity Advice** — Smart recommendations based on AQI and rain

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **API**: WeatherAPI.com
- **Maps**: RainViewer, IQAir

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Optionally set `WEATHER_API_KEY` in a `.env.local` file:

```env
WEATHER_API_KEY=your_api_key_here
```