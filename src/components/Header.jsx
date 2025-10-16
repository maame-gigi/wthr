import React from "react";

function Header() {
  return (
    <header className="bg-gray-950 p-4 flex justify-between items-center shadow">
      <h1 className="text-3xl font-extrabold text-white-600 animate-bounce ml-15">WTHR⛅</h1>
      <p className="text-sm opacity-90 mr-15 animate-pulse">
  Welcome back 👋
</p>
    </header>
  );
}

export default Header;
