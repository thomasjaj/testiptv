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

// Import mock data
import { mockData } from "./mock/data";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation navigation={mockData.navigation} />
      <Hero heroData={mockData.hero} />
      <Features features={mockData.features} />
      <Pricing pricing={mockData.pricing} />
      <Reseller reseller={mockData.reseller} />
      <FreeTrial trial={mockData.trial} />
      <Footer footer={mockData.footer} />
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