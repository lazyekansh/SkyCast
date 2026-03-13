import "./globals.css";

export const metadata = {
  title: "SkyCast — Beautiful Weather",
  description:
    "A modern, beautiful weather app with real-time forecasts, air quality data, hourly predictions, and interactive radar maps. Built with Next.js.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SkyCast",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/icon-192x192.svg",
  },
  openGraph: {
    title: "SkyCast — Beautiful Weather",
    description: "A modern weather app with real-time forecasts and air quality data.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1e1e1e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
