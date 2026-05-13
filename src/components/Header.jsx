// src/components/layout/Header.jsx
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    // { path: '/careers', label: 'Careers', icon: '💼' },
    { path: '/dashboard', label: 'HR Dashboard', icon: '📊' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    // { path: '/contact', label: 'Contact', icon: '📞' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">🏢</span>
            <span className="font-bold text-xl">LMV Group</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-1 ${
                  isActive(link.path)
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'hover:bg-blue-700'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-700 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-2">
            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-medium">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
              Register
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg transition ${
                  isActive(link.path)
                    ? 'bg-white text-blue-600 font-semibold'
                    : 'hover:bg-blue-700'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t border-blue-700">
              <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg">
                Login
              </button>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg">
                Register
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header