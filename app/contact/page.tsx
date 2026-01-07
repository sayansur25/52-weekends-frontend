'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log({ name, email, message });
      setFeedback('Thank you for your message! We will get back to you shortly.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setFeedback('Sorry, something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#010079' }}>
              📞 Get in Touch
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Have questions or want to plan your next corporate retreat? We'd love to hear from you.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto py-3 px-8 rounded-lg font-bold text-white transition-all hover:shadow-lg text-center min-h-[44px] flex items-center justify-center disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #010079 0%, #069494 100%)' }}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
            {feedback && (
              <p className={`mt-6 text-center font-medium ${feedback.includes('Sorry') ? 'text-red-600' : 'text-green-600'}`}>
                {feedback}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}