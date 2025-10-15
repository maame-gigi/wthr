import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Dashboard from "../pages/Dashboard";
import Forecast from "../pages/Forecast";
import Recommendations from "../pages/Lifestyle";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900 text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
