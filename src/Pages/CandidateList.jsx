import React, { useState } from 'react'
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
  ArrowUpDown
} from 'lucide-react'

const CandidateTracking = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  
  const [candidates] = useState([
    { id: 1, name: 'Satya', email: 'rahul.sharma@example.com', phone: '+91 98765 43210', status: 'pending', appliedFor: 'Frontend Developer', experience: '4 years', location: 'Mumbai', skills: ['React', 'JavaScript', 'CSS'], appliedDate: '2024-01-15' },
    { id: 2, name: 'Akhil', email: 'priya.patel@example.com', phone: '+91 98765 43211', status: 'selected', appliedFor: 'Backend Developer', experience: '5 years', location: 'Bangalore', skills: ['Node.js', 'Python', 'MongoDB'], appliedDate: '2024-01-14' },
    { id: 3, name: 'Abhinaya', email: 'amit.kumar@example.com', phone: '+91 98765 43212', status: 'rejected', appliedFor: 'Full Stack Developer', experience: '3 years', location: 'Hyderabad', skills: ['React', 'Node.js', 'SQL'], appliedDate: '2024-01-13' },
    { id: 4, name: 'Sneha', email: 'sneha.@example.com', phone: '+91 98765 43213', status: 'pending', appliedFor: 'UI/UX Designer', experience: '2 years', location: 'Chennai', skills: ['Figma', 'Adobe XD', 'Sketch'], appliedDate: '2024-01-12' },
    { id: 5, name: 'Durga Prasad', email: 'vikram.singh@example.com', phone: '+91 98765 43214', status: 'selected', appliedFor: 'Frontend Developer', experience: '6 years', location: 'Pune', skills: ['Angular', 'TypeScript', 'RxJS'], appliedDate: '2024-01-11' },
    { id: 6, name: 'Neha Gupta', email: 'neha.gupta@example.com', phone: '+91 98765 43215', status: 'pending', appliedFor: 'Backend Developer', experience: '4 years', location: 'Delhi', skills: ['Java', 'Spring Boot', 'MySQL'], appliedDate: '2024-01-10' },
    { id: 7, name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', phone: '+91 98765 43216', status: 'rejected', appliedFor: 'Frontend Developer', experience: '2 years', location: 'Bangalore', skills: ['Vue.js', 'JavaScript', 'HTML/CSS'], appliedDate: '2024-01-09' },
  ])

  const [candidateStatus, setCandidateStatus] = useState(candidates)

  const updateStatus = (id, newStatus) => {
    setCandidateStatus(candidateStatus.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ))
    setSelectedCandidate(null)
  }

  const getStatusColor = (status) => {
    if (status === 'selected') return 'text-green-600 bg-green-50 border-green-200'
    if (status === 'rejected') return 'text-red-600 bg-red-50 border-red-200'
    return 'text-yellow-600 bg-yellow-50 border-yellow-200'
  }

  const getStatusIcon = (status) => {
    if (status === 'selected') return <CheckCircle size={16} />
    if (status === 'rejected') return <XCircle size={16} />
    return <Clock size={16} />
  }

  const getStatusBadge = (status) => {
    if (status === 'selected') return 'bg-gradient-to-r from-green-500 to-emerald-600'
    if (status === 'rejected') return 'bg-gradient-to-r from-red-500 to-rose-600'
    return 'bg-gradient-to-r from-yellow-500 to-orange-600'
  }

  const filteredCandidates = candidateStatus.filter(c => {
    const matchesJob = selectedJob ? c.appliedFor === selectedJob : true
    const matchesSearch = searchTerm ? 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) : true
    const matchesStatus = statusFilter === 'all' ? true : c.status === statusFilter
    return matchesJob && matchesSearch && matchesStatus
  })

  const stats = {
    total: candidateStatus.length,
    selected: candidateStatus.filter(c => c.status === 'selected').length,
    rejected: candidateStatus.filter(c => c.status === 'rejected').length,
    pending: candidateStatus.filter(c => c.status === 'pending').length,
  }

  const uniqueJobs = [...new Set(candidateStatus.map(c => c.appliedFor))]

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
              <h1 className="text-3xl md:text-4xl font-bold">Candidate Tracking</h1>
              <p className="text-gray-300 mt-1">Manage and track all job applications</p>
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
                  <p className="text-3xl font-bold mt-1 text-green-400">{stats.selected}</p>
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
                  <p className="text-3xl font-bold mt-1 text-red-400">{stats.rejected}</p>
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
                  <p className="text-3xl font-bold mt-1 text-yellow-400">{stats.pending}</p>
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
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
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-lime-400 outline-none transition appearance-none"
              >
                <option value="">All Jobs</option>
                {uniqueJobs.map(job => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
              <ChevronRight size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
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
              <ChevronRight size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
            </div>

            {/* Export Button */}
            <button className="px-6 py-2 bg-gradient-to-r from-lime-400 to-lime-500 text-black rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
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
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No candidates found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
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
                        <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusBadge(candidate.status)}`}>
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
                          <span className="text-sm">Applied for: <span className="font-medium">{candidate.appliedFor}</span></span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={16} className="text-lime-500" />
                          <span className="text-sm">{candidate.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <TrendingUp size={16} className="text-lime-500" />
                          <span className="text-sm">Experience: {candidate.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} className="text-lime-500" />
                          <span className="text-sm">Applied: {candidate.appliedDate}</span>
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {candidate.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row lg:flex-col gap-2">
                      <button
                        onClick={() => updateStatus(candidate.id, 'selected')}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                      >
                        <CheckCircle size={16} />
                        Select
                      </button>
                      <button
                        onClick={() => updateStatus(candidate.id, 'rejected')}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                      <button
                        onClick={() => setSelectedCandidate(selectedCandidate === candidate.id ? null : candidate.id)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                      >
                        <Eye size={16} />
                        View Details
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
                            I am extremely excited about this opportunity at LMV Group. With {candidate.experience} of experience in {candidate.skills.join(', ')}, 
                            I believe I would be a great addition to your team. I have successfully delivered multiple projects and have a proven track record 
                            of meeting deadlines and exceeding expectations.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <Star size={18} className="text-lime-500" />
                            Additional Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p className="flex justify-between">
                              <span className="text-gray-500">Notice Period:</span>
                              <span className="font-medium">30 days</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-gray-500">Current CTC:</span>
                              <span className="font-medium">₹12 LPA</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-gray-500">Expected CTC:</span>
                              <span className="font-medium">₹15 LPA</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-gray-500">Current Location:</span>
                              <span className="font-medium">{candidate.location}</span>
                            </p>
                          </div>
                          <div className="mt-4">
                            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all flex items-center gap-2 justify-center">
                              <Download size={16} />
                              Download Resume
                            </button>
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
  )
}

export default CandidateTracking