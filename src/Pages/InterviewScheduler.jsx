import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  Video,
  Building,
  Mail,
  Phone,
  User,
  Briefcase,
  MapPin,
  Send,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  Link as LinkIcon,
  UserCheck,
  CalendarDays,
  AlarmClock,
  VideoIcon,
  Building2
} from 'lucide-react'

const InterviewScheduler = () => {
  const [interviews, setInterviews] = useState([])
  const [form, setForm] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    jobPosition: '',
    interviewDate: '',
    interviewTime: '',
    interviewMode: 'online',
    meetingLink: '',
    interviewer: '',
    notes: ''
  })
  const [success, setSuccess] = useState('')
  const [selectedMode, setSelectedMode] = useState('online')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newInterview = {
      id: Date.now(),
      ...form,
      status: 'Scheduled',
      scheduledAt: new Date().toISOString()
    }
    
    setInterviews([newInterview, ...interviews])
    setSuccess(`✅ Interview scheduled for ${form.candidateName}`)
    
    setForm({
      candidateName: '',
      candidateEmail: '',
      candidatePhone: '',
      jobPosition: '',
      interviewDate: '',
      interviewTime: '',
      interviewMode: 'online',
      meetingLink: '',
      interviewer: '',
      notes: ''
    })
    
    setTimeout(() => setSuccess(''), 3000)
  }

  const cancelInterview = (id) => {
    setInterviews(interviews.filter(interview => interview.id !== id))
    setSuccess(`❌ Interview cancelled`)
    setTimeout(() => setSuccess(''), 3000)
  }

  const getModeIcon = (mode) => {
    return mode === 'online' ? <Video size={16} /> : <Building size={16} />
  }

  const getStatusColor = (status) => {
    if (status === 'Completed') return 'text-green-600 bg-green-50 border-green-200'
    if (status === 'Cancelled') return 'text-red-600 bg-red-50 border-red-200'
    return 'text-blue-600 bg-blue-50 border-blue-200'
  }

  const stats = {
    total: interviews.length,
    upcoming: interviews.filter(i => i.status === 'Scheduled').length,
    today: interviews.filter(i => i.interviewDate === new Date().toISOString().split('T')[0]).length
  }

  const upcomingInterviews = interviews.filter(i => i.status === 'Scheduled')
  const todayInterviews = interviews.filter(i => i.interviewDate === new Date().toISOString().split('T')[0])

  return (
    <div className="bg-[#f5f5f3] min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 md:px-8 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center">
              <Calendar size={24} className="text-black" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Interview Scheduler</h1>
              <p className="text-gray-300 mt-1">Schedule and manage candidate interviews</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Interviews</p>
                  <p className="text-3xl font-bold mt-1">{stats.total}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-lime-400/20 flex items-center justify-center">
                  <Calendar size={20} className="text-lime-400" />
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Upcoming Interviews</p>
                  <p className="text-3xl font-bold mt-1 text-blue-400">{stats.upcoming}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <ClockIcon size={20} className="text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Today's Interviews</p>
                  <p className="text-3xl font-bold mt-1 text-green-400">{stats.today}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center">
                  <Users size={20} className="text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md animate-fade-in-up">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              <span className="font-medium">{success}</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Schedule Form */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-lime-400 to-lime-500 px-6 py-4">
              <h2 className="text-xl font-bold text-black flex items-center gap-2">
                <CalendarDays size={20} />
                Schedule New Interview
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User size={16} className="text-lime-500" />
                    Candidate Name *
                  </label>
                  <input
                    type="text"
                    name="candidateName"
                    value={form.candidateName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={16} className="text-lime-500" />
                    Candidate Email *
                  </label>
                  <input
                    type="email"
                    name="candidateEmail"
                    value={form.candidateEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition"
                    placeholder="candidate@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-lime-500" />
                    Candidate Phone
                  </label>
                  <input
                    type="tel"
                    name="candidatePhone"
                    value={form.candidatePhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase size={16} className="text-lime-500" />
                    Job Position *
                  </label>
                  <input
                    type="text"
                    name="jobPosition"
                    value={form.jobPosition}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition"
                    placeholder="e.g., Frontend Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-lime-500" />
                    Interview Date *
                  </label>
                  <input
                    type="date"
                    name="interviewDate"
                    value={form.interviewDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <AlarmClock size={16} className="text-lime-500" />
                    Interview Time *
                  </label>
                  <input
                    type="time"
                    name="interviewTime"
                    value={form.interviewTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <UserCheck size={16} className="text-lime-500" />
                    Interviewer Name
                  </label>
                  <input
                    type="text"
                    name="interviewer"
                    value={form.interviewer}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition"
                    placeholder="Interviewer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 size={16} className="text-lime-500" />
                    Interview Mode
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setForm({ ...form, interviewMode: 'online' })
                        setSelectedMode('online')
                      }}
                      className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                        form.interviewMode === 'online'
                          ? 'bg-gradient-to-r from-lime-400 to-lime-500 text-black shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Video size={16} />
                      Online
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setForm({ ...form, interviewMode: 'offline' })
                        setSelectedMode('offline')
                      }}
                      className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                        form.interviewMode === 'offline'
                          ? 'bg-gradient-to-r from-lime-400 to-lime-500 text-black shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Building size={16} />
                      Offline
                    </button>
                  </div>
                </div>
              </div>

              {form.interviewMode === 'online' && (
                <div className="animate-fade-in-up">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <LinkIcon size={16} className="text-lime-500" />
                    Meeting Link
                  </label>
                  <input
                    type="url"
                    name="meetingLink"
                    value={form.meetingLink}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition"
                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none transition"
                  placeholder="Any additional information or requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-lime-400 to-lime-500 text-black py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Schedule Interview
              </button>
            </form>
          </div>

          {/* Upcoming Interviews List */}
          <div className="space-y-6">
            {/* Today's Interviews */}
            {todayInterviews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ClockIcon size={20} />
                    Today's Interviews ({todayInterviews.length})
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {todayInterviews.map((interview) => (
                    <InterviewCard 
                      key={interview.id} 
                      interview={interview} 
                      onCancel={cancelInterview}
                      getModeIcon={getModeIcon}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Interviews */}
            {upcomingInterviews.filter(i => i.interviewDate !== new Date().toISOString().split('T')[0]).length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Calendar size={20} />
                    Upcoming Interviews
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {upcomingInterviews
                    .filter(i => i.interviewDate !== new Date().toISOString().split('T')[0])
                    .map((interview) => (
                      <InterviewCard 
                        key={interview.id} 
                        interview={interview} 
                        onCancel={cancelInterview}
                        getModeIcon={getModeIcon}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {interviews.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No interviews scheduled</h3>
                <p className="text-gray-500">Schedule your first interview using the form</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

// Interview Card Component
const InterviewCard = ({ interview, onCancel, getModeIcon }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start flex-wrap gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h4 className="font-semibold text-gray-800 text-lg">{interview.candidateName}</h4>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium flex items-center gap-1">
              {getModeIcon(interview.interviewMode)}
              {interview.interviewMode === 'online' ? 'Online' : 'Offline'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={14} className="text-lime-500" />
              {interview.candidateEmail}
            </div>
            {interview.candidatePhone && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={14} className="text-lime-500" />
                {interview.candidatePhone}
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase size={14} className="text-lime-500" />
              {interview.jobPosition}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User size={14} className="text-lime-500" />
              Interviewer: {interview.interviewer || 'Not assigned'}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-3 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar size={14} className="text-lime-500" />
              <span>{interview.interviewDate}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock size={14} className="text-lime-500" />
              <span>{interview.interviewTime}</span>
            </div>
          </div>

          {expanded && interview.meetingLink && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <a 
                href={interview.meetingLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Video size={14} />
                Join Meeting Link
              </a>
            </div>
          )}

          {expanded && interview.notes && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Notes:</span> {interview.notes}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-1.5 text-gray-600 hover:text-lime-600 text-sm font-medium transition flex items-center gap-1"
          >
            <ChevronRight size={16} className={`transform transition-transform ${expanded ? 'rotate-90' : ''}`} />
            {expanded ? 'Less' : 'Details'}
          </button>
          <button
            onClick={() => onCancel(interview.id)}
            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center gap-1"
          >
            <XCircle size={14} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default InterviewScheduler