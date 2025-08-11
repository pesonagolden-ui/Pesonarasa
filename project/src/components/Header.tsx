import React, { useState, useEffect } from 'react';
import { Menu, X, Snowflake, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/10 backdrop-blur-md border-b border-white/20' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <Snowflake className="w-8 h-8 text-cyan-400 animate-spin-slow group-hover:animate-pulse" />
              <div className="absolute inset-0 blur-sm bg-cyan-400/30 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Pesona Rasa
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Produk', 'Tentang', 'Kontak'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/80 hover:text-cyan-400 transition-colors duration-300 hover:glow-text"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Cart and CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Login Button */}
            <button
              onClick={onLoginClick}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 glow-button"
            >
              Masuk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col space-y-4 pt-4">
              {['Home', 'Produk', 'Tentang', 'Kontak'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white/80 hover:text-cyan-400 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
              {/* Mobile Cart Button */}
              <button
                onClick={toggleCart}
                className="relative flex items-center justify-center space-x-2 w-full py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Keranjang</span>
                {totalItems > 0 && (
                  <span className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={onLoginClick}
                className="mt-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                Masuk
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;