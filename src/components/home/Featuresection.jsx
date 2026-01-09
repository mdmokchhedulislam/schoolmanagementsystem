import React from "react";

const features = [
  {
    title: "Student Management",
    desc: "Manage student profiles, class assignments, and academic records from a single dashboard.",
    icon: "🎓",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Teacher & Staff",
    desc: "Assign roles, manage teachers, track performance and workload easily.",
    icon: "👩‍🏫",
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Attendance Tracking",
    desc: "Automated daily attendance with real-time reports and history.",
    icon: "📊",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Fees & Payments",
    desc: "Track fees, generate invoices, and manage payments securely.",
    icon: "💳",
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Reports & Analytics",
    desc: "Generate detailed reports with insights to make better decisions.",
    icon: "📈",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Secure Cloud System",
    desc: "Enterprise-grade security with role-based access and backups.",
    icon: "🔒",
    color: "from-slate-500 to-gray-700",
  },
];

function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative bg-white dark:bg-slate-950 py-24 overflow-hidden"
    >
      {/* Background blur */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/40 rounded-full">
            ⚡ Powerful Features
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need to
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Run Your School Efficiently
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            Built for schools, colleges and institutions to simplify daily
            operations and improve productivity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
            >
              {/* Gradient Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl text-white bg-gradient-to-br ${feature.color} shadow-lg mb-6`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {feature.desc}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
