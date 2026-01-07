'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RequestProposalPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    teamSize: '',
    preferredMonth: '',
    budget: '',
    requirements: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Submitting proposal request:', formData);
      setFeedback('Thank you! Your proposal request has been submitted successfully. We will get back to you shortly.');
      setFormData({
        companyName: '',
        name: '',
        email: '',
        teamSize: '',
        preferredMonth: '',
        budget: '',
        requirements: '',
      });
    } catch (error) {
      setFeedback('Sorry, there was an error submitting your request. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 left-4">
            <Link href="/">
                <span className="text-gray-600 hover:text-gray-900 font-semibold">&larr; Back to Home</span>
            </Link>
        </div>
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Request a Custom Proposal</h1>
        <p className="text-center text-gray-600 mb-8">Fill out the form below and our team will get back to you with a customized proposal for your next corporate retreat.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="p-3 border rounded-lg" required />
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="p-3 border rounded-lg" required />
          </div>
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="number" name="teamSize" placeholder="Team Size" value={formData.teamSize} onChange={handleChange} className="p-3 border rounded-lg" required />
            <select name="preferredMonth" value={formData.preferredMonth} onChange={handleChange} className="p-3 border rounded-lg bg-white" required>
              <option value="" disabled>Preferred Month</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            <input type="text" name="budget" placeholder="Budget per Person (e.g., $500)" value={formData.budget} onChange={handleChange} className="p-3 border rounded-lg" />
          </div>
          <textarea name="requirements" placeholder="Specific requirements or questions..." value={formData.requirements} onChange={handleChange} rows={4} className="w-full p-3 border rounded-lg"></textarea>
          
          <button type="submit" disabled={submitting} className="w-full py-3 px-6 rounded-lg text-lg font-bold text-black hover:shadow-lg transition duration-200 disabled:bg-gray-400" style={{ background: '#D5AD36' }}>
            {submitting ? 'Submitting...' : 'Get Your Proposal'}
          </button>
        </form>

        {feedback && (
          <p className={`mt-6 text-center font-medium ${feedback.includes('Sorry') ? 'text-red-500' : 'text-green-600'}`}>
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
}