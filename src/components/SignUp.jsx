import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    interest: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-30 px-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-[#96158F] rounded-full flex items-center justify-center">
              <User className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Join Our Movement</h1>
          <p className="text-gray-600 mt-3 text-lg">
            Create an account and become part of women transforming communities
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10">
          {isSubmitted ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Registration Successful!</h2>
              <p className="text-gray-600 mb-8">
                Welcome to PWWE Foundation. We've sent a confirmation email to <strong>{formData.email}</strong>.
              </p>
              <Link
                to="/"
                className="inline-block bg-[#96158F] text-white px-10 py-4 rounded-2xl font-semibold hover:bg-[#7D1DC9] transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:border-[#96158F] focus:outline-none transition-colors"
                  placeholder="Aisha Oluwafemi"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:border-[#96158F] focus:outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:border-[#96158F] focus:outline-none transition-colors"
                    placeholder="+234 903 146 3004"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I am interested in *</label>
                <select
                  name="interest"
                  required
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:border-[#96158F] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select an option</option>
                  <option value="cooperative">Joining the Cooperative Society</option>
                  <option value="skills">Skills Training & Vocational Programs</option>
                  <option value="business">Business Development & Mentorship</option>
                  <option value="volunteer">Volunteer / Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:border-[#96158F] focus:outline-none transition-colors"
                    placeholder="Create a password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:border-[#96158F] focus:outline-none transition-colors"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input type="checkbox" required className="mt-1 accent-[#96158F]" />
                <p className="text-sm text-gray-600">
                  I agree to the <span className="text-[#96158F] hover:underline cursor-pointer">Terms of Service</span> and{" "}
                  <span className="text-[#96158F] hover:underline cursor-pointer">Privacy Policy</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#96158F] hover:bg-[#7D1DC9] transition-all duration-300 text-white font-semibold py-5 rounded-2xl flex items-center justify-center gap-3 text-lg disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Create My Account"}
                {!loading && <ArrowRight size={20} />}
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-[#96158F] font-semibold hover:underline">
                  Log in here
                </Link>
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          © 2026 Power Within Women Empowerment Foundation
        </p>
      </div>
    </div>
  );
};

export default SignUp;