import React from "react";
import SearchWeather from "../components/SearchWeather";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-grey-500 to-bg-sky-950 p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Weather Dashboard</h1>
        <SearchWeather />
      </div>
    </div>
  );
}

export default Dashboard;
