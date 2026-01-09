import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function FooterSection() {
  return (
    <footer className="bg-slate-900 text-slate-200 relative py-16 overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-white">SchoolManager</h1>
          <p className="text-sm text-slate-400">
            Smart school management software trusted by hundreds of schools worldwide.
          </p>
          <div className="flex items-center gap-4 mt-4 text-slate-400">
            <FaFacebookF className="hover:text-blue-500 transition cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 transition cursor-pointer" />
            <FaLinkedinIn className="hover:text-blue-600 transition cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 transition cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-slate-400 text-sm">
            <li className="hover:text-white transition cursor-pointer">Home</li>
            <li className="hover:text-white transition cursor-pointer">Features</li>
            <li className="hover:text-white transition cursor-pointer">Pricing</li>
            <li className="hover:text-white transition cursor-pointer">Testimonials</li>
            <li className="hover:text-white transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold mb-2">Resources</h3>
          <ul className="space-y-1 text-slate-400 text-sm">
            <li className="hover:text-white transition cursor-pointer">Blog</li>
            <li className="hover:text-white transition cursor-pointer">Help Center</li>
            <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white transition cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold mb-2">Contact</h3>
          <p className="text-slate-400 text-sm">
            123 School St., Education City<br />
            info@schoolmanager.com<br />
            +880 1234 567890
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-sm transition">
            Get in Touch
          </button>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-700 pt-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} SchoolManager. All rights reserved.
      </div>
    </footer>
  );
}

export default FooterSection;
