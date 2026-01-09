import React from "react";

const testimonials = [
  {
    name: "Dr. Rahman",
    role: "Principal, Green Valley School",
    feedback:
      "SchoolManager completely transformed how we manage students and staff. Everything is now organized and efficient.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Sarah Ahmed",
    role: "Admin Officer, City College",
    feedback:
      "Attendance, fees, reports — everything is available in one dashboard. It saves us hours every week.",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Michael Lee",
    role: "IT Manager, Bright Future Academy",
    feedback:
      "Secure, fast, and very easy to use. Our teachers adapted to it within days.",
    avatar: "https://i.pravatar.cc/100?img=45",
  },
];

function TestimonialsSection() {
  return (
    <section className="relative bg-slate-50 dark:bg-slate-900 py-28 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/40 rounded-full">
            ⭐ Trusted by Schools
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            What Educators Say About
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SchoolManager
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            Thousands of educators trust our platform to manage their institutions.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
            >
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                “{item.feedback}”
              </p>

              <div className="mt-6 flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-extrabold text-blue-600">100+</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Schools
            </p>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-blue-600">25K+</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Students
            </p>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-blue-600">99.9%</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Uptime
            </p>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-blue-600">24/7</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Support
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection;
