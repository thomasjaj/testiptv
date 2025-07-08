import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const FreeTrial = ({ trial }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert(`Free trial activated for ${email}! Check your email for login credentials. (This is a mock activation)`);
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section id="trial" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {trial.title}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {trial.subtitle}
            </p>
          </div>

          {/* Main Trial Card */}
          <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {trial.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Trial Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full p-4 bg-white/20 border-white/30 text-white placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Activating Trial...</span>
                    </div>
                  ) : (
                    trial.ctaText
                  )}
                </Button>
              </form>

              {/* Trial Info */}
              <div className="mt-8 p-6 bg-white/10 rounded-lg border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">What's Included in Your Free Trial:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">48 Hours</div>
                    <div className="text-sm text-gray-300">Full Access</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">25,000+</div>
                    <div className="text-sm text-gray-300">Live Channels</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">100,000+</div>
                    <div className="text-sm text-gray-300">VOD Titles</div>
                  </div>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full" />
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full" />
                  <span>No Commitment</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-400">
              Already have an account? 
              <button className="text-blue-400 hover:text-blue-300 font-medium ml-1 transition-colors duration-300">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeTrial;