
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LayoutDashboard, Users, PiggyBank, Calendar, Bell, Settings,
  LogOut, Menu, X, User, Mail, Phone, Shield, Plus, History,
  HandCoins, Lock, Smartphone, Pencil, Check, AlertTriangle,
  Clock, ChevronLeft, ChevronRight, RefreshCw,
} from "lucide-react";
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

// ── Design primitives ─────────────────────────────────────────────────────────

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-[#E4E4E4] p-5 sm:p-6 ${className}`}>
    {children}
  </div>
);

const Toast = ({ message }) =>
  message ? (
    <div className="fixed bottom-5 right-5 z-[60] bg-[#111111] text-white text-[13px] font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
      <Check size={14} strokeWidth={2.5} />
      {message}
    </div>
  ) : null;

const SectionLoader = () => (
  <div className="flex items-center justify-center py-16">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#E4E4E4] border-t-[#96158F]" />
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    cleared: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    approved: "bg-green-50 text-green-700 border-green-200",
    repaid: "bg-blue-50 text-blue-700 border-blue-200",
  };
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
        map[status] || "bg-[#F7F7F7] text-[#6B6B6B] border-[#E4E4E4]"
      }`}
    >
      {status}
    </span>
  );
};

// ── Approval banner shown to pending / rejected members ───────────────────────

const ApprovalBanner = ({ approvalStatus, rejectionReason }) => {
  if (approvalStatus === "approved") return null;
  const isPending = approvalStatus === "pending";
  return (
    <div
      className={`rounded-2xl border p-4 flex items-start gap-3 ${
        isPending
          ? "bg-amber-50 border-amber-200"
          : "bg-red-50 border-red-200"
      }`}
    >
      <AlertTriangle
        size={18}
        className={`flex-shrink-0 mt-0.5 ${isPending ? "text-amber-500" : "text-red-500"}`}
      />
      <div>
        <p className={`text-[14px] font-semibold ${isPending ? "text-amber-800" : "text-red-800"}`}>
          {isPending ? "Membership pending approval" : "Membership not approved"}
        </p>
        <p className={`text-[13px] mt-0.5 ${isPending ? "text-amber-700" : "text-red-700"}`}>
          {isPending
            ? "An admin will review your application shortly. Savings, contributions, and loans will be available once approved."
            : rejectionReason || "Your application was not approved. Contact support for details."}
        </p>
      </div>
    </div>
  );
};

// ── Pagination controls ───────────────────────────────────────────────────────

const Pagination = ({ page, pages, onPage }) => {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 pt-4 border-t border-[#EFEFEF] mt-4">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page <= 1}
        className="p-1.5 rounded-lg border border-[#E4E4E4] text-[#6B6B6B] hover:bg-[#F7F7F7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="text-[12px] text-[#6B6B6B] tabular-nums">
        {page} / {pages}
      </span>
      <button
        onClick={() => onPage(page + 1)}
        disabled={page >= pages}
        className="p-1.5 rounded-lg border border-[#E4E4E4] text-[#6B6B6B] hover:bg-[#F7F7F7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [toast, setToast] = useState("");

  // Section data
  const [savingsData, setSavingsData] = useState(null);
  const [savingsHistory, setSavingsHistory] = useState([]);
  const [savingsPagination, setSavingsPagination] = useState({ page: 1, pages: 1 });
  const [contributions, setContributions] = useState([]);
  const [contribPagination, setContribPagination] = useState({ page: 1, pages: 1 });
  const [loans, setLoans] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifPagination, setNotifPagination] = useState({ page: 1, pages: 1 });

  // Section loading states
  const [loadingSection, setLoadingSection] = useState({});

  // Forms
  const [depositOpen, setDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositMethod, setDepositMethod] = useState("bank_transfer");
  const [depositNote, setDepositNote] = useState("");
  const [depositSubmitting, setDepositSubmitting] = useState(false);

  const [loanForm, setLoanForm] = useState({ amount: "", purpose: "", termMonths: 3 });
  const [loanSubmitting, setLoanSubmitting] = useState(false);

  const [profileForm, setProfileForm] = useState({ name: "", email: "", phone: "" });

  const [settingsToggles, setSettingsToggles] = useState([
    { id: "email-notifications", icon: Mail, label: "Email notifications", description: "Deposit receipts and group updates", on: true },
    { id: "sms-alerts", icon: Smartphone, label: "SMS alerts", description: "Payout reminders by text", on: false },
    { id: "two-factor", icon: Lock, label: "Two-factor authentication", description: "Require a code at sign-in", on: false },
  ]);

  // ── Toast helper ───────────────────────────────────────────────────────────

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  // ── Auth / profile ─────────────────────────────────────────────────────────

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/auth/me");
      const u = data.user;
      setUser(u);
      setProfileForm({ name: u.name || "", email: u.email || "", phone: u.phone || "" });
    } catch {
      // 401 handled globally — redirected to login
    } finally {
      setPageLoading(false);
    }
  };

  // ── Section data loaders ──────────────────────────────────────────────────

  const setLoading = (key, val) =>
    setLoadingSection((prev) => ({ ...prev, [key]: val }));

  const fetchSavingsBalance = useCallback(async () => {
    setLoading("savings", true);
    try {
      const { data } = await api.get("/member/savings/balance");
      setSavingsData(data);
    } catch (err) {
      if (err.response?.status !== 403) showToast("Failed to load savings balance");
    } finally {
      setLoading("savings", false);
    }
  }, []);

  const fetchSavingsHistory = useCallback(async (page = 1) => {
    setLoading("savingsHistory", true);
    try {
      const { data } = await api.get(`/member/savings/history?page=${page}&limit=10`);
      setSavingsHistory(data.transactions || []);
      setSavingsPagination(data.pagination || { page: 1, pages: 1 });
    } catch (err) {
      if (err.response?.status !== 403) showToast("Failed to load savings history");
    } finally {
      setLoading("savingsHistory", false);
    }
  }, []);

  const fetchContributions = useCallback(async (page = 1) => {
    setLoading("contributions", true);
    try {
      const { data } = await api.get(`/member/contributions?page=${page}&limit=10`);
      setContributions(data.contributions || []);
      setContribPagination(data.pagination || { page: 1, pages: 1 });
    } catch (err) {
      if (err.response?.status !== 403) showToast("Failed to load contributions");
    } finally {
      setLoading("contributions", false);
    }
  }, []);

  const fetchLoans = useCallback(async () => {
    setLoading("loans", true);
    try {
      const { data } = await api.get("/member/loans");
      setLoans(data.loans || []);
    } catch (err) {
      if (err.response?.status !== 403) showToast("Failed to load loan applications");
    } finally {
      setLoading("loans", false);
    }
  }, []);

  const fetchNotifications = useCallback(async (page = 1) => {
    setLoading("notifications", true);
    try {
      const { data } = await api.get(`/member/notifications?page=${page}&limit=10`);
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
      setNotifPagination(data.pagination || { page: 1, pages: 1 });
    } catch {
      showToast("Failed to load notifications");
    } finally {
      setLoading("notifications", false);
    }
  }, []);

  // Load data when tab changes
  useEffect(() => {
    if (user?.approvalStatus !== "approved") return; // skip financial endpoints for unapproved
    if (activeTab === "savings-balance") {
      fetchSavingsBalance();
      fetchSavingsHistory();
    }
    if (activeTab === "contribution-history") fetchContributions();
    if (activeTab === "loan-application") fetchLoans();
  }, [activeTab, user]);

  // Always load notifications (available for all members)
  useEffect(() => {
    if (user) fetchNotifications();
  }, [user]);

  // ── Actions ────────────────────────────────────────────────────────────────

  const handleLogout = () => {
    ["pwwe_auth_token", "pwwe_active_user"].forEach((k) => {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k);
    });
    navigate("/login");
  };

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount.replace(/[^0-9.]/g, ""));
    if (!amount || amount <= 0) return showToast("Enter a valid amount");
    setDepositSubmitting(true);
    try {
      await api.post("/member/savings/deposit", {
        amount,
        method: depositMethod,
        note: depositNote || undefined,
      });
      showToast("Deposit submitted — awaiting confirmation");
      setDepositOpen(false);
      setDepositAmount("");
      setDepositNote("");
      fetchSavingsBalance();
      fetchSavingsHistory();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to submit deposit");
    } finally {
      setDepositSubmitting(false);
    }
  };

  const handleLoanSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(loanForm.amount.replace(/[^0-9.]/g, ""));
    if (!amount || amount <= 0) return showToast("Enter a valid amount");
    if (!loanForm.purpose.trim()) return showToast("Describe the purpose of the loan");
    setLoanSubmitting(true);
    try {
      await api.post("/member/loans", {
        amount,
        purpose: loanForm.purpose.trim(),
        termMonths: loanForm.termMonths,
      });
      showToast("Loan application submitted");
      setLoanForm({ amount: "", purpose: "", termMonths: 3 });
      fetchLoans();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to submit loan application");
    } finally {
      setLoanSubmitting(false);
    }
  };

  const handleMarkNotificationRead = async (id) => {
    try {
      await api.put(`/member/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((c) => Math.max(c - 1, 0));
    } catch {
      showToast("Could not update notification");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put("/member/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
      showToast("All notifications marked as read");
    } catch {
      showToast("Could not update notifications");
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    // Backend doesn't yet have a profile update endpoint
    showToast("Profile update coming soon");
  };

  const handleChangePassword = async () => {
    try {
      await api.post("/auth/forgot-password", { email: user.email });
      showToast("Password reset link sent to your email");
    } catch {
      showToast("Failed to send reset link");
    }
  };

  const handleToggleSetting = (id) =>
    setSettingsToggles((prev) =>
      prev.map((s) => (s.id === id ? { ...s, on: !s.on } : s))
    );

  // ── Navigation ─────────────────────────────────────────────────────────────

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "savings-balance", label: "Savings Balance", icon: PiggyBank },
    { id: "contribution-history", label: "Contributions", icon: History },
    { id: "loan-application", label: "Loan Application", icon: HandCoins },
    { id: "profile-management", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const fmtCurrency = (n) =>
    `₦${Number(n || 0).toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-NG", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#E4E4E4] border-t-[#96158F] mx-auto mb-4" />
          <p className="text-[#6B6B6B] text-[14px]">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  // ── Section renderers ──────────────────────────────────────────────────────

  const renderSection = () => {
    const approved = user?.approvalStatus === "approved";

    switch (activeTab) {
      // ── Overview ────────────────────────────────────────────────────────────
      case "overview":
        return (
          <div className="space-y-4">
            <ApprovalBanner
              approvalStatus={user?.approvalStatus}
              rejectionReason={user?.rejectionReason}
            />

            {/* Quick stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Savings balance",
                  value: approved ? fmtCurrency(savingsData?.balance) : "—",
                  icon: PiggyBank,
                  note: approved ? "Updated in real time" : "Available after approval",
                },
                {
                  label: "Membership status",
                  value: user?.approvalStatus || "—",
                  icon: Shield,
                  note: user?.coopId || "Coop ID pending",
                },
                {
                  label: "Loans",
                  value: approved ? loans.length : "—",
                  icon: HandCoins,
                  note: approved ? `${loans.filter((l) => l.status === "approved").length} approved` : "Available after approval",
                },
                {
                  label: "Notifications",
                  value: unreadCount,
                  icon: Bell,
                  note: "Unread messages",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl border border-[#E4E4E4] p-5"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#111111] text-[#111111]">
                      <stat.icon size={17} strokeWidth={1.75} />
                    </span>
                  </div>
                  <p className="font-semibold text-[22px] text-[#111111] leading-none mb-1 truncate">
                    {stat.value}
                  </p>
                  <p className="text-[12px] text-[#6B6B6B] mb-1.5">{stat.label}</p>
                  <p className="text-[11px] font-medium text-[#96158F]">{stat.note}</p>
                </div>
              ))}
            </div>

            {/* Recent notifications preview */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-[#111111]">Recent notifications</h3>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className="text-[12px] font-medium text-[#96158F] hover:text-[#111111] transition-colors"
                >
                  View all
                </button>
              </div>
              {notifications.length === 0 ? (
                <p className="text-[13px] text-[#6B6B6B] py-4 text-center">
                  No notifications yet.
                </p>
              ) : (
                <ul>
                  {notifications.slice(0, 4).map((n, i) => (
                    <li
                      key={n._id}
                      className={`flex items-start gap-3 py-3 ${
                        i !== Math.min(notifications.length - 1, 3) ? "border-b border-[#EFEFEF]" : ""
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${
                          n.read ? "bg-transparent" : "bg-[#96158F]"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] ${n.read ? "text-[#6B6B6B]" : "text-[#111111] font-medium"}`}>
                          {n.title}
                        </p>
                        <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                          {fmtDate(n.createdAt)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        );

      // ── Savings Balance ──────────────────────────────────────────────────────
      case "savings-balance":
        if (!approved) {
          return (
            <Card>
              <ApprovalBanner
                approvalStatus={user?.approvalStatus}
                rejectionReason={user?.rejectionReason}
              />
            </Card>
          );
        }
        return (
          <div className="space-y-4">
            {/* Balance hero */}
            <Card>
              <p className="text-[12px] text-[#6B6B6B] uppercase tracking-wide mb-2">
                Available balance
              </p>
              {loadingSection.savings ? (
                <div className="h-10 w-40 bg-[#F7F7F7] animate-pulse rounded-lg" />
              ) : (
                <p className="font-semibold text-[40px] text-[#111111] leading-none mb-1">
                  {fmtCurrency(savingsData?.balance)}
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#EFEFEF]">
                {[
                  { label: "Total deposits", value: fmtCurrency(savingsData?.totalDeposits) },
                  { label: "Total withdrawals", value: fmtCurrency(savingsData?.totalWithdrawals) },
                  {
                    label: "Last deposit",
                    value: savingsData?.lastDeposit
                      ? `${fmtCurrency(savingsData.lastDeposit.amount)} on ${fmtDate(savingsData.lastDeposit.date)}`
                      : "No deposits yet",
                  },
                ].map((row) => (
                  <div key={row.label}>
                    <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1">
                      {row.label}
                    </p>
                    <p className="font-semibold text-[15px] text-[#111111]">{row.value}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Transaction history */}
              <Card className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-[#111111]">Transaction history</h3>
                  <button
                    onClick={() => fetchSavingsHistory(1)}
                    className="text-[#6B6B6B] hover:text-[#111111] transition-colors"
                    aria-label="Refresh"
                  >
                    <RefreshCw size={15} />
                  </button>
                </div>
                {loadingSection.savingsHistory ? (
                  <SectionLoader />
                ) : savingsHistory.length === 0 ? (
                  <p className="text-[13px] text-[#6B6B6B] py-8 text-center">
                    No transactions yet. Make your first deposit to get started.
                  </p>
                ) : (
                  <>
                    <ul>
                      {savingsHistory.map((tx, i) => (
                        <li
                          key={tx._id}
                          className={`flex items-center gap-4 py-3.5 ${
                            i !== savingsHistory.length - 1 ? "border-b border-[#EFEFEF]" : ""
                          }`}
                        >
                          <span className="flex-shrink-0 w-8 h-8 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#96158F]">
                            <PiggyBank size={14} strokeWidth={1.75} />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] text-[#111111] capitalize">
                              {tx.type} via {tx.method.replace("_", " ")}
                            </p>
                            <p className="text-[11px] text-[#6B6B6B] tabular-nums">
                              {fmtDate(tx.createdAt)}
                            </p>
                          </div>
                          <StatusBadge status={tx.status} />
                          <span className="flex-shrink-0 text-[14px] font-semibold text-[#111111] tabular-nums">
                            {fmtCurrency(tx.amount)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Pagination
                      page={savingsPagination.page}
                      pages={savingsPagination.pages}
                      onPage={(p) => fetchSavingsHistory(p)}
                    />
                  </>
                )}
              </Card>

              {/* Deposit form */}
              <Card>
                <h3 className="font-semibold text-lg text-[#111111] mb-4">
                  Add to your savings
                </h3>
                {!depositOpen ? (
                  <>
                    <p className="text-[13px] text-[#6B6B6B] mb-5">
                      Deposits are confirmed by a treasurer before they clear to your balance.
                    </p>
                    <button
                      onClick={() => setDepositOpen(true)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[14px] font-medium bg-[#96158F] text-white hover:bg-[#7D1278] transition-colors"
                    >
                      <Plus size={16} strokeWidth={1.75} />
                      Make a deposit
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleDepositSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                        Amount (₦)
                      </label>
                      <input
                        type="text"
                        autoFocus
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E4E4E4] text-[14px] text-[#111111] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:border-[#96158F]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                        Payment method
                      </label>
                      <select
                        value={depositMethod}
                        onChange={(e) => setDepositMethod(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E4E4E4] text-[14px] text-[#111111] focus:outline-none focus:border-[#96158F]"
                      >
                        <option value="bank_transfer">Bank transfer</option>
                        <option value="cash">Cash</option>
                        <option value="card">Card</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                        Note (optional)
                      </label>
                      <input
                        type="text"
                        value={depositNote}
                        onChange={(e) => setDepositNote(e.target.value)}
                        placeholder="Reference number, etc."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E4E4E4] text-[14px] text-[#111111] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:border-[#96158F]"
                      />
                    </div>
                    <p className="text-[11px] text-amber-600 flex items-center gap-1.5">
                      <Clock size={12} />
                      Deposits are pending until a treasurer confirms them.
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={depositSubmitting}
                        className="flex-1 py-2.5 rounded-xl text-[14px] font-medium bg-[#96158F] text-white hover:bg-[#7D1278] disabled:opacity-70 transition-colors"
                      >
                        {depositSubmitting ? "Submitting…" : "Submit"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDepositOpen(false)}
                        className="px-4 py-2.5 rounded-xl text-[14px] font-medium border border-[#E4E4E4] text-[#111111] hover:bg-[#F7F7F7] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </Card>
            </div>
          </div>
        );

      // ── Contributions ───────────────────────────────────────────────────────
      case "contribution-history":
        if (!approved) {
          return (
            <Card>
              <ApprovalBanner
                approvalStatus={user?.approvalStatus}
                rejectionReason={user?.rejectionReason}
              />
            </Card>
          );
        }
        return (
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg text-[#111111]">
                Contribution history
              </h3>
              <button
                onClick={() => fetchContributions(1)}
                className="text-[#6B6B6B] hover:text-[#111111] transition-colors"
                aria-label="Refresh"
              >
                <RefreshCw size={15} />
              </button>
            </div>
            {loadingSection.contributions ? (
              <SectionLoader />
            ) : contributions.length === 0 ? (
              <p className="text-[13px] text-[#6B6B6B] py-8 text-center">
                No contributions recorded yet.
              </p>
            ) : (
              <>
                <ul>
                  {contributions.map((c, i) => (
                    <li
                      key={c._id}
                      className={`flex items-center gap-4 py-3.5 ${
                        i !== contributions.length - 1 ? "border-b border-[#EFEFEF]" : ""
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-[#111111]">
                          Monthly contribution via {c.method?.replace("_", " ")}
                        </p>
                        <p className="text-[11px] text-[#6B6B6B] tabular-nums">
                          {fmtDate(c.createdAt)}
                        </p>
                      </div>
                      <StatusBadge status={c.status} />
                      <span className="flex-shrink-0 text-[14px] font-semibold text-[#111111] tabular-nums">
                        {fmtCurrency(c.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
                <Pagination
                  page={contribPagination.page}
                  pages={contribPagination.pages}
                  onPage={(p) => fetchContributions(p)}
                />
              </>
            )}
          </Card>
        );

      // ── Loan Application ────────────────────────────────────────────────────
      case "loan-application":
        if (!approved) {
          return (
            <Card>
              <ApprovalBanner
                approvalStatus={user?.approvalStatus}
                rejectionReason={user?.rejectionReason}
              />
            </Card>
          );
        }
        return (
          <div className="space-y-4">
            {/* Existing loans */}
            {loans.length > 0 && (
              <Card>
                <h3 className="font-semibold text-lg text-[#111111] mb-4">
                  Your loan applications
                </h3>
                {loadingSection.loans ? (
                  <SectionLoader />
                ) : (
                  <ul>
                    {loans.map((loan, i) => (
                      <li
                        key={loan._id}
                        className={`py-3.5 ${
                          i !== loans.length - 1 ? "border-b border-[#EFEFEF]" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-[14px] font-medium text-[#111111]">
                              {fmtCurrency(loan.amount)}
                            </p>
                            <p className="text-[12px] text-[#6B6B6B] mt-0.5 truncate">
                              {loan.purpose}
                            </p>
                            <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                              {loan.termMonths} months · Applied {fmtDate(loan.createdAt)}
                            </p>
                            {loan.reviewNote && (
                              <p className="text-[12px] text-[#6B6B6B] mt-1 italic">
                                Note: {loan.reviewNote}
                              </p>
                            )}
                          </div>
                          <StatusBadge status={loan.status} />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            )}

            {/* New application */}
            <Card>
              <h3 className="font-semibold text-lg text-[#111111] mb-5">
                Apply for a loan
              </h3>
              <form onSubmit={handleLoanSubmit} className="space-y-5">
                <div>
                  <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                    Amount requested (₦)
                  </label>
                  <input
                    type="text"
                    value={loanForm.amount}
                    onChange={(e) => setLoanForm((f) => ({ ...f, amount: e.target.value }))}
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4E4E4] text-[14px] text-[#111111] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:border-[#96158F]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                    Purpose
                  </label>
                  <textarea
                    rows={3}
                    value={loanForm.purpose}
                    onChange={(e) => setLoanForm((f) => ({ ...f, purpose: e.target.value }))}
                    placeholder="What will you use this loan for?"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4E4E4] text-[14px] text-[#111111] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:border-[#96158F] resize-none"
                  />
                </div>
                <div>
                  <p className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                    Repayment period
                  </p>
                  <div className="flex gap-2">
                    {[3, 6, 12].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setLoanForm((f) => ({ ...f, termMonths: m }))}
                        className={`text-[13px] font-medium px-4 py-2 rounded-full border transition-colors ${
                          loanForm.termMonths === m
                            ? "bg-[#96158F] text-white border-[#96158F]"
                            : "border-[#E4E4E4] text-[#6B6B6B] hover:bg-[#F7F7F7]"
                        }`}
                      >
                        {m} months
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-[#6B6B6B]">
                  Requires 3+ cleared monthly contributions to be eligible.
                </p>
                <button
                  type="submit"
                  disabled={loanSubmitting}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-medium bg-[#96158F] text-white hover:bg-[#7D1278] disabled:opacity-70 transition-colors"
                >
                  {loanSubmitting ? "Submitting…" : "Submit application"}
                </button>
              </form>
            </Card>
          </div>
        );

      // ── Profile ─────────────────────────────────────────────────────────────
      case "profile-management":
        return (
          <Card>
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#EFEFEF]">
              <div className="w-16 h-16 rounded-full border border-[#111111] flex items-center justify-center text-[#111111] font-semibold text-xl flex-shrink-0">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-semibold text-lg text-[#111111]">{user?.name}</p>
                <p className="text-[12px] text-[#6B6B6B] mt-0.5">{user?.coopId || "No coop ID"}</p>
              </div>
            </div>
            <form onSubmit={handleProfileSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: "name", label: "Full name", type: "text", key: "name", autoComplete: "name" },
                  { id: "email", label: "Email", type: "email", key: "email", autoComplete: "email" },
                  { id: "phone", label: "Phone", type: "tel", key: "phone", autoComplete: "tel" },
                ].map((f) => (
                  <div key={f.id}>
                    <label
                      htmlFor={`profile-${f.id}`}
                      className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5"
                    >
                      {f.label}
                    </label>
                    <input
                      id={`profile-${f.id}`}
                      type={f.type}
                      value={profileForm[f.key]}
                      onChange={(e) =>
                        setProfileForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                      }
                      autoComplete={f.autoComplete}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E4E4E4] text-[14px] text-[#111111] focus:outline-none focus:border-[#96158F]"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                    Cooperative ID
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.coopId || ""}
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E4E4E4] text-[14px] text-[#6B6B6B] bg-[#F7F7F7] cursor-not-allowed"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-5 py-3 rounded-xl text-[14px] font-medium bg-[#96158F] text-white hover:bg-[#7D1278] transition-colors"
              >
                Save changes
              </button>
            </form>
          </Card>
        );

      // ── Notifications ────────────────────────────────────────────────────────
      case "notifications":
        return (
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg text-[#111111]">Notifications</h3>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[12px] font-medium text-[#96158F] hover:text-[#111111] transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
                <button
                  onClick={() => fetchNotifications(1)}
                  className="text-[#6B6B6B] hover:text-[#111111] transition-colors"
                  aria-label="Refresh"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>
            {loadingSection.notifications ? (
              <SectionLoader />
            ) : notifications.length === 0 ? (
              <p className="text-[13px] text-[#6B6B6B] py-8 text-center">
                No notifications yet.
              </p>
            ) : (
              <>
                <ul>
                  {notifications.map((n, i) => (
                    <li key={n._id}>
                      <button
                        onClick={() => !n.read && handleMarkNotificationRead(n._id)}
                        className={`w-full text-left flex items-start gap-4 py-3.5 ${
                          i !== notifications.length - 1 ? "border-b border-[#EFEFEF]" : ""
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${
                            n.read ? "bg-transparent" : "bg-[#96158F]"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-[13px] ${
                              n.read ? "text-[#6B6B6B]" : "text-[#111111] font-medium"
                            }`}
                          >
                            {n.title}
                          </p>
                          <p className="text-[12px] text-[#6B6B6B] mt-0.5">{n.message}</p>
                          <p className="text-[11px] text-[#6B6B6B] mt-1">
                            {fmtDate(n.createdAt)}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
                <Pagination
                  page={notifPagination.page}
                  pages={notifPagination.pages}
                  onPage={(p) => fetchNotifications(p)}
                />
              </>
            )}
          </Card>
        );

      // ── Settings ────────────────────────────────────────────────────────────
      case "settings":
        return (
          <div className="space-y-4">
            <Card>
              <h3 className="font-semibold text-lg text-[#111111] mb-5">Preferences</h3>
              <ul>
                {settingsToggles.map((s, i) => (
                  <li
                    key={s.id}
                    className={`flex items-center gap-4 py-4 ${
                      i !== settingsToggles.length - 1 ? "border-b border-[#EFEFEF]" : ""
                    }`}
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-full border border-[#E4E4E4] flex items-center justify-center text-[#111111]">
                      <s.icon size={15} strokeWidth={1.75} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-[#111111]">{s.label}</p>
                      <p className="text-[12px] text-[#6B6B6B]">{s.description}</p>
                    </div>
                    <button
                      onClick={() => handleToggleSetting(s.id)}
                      aria-pressed={s.on}
                      className={`relative flex-shrink-0 w-10 h-6 rounded-full transition-colors ${
                        s.on ? "bg-[#96158F]" : "bg-[#E4E4E4]"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                          s.on ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="font-semibold text-lg text-[#111111] mb-5">Account</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleChangePassword}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-medium border border-[#E4E4E4] text-[#111111] hover:bg-[#F7F7F7] transition-colors"
                >
                  <Lock size={15} strokeWidth={1.75} />
                  Change password
                </button>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex font-sans">
      <Toast message={toast} />

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111111] flex-shrink-0 transform transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Brand */}
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#96158F] rounded-full flex items-center justify-center">
                  <Shield className="text-white" size={16} />
                </div>
                <div>
                  <h2 className="font-semibold text-[15px] text-white leading-none">PWWE</h2>
                  <p className="text-[10px] text-white/50 tracking-wide uppercase mt-0.5">
                    Foundation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white/60 hover:text-white"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {menuItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`relative w-full flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-lg text-left transition-colors ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/55 hover:bg-white/5 hover:text-white/85"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#96158F]" />
                  )}
                  <item.icon size={16} strokeWidth={1.75} />
                  <span className="text-[13px] font-medium">{item.label}</span>
                  {item.id === "notifications" && unreadCount > 0 && (
                    <span className="ml-auto text-[10px] font-semibold bg-[#96158F] text-white rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3 px-1">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-white truncate">{user?.name}</p>
                <p className="text-[11px] text-white/45 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-[#E4E4E4] sticky top-0 z-30">
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-[#111111]"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
              <div className="min-w-0">
                <h1 className="font-semibold text-xl text-[#111111] leading-tight truncate">
                  {menuItems.find((m) => m.id === activeTab)?.label || "Dashboard"}
                </h1>
                <p className="text-[12px] text-[#6B6B6B] mt-0.5">
                  {activeTab === "overview"
                    ? `Welcome back, ${user?.name?.split(" ")[0] || "Member"}`
                    : "Member portal"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("notifications")}
                className="relative p-2 text-[#6B6B6B] hover:text-[#111111] hover:bg-[#F7F7F7] rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-[6px] h-[6px] bg-[#96158F] rounded-full" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 sm:px-6 py-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">{renderSection()}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;