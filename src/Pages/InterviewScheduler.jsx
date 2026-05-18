import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  Video,
  Building,
  Mail,
  Phone,
  User,
  Briefcase,
  Send,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Users,
  ChevronRight,
  Link as LinkIcon,
  UserCheck,
  CalendarDays,
  AlarmClock,
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
  const [loading, setLoading] = useState(false)

  // Fetch interviews on component mount
  useEffect(() => {
    fetchInterviews()
  }, [])

  const fetchInterviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/interviews")
      const data = await response.json()
      if (data.success) {
        setInterviews(data.data)
      }
    } catch (error) {
      console.error("Error fetching interviews:", error)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/interviews/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidateName: form.candidateName,
          candidateEmail: form.candidateEmail,
          candidatePhone: form.candidatePhone,
          jobPosition: form.jobPosition,
          interviewDate: form.interviewDate,
          interviewTime: form.interviewTime,
          interviewMode: form.interviewMode,
          meetingLink: form.meetingLink,
          interviewer: form.interviewer,
          notes: form.notes,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        await fetchInterviews()
        
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
      } else {
        setSuccess(`❌ Failed to schedule interview: ${data.message || 'Unknown error'}`)
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      console.log(error)
      setSuccess('❌ Server Error - Please check if backend is running')
      setTimeout(() => setSuccess(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const cancelInterview = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/interviews/${id}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        await fetchInterviews() // Refresh the list
        setSuccess(`✅ Interview cancelled successfully`)
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (error) {
      console.error("Error cancelling interview:", error)
      setSuccess('❌ Failed to cancel interview')
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const getModeIcon = (mode) => {
    return mode === 'online' ? <Video size={16} /> : <Building size={16} />
  }

  // Get today's date in YYYY-MM-DD format
  const todayDate = new Date().toISOString().split('T')[0]
  
  // Filter interviews
  const todayInterviews = interviews.filter(interview => interview.interviewDate === todayDate && interview.status === 'scheduled')
  const upcomingInterviews = interviews.filter(interview => 
    interview.interviewDate > todayDate && interview.status === 'scheduled'
  )
  const pastInterviews = interviews.filter(interview => 
    interview.interviewDate < todayDate || interview.status === 'cancelled'
  )

  // Sort interviews by date (nearest first)
  const sortedTodayInterviews = [...todayInterviews].sort((a, b) => a.interviewTime.localeCompare(b.interviewTime))
  const sortedUpcomingInterviews = [...upcomingInterviews].sort((a, b) => a.interviewDate.localeCompare(b.interviewDate))

  const stats = {
    total: interviews.length,
    upcoming: upcomingInterviews.length,
    today: todayInterviews.length,
    completed: pastInterviews.filter(i => i.status === 'completed').length,
    cancelled: pastInterviews.filter(i => i.status === 'cancelled').length
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-4 md:px-8 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-lime-400 to-lime-500 flex items-center justify-center shadow-lg">
              <Calendar size={28} className="text-black" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Interview Scheduler
              </h1>
              <p className="text-gray-400 mt-1">Schedule and manage candidate interviews seamlessly</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
            {/* Total Interviews */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-xs uppercase tracking-wider">Total</p>
                  <p className="text-3xl font-bold mt-1 text-white">{stats.total}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-lime-400/20 flex items-center justify-center">
                  <Calendar size={20} className="text-lime-400" />
                </div>
              </div>
            </div>

            {/* Today's Interviews */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-xs uppercase tracking-wider">Today</p>
                  <p className="text-3xl font-bold mt-1 text-green-400">{stats.today}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center">
                  <ClockIcon size={20} className="text-green-400" />
                </div>
              </div>
            </div>

            {/* Upcoming */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-xs uppercase tracking-wider">Upcoming</p>
                  <p className="text-3xl font-bold mt-1 text-blue-400">{stats.upcoming}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <CalendarDays size={20} className="text-blue-400" />
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-xs uppercase tracking-wider">Completed</p>
                  <p className="text-3xl font-bold mt-1 text-purple-400">{stats.completed}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-400/20 flex items-center justify-center">
                  <CheckCircle size={20} className="text-purple-400" />
                </div>
              </div>
            </div>

            {/* Cancelled */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-xs uppercase tracking-wider">Cancelled</p>
                  <p className="text-3xl font-bold mt-1 text-red-400">{stats.cancelled}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-400/20 flex items-center justify-center">
                  <XCircle size={20} className="text-red-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Success/Error Message */}
        {success && (
          <div className={`mb-6 rounded-xl shadow-lg animate-fade-in-up ${
            success.includes('✅') ? 'bg-green-50 border-l-4 border-green-500 text-green-700' : 'bg-red-50 border-l-4 border-red-500 text-red-700'
          }`}>
            <div className="p-4">
              <div className="flex items-center gap-2">
                {success.includes('✅') ? <CheckCircle size={20} /> : <XCircle size={20} />}
                <span className="font-medium">{success}</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Schedule Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
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
                    min={new Date().toISOString().split('T')[0]}
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
                      onClick={() => setForm({ ...form, interviewMode: 'online' })}
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
                      onClick={() => setForm({ ...form, interviewMode: 'offline' })}
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
                disabled={loading}
                className="w-full bg-gradient-to-r from-lime-400 to-lime-500 text-black py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Scheduling...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Schedule Interview
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Interviews Lists */}
          <div className="space-y-6">
            {/* Today's Interviews */}
            {sortedTodayInterviews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <ClockIcon size={20} />
                      Today's Interviews
                    </h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-bold">
                      {sortedTodayInterviews.length}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                  {sortedTodayInterviews.map((interview) => (
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
            {sortedUpcomingInterviews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Calendar size={20} />
                      Upcoming Interviews
                    </h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-bold">
                      {sortedUpcomingInterviews.length}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                  {sortedUpcomingInterviews.map((interview) => (
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
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No interviews scheduled</h3>
                <p className="text-gray-500">Schedule your first interview using the form</p>
              </div>
            )}

            {/* No Upcoming Message */}
            {interviews.length > 0 && sortedTodayInterviews.length === 0 && sortedUpcomingInterviews.length === 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">All caught up!</h3>
                <p className="text-gray-500">No upcoming interviews scheduled</p>
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
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  )
}

// Interview Card Component
const InterviewCard = ({ interview, onCancel, getModeIcon }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-lime-200">
      <div className="flex justify-between items-start flex-wrap gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h4 className="font-semibold text-gray-800 text-lg">{interview.candidateName}</h4>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium flex items-center gap-1">
              {getModeIcon(interview.interviewMode)}
              {interview.interviewMode === 'online' ? 'Online' : 'Offline'}
            </span>
            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
              interview.interviewDate === new Date().toISOString().split('T')[0] 
                ? 'bg-orange-100 text-orange-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {interview.interviewDate === new Date().toISOString().split('T')[0] ? 'Today' : 'Upcoming'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={14} className="text-lime-500" />
              <span className="truncate">{interview.candidateEmail}</span>
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

          <div className="flex flex-wrap gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar size={14} className="text-lime-500" />
              <span className="font-medium">{interview.interviewDate}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock size={14} className="text-lime-500" />
              <span className="font-medium">{interview.interviewTime}</span>
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