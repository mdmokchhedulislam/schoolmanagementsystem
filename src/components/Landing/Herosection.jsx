import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      
      {/* Background blur */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />
      <div className="absolute top-40 -right-24 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div>
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
            🚀 Smart School Management Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
            Manage Your School
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Smarter, Faster & Securely
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl">
            All-in-one platform to manage students, teachers, attendance,
            fees, reports and daily operations — built for modern schools.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to={'/login'} className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition">
              Get Started Free
            </Link>

            <button className="px-8 py-4 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              View Demo
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <span>✔ 100+ Schools</span>
            <span>✔ Secure Data</span>
            <span>✔ 24/7 Support</span>
          </div>
        </div>

        {/* Right Dashboard Preview */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-3xl blur-2xl"></div>

          <div className="relative bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-3xl shadow-2xl p-6">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="h-24 bg-blue-100 dark:bg-blue-900/40 rounded-xl"></div>
              <div className="h-24 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl"></div>
              <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
            </div>

            <div className="h-40 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
