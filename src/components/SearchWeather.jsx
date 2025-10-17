import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import { Search } from "lucide-react";

const API_KEY = "952298e627d22900b8d976fb081151f1";

export default function SearchWeather() {
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
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (!res.ok) setError(data.message || "City not found");
      else setWeather(data);
    } catch (err) {
      setError("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="w-full">
      {/* Search bar */}
      <form onSubmit={handleSubmit} className="flex items-center bg-black rounded-full px-4 py-2 shadow-md mb-6">
        <Search className="text-gray-400 mr-2" size={18} />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search any city..."
          className="w-full bg-transparent outline-none text-gray-300 placeholder-gray-500"
        />
        <button
          type="submit"
          className="ml-3 bg-white/10 px-4 py-1 rounded-full text-sm hover:bg-white/20 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results */}
      {error && <p className="text-red-400 text-center">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}
