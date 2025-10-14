import React, { useState } from "react";
import WeatherCard from "./WeatherCard";

const API_KEY = "3c71b95423f5e0529c98d41eeca3336c";

function SearchWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || "City not found");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-lg space-y-4 text-white">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="w-full p-2 bg-transparent border border-black/30 rounded focus:outline-none"
      />
      <button
        onClick={fetchWeather}
        className="w-full bg-white/20 text-gray py-2 rounded hover:bg-white/30 transition"
      >
        Search
      </button>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default SearchWeather;
