import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Mobile Top Bar (ALWAYS visible on mobile) */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between bg-[#0d1117] text-white px-4 py-3 shadow-md">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-gray-800 transition"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-bold tracking-wide">WTHR 🌦️</h1>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-[70] flex flex-col font-bold transition-all duration-500 ease-in-out shadow-lg
        ${isOpen ? "w-48 bg-yellow-500 text-amber-900" : "w-20 bg-blue-500 text-white"}
        ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
        ${isMobile ? "pt-16" : ""}
      `}
      >
        {/* Header + Toggle (hidden on mobile) */}
        {!isMobile && (
          <div className="flex items-center justify-between px-3 py-5 border-b border-white/10">
            {isOpen && (
              <h1 className="text-2xl font-extrabold text-gray-950 ml-2 tracking-wide">
                Menu
              </h1>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded hover:bg-gray-950/30 transition"
            >
              <Menu size={22} />
            </button>
          </div>
        )}

        {/* Nav Links */}
        <nav className="flex flex-col mt-8 space-y-2">
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-4 rounded-md transition-all ${
              location.pathname === "/"
                ? "bg-blue-500 text-white"
                : "hover:bg-yellow-400 hover:text-gray-900"
            }`}
            onClick={() => isMobile && toggleSidebar()}
          >
            {isOpen ? "HOME" : "⛅"}
          </Link>

          <Link
            to="/forecast"
            className={`flex items-center gap-3 px-4 py-4 rounded-md transition-all ${
              location.pathname === "/forecast"
                ? "bg-blue-500 text-white"
                : "hover:bg-yellow-400 hover:text-gray-900"
            }`}
            onClick={() => isMobile && toggleSidebar()}
          >
            {isOpen ? "Weather now" : "🏃"}
          </Link>

          <Link
            to="/lifestyle"
            className={`flex items-center gap-3 px-4 py-4 rounded-md transition-all ${
              location.pathname === "/lifestyle"
                ? "bg-blue-500 text-white"
                : "hover:bg-yellow-400 hover:text-gray-900"
            }`}
            onClick={() => isMobile && toggleSidebar()}
          >
            {isOpen ? "Activity and Outfit Shuffle" : "👕"}
          </Link>
        </nav>

        {/* Footer */}
        <div className="mt-auto text-center py-4 text-xs text-gray-950">
          {isOpen && <p>COPYRIGHT 2025</p>}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 z-[50] backdrop-blur-sm"
        ></div>
      )}
    </>
  );
}

export default Sidebar;
