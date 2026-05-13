// src/pages/About.jsx
import React from 'react'

const About = () => {
  const team = [
    { name: 'John Doe', role: 'CEO & Founder', image: '👨‍💼' },
    { name: 'Jane Smith', role: 'HR Director', image: '👩‍💼' },
    { name: 'Mike Johnson', role: 'Tech Lead', image: '👨‍💻' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About LMV Group</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to revolutionize recruitment by connecting companies with top talent across multiple platforms.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2020, LMV Group started with a simple idea: make recruitment easier and more efficient. 
            Today, we serve hundreds of companies and thousands of job seekers across India.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To provide seamless recruitment solutions that save time, reduce costs, and help businesses 
            find the perfect candidates for their teams.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-center mb-8">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-5xl mb-3">{member.image}</div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About