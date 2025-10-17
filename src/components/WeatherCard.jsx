import React from "react";
import { motion } from "framer-motion";

function WeatherCard({ weather }) {
  if (!weather || !weather.main) return null;

  const { name, main, weather: details, wind } = weather;
  const desc = details[0]?.description || "";
  const temp = Math.round(main.temp);
  const icon = details[0]?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-white shadow-lg"
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <h2 className="text-3xl font-semibold tracking-wide">{name}</h2>
        <div className="flex items-center space-x-3">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
            className="w-16 h-16"
          />
          <p className="text-5xl font-light">{temp}°C</p>
        </div>
        <p className="capitalize text-lg opacity-90">{desc}</p>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm opacity-80">
          <p>💧 Humidity: {main.humidity}%</p>
          <p>🌬️ Wind: {wind.speed} m/s</p>
          <p>🌡️ Feels like: {Math.round(main.feels_like)}°C</p>
          <p>📈 Pressure: {main.pressure} hPa</p>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherCard;
