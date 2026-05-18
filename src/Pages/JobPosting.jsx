import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  FileText,
  ClipboardList,
  Layers3,
  ArrowLeft,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobPosting = ({ onJobPosted }) => {
  const [form, setForm] = useState({
    companyName: "",
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    skills: "",
    jobType: "Full-time",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  const goHome = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((skill) => skill.trim()),
      };

      const response = await fetch(
        "http://localhost:5000/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("✅ Job posted successfully!");

        onJobPosted(data.data);

        setForm({
          companyName: "",
          title: "",
          description: "",
          requirements: "",
          location: "",
          salary: "",
          skills: "",
          jobType: "Full-time",
        });
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f3] p-4 md:p-8 relative">
      
      {/* Back Button - Top Left */}
      <button
        onClick={goBack}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md hover:bg-white text-gray-800 px-4 py-2 rounded-full transition-all duration-300 group shadow-md"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      {/* Home Button - Top Right */}
      {/* <button
        onClick={goHome}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-full transition-all duration-300 group shadow-md"
      >
        <Home size={18} className="group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium">Home</span>
      </button> */}

      <div className="max-w-5xl mx-auto">

        {/* TOP HERO SECTION */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[40px] p-8 md:p-12 text-white mb-10 relative overflow-hidden shadow-2xl mt-12">

          <div className="absolute top-0 right-0 w-72 h-72 bg-lime-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <span className="bg-lime-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
              Recruitment Portal
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
              Post a <span className="text-lime-400">New Job</span>
            </h1>

            <p className="text-gray-300 text-lg max-w-2xl">
              Create and publish job opportunities to attract the best
              candidates for your company.
            </p>
          </div>
        </div>

        {/* SUCCESS MESSAGE */}
    {/* <div className="min-h-screen bg-[#f5f5f3] p-4 md:p-8">
      <div className="max-w-5xl mx-auto"> */}
      

        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded-2xl mb-6 shadow-md font-medium animate-slide-down">
            {success}
          </div>
        )}

        <div className="bg-white rounded-[35px] shadow-2xl p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Company Name */}
            <div>
              <label className="text-gray-700 font-semibold mb-2 block">
                Company Name
              </label>

              <select
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3"
              >
                <option value="">Select Company</option>
                <option value="LakshithaTech">LakshithaTech</option>
                <option value="LMV Insurance">LMV Insurance</option>
                <option value="LMV Financial Services">
                  LMV Financial Services
                </option>
                <option value="LMV Investments">
                  LMV Investments
                </option>
              </select>
            </div>

            {/* Job Title */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <Briefcase size={18} className="text-lime-600" />
                Job Title *
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400 transition"
                placeholder="Senior Frontend Developer"
             
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FileText size={18} className="text-lime-600" />
                Description *
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Enter job description..."
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400 transition"
                
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <ClipboardList size={18} className="text-lime-600" />
                Requirements *
              </label>

              <textarea
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Skills, experience, qualifications..."
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400 transition"
               
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <MapPin size={18} className="text-lime-600" />
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Remote / Hyderabad"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400 transition"
                 
                />
              </div>

              {/* Salary */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <IndianRupee size={18} className="text-lime-600" />
                  Salary
                </label>

                <input
                  type="text"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="₹10L - ₹15L"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400 transition"
                 
                />
              </div>

              {/* Skills */}
              <div>
                <label className="text-gray-700 font-semibold mb-2 block">
                  Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js"
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3"
                />
              </div>

              {/* Job Type */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <Layers3 size={18} className="text-lime-600" />
                  Job Type
                </label>

                <select
                  name="jobType"
                  value={form.jobType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-lime-400 transition"
                 
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-lime-500 text-black font-bold py-4 rounded-2xl"
            >
              {loading ? "Posting..." : "🚀 Post Job"}
            </button>

          </form>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default JobPosting;