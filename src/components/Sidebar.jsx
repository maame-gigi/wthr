import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const linkStyle = (path) =>
    `block px-4 py-3 rounded-lg hover:bg-gray-800 transition ${
      location.pathname === path ? "bg-gray-800" : ""
    }`;

  return (
    <aside className="w-48 bg-gray-950 p-4 flex flex-col space-y-2">
      <h2 className="text-xl font-bold mb-4">🌤 Wthr</h2>
      <Link to="/" className={linkStyle("/")}>Dashboard</Link>
      <Link to="/forecast" className={linkStyle("/forecast")}>Forecast</Link>
      <Link to="/recommendations" className={linkStyle("/recommendations")}>Recommendations</Link>
    </aside>
  );
}

export default Sidebar;
