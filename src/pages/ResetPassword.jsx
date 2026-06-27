// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Lock, ArrowRight, AlertCircle, CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/reset-password", {
        token,
        password,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Password reset failed.");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-30 px-6">
        <div className="max-w-md w-full text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-6">
            This password reset link is invalid or has expired.
          </p>
          <Link
            to="/forgot-password"
            className="inline-block bg-[#96158F] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#7D1DC9] transition-colors"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-30 px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-[#96158F] rounded-full flex items-center justify-center">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-3">
            Enter your new password below.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Password Reset!</h2>
              <p className="text-gray-600 mb-6">
                Your password has been successfully reset.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Redirecting to login page...
              </p>
              <Link
                to="/login"
                className="inline-block bg-[#96158F] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#7D1DC9] transition-colors"
              >
                Sign In Now
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
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:border-[#96158F] focus:outline-none transition-colors"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:border-[#96158F] focus:outline-none transition-colors"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
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
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset Password
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

export default ResetPassword;