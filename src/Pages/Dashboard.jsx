import React, { useState, useEffect } from 'react'
import JobPosting from './JobPosting'
import CandidateTracking from './CandidateList'
import InterviewScheduling from './InterviewScheduler'
import { useLocation } from 'react-router-dom'
const Dashboard = () => {
  // const [activeTab, setActiveTab] = useState('jobposting')
  const location = useLocation()
const [activeTab, setActiveTab] = useState(() => {
  return (
    location.state?.activeTab ||
    localStorage.getItem('activeTab') ||
    'jobposting'
  )
})

useEffect(() => {
  localStorage.setItem('activeTab', activeTab)
}, [activeTab])
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('jobs') || '[]')
    setJobs(savedJobs)
  }, [])

  const addJob = (newJob) => {
    const updatedJobs = [newJob, ...jobs]
    setJobs(updatedJobs)
    localStorage.setItem('jobs', JSON.stringify(updatedJobs))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">🏢 LMV Group - HR Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage your recruitment process</p>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex gap-2 border-b bg-white rounded-t-lg">
          <button
          type="button"
            onClick={() => setActiveTab('jobposting')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'jobposting'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            📝 Job Posting
          </button>
          <button
          type="button"
            onClick={() => setActiveTab('candidatetracking')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'candidatetracking'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            👥 Candidate Tracking
          </button>
          <button
          type="button"
            onClick={() => setActiveTab('interviewscheduling')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'interviewscheduling'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            📅 Interview Scheduling
          </button>
          <button
          type="button"
            onClick={() => setActiveTab('myjobs')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'myjobs'
                ? 'border-b-2 border-blue-600 text-blue-600 bg-white'
                : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            📋 My Jobs ({jobs.length})
          </button>
        </div>

        {/* Tab Content - Only active tab content shows */}
        <div className="mt-6">
          {activeTab === 'jobposting' && (
            <JobPosting onJobPosted={addJob} />
          )}
          {activeTab === 'candidatetracking' && (
            <CandidateTracking jobs={jobs} />
          )}
          {activeTab === 'interviewscheduling' && (
            <InterviewScheduling />
          )}
          {activeTab === 'myjobs' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">📋 My Jobs</h2>
              {jobs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No jobs posted yet. Click "Job Posting" to create one.</p>
              ) : (
                <div className="space-y-3">
                  {jobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md">
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-gray-600 text-sm">{job.location || 'Location not specified'}</p>
                      <p className="text-gray-500 text-sm mt-1">{job.description?.substring(0, 100)}...</p>
                      <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {job.jobType}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard