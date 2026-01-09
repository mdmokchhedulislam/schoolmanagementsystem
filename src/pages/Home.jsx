import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/home/Herosection";
import FeaturesSection from "../components/home/Featuresection";
import HowItWorks from "../components/home/HowItWorksection";
import PricingSection from "../components/home/PricingSection";
import TestimonialsSection from "../components/home/TestomonialSection";

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
