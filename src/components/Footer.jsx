// src/components/layout/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Users,
  CalendarCheck,
  Briefcase,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    // { name: "Careers", path: "/careers" },
    // { name: "Contact", path: "/contact" },
  ];

  const services = [
    {
      icon: Briefcase,
      name: "Job Posting",
    },
    {
      icon: Users,
      name: "Candidate Management",
    },
    {
      icon: CalendarCheck,
      name: "Interview Scheduling",
    },
    {
      icon: ShieldCheck,
      name: "HR Solutions",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-52 h-52 bg-lime-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl"></div>

      {/* Main Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-500 flex items-center justify-center shadow-lg">
                <Building2 size={22} className="text-black" />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  LMV <span className="text-lime-400">Group</span>
                </h2>

                <p className="text-xs text-gray-400">
                  Smart HR Solutions
                </p>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm">
              Modern recruitment and HR management solutions for smart businesses and companies.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-lime-500 hover:text-black transition duration-300 cursor-pointer">
                🌐
              </div>

              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-lime-500 hover:text-black transition duration-300 cursor-pointer">
                💼
              </div>

              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-lime-500 hover:text-black transition duration-300 cursor-pointer">
                📧
              </div>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>

            <div className="space-y-2">
              {quickLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className="group flex items-center gap-2 text-gray-400 hover:text-lime-400 transition-all duration-300 text-sm"
                >
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />

                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Services
            </h3>

            <div className="space-y-3">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-gray-400 text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <service.icon size={15} />
                  </div>

                  <span>{service.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-lime-400" />

                <span className="text-gray-400 text-sm">
                  hr@lmvgroup.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-lime-400" />

                <span className="text-gray-400 text-sm">
                  +91 98765 43210
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-lime-400" />

                <span className="text-gray-400 text-sm">
                  Hyderabad, Telangana
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-gray-500 text-xs text-center">
            © {currentYear} LMV Group. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-xs">

            <Link
              to="/privacy"
              className="text-gray-500 hover:text-lime-400 transition"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-gray-500 hover:text-lime-400 transition"
            >
              Terms
            </Link>

            <Link
              to="/services"
              className="text-gray-500 hover:text-lime-400 transition"
            >
              Services
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;