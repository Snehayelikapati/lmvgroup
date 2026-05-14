// src/components/layout/Header.jsx
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/dashboard', label: 'HR Dashboard', icon: '📊' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    window.location.href = '/'
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">🏢</span>
            <span className="font-bold text-xl text-gray-800">LMV Group</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-1 ${
                  isActive(link.path)
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
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
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
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
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">👋 {currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition font-medium text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                >
                  Register
                </Link>
              </>
            )}
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
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t border-gray-200">
              {currentUser ? (
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    handleLogout()
                  }}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg text-center"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header