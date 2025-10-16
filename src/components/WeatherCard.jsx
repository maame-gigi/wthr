import React from "react";

export default function WeatherCard({ weather, compact }) {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  // Map OpenWeather 'main' codes to simple background theme classes for the card only
const weatherBgClass = (main) => {
  if (!main) return "from-gray-800 to-gray-900"; // default
  const m = main.toLowerCase();
  if (m.includes("cloud")) return "from-gray-600 to-gray-900";
  if (m.includes("rain") || m.includes("drizzle") || m.includes("thunder")) return "from-blue-700 to-blue-800";
  if (m.includes("snow")) return "from-blue-300 to-blue-100";
  if (m.includes("clear")) return "from-yellow-400 to-yellow-300";
  if (m.includes("mist") || m.includes("haze") || m.includes("fog")) return "from-gray-600 to-gray-500";
  return "from-gray-800 to-gray-700";
};

  return (
    <div className={`bg-white/10 backdrop-blur-md text-white p-4 rounded-xl shadow ${compact ? "w-40" : ""}`}>
      <h3 className="font-semibold">{weather.name}</h3>
      <img src={iconUrl} alt="" className="mx-auto w-20 h-20" />
      <p className="text-lg">{Math.round(weather.main.temp)}°C</p>
      <p className="capitalize">{weather.weather[0].description}</p>
    </div>
  );
}
