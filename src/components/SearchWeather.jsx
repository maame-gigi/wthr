import React, { useState } from "react";
import { useWeather } from "../context/WeatherContext";

function SearchWeather() {
  const { city, setCity, setWeather } = useWeather();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");

    try {
      const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // 🔑 replace this
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data.cod === 200) {
        setWeather(data);
        setError("");
      } else {
        setWeather(null);
        setError("City not found. Try again 🌍");
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Failed to fetch data. Check your network or API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-3 justify-center">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          placeholder="Search city..."
          className="bg-white/20 text-white p-3 rounded-xl w-64 sm:w-80 outline-none placeholder-white/60"
        />
        <button
          onClick={fetchWeather}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl text-white"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default SearchWeather;
