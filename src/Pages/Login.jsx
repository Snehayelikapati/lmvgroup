// src/pages/Login.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, Eye, EyeOff, Building2, Sparkles, Shield, TrendingUp, ArrowLeft, Home } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (data.success) {
        localStorage.setItem('currentUser', JSON.stringify(data.data.session))
        localStorage.setItem('authToken', data.data.session.empid)
        setError('')
        navigate('/dashboard')
      } else {
        setError(data.message || 'Login failed. Please try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Server error. Please check if backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const goBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      
      {/* Back Button - Top Left */}
      <button
        onClick={goBack}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      {/* Home Button - Top Right */}
      <Link
        to="/"
        className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-lime-500/20 hover:bg-lime-500/30 text-lime-400 px-4 py-2 rounded-full transition-all duration-300 group"
      >
        {/* <Home size={18} className="group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium">Home</span> */}
      </Link>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-float"
            style={{
              width: Math.random() * 100 + 20 + "px",
              height: Math.random() * 100 + 20 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 5 + "s",
              animationDuration: Math.random() * 10 + 5 + "s",
            }}
          />
        ))}
      </div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Logo & Brand Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <Building2 size={40} className="text-black" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            LMV <span className="text-lime-400">Group</span>
          </h1>
          <p className="text-gray-400 text-sm">Welcome back! Please login to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-2 animate-shake">
              <div className="w-1 h-1 bg-red-400 rounded-full"></div>
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Info Message */}
          <div className="mb-6 bg-lime-500/20 border border-lime-500/50 text-lime-200 p-4 rounded-xl">
            <p className="text-sm flex items-center gap-2">
              <Sparkles size={16} />
              Use your company email and password to login
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Mail size={16} className="text-lime-400" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition-all duration-300 text-white placeholder-gray-400"
                  placeholder="Enter your company email"
                  required
                />
                <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Lock size={16} className="text-lime-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition-all duration-300 text-white placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lime-400 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-lime-400 hover:text-lime-300 transition hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 text-black font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center pt-6 border-t border-white/10">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-lime-400 hover:text-lime-300 font-semibold transition hover:underline">
                Contact HR
              </Link>
            </p>
          </div>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-lime-400/20 flex items-center justify-center mx-auto mb-2">
                <Shield size={18} className="text-lime-400" />
              </div>
              <p className="text-xs text-gray-400">Secure Login</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center mx-auto mb-2">
                <TrendingUp size={18} className="text-blue-400" />
              </div>
              <p className="text-xs text-gray-400">Analytics</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-purple-400/20 flex items-center justify-center mx-auto mb-2">
                <Sparkles size={18} className="text-purple-400" />
              </div>
              <p className="text-xs text-gray-400">Smart Hiring</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-xs mt-8">
          © 2024 LMV Group. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) translateX(20px);
            opacity: 0.5;
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}

export default Login