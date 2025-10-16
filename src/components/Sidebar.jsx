import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <div
      className={`text-white font-bold h-100vh p-4 transition-all duration-300 flex flex-col 
      ${isOpen ? "bg-yellow-400 + text-amber-800 w-45" : "bg-blue-500 w-22"} transition-colors`}
    >
      {/* Header + Toggle */}
      <div className="flex items-center justify-between mb-6">
        {isOpen && (
          <h1 className="text-2xl text-gray-950 font-bold mb-10 ml-6 mt-10">
            Menu
          </h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded hover:bg-gray-950"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="space-y-3 text-sm">
        <Link
          to="/"
          className={`block text-white py-6 px-9 rounded w-30 transition ${
            isOpen
              ? "text-gray-950 hover:bg-yellow-500 w-15"
              : "hover:bg-yellow-500 w-20"
          } ${location.pathname === "/" ? "bg-blue-500" : ""}`}
        >
          {isOpen ? "Weather Now" : "⛅🌩️🌦️"}
        </Link>

        <Link
          to="/forecast"
          className={`block text-white py-6 px-9 rounded w-30 transition ${
            isOpen
              ? "text-gray-950 hover:bg-yellow-500 w-15"
              : "hover:bg-yellow-500 w-20"
          } ${location.pathname === "/forecast" ? "bg-blue-500" : ""}`}
        >
          {isOpen ? "Activity Generator" : "🤸‍♀️⛷️🏊"}
        </Link>

        <Link
          to="/lifestyle"
          className={`block text-white py-6 px-9 rounded w-30 transition ${
            isOpen
              ? "text-gray-950 hover:bg-yellow-500 w-15"
              : "hover:bg-yellow-500 w-20"
          } ${location.pathname === "/lifestyle" ? "bg-blue-500" : ""}`}
        >
          {isOpen ? "Outfit Shuffle" : "👕👖🧦"}
        </Link>
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center text-xs text-gray-950">
        {isOpen && <p>COPYRIGHT 2025</p>}
      </div>
    </div>
  );
}

export default Sidebar;
