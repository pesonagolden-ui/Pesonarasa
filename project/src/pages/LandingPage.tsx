import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Products from '../components/Products';
import CTA from '../components/CTA';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      <div className="animated-bg"></div>
      <Header onLoginClick={handleLoginClick} />
      <Hero />
      <Features />
      <Products />
      <CTA />
    </div>
  );
};

export default LandingPage;
