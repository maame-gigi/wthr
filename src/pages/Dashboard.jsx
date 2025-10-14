// Dashboard.jsx
import React from "react";
import SearchWeather from "../components/SearchWeather";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-sky-400 to-cyan-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
      <SearchWeather />
    </div>
  );
}

export default Dashboard;
