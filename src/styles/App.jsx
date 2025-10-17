import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";
import Forecast from "../pages/Forecast";
import Lifestyle from "../pages/Lifestyle";
import { Menu } from "lucide-react";
import { WeatherProvider } from "../context/WeatherContext"; 

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <WeatherProvider>
      <Router>
        <div className="flex bg-[#0d1117] text-white min-h-screen overflow-x-hidden relative">
          {/* Sidebar */}
          <Sidebar
            isOpen={sidebarOpen}
            toggle={() => setSidebarOpen(!sidebarOpen)}
          />

          {/* Mobile Top Bar */}
          <div className="md:hidden fixed top-0 left-0 right-0 bg-[#0d1117] flex items-center justify-between p-4 z-40">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded hover:bg-gray-800"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-bold">WTHR 🌤️</h1>
          </div>

          {/* Main Content */}
          <main
            className={`flex-1 flex flex-col transition-all duration-500 ease-in-out 
            ${sidebarOpen ? "ml-52" : "ml-0 md:ml-48"} p-5 md:p-8 mt-14 md:mt-0`}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/lifestyle" element={<Lifestyle />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WeatherProvider>
  );
}

export default App;
