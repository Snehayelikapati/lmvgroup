// src/components/Home.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to LMV Group</h1>
          <p className="text-xl mb-8">Smart Recruitment Solutions for Modern Businesses</p>
          <Link 
            to="/dashboard" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Get Started →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Job Posting Card - Clickable */}
            <Link 
              to="/dashboard" 
               state={{ activeTab: 'jobposting' }}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer block"
            >
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Job Posting</h3>
              <p className="text-gray-600">Post jobs across multiple platforms with one click</p>
              <span className="inline-block mt-4 text-blue-600 font-medium">Learn More →</span>
            </Link>

            {/* Candidate Tracking Card - Clickable */}
            <Link 
              to="/dashboard" 
                state={{ activeTab: 'candidatetracking' }}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer block"
            >
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Candidate Tracking</h3>
              <p className="text-gray-600">Track applications with color-coded status</p>
              <span className="inline-block mt-4 text-blue-600 font-medium">Learn More →</span>
            </Link>

            {/* Interview Scheduling Card - Clickable */}
            <Link 
              to="/dashboard" 
               state={{ activeTab: 'interviewscheduling' }}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer block"
            >
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Interview Scheduling</h3>
              <p className="text-gray-600">Schedule interviews seamlessly</p>
              <span className="inline-block mt-4 text-blue-600 font-medium">Learn More →</span>
            </Link>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600 mt-2">Jobs Posted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600 mt-2">Candidates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">4+</div>
              <div className="text-gray-600 mt-2">Websites</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">95%</div>
              <div className="text-gray-600 mt-2">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Hire?</h2>
          <p className="text-xl mb-8">Post your first job today and find the perfect candidate</p>
          <Link 
            to="/dashboard" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Post a Job Now →
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home