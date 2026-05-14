// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Careers', path: '/careers' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center text-black font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
              ✦
            </div>
            <h1 className="text-white text-2xl font-bold tracking-tight">
              LMV <span className="text-lime-400">Group</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative group text-white font-medium transition-all duration-300 ${
                  location.pathname === item.path ? 'text-lime-400' : 'hover:text-lime-400'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-lime-400 transition-all duration-300 ${
                  location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all">
              <Search size={18} />
            </button>
            
            <Link
              to="/login"
              className="hidden md:block text-white font-medium hover:text-lime-400 transition"
            >
              Login
            </Link>
            
            <Link
              to="/register"
              className="hidden md:block bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 px-5 py-2 rounded-full text-black font-semibold text-sm transition-all transform hover:scale-105"
            >
              Register
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 bg-black/90 backdrop-blur-md rounded-2xl">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-white hover:bg-white/10 transition ${
                  location.pathname === item.path ? 'text-lime-400 bg-white/5' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-white/20 my-2"></div>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-white hover:bg-white/10 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-black font-semibold mx-4 mt-2 rounded-full text-center"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;