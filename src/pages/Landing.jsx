import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Landing/Herosection";
import FeaturesSection from "../components/Landing/Featuresection";
import HowItWorks from "../components/Landing/HowItWorksection";
import PricingSection from "../components/Landing/PricingSection";
import TestimonialsSection from "../components/Landing/TestomonialSection";

export default function Home() {
  return (
    <div className="font-sans text-slate-900">
      {/* <Navbar /> */}
     <HeroSection />
     <FeaturesSection />
     <HowItWorks />
     <PricingSection />
     <TestimonialsSection />



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
