import React, { useEffect, useState } from "react";
import SearchWeather from "../components/SearchWeather";
import { useNavigate } from "react-router-dom";
import { useWeather } from "../context/WeatherContext";
import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, CloudSun } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const { city, setCity, weather, setWeather } = useWeather();

  // Greeting logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning 🌅";
    if (hour < 18) return "Good afternoon ☀️";
    return "Good evening 🌙";
  };

  const [greeting, setGreeting] = useState(getGreeting());

  // Update greeting every minute
  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Quotes that rotate every 30s
  const previewQuotes = [
    { icon: <Sun size={42} />, text: "Stay bright. The sun’s got your back ☀️" },
    { icon: <CloudSun size={42} />, text: "Even clouds make the sky interesting ☁️" },
    { icon: <Cloud size={42} />, text: "Every cloud’s a reminder to slow down 🌥️" },
    { icon: <CloudRain size={42} />, text: "A little rain just means the earth’s getting a hug 🌧️" },
    { icon: <Sun size={42} />, text: "Clear skies or not — your energy sets the weather ☀️" },
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % previewQuotes.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = previewQuotes[quoteIndex];

  return (
    <div className="p-4 sm:p-6 w-full flex flex-col items-center space-y-8">
      {/* Greeting */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-semibold text-white mb-2 tracking-wide"
      >
        {greeting}
      </motion.h1>

      {/* Search */}
      <div className="w-full max-w-3xl">
        <SearchWeather
          city={city}
          setCity={setCity}
          weather={weather}
          setWeather={setWeather}
        />
      </div>

      {/* Weather Preview */}
      {!weather ? (
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-white flex flex-col items-center justify-center text-center shadow-xl"
        >
          <div className="flex items-center justify-center space-x-3 mb-3">
            {currentQuote.icon}
            <h2 className="text-3xl font-light">WTHR Dashboard</h2>
          </div>
          <p className="text-gray-300 text-lg mb-2 italic">
            “{currentQuote.text}”
          </p>
          <p className="text-gray-400 text-sm">
            Type a city to get real-time weather vibes 🌍
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-white text-center shadow-xl"
        >
          <h2 className="text-3xl font-semibold mb-3">{weather.name}</h2>
          <p className="text-6xl font-light mb-2">{Math.round(weather.main.temp)}°C</p>
          <p className="capitalize text-lg opacity-90">{weather.weather[0].description}</p>
        </motion.div>
      )}

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl">
        <motion.div
          onClick={() => navigate("/lifestyle")}
          whileHover={{ scale: 1.03 }}
          className="cursor-pointer bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-white flex flex-col justify-between 
          border border-white/10 hover:bg-white/20 transition-all"
          role="button"
        >
          <p className="text-lg font-light leading-relaxed">
            Personalized vibes for your weather. Tap to get activity ideas that
            match today’s mood 🌞🌦️☁️
          </p>
          <div className="text-right text-3xl mt-4">→</div>
        </motion.div>

        <motion.div
          onClick={() => navigate("/forecast")}
          whileHover={{ scale: 1.03 }}
          className="cursor-pointer bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-white flex flex-col justify-between 
          border border-white/10 hover:bg-white/20 transition-all"
          role="button"
        >
          <p className="text-lg font-light leading-relaxed">
            Want a quick glance at today, later, and tomorrow? This gives you a
            clean timeline of what's coming.
          </p>
          <div className="text-right text-3xl mt-4">→</div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
