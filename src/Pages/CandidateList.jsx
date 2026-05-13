import React, { useState } from 'react'

const CandidateTracking = ({ jobs }) => {
  const [selectedJob, setSelectedJob] = useState('')
  
  const [candidates] = useState([
    { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '+91 98765 43210', status: 'pending', appliedFor: 'Frontend Developer' },
    { id: 2, name: 'Priya Patel', email: 'priya.patel@example.com', phone: '+91 98765 43211', status: 'selected', appliedFor: 'Backend Developer' },
    { id: 3, name: 'Amit Kumar', email: 'amit.kumar@example.com', phone: '+91 98765 43212', status: 'rejected', appliedFor: 'Full Stack Developer' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha.reddy@example.com', phone: '+91 98765 43213', status: 'pending', appliedFor: 'UI/UX Designer' },
    { id: 5, name: 'Vikram Singh', email: 'vikram.singh@example.com', phone: '+91 98765 43214', status: 'selected', appliedFor: 'Frontend Developer' },
  ])

  const [candidateStatus, setCandidateStatus] = useState(candidates)

  const updateStatus = (id, newStatus) => {
    setCandidateStatus(candidateStatus.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ))
  }

  const getStatusColor = (status) => {
    if (status === 'selected') return 'bg-green-100 border-green-500'
    if (status === 'rejected') return 'bg-red-100 border-red-500'
    return 'bg-yellow-50 border-yellow-500'
  }

  const getStatusBadge = (status) => {
    if (status === 'selected') return 'bg-green-500 text-white'
    if (status === 'rejected') return 'bg-red-500 text-white'
    return 'bg-yellow-500 text-white'
  }

  const filteredCandidates = selectedJob 
    ? candidateStatus.filter(c => c.appliedFor === selectedJob)
    : candidateStatus

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">👥 Candidate Tracking</h2>
      
      {/* Filter Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Job</label>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white w-full md:w-64"
        >
          <option value="">All Jobs</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Full Stack Developer</option>
          <option>UI/UX Designer</option>
        </select>
      </div>

      {/* Candidates List */}
      {filteredCandidates.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No candidates found for this position.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`p-4 rounded-lg border-l-4 shadow-sm ${getStatusColor(candidate.status)}`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h4 className="font-semibold text-lg">{candidate.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(candidate.status)}`}>
                      {candidate.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{candidate.email}</p>
                  <p className="text-gray-600 text-sm">{candidate.phone}</p>
                  <p className="text-blue-600 text-sm mt-1">Applied for: {candidate.appliedFor}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(candidate.id, 'selected')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                  >
                    ✅ Select
                  </button>
                  <button
                    onClick={() => updateStatus(candidate.id, 'rejected')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
                  >
                    ❌ Reject
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    📄 Resume
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{candidateStatus.filter(c => c.status === 'selected').length}</p>
          <p className="text-sm text-gray-600">Selected</p>
        </div>
        <div className="p-3 bg-red-50 rounded-lg">
          <p className="text-2xl font-bold text-red-600">{candidateStatus.filter(c => c.status === 'rejected').length}</p>
          <p className="text-sm text-gray-600">Rejected</p>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg">
          <p className="text-2xl font-bold text-yellow-600">{candidateStatus.filter(c => c.status === 'pending').length}</p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
      </div>
    </div>
  )
}

export default CandidateTracking