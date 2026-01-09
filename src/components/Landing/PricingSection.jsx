import React, { useState } from "react";

function PricingSection() {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      priceMonthly: 0,
      priceYearly: 0,
      desc: "For small schools getting started",
      features: [
        "Up to 50 students",
        "Basic student management",
        "Attendance tracking",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      priceMonthly: 29,
      priceYearly: 290,
      desc: "Best for growing institutions",
      features: [
        "Up to 500 students",
        "Student & teacher management",
        "Fees & reports",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      priceMonthly: 99,
      priceYearly: 990,
      desc: "For large schools & colleges",
      features: [
        "Unlimited students",
        "Advanced analytics",
        "Custom roles & permissions",
        "Dedicated support",
      ],
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="relative bg-white dark:bg-slate-950 py-28 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/40 rounded-full">
            💳 Pricing
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Simple & Transparent
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pricing for Every School
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            No hidden fees. Upgrade, downgrade or cancel anytime.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-4 bg-slate-100 dark:bg-slate-800 rounded-full p-1">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                !yearly
                  ? "bg-white dark:bg-slate-700 shadow"
                  : "text-slate-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                yearly
                  ? "bg-white dark:bg-slate-700 shadow"
                  : "text-slate-500"
              }`}
            >
              Yearly <span className="text-green-600 ml-1">-20%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition ${
                plan.popular
                  ? "ring-2 ring-blue-600 scale-105"
                  : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {plan.name}
              </h3>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {plan.desc}
              </p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  ${yearly ? plan.priceYearly : plan.priceMonthly}
                </span>
                <span className="text-sm text-slate-500">
                  /{yearly ? "year" : "month"}
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {plan.features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full py-3 rounded-xl font-semibold transition ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
