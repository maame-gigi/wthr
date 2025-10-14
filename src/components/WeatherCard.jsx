import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white/10 backdrop-blur-md text-white p-6 rounded-2xl shadow-lg text-center space-y-3">
      <h2 className="text-2xl font-bold">{weather.name}</h2>
      <img src={iconUrl} alt="weather icon" className="mx-auto w-20 h-20" />
      <p className="text-4xl font-semibold">
        {Math.round(weather.main.temp)}°C
      </p>
      <p className="capitalize text-lg">{weather.weather[0].description}</p>

      <div className="flex justify-between text-sm mt-4">
        <p>💧 {weather.main.humidity}%</p>
        <p>🌬 {Math.round(weather.wind.speed)} km/h</p>
      </div>
    </div>
  );
};

export default WeatherCard;


