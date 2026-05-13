import React, { useState } from 'react'

const InterviewScheduling = () => {
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
    interviewer: ''
  })
  const [success, setSuccess] = useState('')

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
      interviewer: ''
    })
    
    setTimeout(() => setSuccess(''), 3000)
  }

  const getModeIcon = (mode) => {
    return mode === 'online' ? '🎥' : '🏢'
  }

  return (
    <div className="space-y-6">
      {/* Schedule Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📅 Schedule New Interview</h2>
        
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name *</label>
              <input
                type="text"
                name="candidateName"
                value={form.candidateName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Email *</label>
              <input
                type="email"
                name="candidateEmail"
                value={form.candidateEmail}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="candidate@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Phone</label>
              <input
                type="tel"
                name="candidatePhone"
                value={form.candidatePhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Position *</label>
              <input
                type="text"
                name="jobPosition"
                value={form.jobPosition}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Frontend Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interview Date *</label>
              <input
                type="date"
                name="interviewDate"
                value={form.interviewDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interview Time *</label>
              <input
                type="time"
                name="interviewTime"
                value={form.interviewTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interview Mode</label>
              <select
                name="interviewMode"
                value={form.interviewMode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="online">Online (Video Call)</option>
                <option value="offline">Offline (In-Office)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interviewer Name</label>
              <input
                type="text"
                name="interviewer"
                value={form.interviewer}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Interviewer name"
              />
            </div>
          </div>

          {form.interviewMode === 'online' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
              <input
                type="url"
                name="meetingLink"
                value={form.meetingLink}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            📅 Schedule Interview
          </button>
        </form>
      </div>

      {/* Scheduled Interviews List */}
      {interviews.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Scheduled Interviews</h3>
          <div className="space-y-3">
            {interviews.map((interview) => (
              <div key={interview.id} className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <p className="font-semibold text-lg">{interview.candidateName}</p>
                    <p className="text-sm text-gray-600">{interview.candidateEmail}</p>
                    <p className="text-sm text-gray-600">{interview.jobPosition}</p>
                    <div className="flex gap-3 mt-2 text-sm text-gray-500">
                      <span>📅 {interview.interviewDate}</span>
                      <span>⏰ {interview.interviewTime}</span>
                      <span>{getModeIcon(interview.interviewMode)} {interview.interviewMode === 'online' ? 'Online' : 'Offline'}</span>
                    </div>
                    {interview.interviewer && (
                      <p className="text-sm text-gray-500 mt-1">👨‍💼 Interviewer: {interview.interviewer}</p>
                    )}
                    {interview.meetingLink && (
                      <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline mt-1 inline-block">
                        🔗 Join Meeting
                      </a>
                    )}
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {interview.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default InterviewScheduling