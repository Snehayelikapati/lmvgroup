// src/components/Home.jsx

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Search, 
  ChevronRight, 
  CheckCircle, 
  Briefcase, 
  Users, 
  Calendar, 
  BarChart3,
  Sparkles,
  Star,
  Shield,
  Zap,
  TrendingUp,
  Clock,
  Award,
  Globe,
  Phone,
  Mail,
  MapPin,
  Building2,
  CreditCard,
  FileText,
  Headphones,
  Rocket,
  Target,
  LineChart,
  UserCheck,
  FileCheck,
  UserPlus,
  Video
} from "lucide-react";

// =====================================================
// ROTATING IMAGE CAROUSEL COMPONENT
// =====================================================
const RotatingImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      title: "Strategic Planning",
      desc: "Full-Funnel Strategy"
    },
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      title: "Team Collaboration",
      desc: "Data Driven Growth"
    },
    {
      url: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2070&auto=format&fit=crop",
      title: "Market Research",
      desc: "Target Market Insights"
    },
    {
      url: "https://images.unsplash.com/photo-1551434678-e076c2235a9f?q=80&w=2070&auto=format&fit=crop",
      title: "Digital Marketing",
      desc: "Cross Channel Media"
    },
    {
      url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
      title: "Analytics Dashboard",
      desc: "Performance Tracking"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative">
      <div className="bg-white p-4 rounded-[40px] shadow-2xl transition-all duration-500">
        <div className="relative overflow-hidden rounded-[32px]">
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            className="w-[450px] h-[500px] object-cover transition-all duration-700 ease-in-out transform scale-100 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h4 className="text-white text-xl font-bold">{images[currentIndex].title}</h4>
            <p className="text-lime-300 text-sm font-medium">{images[currentIndex].desc}</p>
          </div>
        </div>
      </div>

      <button 
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-lime-400 hover:text-white transition-all duration-300 z-10"
      >
        ←
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-lime-400 hover:text-white transition-all duration-300 z-10"
      >
        →
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === idx 
                ? "w-8 h-2 bg-lime-500" 
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      <div className="absolute -top-6 left-8 bg-white rounded-2xl px-5 py-3 shadow-xl animate-bounce">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-lime-100 flex items-center justify-center text-lime-600">
            {currentIndex === 0 && "📊"}
            {currentIndex === 1 && "📈"}
            {currentIndex === 2 && "🎯"}
            {currentIndex === 3 && "🌐"}
            {currentIndex === 4 && "📉"}
          </div>
          <div>
            <p className="text-xs text-gray-500">Current Service</p>
            <p className="text-sm font-bold text-gray-800">{images[currentIndex].desc}</p>
          </div>
        </div>
      </div>

      <div className="absolute -right-6 top-1/3 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-2xl px-5 py-3 shadow-xl transform rotate-6">
        <div className="text-white text-center">
          <div className="text-2xl font-bold">
            {currentIndex + 1}/{images.length}
          </div>
          <div className="text-xs font-semibold">Services</div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setStatsVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director, TechCorp",
      content: "LMV Group transformed our recruitment process. We've reduced time-to-hire by 40% and found better quality candidates.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "CEO, InnovateLabs",
      content: "The analytics dashboard gives us incredible insights. Best investment we've made for our hiring needs.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    },
    {
      name: "Emily Rodriguez",
      role: "Talent Acquisition Lead",
      content: "Interview scheduling has never been easier. The platform is intuitive and our candidates love it.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    }
  ];

  const partners = [
    {
      name: "LMV Insurance",
      logo: "/Companylogos/INSURANCE.jpeg",
      url: "https://www.lmvinsurance.com/",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Lakshita Tech",
      logo: "/Companylogos/Lakshitha_Tech.jpg",
      url: "https://www.lakshithatech.com/",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "LMV Financial Services",
      logo: "/Companylogos/LMV_FinancialServices.png",
      url: "https://www.lmvfs.in/",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "LMV Investment Services",
      logo: "/Companylogos/LMV_Investments.png",
      url: "https://www.lmvinvestmentservices.com/",
      color: "from-orange-500 to-yellow-500",
    },
  ];

  const stats = [
    { value: 500, suffix: "+", label: "Companies Trust Us", icon: Briefcase },
    { value: 10000, suffix: "+", label: "Jobs Filled", icon: Users },
    { value: 98, suffix: "%", label: "Satisfaction Rate", icon: Star },
    { value: 24, suffix: "/7", label: "Support Available", icon: Clock },
  ];

  const businessFeatures = [
    { icon: Building2, title: "LLC Formation", desc: "Complete legal setup", color: "from-blue-500 to-blue-600" },
    { icon: CreditCard, title: "Stripe Integration", desc: "Payment gateway ready", color: "from-purple-500 to-purple-600" },
    { icon: FileText, title: "EIN Registration", desc: "Tax ID acquired", color: "from-green-500 to-green-600" },
    { icon: Headphones, title: "24/7 Support", desc: "Expert assistance", color: "from-orange-500 to-orange-600" },
  ];

  // Feature cards data
  const featureCards = [
    {
      id: 1,
      title: "Job Posting",
      description: "Create & Manage Job Openings Easily",
      tag: "JOB POSTING",
      icon: FileText,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
      link: "/dashboard",
      state: { activeTab: "jobposting" },
      gradient: "from-blue-500 to-indigo-600",
      features: ["Post jobs in minutes", "Reach multiple platforms", "Track applications", "Automated screening"]
    },
    {
      id: 2,
      title: "Candidate Listing",
      description: "Track & Manage Candidates Efficiently",
      tag: "CANDIDATE LISTING",
      icon: Users,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      link: "/dashboard",
      state: { activeTab: "candidatetracking" },
      gradient: "from-lime-400 to-lime-500",
      features: ["Centralized database", "Advanced filtering", "Status tracking", "Candidate profiles"]
    },
    {
      id: 3,
      title: "Interview Scheduling",
      description: "Schedule Interviews Without Delays",
      tag: "INTERVIEW SCHEDULING",
      icon: Calendar,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
      link: "/dashboard",
      state: { activeTab: "interviewscheduling" },
      gradient: "from-purple-500 to-pink-600",
      features: ["Automated invites", "Calendar sync", "Video conferencing", "Reminder notifications"]
    }
  ];

  return (
    <div className="bg-[#f5f5f3] overflow-hidden">
      {/* ===================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================== */}
      <section className="px-4 md:px-8 pt-5 relative">
        <div className="relative rounded-[40px] overflow-hidden min-h-[980px] bg-cover bg-center group"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')",
          }}>
          
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/40"></div>
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10 animate-pulse"
                style={{
                  width: Math.random() * 300 + 50 + "px",
                  height: Math.random() * 300 + 50 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 5 + "s",
                  animationDuration: Math.random() * 10 + 5 + "s",
                }}
              />
            ))}
          </div>

          {/* NAVBAR */}
          <div className="relative z-20 flex justify-between items-center px-6 md:px-14 py-6">
            <Link to="/" className="flex items-center gap-4 group">
              {/* LOGO IMAGE */}
              <div className="relative">
                {/* GLOW */}
                <div className="absolute inset-0 bg-lime-400/40 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                {/* LOGO BOX */}
                <div className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl overflow-hidden group-hover:scale-110 transition-all duration-500">
                  <img
                    src="/LMVGroup.png"
                    alt="LMV Logo"
                    className="w-16 h-16 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* LOGO TEXT */}
              <div className="leading-tight">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
                  <span className="bg-gradient-to-r from-lime-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    LMV
                  </span>
                  <span className="text-white ml-2">
                    Group
                  </span>
                </h1>
                <p className="text-white/60 text-xs md:text-sm tracking-[5px] uppercase font-medium mt-1">
                  Recruitment Platform
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8 text-white font-medium">
              {["Home", "About", "Services"].map((item, idx) => (
                <Link
                  key={idx}
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
                  className="relative group-hover-effect"
                >
                  <span className="hover:text-lime-400 transition duration-300">
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300">
                <Search size={20} />
              </button>
              <Link to="/login" className="text-white font-medium hover:text-lime-400 transition duration-300">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-lime-400 to-lime-500 hover:from-lime-500 hover:to-lime-600 transition-all duration-300 px-7 py-3 rounded-full text-black font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Register
              </Link>
            </div>
          </div>

          {/* HERO CONTENT */}
          <div className="relative z-10 px-6 md:px-16 flex items-center min-h-[760px]">
            <div className="max-w-4xl animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-white mb-8 animate-pulse">
                <Sparkles size={18} className="text-lime-400" />
                🚀 Trusted by 500+ Companies Worldwide
              </div>

              <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
                Smart Recruitment
                <br />
                For Modern
                <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent"> Businesses</span>
              </h1>

              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
                Post jobs, manage candidates, track applications,
                and schedule interviews all in one powerful platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  to="/dashboard"
                  className="group bg-gradient-to-r from-lime-400 to-lime-500 text-black px-9 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 justify-center"
                >
                  Free Consultation
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white/40 text-white px-9 py-4 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/60 transition-all duration-300 flex items-center gap-2 justify-center"
                >
                  Learn More
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* BOTTOM STRIP */}
          <div className="absolute bottom-8 left-0 w-full px-6 md:px-14 z-20 animate-fade-in-up animation-delay-500">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Trusted Partner", value: "500+ Companies", icon: Award },
                { label: "Financial Services", value: "Recruitment Solutions", icon: TrendingUp },
                { label: "Investing", value: "HR Technology", icon: Globe },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/90 backdrop-blur-md rounded-2xl px-6 py-5 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <p className="text-gray-500 text-sm uppercase mb-1 flex items-center gap-2">
                    <item.icon size={14} />
                    {item.label}
                  </p>
                  <h3 className="font-semibold text-lg text-gray-800">{item.value}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* TRUSTED COMPANIES SECTION */}
      {/* ===================================================== */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200 overflow-hidden relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-lime-200/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 blur-3xl rounded-full"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-lime-100 text-lime-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <Sparkles size={16} />
              Our Trusted Companies
            </span>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5 leading-tight">
              Trusted by
              <span className="bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                {" "}Industry Leaders
              </span>
            </h2>

            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              A powerful network of companies delivering excellence in
              Insurance, Technology, Financial Services, and Investment Solutions.
            </p>
          </div>

          {/* Company Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, idx) => (
              <a
                key={idx}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-[32px] p-8 border border-gray-100 hover:border-lime-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden"
              >
                {/* Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}></div>

                {/* Top Glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${partner.color} opacity-10 blur-3xl rounded-full group-hover:scale-125 transition-all duration-700`}></div>

                {/* Logo */}
                <div className="relative z-10 flex justify-center mb-6">
                  <div className="w-28 h-28 bg-gray-50 rounded-3xl flex items-center justify-center shadow-inner border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-20 object-contain"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-lime-600 transition-colors duration-300 leading-snug">
                    {partner.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                    Delivering trusted and innovative business solutions worldwide.
                  </p>
                </div>

                {/* Visit Button */}
                <div className="relative z-10 mt-8 flex justify-center">
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold group-hover:bg-lime-500 group-hover:text-white transition-all duration-300">
                    Visit Website
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FEATURE CARDS SECTION */}
      {/* ===================================================== */}
      <section className="py-24 px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-lime-100 text-lime-700 rounded-full text-sm font-semibold mb-4">
            Our Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need for
            <span className="text-lime-500"> Smart Hiring</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools to streamline your recruitment process and find the best talent faster.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featureCards.map((card) => (
            <Link
              key={card.id}
              to={card.link}
              state={card.state}
              className="group bg-white rounded-[35px] overflow-hidden hover:-translate-y-3 transition-all duration-500 hover:shadow-2xl relative"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent`}></div>
                <div className="absolute top-4 right-4 z-10">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${card.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon size={22} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-xs font-semibold">
                    {card.tag}
                  </span>
                  <span className="text-gray-400 text-sm group-hover:text-lime-500 transition flex items-center gap-1">
                    Learn more <ArrowRight size={14} />
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {card.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle size={14} className="text-lime-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===================================================== */}
      {/* STATS SECTION WITH COUNTERS */}
      {/* ===================================================== */}
      <section ref={statsRef} className="py-20 px-4 md:px-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-lime-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={32} className="text-lime-400" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {statsVisible ? (
                    <Counter end={stat.value} suffix={stat.suffix} />
                  ) : (
                    "0" + stat.suffix
                  )}
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
    <section className="px-4 md:px-8 py-24 bg-[#f5f5f3]">
  <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl max-w-7xl mx-auto border border-gray-100">
    
    <div className="grid lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-white to-lime-50">

        {/* Heading */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-lime-100 rounded-full mb-6 shadow-sm">
            <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-lime-700 uppercase tracking-wide">
              LMV Group Services
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Smart Business
            <span className="text-lime-500"> Solutions</span>
          </h2>

          <p className="text-gray-500 mt-5 text-lg leading-relaxed">
            LMV Group provides modern recruitment, financial, insurance,
            and technology solutions for growing businesses.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-6">

          {[
            {
              emoji: "💼",
              title: "Recruitment Solutions",
              subtitle: "Smart Hiring Process",
              desc: "Post jobs, track candidates, schedule interviews, and manage hiring efficiently from one platform."
            },

            {
              emoji: "🛡️",
              title: "Insurance Services",
              subtitle: "Financial Protection",
              desc: "Trusted insurance solutions designed for individuals, families, and businesses with secure coverage plans."
            },

            {
              emoji: "💳",
              title: "Financial Services",
              subtitle: "Business Growth",
              desc: "Complete financial guidance, loan assistance, and investment support for sustainable business growth."
            },

            {
              emoji: "💻",
              title: "Technology Services",
              subtitle: "Digital Transformation",
              desc: "Website development, software solutions, and digital services to modernize your business operations."
            }
          ].map((service, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-lime-200 cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">

                <div className="flex-1">

                  <div className="flex items-center gap-4 mb-4">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {service.emoji}
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {service.title}
                      </h3>

                      <p className="text-lime-600 font-semibold">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {service.desc}
                  </p>

                </div>

                <div className="w-11 h-11 rounded-full bg-lime-100 flex items-center justify-center text-lime-600 group-hover:bg-lime-500 group-hover:text-white transition-all duration-300">
                  →
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-lime-500 to-emerald-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Explore Services
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative min-h-[700px] bg-gradient-to-br from-lime-100 via-white to-emerald-100 flex items-center justify-center overflow-hidden">

        {/* Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-lime-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>

        <div className="absolute w-[400px] h-[400px] bg-emerald-300 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-1000"></div>

        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center text-center px-8">

          {/* Logo */}
          <div className="w-40 h-40 rounded-[40px] bg-white shadow-2xl flex items-center justify-center border border-gray-100 mb-8 hover:scale-105 transition-all duration-500">
            <img
              src="/LMVGroup.png"
              alt="LMV Group"
              className="w-28 object-contain"
            />
          </div>

          {/* Heading */}
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Empowering
            <span className="text-lime-500"> Businesses</span>
          </h3>

          <p className="text-gray-600 mt-6 max-w-md text-lg leading-relaxed">
            Delivering trusted recruitment, insurance, finance,
            and technology services with innovation and excellence.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-5 mt-10 w-full max-w-lg">

            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <div className="text-3xl font-bold text-lime-600">500+</div>
              <div className="text-sm text-gray-600 mt-1">
                Happy Clients
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-gray-600 mt-1">
                Success Rate
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <div className="text-3xl font-bold text-emerald-600">24/7</div>
              <div className="text-sm text-gray-600 mt-1">
                Customer Support
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <div className="text-3xl font-bold text-orange-500">10K+</div>
              <div className="text-sm text-gray-600 mt-1">
                Candidates Managed
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</section>
      {/* ===================================================== */}
      {/* TESTIMONIALS SECTION */}
      {/* ===================================================== */}
      <section className="py-24 px-4 md:px-8 bg-[#ececea]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-lime-200 text-lime-800 rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied businesses that have transformed their recruitment process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-lime-400 text-lime-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* CTA SECTION */}
      {/* ===================================================== */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-lime-400 to-lime-500 rounded-[60px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 relative z-10">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-gray-800 mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of companies using LMV Group to find and hire the best talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              to="/register"
              className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              to="/contact"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .group-hover-effect:hover span:first-child {
          color: #a3e635;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Counter Component
const Counter = ({ end, suffix }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <>{count}{suffix}</>;
};

export default Home;