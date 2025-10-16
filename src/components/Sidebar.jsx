import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gray-950 text-white h-screen p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col`}
    >
      {/* Header + Toggle */}
      <div className="flex items-center justify-between mb-6">
        {isOpen && <h1 className="text-2xl font-bold mb-10 ml-6">WTHR</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded hover:bg-gray-800"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="space-y-3 text-sm">
        <Link
          to="/"
          className="block py-2 px-3 rounded hover:bg-gray-800 transition"
        >
          {isOpen ? "Weather Now" : "☀️"}
        </Link>
        <Link
          to="/forecast"
          className="block py-2 px-3 rounded hover:bg-gray-800 transition"
        >
          {isOpen ? "Activity Generator" : "🎲"}
        </Link>
        <Link
          to="/lifestyle"
          className="block py-2 px-3 rounded hover:bg-gray-800 transition"
        >
          {isOpen ? "Outfit Shuffle" : "👕"} 
        </Link>
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center text-xs text-gray-500">
        {isOpen && <p>COPYRIGHT 2025</p>}
      </div>
    </div>
  );
}

export default Sidebar;
