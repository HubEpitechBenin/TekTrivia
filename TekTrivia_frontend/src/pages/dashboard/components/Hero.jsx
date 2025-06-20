import React from 'react';
import HeroImg from '../../../assets/icons/hero.jpg';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div
      className="relative rounded-xl p-8 text-white mb-8 overflow-hidden"
      style={{
        backgroundImage: `url(${HeroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-4 max-w-2xl leading-tight">
          Discover Unique Quizzes and Test Your Knowledge
        </h1>
        <p className="text-xl mb-6 opacity-90">
          Every question brings you closer to mastery.
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-3xl font-semibold flex items-center space-x-2 transition-colors">
          <span>Explore more</span>
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex items-center space-x-4 z-10">
        <div className="flex bg-[rgba(61,68,77,0.5)] gap-4 rounded-full px-4 items-center mt-16 mr-16 space-x-2">
          <div className="flex -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="User 1"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b9e82835?w=40&h=40&fit=crop&crop=face"
              alt="User 2"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
              alt="User 3"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
          <div className="flex flex-col items-center p-2">
            <div className="text-2xl font-bold">12k</div>
            <div className="text-sm opacity-90">Active users</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
