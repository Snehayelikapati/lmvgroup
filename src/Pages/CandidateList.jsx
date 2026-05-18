import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  UserCheck,
  UserX,
  FileText,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Star,
  TrendingUp,
  Award,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import toast from "react-hot-toast";

const CandidateTracking = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [candidates, setCandidates] = useState([]);
  const [candidateStatus, setCandidateStatus] = useState(candidates);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [showSingleForm, setShowSingleForm] = useState(false);
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume_url: "",
    company_name: "",
    current_company: "",
    experience: "",
    notice_period: "",
    expected_salary: "",
    location: "",
    skills: "",
    cover_letter: "",
    qualification: "",
    specialization: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/candidates/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setCandidateStatus(
          candidateStatus.map((c) =>
            c.id === id
              ? {
                  ...c,
                  status: newStatus,
                }
              : c,
          ),
        );

        setSelectedCandidate(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    if (status === "selected")
      return "text-green-600 bg-green-50 border-green-200";
    if (status === "rejected") return "text-red-600 bg-red-50 border-red-200";
    return "text-yellow-600 bg-yellow-50 border-yellow-200";
  };

  const getStatusIcon = (status) => {
    if (status === "selected") return <CheckCircle size={16} />;
    if (status === "rejected") return <XCircle size={16} />;
    return <Clock size={16} />;
  };

  const getStatusBadge = (status) => {
    if (status === "selected")
      return "bg-gradient-to-r from-green-500 to-emerald-600";
    if (status === "rejected")
      return "bg-gradient-to-r from-red-500 to-rose-600";
    return "bg-gradient-to-r from-yellow-500 to-orange-600";
  };

  const filteredCandidates = candidateStatus.filter((c) => {
    const matchesJob = selectedJob ? c.appliedFor === selectedJob : true;
    const matchesSearch = searchTerm
      ? c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
      : true;
    const matchesStatus =
      statusFilter === "all" ? true : c.status === statusFilter;
    return matchesJob && matchesSearch && matchesStatus;
  });

  const stats = {
    total: candidateStatus.length,
    selected: candidateStatus.filter((c) => c.status === "selected").length,
    rejected: candidateStatus.filter((c) => c.status === "rejected").length,
    pending: candidateStatus.filter((c) => c.status === "pending").length,
  };

  const uniqueJobs = [...new Set(candidateStatus.map((c) => c.appliedFor))];
  const fetchCandidates = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/candidates");

      const data = await response.json();

      if (data.success) {
        setCandidates(data.data);
        setCandidateStatus(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCandidates();
  }, []);
  const handleChange = (e) => {
    setCandidateForm({
      ...candidateForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:5000/api/candidates/bulk-upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      console.log(data);

      fetchCandidates();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCandidateSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(candidateForm).forEach((key) => {
        if (key === "skills") {
          formData.append(
            "skills",
            JSON.stringify(
              candidateForm.skills
                ? candidateForm.skills.split(",").map((skill) => skill.trim())
                : [],
            ),
          );
        } else {
          formData.append(key, candidateForm[key]);
        }
      });

      // resume file
      if (selectedFile) {
        formData.append("resume", selectedFile);
      }

      let response;

      // EDIT
      if (isEditing) {
        response = await fetch(
          `http://localhost:5000/api/candidates/${editingId}`,
          {
            method: "PUT",
            body: formData,
          },
        );
      }

      // CREATE
      else {
        response = await fetch("http://localhost:5000/api/candidates", {
          method: "POST",
          body: formData,
        });
      }

      const data = await response.json();

      console.log(data);

      if (data.success) {
        toast.success(
          isEditing
            ? "Candidate updated successfully 🚀"
            : "Candidate added successfully 🎉",
        );

        fetchCandidates();

        setShowSingleForm(false);

        setIsEditing(false);

        setEditingId(null);

        setSelectedFile(null);

        setCandidateForm({
          name: "",
          email: "",
          phone: "",
          resume_url: "",
          qualification: "",
          specialization: "",
          position: "",
          company_name: "",
          current_company: "",
          experience: "",
          notice_period: "",
          expected_salary: "",
          location: "",
          skills: "",
          cover_letter: "",
        });
      } else {
        toast.error(data.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message || "Server Error ❌");
    }
  };
  const handleEdit = (candidate) => {
    console.log(candidate);
    setCandidateForm({
      ...candidate,
      skills: candidate.skills?.join(", "),
    });

    setEditingId(candidate.id);

    setIsEditing(true);

    setShowSingleForm(true);
  };

  const handleExport = () => {

  const csvRows = [];

  // headers
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Position",
    "Company",
    "Experience",
    "Location",
    "Qualification",
    "Specialization",
    "Skills",
    "Status",
  ];

  csvRows.push(headers.join(","));

  // data
  candidateStatus.forEach((candidate) => {

    const row = [
      candidate.name,
      candidate.email,
      candidate.phone,
      candidate.position,
      candidate.company_name,
      candidate.experience,
      candidate.location,
      candidate.qualification,
      candidate.specialization,
      candidate.skills?.join(" | "),
      candidate.status,
    ];

    csvRows.push(row.join(","));
  });

  const csvData = new Blob(
    [csvRows.join("\n")],
    { type: "text/csv" }
  );

  const url = window.URL.createObjectURL(csvData);

  const a = document.createElement("a");

  a.href = url;

  a.download = "candidates.csv";

  a.click();

  window.URL.revokeObjectURL(url);
};
  return (
    <div className="bg-[#f5f5f3] min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 md:px-8 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center">
              <Users size={24} className="text-black" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Candidate Tracking
              </h1>
              <p className="text-gray-300 mt-1">
                Manage and track all job applications
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Applications</p>
                  <p className="text-3xl font-bold mt-1">{stats.total}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-lime-400/20 flex items-center justify-center">
                  <Users size={20} className="text-lime-400" />
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Selected</p>
                  <p className="text-3xl font-bold mt-1 text-green-400">
                    {stats.selected}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center">
                  <UserCheck size={20} className="text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Rejected</p>
                  <p className="text-3xl font-bold mt-1 text-red-400">
                    {stats.rejected}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-400/20 flex items-center justify-center">
                  <UserX size={20} className="text-red-400" />
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Pending Review</p>
                  <p className="text-3xl font-bold mt-1 text-yellow-400">
                    {stats.pending}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <Clock size={20} className="text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition"
              />
            </div>

            {/* Job Filter */}
            <div className="relative">
              <Briefcase
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-lime-400 outline-none transition appearance-none"
              >
                <option value="">All Jobs</option>
                {uniqueJobs.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>
              <ChevronRight
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-lime-400 outline-none transition appearance-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
              </select>
              <ChevronRight
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {/* Upload Candidates Button */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-black rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Download size={18} />
                Upload Candidates
              </button>

              {/* Export Button */}
            </div>

            {/* Export Button */}
            <button
  onClick={handleExport}
  className="px-6 py-2 bg-gradient-to-r from-lime-400 to-lime-500 text-black rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
>
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Candidates Grid */}
        {filteredCandidates.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No candidates found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${getStatusColor(candidate.status)}`}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    {/* Candidate Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <h3 className="text-xl font-bold text-gray-800">
                          {candidate.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusBadge(candidate.status)}`}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(candidate.status)}
                            {candidate.status.toUpperCase()}
                          </span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail size={16} className="text-lime-500" />
                          <span className="text-sm">{candidate.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={16} className="text-lime-500" />
                          <span className="text-sm">{candidate.phone}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Briefcase size={16} className="text-lime-500" />
                          <span className="text-sm">
                            Applied for:{" "}
                            <span className="font-medium">
                              {candidate.position}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Award size={16} className="text-lime-500" />
                          <span className="text-sm">
                            Company for:
                            <span className="font-medium">
                              {" "}
                              {candidate.company_name}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={16} className="text-lime-500" />
                          <span className="text-sm">{candidate.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <TrendingUp size={16} className="text-lime-500" />
                          <span className="text-sm">
                            Experience: {candidate.experience}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Award size={16} className="text-lime-500" />
                          <span className="text-sm">
                            Qualification:
                            <span className="font-medium">
                              {" "}
                              {candidate.qualification}
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <FileText size={16} className="text-lime-500" />
                          <span className="text-sm">
                            Specialization:
                            <span className="font-medium">
                              {" "}
                              {candidate.specialization}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} className="text-lime-500" />
                          <span className="text-sm">
                            Applied: {candidate.applied_at}
                          </span>
                        </div>
                      </div>

                      {showUploadModal && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-300">
                            {/* Close Button */}
                            <button
                              onClick={() => setShowUploadModal(false)}
                              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                            >
                              <XCircle size={24} />
                            </button>

                            {/* Heading */}
                            <div className="text-center mb-8">
                              <div className="w-16 h-16 bg-gradient-to-r from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users className="text-black" size={30} />
                              </div>

                              <h2 className="text-2xl font-bold text-gray-800">
                                Upload Candidates
                              </h2>

                              <p className="text-gray-500 mt-2 text-sm">
                                Choose how you want to upload candidate details
                              </p>
                            </div>

                            {/* Upload Options */}
                            <div className="space-y-4">
                              {/* Bulk Upload */}
                              <button
                                onClick={() => {
                                  document
                                    .getElementById("bulkFileInput")
                                    .click();
                                }}
                                className="w-full p-5 rounded-2xl border-2 border-gray-200 hover:border-lime-400 hover:bg-lime-50 transition-all group"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-lime-400 to-lime-500 flex items-center justify-center">
                                    <Download
                                      className="text-black"
                                      size={24}
                                    />
                                  </div>

                                  <div className="text-left">
                                    <h3 className="font-bold text-lg text-gray-800">
                                      Bulk Upload
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      Upload Excel or CSV file
                                    </p>
                                  </div>
                                </div>
                              </button>

                              {/* Single Upload */}
                              <button
                                onClick={() => {
                                  setShowUploadModal(false);
                                  setShowSingleForm(true);
                                }}
                                className="w-full p-5 rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <UserCheck
                                      className="text-white"
                                      size={24}
                                    />
                                  </div>

                                  <div className="text-left">
                                    <h3 className="font-bold text-lg text-gray-800">
                                      Single Upload
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      Add one candidate manually
                                    </p>
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {showSingleForm && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 overflow-y-auto">
                          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-6 relative my-10 max-h-[90vh] overflow-y-auto">
                            {/* Close Button */}
                            <button
                              onClick={() => setShowSingleForm(false)}
                              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                            >
                              <XCircle size={24} />
                            </button>

                            {/* Header */}
                            <div className="mb-8">
                              <h2 className="text-3xl font-bold text-gray-800">
                                Add Candidate
                              </h2>

                              <p className="text-gray-500 mt-2">
                                Fill candidate details manually
                              </p>
                            </div>

                            {/* Form */}
                            <form
                              onSubmit={handleCandidateSubmit}
                              className="grid grid-cols-1 md:grid-cols-2 gap-5"
                            >
                              {/* Name */}
                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Full Name
                                </label>

                                <input
                                  type="text"
                                  name="name"
                                  value={candidateForm.name}
                                  onChange={handleChange}
                                  placeholder="Enter candidate name"
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900"
                                />
                              </div>

                              {/* Email */}
                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Email
                                </label>

                                <input
                                  type="email"
                                  name="email"
                                  value={candidateForm.email}
                                  onChange={handleChange}
                                  placeholder="Enter email"
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900"
                                />
                              </div>

                              {/* Phone */}
                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Phone
                                </label>

                                <input
                                  type="text"
                                  name="phone"
                                  value={candidateForm.phone}
                                  onChange={handleChange}
                                  placeholder="Enter phone number"
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900"
                                />
                              </div>

                              {/* Qualification */}
                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Qualification
                                </label>

                                <input
                                  type="text"
                                  name="qualification"
                                  value={candidateForm.qualification}
                                  onChange={handleChange}
                                  placeholder="B.Tech, MCA, MBA..."
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900"
                                />
                              </div>

                              {/* Qualification */}
                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Specialization
                                </label>

                                <input
                                  type="text"
                                  name="specialization"
                                  value={candidateForm.specialization}
                                  onChange={handleChange}
                                  placeholder="IT, B.COM, BBA..."
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900"
                                />
                              </div>

                              {/* Position */}
                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Position
                                </label>

                                <input
                                  type="text"
                                  name="position"
                                  value={candidateForm.position}
                                  onChange={handleChange}
                                  placeholder="Enter position"
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900"
                                />
                              </div>

                              {/* Company */}
                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Current Company
                                </label>

                                <input
                                  type="text"
                                  name="company_name"
                                  value={candidateForm.company_name}
                                  onChange={handleChange}
                                  placeholder="Enter company name "
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900"
                                />
                              </div>

                              {/* Experience */}
                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Experience
                                </label>

                                <input
                                  type="text"
                                  name="experience"
                                  value={candidateForm.experience}
                                  onChange={handleChange}
                                  placeholder="Enter experience"
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900"
                                />
                              </div>

                              {/* Notice Period */}
                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Notice Period
                                </label>

                                <input
                                  type="text"
                                  name="notice_period"
                                  value={candidateForm.notice_period}
                                  onChange={handleChange}
                                  placeholder="Enter notice_period"
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900"
                                />
                              </div>

                              {/* Expected Salary */}
                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Expected Salary
                                </label>

                                <input
                                  type="text"
                                  name="expected_salary"
                                  value={candidateForm.expected_salary}
                                  onChange={handleChange}
                                  placeholder="Enter expected salary"
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900"
                                />
                              </div>

                              {/* Location */}
                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Location
                                </label>

                                <input
                                  type="text"
                                  name="location"
                                  value={candidateForm.location}
                                  onChange={handleChange}
                                  placeholder="Enter location"
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900"
                                />
                              </div>

                              {/* Skills */}
                              <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Skills
                                </label>

                                <input
                                  type="text"
                                  name="skills"
                                  value={candidateForm.skills}
                                  onChange={handleChange}
                                  placeholder="Enter skills"
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900"
                                />
                              </div>

                              {/* Cover Letter */}
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Cover Letter
                                </label>

                                <textarea
                                  rows="4"
                                  name="cover_letter"
                                  value={candidateForm.cover_letter}
                                  onChange={handleChange}
                                  placeholder="Write cover letter..."
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-lime-400 outline-none text-gray-900 "
                                />
                              </div>

                              {/* Resume Upload */}
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                  Resume Upload
                                </label>

                                <input
                                  type="file"
                                  name="resume"
                                  accept=".pdf,.doc,.docx"
                                  onChange={(e) =>
                                    setSelectedFile(e.target.files[0])
                                  }
                                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                                />
                              </div>

                              {/* Submit */}
                              <div className="md:col-span-2 flex justify-end">
                                <button
                                  type="submit"
                                  className="px-8 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-black rounded-2xl font-semibold hover:shadow-xl transition-all"
                                >
                                  Save Candidate
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        id="bulkFileInput"
                        accept=".xlsx,.csv"
                        className="hidden"
                        onChange={handleBulkUpload}
                      />

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {candidate.skills?.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row lg:flex-col gap-2">
                      <button
                        onClick={() => updateStatus(candidate.id, "selected")}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                      >
                        <CheckCircle size={16} />
                        Select
                      </button>
                      <button
                        onClick={() => updateStatus(candidate.id, "rejected")}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                      <button
                        onClick={() =>
                          setSelectedCandidate(
                            selectedCandidate === candidate.id
                              ? null
                              : candidate.id,
                          )
                        }
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                      >
                        <Eye size={16} />
                        View Details
                      </button>

                      <button
                        onClick={() => handleEdit(candidate)}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedCandidate === candidate.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <FileText size={18} className="text-lime-500" />
                            Cover Letter
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {candidate.cover_letter || "No cover letter added"}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <Star size={18} className="text-lime-500" />
                            Additional Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p className="flex justify-between">
                              <span className="text-gray-500">
                                Notice Period:
                              </span>
                              <span className="font-medium">30 days</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-gray-500">
                                Current CTC:
                              </span>
                              <span className="font-medium">₹12 LPA</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-gray-500">
                                Expected CTC:
                              </span>
                              <span className="font-medium">₹15 LPA</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-gray-500">
                                Current Location:
                              </span>
                              <span className="font-medium">
                                {candidate.location}
                              </span>
                            </p>
                          </div>
                          <div className="mt-4">
                            <a
                              href={candidate.resume_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all flex items-center gap-2 justify-center"
                            >
                              <Download size={16} />
                              Download Resume
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateTracking;
