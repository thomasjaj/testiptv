import React from 'react';
import { Card, CardContent } from './ui/card';

const Features = ({ features }) => {
  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-3">
              StreamMax Pro
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the ultimate streaming platform with cutting-edge features designed for entertainment enthusiasts
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.id}
              className="group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Content */}
              <CardContent className="p-8 relative z-10">
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-20 blur-xl transform scale-150 group-hover:scale-175 transition-transform duration-500`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 cursor-pointer transform hover:scale-105">
            <span>Ready to experience premium streaming?</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;