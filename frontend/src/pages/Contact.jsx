import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHome, FaProjectDiagram, FaUser } from 'react-icons/fa';
import api from '../lib/api';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  service: 'Web App Development',
  budget: '',
  timeline: '',
  message: '',
};

const Contact = () => {
  const [loaded, setLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setSubmitted(false);
    setSubmitting(true);
    try {
      await api.post('/contact/', formData);
      setSubmitted(true);
      setFormData(initialForm);
    } catch (error) {
      const detail =
        error?.response?.data?.detail ||
        'Unable to submit your message right now. Please try again later.';
      setSubmitError(detail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#31194D] pt-24 pb-16 px-4 relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-10 w-72 h-72 rounded-full bg-[#FFD700]/10 blur-3xl animate-pulse [animation-duration:5s]"></div>
        <div className="absolute bottom-6 right-8 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl animate-pulse [animation-duration:7s]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <header
          className={`text-center mb-10 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact <span className="text-[#FFD700]">Me</span>
          </h1>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-5"></div>
          <p className="text-[#E0E0E0] max-w-2xl mx-auto">
            Share your project details and I will get back to you with a clear plan, timeline, and next steps.
          </p>
        </header>

        <section className="grid lg:grid-cols-3 gap-6">
          <aside
            className={`lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '120ms' }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Quick Navigation</h2>
            <p className="text-gray-400 text-sm mb-5">Move between your core pages quickly.</p>

            <div className="space-y-3">
              <Link
                to="/"
                className="group flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#FFD700]/40 hover:bg-white/10 transition-all duration-300"
              >
                <span className="inline-flex items-center gap-3 text-[#E0E0E0] group-hover:text-white">
                  <FaHome className="text-[#FFD700]" />
                  Home
                </span>
                <FaArrowRight className="text-[#FFD700] group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                to="/about"
                className="group flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#FFD700]/40 hover:bg-white/10 transition-all duration-300"
              >
                <span className="inline-flex items-center gap-3 text-[#E0E0E0] group-hover:text-white">
                  <FaUser className="text-[#FFD700]" />
                  About Me
                </span>
                <FaArrowRight className="text-[#FFD700] group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                to="/projects"
                className="group flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#FFD700]/40 hover:bg-white/10 transition-all duration-300"
              >
                <span className="inline-flex items-center gap-3 text-[#E0E0E0] group-hover:text-white">
                  <FaProjectDiagram className="text-[#FFD700]" />
                  Projects
                </span>
                <FaArrowRight className="text-[#FFD700] group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </aside>

          <div
            className={`lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Project Inquiry Form</h2>

            {submitted && (
              <div className="mb-6 px-4 py-3 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#E0E0E0]">
                Message received. I will contact you soon.
              </div>
            )}
            {submitError && (
              <div className="mb-6 px-4 py-3 rounded-lg bg-amber-400/10 border border-amber-400/40 text-[#E0E0E0]">
                {submitError}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm text-[#E0E0E0] mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={onInputChange}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700]/60 transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-[#E0E0E0] mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onInputChange}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700]/60 transition-all"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm text-[#E0E0E0] mb-1.5">
                    Phone (Optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={onInputChange}
                    className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700]/60 transition-all"
                    placeholder="+1 ..."
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm text-[#E0E0E0] mb-1.5">
                    Budget Range
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    value={formData.budget}
                    onChange={onInputChange}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700]/60 transition-all"
                    placeholder="$2k - $5k"
                  />
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm text-[#E0E0E0] mb-1.5">
                    Timeline
                  </label>
                  <input
                    id="timeline"
                    name="timeline"
                    type="text"
                    value={formData.timeline}
                    onChange={onInputChange}
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700]/60 transition-all"
                    placeholder="4-8 weeks"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm text-[#E0E0E0] mb-1.5">
                  Needed Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={onInputChange}
                  className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700]/60 transition-all"
                >
                  <option className="bg-[#31194D]">Web App Development</option>
                  <option className="bg-[#31194D]">Mobile App Development</option>
                  <option className="bg-[#31194D]">AI Automation Solution</option>
                  <option className="bg-[#31194D]">Full Product Build</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-[#E0E0E0] mb-1.5">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={onInputChange}
                  required
                  rows={6}
                  className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/60 focus:border-[#FFD700]/60 transition-all resize-none"
                  placeholder="Tell me what you want to build, key features, and your goals."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#FFD700] text-[#31194D] font-semibold rounded-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-[#FFD700]/20"
              >
                {submitting ? 'Sending...' : 'Send Message'} <FaArrowRight />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
