import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Reseller from "./components/Reseller";
import FreeTrial from "./components/FreeTrial";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

// Import hooks
import { useSubscriptionPlans, useFeatures, useAppSettings } from "./hooks/useApi";

// Import mock data as fallback
import { mockData } from "./mock/data";

const Home = () => {
  const { data: plans, loading: plansLoading, error: plansError } = useSubscriptionPlans();
  const { data: features, loading: featuresLoading, error: featuresError } = useFeatures();
  const { data: settings, loading: settingsLoading, error: settingsError } = useAppSettings();

  // Check if any data is still loading
  if (plansLoading || featuresLoading || settingsLoading) {
    return <Loading message="Loading StreamMax Pro..." />;
  }

  // Check for errors and use fallback data
  if (plansError || featuresError || settingsError) {
    console.warn("API errors detected, using fallback data:", {
      plansError,
      featuresError,
      settingsError
    });
  }

  // Use API data or fallback to mock data
  const heroData = settings?.hero_data || mockData.hero;
  const pricingData = plans || mockData.pricing;
  const featuresData = features || mockData.features;
  const navigationData = mockData.navigation; // Static data
  const resellerData = mockData.reseller; // Static data for now
  const trialData = mockData.trial; // Static data for now
  const footerData = {
    ...mockData.footer,
    company: settings?.company_name || mockData.footer.company,
    description: settings?.company_description || mockData.footer.description
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation navigation={navigationData} />
      <Hero heroData={heroData} />
      <Features features={featuresData} />
      <Pricing pricing={pricingData} />
      <Reseller reseller={resellerData} />
      <FreeTrial trial={trialData} />
      <Footer footer={footerData} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;