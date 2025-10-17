import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWeather } from "../context/WeatherContext";

export default function Lifestyle() {
  const { city, weather } = useWeather();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!weather || !weather.weather || !weather.weather[0]) {
      setMessage("🌍 Type a city to get tailored lifestyle vibes!");
      return;
    }

    const main = weather.weather[0].main.toLowerCase();
    switch (true) {
      case main.includes("clear"):
        setMessage("☀️ Perfect day for outdoor fun — don’t forget sunscreen!");
        break;
      case main.includes("rain"):
        setMessage("🌧️ Cozy day ahead — hot drink and a good read recommended!");
        break;
      case main.includes("cloud"):
        setMessage("☁️ Calm skies — great for errands or relaxed walks.");
        break;
      case main.includes("snow"):
        setMessage("❄️ Stay warm! Perfect time for indoor vibes.");
        break;
      default:
        setMessage("🌈 Weather’s unpredictable — go with the flow!");
    }
  }, [weather]);

  const bgClass = weather
    ? "from-white/10 to-blue-300/10"
    : "from-gray-700/20 to-gray-600/20";

  return (
    <motion.div
      className={`min-h-screen flex flex-col justify-center items-center 
      bg-gradient-to-br ${bgClass} backdrop-blur-2xl text-white p-8 transition-all duration-700`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-4 drop-shadow-md"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        Lifestyle Recommendations
      </motion.h1>

      <motion.div
        className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <h2 className="text-xl font-semibold mb-2">
          {city ? city : "No City Selected"}
        </h2>
        <p className="text-lg opacity-90">{message}</p>
      </motion.div>

      {weather && (
        <motion.div
          className="mt-6 bg-white/10 backdrop-blur-md p-4 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm opacity-80">
            Current: {Math.round(weather.main.temp)}°C —{" "}
            {weather.weather[0].description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
