import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import CTA from './components/CTA';
import Login from './components/Login';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      <div className="animated-bg"></div>
      <Header onLoginClick={() => setShowLogin(true)} />
      <Hero />
      <Features />
      <Products />
      <CTA />
    </div>
  );
}

export default App;