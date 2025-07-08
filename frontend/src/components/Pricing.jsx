import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Pricing = ({ pricing }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    // Mock purchase logic
    alert(`Selected ${plan.duration} plan for $${plan.price}. This is a mock purchase!`);
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-3">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your streaming needs. All plans include premium features and 24/7 support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricing.map((plan, index) => (
            <Card 
              key={plan.id}
              className={`group relative overflow-hidden bg-white/5 backdrop-blur-lg border-white/10 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2 ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''}`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

              <CardHeader className="relative z-10 text-center pb-4">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.duration}</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <div className="text-gray-400">
                      <div className="text-sm line-through">${plan.originalPrice}</div>
                      <div className="text-xs">Save {Math.round((1 - plan.price / plan.originalPrice) * 100)}%</div>
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm">per {plan.duration.toLowerCase()}</div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg`}
                >
                  {plan.buttonText}
                </Button>

                {/* Additional Info */}
                <div className="text-center text-xs text-gray-400">
                  Instant activation • Cancel anytime
                </div>
              </CardContent>

              {/* Hover Effect */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
            </Card>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white font-medium">30-Day Money Back Guarantee</span>
            </div>
            <div className="w-1 h-4 bg-white/20" />
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-white font-medium">Instant Activation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;