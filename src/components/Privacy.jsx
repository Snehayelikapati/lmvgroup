// src/pages/Privacy.jsx
import React from 'react'

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-600 mb-8">Last updated: January 2024</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-gray-600">
            We collect information you provide directly to us, such as when you create an account, 
            post a job, apply for a position, or contact us. This may include your name, email address, 
            phone number, resume, and other relevant information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600">
            We use the information we collect to provide, maintain, and improve our services, 
            to process your applications, to communicate with you, and to comply with legal obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
          <p className="text-gray-600">
            We do not share your personal information with third parties except as necessary to provide 
            our services, comply with the law, or protect our rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational measures to protect your personal 
            information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
          <p className="text-gray-600">
            You have the right to access, correct, or delete your personal information. 
            You may also object to or restrict certain processing of your information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at privacy@lmvgroup.com.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Privacy