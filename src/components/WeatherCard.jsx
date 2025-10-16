import React from "react";

export default function WeatherCard({ weather, compact }) {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className={`bg-white/10 backdrop-blur-md text-white p-4 rounded-xl shadow ${compact ? "w-40" : ""}`}>
      <h3 className="font-semibold">{weather.name}</h3>
      <img src={iconUrl} alt="" className="mx-auto w-20 h-20" />
      <p className="text-lg">{Math.round(weather.main.temp)}°C</p>
      <p className="capitalize">{weather.weather[0].description}</p>
    </div>
  );
}
