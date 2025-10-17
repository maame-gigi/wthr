import React from "react";
import SearchWeather from "../components/SearchWeather";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 w-full flex flex-col items-center space-y-8">
      {/* Weather Search + Card */}
      <div className="w-full max-w-3xl">
        <SearchWeather />
      </div>

      {/* The two navigation cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl">
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
  );
}

export default Dashboard;
