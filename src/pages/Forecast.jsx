import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWeather } from "../context/WeatherContext"; // ✅ Add this import!

export default function Forecast() {
  const { city, weather } = useWeather(); // ✅ Access from context

  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch forecast when a city is selected
  useEffect(() => {
    if (!city) return;
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=3c71b95423f5e0529c98d41eeca3336c`
        );
        const data = await res.json();
        if (data.cod === "200") {
          setForecast(data);
        }
      } catch (error) {
        console.error("Forecast fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, [city]);

  return (
    <motion.div
      className="min-h-screen p-6 text-white bg-gradient-to-br from-blue-950/40 to-blue-700/20 backdrop-blur-2xl flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-4">Weather Forecast</h1>
      <p className="text-gray-300 mb-8">
        {city ? `Showing forecast for ${city}` : "Type a city on the dashboard to view forecast."}
      </p>

      {loading && <p className="text-gray-400">Loading forecast...</p>}

      {forecast && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {/* Now */}
          <motion.div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Now</h2>
            <p className="text-5xl font-bold">
              {Math.round(weather?.main?.temp)}°C
            </p>
            <p className="capitalize">{weather?.weather[0]?.description}</p>
          </motion.div>

          {/* Today, Later, Tomorrow */}
          {["Later", "Today", "Tomorrow"].map((label, idx) => (
            <motion.div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center"
            >
              <h3 className="text-lg font-semibold mb-2">{label}</h3>
              <p className="text-3xl font-bold">
                {Math.round(forecast?.list[idx * 3]?.main?.temp)}°C
              </p>
              <p className="capitalize opacity-80">
                {forecast?.list[idx * 3]?.weather[0]?.description}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
