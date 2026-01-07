import React from "react";

function Navbar() {
  return (
    <div>
      {/* Navbar */}
      <header className="sticky top-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">SchoolManager</h1>
          <nav className="hidden md:flex gap-6 text-sm text-slate-600">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Get Started
          </button>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
