import React from "react";
import Header from "./components/Header";
import TopPlayers from "./components/TopPlayers";
import Footer from "./components/Footer";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import TestimonialSection from "./components/TestimonialSection";
import ChatBot from "../ChatBot";
import SmartChatBot from "../chatbot/components/SmartChatBot";

const Home = () => {
  return (
    <div className="w-full bg-pm-blue">
      <Header />

      <section className="min-h-[60vh] flex items-center justify-center px-4 py-12 sm:px-6 md:px-10 lg:px-20 bg-gradient-to-br text-white">
        <div className="w-full max-w-7xl mx-auto">
          <HeroSection />
        </div>
      </section>

      <section className="min-h-[60vh] py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-20  bg-slate-100">
        <div className="w-full max-w-7xl mx-auto">
          <FeaturesSection />
        </div>
      </section>

      <section className="min-h-[40vh] py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-20 bg-pm-blue">
        <div className="w-full max-w-7xl mx-auto">
          <StatsSection />
        </div>
      </section>

      <section className="min-h-[60vh] py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-20 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          <TopPlayers />
        </div>
      </section>
      <section className="min-h-[60vh] py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-20 bg-pm-blue">
        <div className="w-full max-w-7xl mx-auto">
          <TestimonialSection />
          <SmartChatBot />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
