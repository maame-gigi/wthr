

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const API_KEY = "3c71b95423f5e0529c98d41eeca3336c";

export default function Forecast() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bgGradient, setBgGradient] = useState("from-blue-600 to-blue-900");

  const fetchForecast = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setForecast(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        setForecast(data);
        updateBackground(data.weather[0].main);
      } else {
        setError(data.message || "City not found");
      }
    } catch {
      setError("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const updateBackground = (condition) => {
    if (condition.includes("Clear")) setBgGradient("from-yellow-400 to-orange-500");
    else if (condition.includes("Rain")) setBgGradient("from-blue-700 to-gray-800");
    else if (condition.includes("Cloud")) setBgGradient("from-gray-400 to-blue-700");
    else if (condition.includes("Snow")) setBgGradient("from-blue-200 to-blue-500");
    else setBgGradient("from-blue-500 to-indigo-800");
  };

  const getWeatherIcon = (main) => {
    if (main.includes("Rain")) return "🌧️";
    if (main.includes("Clear")) return "☀️";
    if (main.includes("Cloud")) return "☁️";
    if (main.includes("Snow")) return "❄️";
    return "🌤️";
  };

  return (
    <div
      className={`min-h-screen w-full transition-all duration-700 bg-gradient-to-br ${bgGradient} text-white flex flex-col items-center p-6`}
    >
      {/* Search */}
      <div className="w-full max-w-2xl mb-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchForecast();
          }}
          className="flex items-center bg-black/40 rounded-full px-4 py-2 shadow-md"
        >
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-500"
          />
          <button
            type="submit"
            onClick={fetchForecast}
            className="ml-3 bg-yellow-500 text-gray-900 font-semibold px-4 py-1 rounded-full text-sm hover:bg-yellow-400 transition"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </form>
        {error && <p className="text-red-400 mt-2 text-center">{error}</p>}
      </div>

      {/* Weather Cards */}
      {forecast ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl">
          {/* Now */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-center shadow-lg hover:scale-[1.02] transition">
            <h3 className="text-xl font-semibold mb-2">Now</h3>
            <div className="text-5xl mb-3">{getWeatherIcon(forecast.weather[0].main)}</div>
            <p className="text-lg font-medium">{Math.round(forecast.main.temp)}°C</p>
            <p className="capitalize text-gray-900 text-sm">{forecast.weather[0].description}</p>
          </div>

          {/* Yesterday */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-center shadow-lg hover:scale-[1.02] transition">
            <h3 className="text-xl font-semibold mb-2">Yesterday</h3>
            <div className="text-5xl mb-3">🌥️</div>
            <p className="text-lg font-medium">
              {Math.round(forecast.main.temp - 1)}°C
            </p>
            <p className="text-sm text-gray-200">Mild and cool — recovery weather.</p>
          </div>

          {/* Today */}
          <div className="bg-gradient-to-br from-yellow-500 to-orange-400 rounded-2xl p-6 text-center shadow-lg hover:scale-[1.02] transition">
            <h3 className="text-xl font-semibold mb-2">Today</h3>
            <div className="text-5xl mb-3">{getWeatherIcon(forecast.weather[0].main)}</div>
            <p className="text-lg font-medium">{Math.round(forecast.main.temp)}°C</p>
            <p className="text-sm capitalize text-gray-900">
              {forecast.weather[0].description}
            </p>
          </div>

          {/* Later */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-center shadow-lg hover:scale-[1.02] transition">
            <h3 className="text-xl font-semibold mb-2">Later</h3>
            <div className="text-5xl mb-3">🌙</div>
            <p className="text-lg font-medium">
              {Math.round(forecast.main.temp - 2)}°C
            </p>
            <p className="text-sm text-gray-200">Cooler evening ahead — bring a jacket.</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-200 mt-10 text-center">
          Search a city to view the 24-hour timeline ⏳
        </p>
      )}
    </div>
  );
}
