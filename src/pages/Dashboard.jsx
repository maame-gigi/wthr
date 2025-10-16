import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";

const API_KEY = "3c71b95423f5e0529c98d41eeca3336c";



// Human-friendly interpretations
const describeWeather = (main, description, temp) => {
  if (!main) return "";
  const m = main.toLowerCase();
  if (m.includes("clear")) {
    if (temp >= 28) return "Bright and sunny — great time to be outside. Wear light breathable clothes.";
    return "Clear skies — perfect for outdoor plans.";
  }
  if (m.includes("cloud")) return "Cloudy skies — good day for casual outdoor plans, maybe grab a light jacket.";
  if (m.includes("rain") || m.includes("drizzle")) return "Rain likely — bring an umbrella and consider indoor activities.";
  if (m.includes("thunder")) return "Stormy conditions — stay indoors if possible and be cautious.";
  if (m.includes("snow")) return "Snowy — bundle up, wear layers and warm shoes.";
  if (m.includes("mist") || m.includes("fog")) return "Low visibility — drive safe and prefer indoor plans.";
  // fallback
  return description ? `Currently ${description}.` : "Weather info available.";
};

export default function Dashboard() {
  const [q, setQ] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("C"); // C or F
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchWeather = async (city) => {
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
      if (!res.ok) {
        setError(data.message || "City not found");
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Network error. Try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    fetchWeather(q.trim());
  };

  const toggleUnit = () => setUnit((u) => (u === "C" ? "F" : "C"));

  // convert metric temps to fahrenheit if needed
  const displayTemp = (c) => (unit === "C" ? Math.round(c) : Math.round(c * 9 / 5 + 32));

  const bgClass = weather ? weatherBgClass(weather.weather?.[0]?.main) : "from-gray-600 to-gray-500";

  return (
    <div className={`p-6 w-full min-h-screen bg-gradient-to-br ${bgClass} transition-all duration-700`}>
    <div className="flex flex-col items-center space-y-8">
        {/* Search */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="flex items-center bg-black rounded-full px-4 py-2 shadow-md">
            <Search className="text-gray-400 mr-2" size={18} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search any city"
              className="w-full bg-transparent outline-none text-gray-300 placeholder-gray-500"
            />
            <button
              type="submit"
              className="ml-3 bg-white/10 px-4 py-1 rounded-full text-sm hover:bg-white/20 transition"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          {error && <p className="text-red-400 mt-2 text-center">{error}</p>}
        </form>

        {/* Weather Card + Icon */}
        <div
          className={`w-full max-w-2xl rounded-2xl p-6 flex justify-between items-center shadow-lg bg-gradient-to-r ${bgClass}`}
        >
          <div className="flex-1 pr-4 text-white">
            {!weather && (
              <>
                <h2 className="text-3xl font-semibold">Search a city to see the weather</h2>
                <p className="text-sm text-gray-200 mt-2">We’ll explain what the weather actually means — not just numbers.</p>
              </>
            )}

            {weather && (
              <>
                <div className="flex items-baseline gap-4">
                <div className="flex items-baseline gap-4">
                  <h2 className="text-6xl font-bold">{displayTemp(weather.main.temp)}°</h2>
                  <div>
                    <p className="capitalize text-lg">{weather.weather[0].description}</p>
                    <p className="text-sm text-gray-100 mt-1">{weather.name}, {weather.sys?.country}</p>
                    <p className="text-xs text-gray-200 mt-1">Feels like {displayTemp(weather.main.feels_like)}°</p>
                  </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-100">
                  {describeWeather(weather.weather[0].main, weather.weather[0].description, weather.main.temp)}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={toggleUnit}
                    className="px-3 py-1 rounded bg-white/20 text-sm hover:bg-white/30 transition"
                  >
                    Show °{unit === "C" ? "F" : "C"}
                  </button>

                  <button
                    onClick={() => fetchWeather(weather.name)}
                    className="px-3 py-1 rounded bg-white/20 text-sm hover:bg-white/30 transition"
                  >
                    Refresh
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="w-40 h-40 flex items-center justify-center">
        
        {weather ? (
        <img
      src="https://cdn-icons-png.flaticon.com/512/1116/1116453.png"
      alt="weather icon"
      className="w-36 h-36 opacity-80 animate-float"
       />
      ) : (
    <img
      src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
      alt="default weather"
      className="w-36 h-36 opacity-70 animate-float"
      />
      )}
       </div>

        </div>

        {/* The two cards below: clickable to navigate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <div
            onClick={() => navigate("/lifestyle")}
            className="cursor-pointer bg-black/40 rounded-2xl p-6 text-white flex flex-col justify-between hover:scale-[1.01] transition"
            role="button"
          >
            <p className="text-lg font-light leading-relaxed">
              Personalized vibes for your weather. Tap to get activity ideas that match today’s mood 🌞🌦️☁️
            </p>
            <div className="text-right text-3xl mt-4">→</div>
          </div>

          <div
            onClick={() => navigate("/forecast")}
            className="cursor-pointer bg-black/40 rounded-2xl p-6 text-white flex flex-col justify-between hover:scale-[1.01] transition"
            role="button"
          >
            <p className="text-lg font-light leading-relaxed">
              Want a quick glance at today, later, and tomorrow? This gives you a clean timeline of what's coming.
            </p>
            <div className="text-right text-3xl mt-4">→</div>
          </div>
        </div>

      </div>
    </div>
  );

}

 
