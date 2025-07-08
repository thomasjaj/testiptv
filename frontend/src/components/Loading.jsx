import React from 'react';

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="relative">
        {/* Animated loading spinner */}
        <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        
        {/* Pulsing dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <p className="mt-4 text-white text-lg font-medium">{message}</p>
      
      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;