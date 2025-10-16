import React from "react";

function Header() {
  return (
    <header className="bg-gray-950 p-4 flex justify-between items-center shadow">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <p className="text-sm opacity-70">Welcome back 👋</p>
    </header>
  );
}

export default Header;
