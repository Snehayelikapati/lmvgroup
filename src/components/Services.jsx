// src/pages/Services.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  Calendar,
  Building2,
  ShieldCheck,
  TrendingUp,
  FileText,
  Headphones,
  ArrowRight,
  CheckCircle,
  Globe,
  BarChart3,
  UserCheck,
  Clock3,
  Award,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Briefcase,
      title: "Recruitment Solutions",
      desc: "Complete hiring support for companies with smart candidate screening and recruitment management.",
      color: "from-lime-400 to-emerald-500",
      features: [
        "Job Posting",
        "Resume Screening",
        "Bulk Hiring",
        "HR Support",
      ],
    },
    {
      icon: Users,
      title: "Candidate Management",
      desc: "Track, manage, and organize candidates easily with a centralized dashboard.",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Candidate Database",
        "Application Tracking",
        "Profile Management",
        "Real-time Updates",
      ],
    },
    {
      icon: Calendar,
      title: "Interview Scheduling",
      desc: "Automate interview scheduling with reminders and calendar integration.",
      color: "from-purple-500 to-pink-500",
      features: [
        "Interview Calendar",
        "Online Meetings",
        "Automated Reminders",
        "Panel Coordination",
      ],
    },
    {
      icon: Building2,
      title: "Business Registration",
      desc: "Support for company setup, registration, documentation, and compliance services.",
      color: "from-orange-500 to-yellow-500",
      features: [
        "LLP Registration",
        "GST Services",
        "Company Setup",
        "Documentation",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Insurance Services",
      desc: "Trusted insurance solutions for individuals and businesses with complete guidance.",
      color: "from-green-500 to-teal-500",
      features: [
        "Health Insurance",
        "Life Insurance",
        "Vehicle Insurance",
        "Business Insurance",
      ],
    },
    {
      icon: TrendingUp,
      title: "Financial Services",
      desc: "Smart financial planning and investment services to grow your future securely.",
      color: "from-indigo-500 to-violet-500",
      features: [
        "Investment Planning",
        "Mutual Funds",
        "Loan Assistance",
        "Financial Guidance",
      ],
    },
  ];

  const process = [
    {
      icon: FileText,
      title: "Requirement Analysis",
      desc: "We understand your hiring or business requirements clearly.",
    },
    {
      icon: UserCheck,
      title: "Smart Processing",
      desc: "Our team handles screening, management, and coordination efficiently.",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      desc: "Track hiring progress and business growth with analytics.",
    },
    {
      icon: Award,
      title: "Successful Results",
      desc: "Delivering quality services with customer satisfaction.",
    },
  ];

  return (
    <div className="bg-[#f5f5f3] min-h-screen overflow-hidden">
      {/* HERO SECTION */}

      <section className="relative px-4 md:px-8 pt-5">
        <div
          className="relative rounded-[40px] overflow-hidden min-h-[600px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>

          <div className="relative z-10 flex flex-col justify-center items-center text-center min-h-[600px] px-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white mb-6">
              <Sparkles size={18} className="text-lime-400" />
              Our Professional Services
            </div>

            <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight mb-6">
              Smart Solutions
              <br />
              For Modern
              <span className="text-lime-400"> Businesses</span>
            </h1>

            <p className="text-white/80 text-lg max-w-3xl leading-relaxed">
              LMV Group provides recruitment, insurance, financial,
              investment, and business solutions to help companies and
              individuals grow successfully.
            </p>

            <button
              onClick={() => window.history.back()}
              className="mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-lime-400 to-lime-500 px-8 py-4 rounded-full text-black font-semibold hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-lime-100 text-lime-700 rounded-full text-sm font-semibold mb-5">
              What We Provide
            </span>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5">
              Our Premium
              <span className="text-lime-500"> Services</span>
            </h2>

            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Comprehensive business solutions designed to simplify
              recruitment, financial planning, insurance, and company growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-[35px] p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}
                ></div>

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white shadow-xl mb-6`}
                >
                  <service.icon size={30} />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.desc}
                </p>

                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <CheckCircle
                        size={18}
                        className="text-lime-500"
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-8 inline-flex items-center gap-2 text-lime-600 font-semibold group-hover:gap-3 transition-all duration-300">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}

      <section className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-5">
              Our Process
            </span>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5">
              How We
              <span className="text-blue-500"> Work</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div
                key={index}
                className="bg-[#f8f8f8] rounded-[30px] p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-500 flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                  <item.icon size={28} />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-gray-900 to-black rounded-[40px] overflow-hidden">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="p-10 md:p-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-lime-400 text-sm font-semibold mb-6">
                <Globe size={16} />
                Why Choose LMV Group
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Trusted Solutions
                <br />
                For Every Business
              </h2>

              <div className="space-y-5">
                {[
                  "Professional Recruitment Support",
                  "Trusted Financial & Insurance Services",
                  "24/7 Customer Assistance",
                  "Experienced Team & Smart Technology",
                  "Reliable Business Solutions",
                ].map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-white"
                  >
                    <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center text-black">
                      ✓
                    </div>

                    <span className="text-lg">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-full min-h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                alt="LMV Services"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

              <div className="absolute bottom-8 left-8 bg-white rounded-2xl px-6 py-4 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-lime-100 flex items-center justify-center text-lime-600">
                    <Clock3 size={28} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      10+
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Years Experience
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute top-8 right-8 bg-white rounded-2xl px-6 py-4 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <Headphones size={28} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      24/7
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Support Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;