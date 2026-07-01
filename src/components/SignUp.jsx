import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";

// Configure API
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://pwwe-server-1.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

const SignUp = () => {
  const navigate = useNavigate();
  
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
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field error when user types
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
    
    // Clear general error
    if (error) setError("");
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.interest) {
      errors.interest = "Please select an interest";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        coopId: undefined, // Let backend auto-generate
        interest: formData.interest, // You'll need to add this field to your User model
      });

      const { user, token, message } = response.data;
      
      // Store auth data
      localStorage.setItem("pwwe_auth_token", token);
      localStorage.setItem("pwwe_active_user", JSON.stringify(user));
      
      setLoading(false);
      setIsSubmitted(true);
      
      // Auto-redirect after 3 seconds
      // setTimeout(() => {
      //   navigate("/verify-email");
      // }, 3000);
      
    } catch (error) {
      setLoading(false);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message;
        
        if (status === 409) {
          setFieldErrors({ email: "An account with this email already exists" });
        } else if (status === 400) {
          setError(message || "Please check your information and try again");
        } else {
          setError(message || "Registration failed. Please try again.");
        }
      } else if (error.code === 'ERR_NETWORK') {
        setError("Unable to connect to server. Please check your internet connection.");
      } else if (error.code === 'ECONNABORTED') {
        setError("Request timed out. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "w-full px-6 py-4 border rounded-2xl focus:outline-none transition-colors";
    if (fieldErrors[fieldName]) {
      return `${baseClass} border-red-300 focus:border-red-500 bg-red-50`;
    }
    return `${baseClass} border-gray-200 focus:border-[#96158F]`;
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
              <p className="text-gray-600 mb-4">
                Welcome to PWWE Foundation, <strong>{formData.fullName}</strong>!
              </p>
              <p className="text-gray-600 mb-8">
                We've sent a confirmation email to <strong>{formData.email}</strong>.
                Please verify your email to get started.
              </p>
              {/* <div className="flex gap-4 justify-center">
                <Link
                  to="/dashboard"
                  className="inline-block bg-[#96158F] text-white px-10 py-4 rounded-2xl font-semibold hover:bg-[#7D1DC9] transition-colors"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/"
                  className="inline-block bg-gray-100 text-gray-700 px-10 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Return Home
                </Link>
              </div> */}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
                  <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className={getInputClassName("fullName")}
                  placeholder="Aisha Oluwafemi"
                />
                {fieldErrors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={getInputClassName("email")}
                    placeholder="you@example.com"
                  />
                  {fieldErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={getInputClassName("phone")}
                    placeholder="+234 903 146 3004"
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
                  )}
                </div>
              </div>

              {/* Interest */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am interested in *
                </label>
                <select
                  name="interest"
                  required
                  value={formData.interest}
                  onChange={handleChange}
                  className={getInputClassName("interest")}
                >
                  <option value="">Select an option</option>
                  <option value="cooperative">Joining the Cooperative Society</option>
                  <option value="skills">Skills Training & Vocational Programs</option>
                  <option value="business">Business Development & Mentorship</option>
                  <option value="volunteer">Volunteer / Partnership</option>
                  <option value="other">Other</option>
                </select>
                {fieldErrors.interest && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.interest}</p>
                )}
              </div>

              {/* Password & Confirm Password */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={getInputClassName("password")}
                    placeholder="Create a password (min. 6 characters)"
                  />
                  {fieldErrors.password && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={getInputClassName("confirmPassword")}
                    placeholder="Confirm password"
                  />
                  {fieldErrors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input 
                  type="checkbox" 
                  required 
                  className="mt-1 accent-[#96158F] w-4 h-4" 
                />
                <p className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#96158F] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#96158F] hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#96158F] hover:bg-[#7D1DC9] transition-all duration-300 text-white font-semibold py-5 rounded-2xl flex items-center justify-center gap-3 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create My Account
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              {/* Login Link */}
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
          © {new Date().getFullYear()} Power Within Women Empowerment Foundation
        </p>
      </div>
    </div>
  );
};

export default SignUp;