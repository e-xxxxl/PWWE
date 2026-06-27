// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/forgot-password", {
        email: email.toLowerCase().trim()
      });

      setSent(true);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Failed to send reset link.");
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-30 px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-[#96158F] rounded-full flex items-center justify-center">
              <Mail className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-600 mt-3">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Email Sent!</h2>
              <p className="text-gray-600 mb-6">
                If an account exists for <strong>{email}</strong>, you'll receive a password reset link shortly.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Check your spam folder if you don't see it within a few minutes.
              </p>
              <Link
                to="/login"
                className="inline-block bg-[#96158F] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#7D1DC9] transition-colors"
              >
                Back to Sign In
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:border-[#96158F] focus:outline-none transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#96158F] hover:bg-[#7D1DC9] transition-all duration-300 text-white font-semibold py-5 rounded-2xl flex items-center justify-center gap-3 text-lg disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-[#96158F] transition-colors"
                >
                  ← Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;