import React from "react";

const steps = [
  {
    step: "01",
    title: "Create Account & Setup",
    desc: "Sign up, add your school details, classes and roles in minutes.",
    icon: "📝",
  },
  {
    step: "02",
    title: "Manage Daily Operations",
    desc: "Handle students, teachers, attendance, fees and schedules from one dashboard.",
    icon: "🧩",
  },
  {
    step: "03",
    title: "Track & Analyze",
    desc: "Get real-time reports, analytics and performance insights.",
    icon: "📊",
  },
  {
    step: "04",
    title: "Grow & Scale",
    desc: "Scale effortlessly with secure cloud infrastructure and role-based access.",
    icon: "🚀",
  },
];

function HowItWorks() {
  return (
    <section className="relative bg-slate-50 dark:bg-slate-900 py-28 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/40 rounded-full">
            🛠 How It Works
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Simple Process,
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Powerful Results
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            Get started quickly and manage your entire institution with ease.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid md:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative group bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition"
            >
              {/* Step Number */}
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {item.step}
              </span>

              {/* Icon */}
              <div className="mt-6 text-4xl">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.desc}
              </p>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
