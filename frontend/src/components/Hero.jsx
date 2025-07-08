import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const Hero = ({ heroData }) => {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % heroData.features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [heroData.features.length]);

  const handleTrialClick = () => {
    document.getElementById('trial')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroData.backgroundImage})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {heroData.title.split(' ')[0]}
              </span>
              <br />
              <span className="text-white">
                {heroData.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {heroData.subtitle}
            </p>
          </div>

          {/* Rotating Features */}
          <div className="flex justify-center">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 px-6 py-3 rounded-full">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white font-medium text-lg">
                  {heroData.features[currentFeature]}
                </span>
              </div>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleTrialClick}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
            >
              {heroData.ctaText}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">25,000+</div>
              <div className="text-gray-300">Live Channels</div>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">100,000+</div>
              <div className="text-gray-300">VOD Titles</div>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 text-center hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;