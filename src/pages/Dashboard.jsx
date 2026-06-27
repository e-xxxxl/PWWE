// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  PiggyBank,
  TrendingUp,
  GraduationCap,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  DollarSign,
  Clock,
  Award,
  ArrowUpRight,
  User,
  Mail,
  Phone,
  Shield,
  Star,
  Target,
  Activity,
  Plus,
  Send
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("pwwe_auth_token") || sessionStorage.getItem("pwwe_auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    savings: 0,
    groupMembers: 0,
    nextPayout: "N/A",
    trainingsCompleted: 0,
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.user);
      
      // Mock stats - replace with real API calls
      setStats({
        savings: 250000,
        groupMembers: 15,
        nextPayout: "March 15, 2026",
        trainingsCompleted: 3,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("pwwe_auth_token");
    localStorage.removeItem("pwwe_active_user");
    sessionStorage.removeItem("pwwe_auth_token");
    sessionStorage.removeItem("pwwe_active_user");
    navigate("/login");
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "savings", label: "My Savings", icon: PiggyBank },
    { id: "groups", label: "Cooperative Groups", icon: Users },
    { id: "trainings", label: "Skills Training", icon: GraduationCap },
    { id: "calendar", label: "Events", icon: Calendar },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#96158F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay - Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -300,
          opacity: sidebarOpen ? 1 : 0,
        }}
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:transform-none lg:opacity-100 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#96158F] to-[#6B21A8] rounded-xl flex items-center justify-center">
                  <Shield className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">PWWE</h2>
                  <p className="text-xs text-gray-500">Foundation</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === item.id
                    ? "bg-[#96158F] text-white shadow-lg shadow-[#96158F]/30"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#CC9838] to-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut size={18} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  Welcome back, {user?.name?.split(" ")[0] || "Member"}! 👋
                </h1>
                <p className="text-sm text-gray-500">
                  Here's what's happening with your cooperative
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                label: "Total Savings",
                value: `₦${stats.savings.toLocaleString()}`,
                icon: PiggyBank,
                color: "from-purple-500 to-[#96158F]",
                change: "+12.5%",
              },
              {
                label: "Group Members",
                value: stats.groupMembers,
                icon: Users,
                color: "from-blue-500 to-blue-600",
                change: "+2 this month",
              },
              {
                label: "Next Payout",
                value: stats.nextPayout,
                icon: Calendar,
                color: "from-[#CC9838] to-yellow-600",
                change: "In 18 days",
              },
              {
                label: "Trainings",
                value: stats.trainingsCompleted,
                icon: GraduationCap,
                color: "from-green-500 to-emerald-600",
                change: "2 in progress",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg font-medium">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                <button className="text-sm text-[#96158F] hover:underline font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { icon: PiggyBank, text: "Savings deposit of ₦50,000", time: "2 hours ago", color: "bg-purple-100 text-purple-600" },
                  { icon: Users, text: "Joined 'Women Entrepreneurs' group", time: "Yesterday", color: "bg-blue-100 text-blue-600" },
                  { icon: GraduationCap, text: "Completed 'Digital Marketing 101'", time: "3 days ago", color: "bg-green-100 text-green-600" },
                  { icon: Award, text: "Earned 'Consistent Saver' badge", time: "1 week ago", color: "bg-yellow-100 text-yellow-600" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className={`p-2.5 rounded-xl ${activity.color}`}>
                      <activity.icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { icon: Plus, text: "Make a Deposit", color: "bg-[#96158F] hover:bg-[#7D1DC9]" },
                  { icon: Users, text: "Join a Group", color: "bg-blue-600 hover:bg-blue-700" },
                  { icon: GraduationCap, text: "Start a Course", color: "bg-green-600 hover:bg-green-700" },
                  { icon: Send, text: "Invite a Friend", color: "bg-[#CC9838] hover:bg-yellow-700" },
                ].map((action, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center gap-3 text-white px-4 py-3.5 rounded-xl font-medium transition-all ${action.color} shadow-sm hover:shadow-md`}
                  >
                    <action.icon size={18} />
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Your Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <User className="text-[#96158F]" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="font-semibold text-gray-900">{user?.name || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900 truncate">{user?.email || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Phone className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-900">{user?.phone || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Award className="text-yellow-600" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Cooperative ID</p>
                  <p className="font-semibold text-gray-900">{user?.coopId || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;