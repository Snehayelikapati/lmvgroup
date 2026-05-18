// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Home from './components/Home'
import About from './components/About'
// import Contact from './components/Contact'
import Services from './components/Services'
import Privacy from './components/Privacy'
import Login from './pages/Login'
import Register from './pages/Register'

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
        <Link to="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Go Back Home →
        </Link>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* <Header /> */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
             <Route path="/services" element={<Services />} />
            <Route path="/privacy" element={<Privacy />} />
                  <Route path="/login" element={<Login />} />
                   <Route path="/footer" element={<Footer />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App