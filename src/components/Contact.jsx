// src/pages/Contact.jsx

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Building2,
  MessageSquare,
  User,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-[#f5f5f3] min-h-screen overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative px-4 md:px-8 pt-8">
        <div
          className="relative rounded-[40px] overflow-hidden min-h-[420px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>

          <div className="relative z-10 flex flex-col justify-center items-center text-center min-h-[420px] px-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-white mb-6">
              <MessageSquare size={18} className="text-lime-400" />
              Contact LMV Group
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Let’s Connect &
              <span className="text-lime-400"> Grow Together</span>
            </h1>

            <p className="text-white/90 text-lg md:text-xl mt-6 max-w-3xl leading-relaxed">
              We’re here to help you with recruitment, insurance,
              financial services, and technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

          {/* LEFT SIDE - FORM */}
          <div className="bg-white rounded-[35px] shadow-2xl p-8 md:p-10 border border-gray-100">

            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-100 rounded-full mb-5">
                <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-lime-700 uppercase">
                  Send Message
                </span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900">
                Get in Touch
              </h2>

              <p className="text-gray-500 mt-3">
                Fill out the form and our team will contact you shortly.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 bg-green-100 border border-green-200 text-green-700 rounded-2xl px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                  ✅
                </div>
                <div>
                  <h3 className="font-semibold">Message Sent Successfully</h3>
                  <p className="text-sm">
                    Thank you! Our team will contact you soon.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-lime-500"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-lime-500"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                  />
                </div>
              </div>

              {/* SUBJECT */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Enter subject"
                  className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400 transition resize-none"
                ></textarea>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-lime-400 to-lime-500 text-black py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT SIDE - CONTACT INFO */}
          <div className="space-y-8">

            {/* CONTACT CARD */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[35px] p-8 text-white shadow-2xl relative overflow-hidden">

              <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">

                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center shadow-xl mb-6">
                  <Building2 size={40} className="text-black" />
                </div>

                <h2 className="text-4xl font-bold mb-4">
                  LMV Group
                </h2>

                <p className="text-gray-300 leading-relaxed mb-8">
                  Delivering smart recruitment, insurance,
                  financial, and technology solutions for modern businesses.
                </p>

                <div className="space-y-6">

                  {/* ADDRESS */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <MapPin size={22} className="text-lime-400" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">Address</h3>
                      <p className="text-gray-300">
                        Hyderabad, Telangana, India - 500001
                      </p>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Mail size={22} className="text-lime-400" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-300">
                        hr@lmvgroup.com
                      </p>
                      <p className="text-gray-300">
                        support@lmvgroup.com
                      </p>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Phone size={22} className="text-lime-400" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-gray-300">
                        +91 98765 43210
                      </p>
                      <p className="text-gray-300">
                        +91 12345 67890
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* BUSINESS HOURS */}
            <div className="bg-white rounded-[35px] shadow-2xl p-8 border border-gray-100">

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-lime-100 flex items-center justify-center">
                  <Clock size={28} className="text-lime-600" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Business Hours
                  </h3>

                  <p className="text-gray-500">
                    We’re available during these timings
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-700">
                    Monday - Friday
                  </span>

                  <span className="font-semibold text-lime-600">
                    9:00 AM - 6:00 PM
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-700">
                    Saturday
                  </span>

                  <span className="font-semibold text-lime-600">
                    10:00 AM - 2:00 PM
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-gray-700">
                    Sunday
                  </span>

                  <span className="font-semibold text-red-500">
                    Closed
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;