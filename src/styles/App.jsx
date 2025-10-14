import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchWeather from "../components/SearchWeather";
import Dashboard from "../pages/Dashboard";
import Forecast from "../pages/Forecast";
import Lifestyle from "../pages/Lifestyle";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-sky-400 to-cyan-300 text-white flex flex-col">
        {/* Navigation */}
        <nav className="flex justify-center gap-6 p-4 bg-white/10 backdrop-blur-lg shadow-md">
          <Link to="/" className="hover:text-yellow-300 font-semibold">Dashboard</Link>
          <Link to="/forecast" className="hover:text-yellow-300 font-semibold">Forecast</Link>
          <Link to="/lifestyle" className="hover:text-yellow-300 font-semibold">Lifestyle</Link>
        </nav>

        {/* Pages */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/lifestyle" element={<Lifestyle />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


