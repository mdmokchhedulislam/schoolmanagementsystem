import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="font-sans text-slate-900">
      {/* <Navbar /> */}
      {/* Hero Section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Free Trial Badge */}
            <span className="inline-block mb-4 px-3 py-1 bg-green-100 text-green-700 font-medium rounded-full">
              Free 7-Day Trial
            </span>

            <h2 className="text-5xl font-bold">
              Smart School Management System
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Manage students, teachers, attendance, exams, and fees from one
              secure cloud platform.
            </p>

            <div className="mt-6 flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
                Start Free Trial
              </button>
              <button className="border px-6 py-3 rounded-xl">
                Request Demo
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              No credit card required • Try all features free for 7 days
            </p>
          </div>

          <div className="h-72 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl">
            Dashboard Preview
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center">Core Features</h3>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Student Management",
              "Teacher Management",
              "Attendance Tracking",
              "Exam & Results",
              "Fees Collection",
              "Parent Portal",
              "Free 7-Day Trial",
            ].map((feature) => (
              <div key={feature} className="p-6 border rounded-xl hover:shadow">
                <h4 className="font-semibold text-lg">{feature}</h4>
                <p className="mt-2 text-sm text-slate-600">
                  {feature === "Free 7-Day Trial"
                    ? "Try all features free for 7 days. No credit card required!"
                    : "Easy-to-use module designed for modern schools."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center">Pricing Plans</h3>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { name: "Basic", price: "৳999 / month" },
              { name: "Standard", price: "৳1999 / month" },
              { name: "Enterprise", price: "Custom" },
            ].map((plan) => (
              <div
                key={plan.name}
                className="bg-white p-8 rounded-2xl border text-center"
              >
                <h4 className="text-xl font-semibold">{plan.name}</h4>
                <p className="mt-4 text-3xl font-bold">{plan.price}</p>
                <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-300 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">
          <p>© {new Date().getFullYear()} SchoolManager</p>
          <div className="flex gap-6 text-sm">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
