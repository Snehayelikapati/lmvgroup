// src/pages/About.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Users, Target, Briefcase, Award, ArrowLeft } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Jane Smith",
      role: "HR Director",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Mike Johnson",
      role: "Tech Lead",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-[#f5f5f3] min-h-screen py-16 px-4 md:px-8">

      {/* BACK BUTTON */}
      <div className="max-w-7xl mx-auto mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full hover:bg-gray-800 transition duration-300"
        >
          <ArrowLeft size={18} />
          Back To Home
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-gray-900 to-gray-800 rounded-[40px] p-10 md:p-16 text-white mb-16 relative overflow-hidden">

        <div className="absolute top-0 right-0 w-72 h-72 bg-lime-400/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <span className="bg-lime-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
            About Us
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 mb-6">
            About <span className="text-lime-400">LMV Group</span>
          </h1>

          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            We help companies hire smarter and faster with modern recruitment
            solutions designed for today’s businesses.
          </p>
        </div>
      </div>

      {/* STORY + MISSION */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-16">

        <div className="bg-white p-8 rounded-[30px] shadow-lg hover:shadow-xl transition duration-300">
          <div className="w-14 h-14 bg-lime-100 rounded-2xl flex items-center justify-center mb-5">
            <Briefcase className="text-lime-600" size={28} />
          </div>

          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Our Story
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Founded in 2020, LMV Group started with a vision to simplify the
            hiring process and connect businesses with the right talent across
            India.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[30px] shadow-lg hover:shadow-xl transition duration-300">
          <div className="w-14 h-14 bg-lime-100 rounded-2xl flex items-center justify-center mb-5">
            <Target className="text-lime-600" size={28} />
          </div>

          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Our Mission
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Our mission is to provide smart recruitment solutions that save
            time, improve hiring quality, and help companies grow with the best
            professionals.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">

        {[
          { number: "500+", label: "Companies", icon: Briefcase },
          { number: "10K+", label: "Candidates", icon: Users },
          { number: "98%", label: "Success Rate", icon: Award },
          { number: "24/7", label: "Support", icon: Target },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-[25px] p-6 text-center shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="w-14 h-14 mx-auto mb-4 bg-lime-100 rounded-2xl flex items-center justify-center">
              <item.icon className="text-lime-600" size={28} />
            </div>

            <h3 className="text-3xl font-bold text-gray-900">
              {item.number}
            </h3>

            <p className="text-gray-600 mt-2">{item.label}</p>
          </div>
        ))}
      </div>

      {/* TEAM SECTION */}
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Meet Our Team
          </h2>

          <p className="text-gray-600">
            The people behind LMV Group’s success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-[30px] p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover mx-auto mb-5 border-4 border-lime-200"
              />

              <h3 className="text-xl font-bold text-gray-800">
                {member.name}
              </h3>

              <p className="text-lime-600 font-medium mt-2">
                {member.role}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default About;