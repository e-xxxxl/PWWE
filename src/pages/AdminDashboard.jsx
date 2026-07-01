import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LayoutDashboard, Users, PiggyBank, HandCoins, BarChart2,
  Bell, LogOut, Menu, X, Shield, Check, AlertTriangle, ChevronLeft,
  ChevronRight, Search, RefreshCw, ChevronDown, Trash2, UserCheck,
  UserX, ShieldCheck, Plus, Clock,
} from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// In your AdminDashboard.jsx, update axios config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
// Add token to every request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("admin_token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);
// ── Design primitives ─────────────────────────────────────────────────────────

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-[#E4E4E4] p-5 sm:p-6 ${className}`}>
    {children}
  </div>
);

const Toast = ({ message, type = "success" }) =>
  message ? (
    <div
      className={`fixed bottom-5 right-5 z-[60] text-white text-[13px] font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 ${
        type === "error" ? "bg-red-600" : "bg-[#111111]"
      }`}
    >
      {type === "error" ? (
        <AlertTriangle size={14} strokeWidth={2.5} />
      ) : (
        <Check size={14} strokeWidth={2.5} />
      )}
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
    approved: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    repaid: "bg-blue-50 text-blue-700 border-blue-200",
    active: "bg-green-50 text-green-700 border-green-200",
    inactive: "bg-[#F7F7F7] text-[#6B6B6B] border-[#E4E4E4]",
  };
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
        map[status] || "bg-[#F7F7F7] text-[#6B6B6B] border-[#E4E4E4]"
      }`}
    >
      {status}
    </span>
  );
};

const Pagination = ({ page, pages, onPage }) => {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 pt-4 border-t border-[#EFEFEF] mt-4">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page <= 1}
        className="p-1.5 rounded-lg border border-[#E4E4E4] text-[#6B6B6B] hover:bg-[#F7F7F7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={15} />
      </button>
      <span className="text-[12px] text-[#6B6B6B] tabular-nums">
        {page} / {pages}
      </span>
      <button
        onClick={() => onPage(page + 1)}
        disabled={page >= pages}
        className="p-1.5 rounded-lg border border-[#E4E4E4] text-[#6B6B6B] hover:bg-[#F7F7F7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
};

// Confirmation modal
const ConfirmModal = ({ open, title, message, confirmLabel = "Confirm", danger = false, onConfirm, onCancel, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-black/40" onClick={onCancel} aria-label="Close" />
      <div className="relative bg-white rounded-2xl border border-[#E4E4E4] shadow-xl p-6 w-full max-w-sm">
        <h3 className="font-semibold text-[16px] text-[#111111] mb-2">{title}</h3>
        <p className="text-[13px] text-[#6B6B6B] mb-4">{message}</p>
        {children}
        <div className="flex gap-2 mt-5">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-[14px] font-medium border border-[#E4E4E4] text-[#111111] hover:bg-[#F7F7F7] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-[14px] font-medium text-white transition-colors ${
              danger ? "bg-red-600 hover:bg-red-700" : "bg-[#96158F] hover:bg-[#7D1278]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

// Input
const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-4 py-2.5 border border-[#E4E4E4] rounded-xl text-[14px] text-[#111111] placeholder:text-[#6B6B6B]/60 focus:outline-none focus:border-[#96158F] transition-colors bg-white ${className}`}
    {...props}
  />
);

const Select = ({ className = "", children, ...props }) => (
  <select
    className={`px-3 py-2.5 border border-[#E4E4E4] rounded-xl text-[13px] text-[#111111] focus:outline-none focus:border-[#96158F] transition-colors bg-white ${className}`}
    {...props}
  >
    {children}
  </select>
);

// ── Main component ────────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [adminUser, setAdminUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "success" });

  // ── Per-section state ──────────────────────────────────────────────────────

  // Overview
  const [stats, setStats] = useState(null);
  const [report, setReport] = useState(null);

  // Pending members
  const [pendingMembers, setPendingMembers] = useState([]);
  const [pendingPagination, setPendingPagination] = useState({ page: 1, pages: 1 });
  const [pendingLoading, setPendingLoading] = useState(false);

  // Users
  const [users, setUsers] = useState([]);
  const [usersPagination, setUsersPagination] = useState({ page: 1, pages: 1 });
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState("");

  // Transactions
  const [transactions, setTransactions] = useState([]);
  const [txPagination, setTxPagination] = useState({ page: 1, pages: 1 });
  const [txLoading, setTxLoading] = useState(false);
  const [txStatusFilter, setTxStatusFilter] = useState("");
  const [txCategoryFilter, setTxCategoryFilter] = useState("");
  const [createTxOpen, setCreateTxOpen] = useState(false);
  const [createTxForm, setCreateTxForm] = useState({ userId: "", amount: "", category: "savings", type: "deposit", method: "cash", note: "", status: "pending" });
  const [createTxSubmitting, setCreateTxSubmitting] = useState(false);

  // Loans
  const [loansList, setLoansList] = useState([]);
  const [loansPagination, setLoansPagination] = useState({ page: 1, pages: 1 });
  const [loansLoading, setLoansLoading] = useState(false);
  const [loansStatusFilter, setLoansStatusFilter] = useState("");

  // Modals
  const [rejectModal, setRejectModal] = useState(null); // { type: 'member'|'transaction'|'loan', id, label }
  const [rejectReason, setRejectReason] = useState("");
  const [approveNoteModal, setApproveNoteModal] = useState(null); // { type: 'loan', id }
  const [approveNote, setApproveNote] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [roleModal, setRoleModal] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 2800);
  };

  const isSuperAdmin = adminUser?.role === "super-admin";

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

  // ── Auth ───────────────────────────────────────────────────────────────────

// Replace the existing auth useEffect with this:
// Replace your existing auth check useEffect with this:
useEffect(() => {
  const checkAuth = async () => {
    try {
      const token = sessionStorage.getItem("admin_token");
      
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await api.get("/admin/auth/me");

      if (response.data.success) {
        setAdminUser({
          name: response.data.admin.name,
          email: response.data.admin.email,
          role: response.data.admin.role
        });
      } else {
        sessionStorage.clear();
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      sessionStorage.clear();
      navigate("/admin/login");
    } finally {
      setPageLoading(false);
    }
  };

  checkAuth();
}, [navigate]);
  const handleLogout = () => {
    ["pwwe_auth_token", "pwwe_active_user"].forEach((k) => {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k);
    });
    navigate("/login");
  };

  // ── Data loaders ───────────────────────────────────────────────────────────

  const fetchStats = useCallback(async () => {
    try {
      const [s, r] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/reports/summary"),
      ]);
      setStats(s.data.stats);
      setReport(r.data.report);
    } catch {
      showToast("Failed to load stats", "error");
    }
  }, []);

  const fetchPendingMembers = useCallback(async (page = 1) => {
    setPendingLoading(true);
    try {
      const { data } = await api.get(`/admin/members/pending?page=${page}&limit=10`);
      setPendingMembers(data.users || []);
      setPendingPagination(data.pagination || { page: 1, pages: 1 });
    } catch {
      showToast("Failed to load pending members", "error");
    } finally {
      setPendingLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(
    async (page = 1) => {
      setUsersLoading(true);
      try {
        const params = new URLSearchParams({ page, limit: 10 });
        if (userSearch) params.set("search", userSearch);
        if (userRoleFilter) params.set("role", userRoleFilter);
        if (userStatusFilter !== "") params.set("isActive", userStatusFilter);
        const { data } = await api.get(`/admin/users?${params}`);
        setUsers(data.users || []);
        setUsersPagination(data.pagination || { page: 1, pages: 1 });
      } catch {
        showToast("Failed to load users", "error");
      } finally {
        setUsersLoading(false);
      }
    },
    [userSearch, userRoleFilter, userStatusFilter]
  );

  const fetchTransactions = useCallback(
    async (page = 1) => {
      setTxLoading(true);
      try {
        const params = new URLSearchParams({ page, limit: 10 });
        if (txStatusFilter) params.set("status", txStatusFilter);
        if (txCategoryFilter) params.set("category", txCategoryFilter);
        const { data } = await api.get(`/admin/transactions?${params}`);
        setTransactions(data.transactions || []);
        setTxPagination(data.pagination || { page: 1, pages: 1 });
      } catch {
        showToast("Failed to load transactions", "error");
      } finally {
        setTxLoading(false);
      }
    },
    [txStatusFilter, txCategoryFilter]
  );

  const fetchLoans = useCallback(
    async (page = 1) => {
      setLoansLoading(true);
      try {
        const params = new URLSearchParams({ page, limit: 10 });
        if (loansStatusFilter) params.set("status", loansStatusFilter);
        const { data } = await api.get(`/admin/loans?${params}`);
        setLoansList(data.loans || []);
        setLoansPagination(data.pagination || { page: 1, pages: 1 });
      } catch {
        showToast("Failed to load loans", "error");
      } finally {
        setLoansLoading(false);
      }
    },
    [loansStatusFilter]
  );

  // Load section data when tab changes
  useEffect(() => {
    if (!adminUser) return;
    if (activeTab === "overview") fetchStats();
    if (activeTab === "pending-members") fetchPendingMembers();
    if (activeTab === "users") fetchUsers();
    if (activeTab === "transactions") fetchTransactions();
    if (activeTab === "loans") fetchLoans();
  }, [activeTab, adminUser]);

  // Re-fetch users when filters change
  useEffect(() => {
    if (activeTab === "users" && adminUser) {
      const t = setTimeout(() => fetchUsers(1), 350);
      return () => clearTimeout(t);
    }
  }, [userSearch, userRoleFilter, userStatusFilter]);

  useEffect(() => {
    if (activeTab === "transactions" && adminUser) fetchTransactions(1);
  }, [txStatusFilter, txCategoryFilter]);

  useEffect(() => {
    if (activeTab === "loans" && adminUser) fetchLoans(1);
  }, [loansStatusFilter]);

  // ── Member actions ─────────────────────────────────────────────────────────

  const handleApproveMember = async (id) => {
    setActionLoading(true);
    try {
      await api.put(`/admin/members/${id}/approve`);
      showToast("Member approved");
      fetchPendingMembers(pendingPagination.page);
      fetchStats();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to approve", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectMember = async () => {
    if (!rejectModal) return;
    setActionLoading(true);
    try {
      await api.put(`/admin/members/${rejectModal.id}/reject`, {
        reason: rejectReason || undefined,
      });
      showToast("Member rejected");
      setRejectModal(null);
      setRejectReason("");
      fetchPendingMembers(pendingPagination.page);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to reject", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // ── User management ────────────────────────────────────────────────────────

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await api.put(`/admin/users/${id}/status`, { isActive: !currentStatus });
      showToast(currentStatus ? "Account deactivated" : "Account activated");
      fetchUsers(usersPagination.page);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to update status", "error");
    }
  };

  const handleUpdateRole = async () => {
    if (!roleModal || !newRole) return;
    setActionLoading(true);
    try {
      await api.put(`/admin/users/${roleModal.id}/role`, { role: newRole });
      showToast("Role updated");
      setRoleModal(null);
      setNewRole("");
      fetchUsers(usersPagination.page);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to update role", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteModal) return;
    setActionLoading(true);
    try {
      await api.delete(`/admin/users/${deleteModal.id}`);
      showToast("User deleted");
      setDeleteModal(null);
      fetchUsers(usersPagination.page);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to delete user", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // ── Transaction actions ────────────────────────────────────────────────────

  const handleCreateTransaction = async (e) => {
    e.preventDefault();
    const amount = parseFloat(createTxForm.amount);
    if (!createTxForm.userId || !amount || amount <= 0) {
      return showToast("Member and valid amount are required", "error");
    }
    setCreateTxSubmitting(true);
    try {
      await api.post("/admin/transactions", {
        userId: createTxForm.userId,
        amount,
        category: createTxForm.category,
        type: createTxForm.type,
        method: createTxForm.method,
        note: createTxForm.note || undefined,
        status: createTxForm.status,
      });
      showToast("Transaction recorded");
      setCreateTxOpen(false);
      setCreateTxForm({ userId: "", amount: "", category: "savings", type: "deposit", method: "cash", note: "", status: "pending" });
      fetchTransactions(1);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to record transaction", "error");
    } finally {
      setCreateTxSubmitting(false);
    }
  };

  const handleClearTransaction = async (id) => {
    try {
      await api.put(`/admin/transactions/${id}/clear`);
      showToast("Transaction cleared");
      fetchTransactions(txPagination.page);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to clear transaction", "error");
    }
  };

  const handleRejectTransaction = async () => {
    if (!rejectModal) return;
    setActionLoading(true);
    try {
      await api.put(`/admin/transactions/${rejectModal.id}/reject`, {
        reason: rejectReason || undefined,
      });
      showToast("Transaction rejected");
      setRejectModal(null);
      setRejectReason("");
      fetchTransactions(txPagination.page);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to reject", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // ── Loan actions ───────────────────────────────────────────────────────────

  const handleApproveLoan = async () => {
    if (!approveNoteModal) return;
    setActionLoading(true);
    try {
      await api.put(`/admin/loans/${approveNoteModal.id}/approve`, {
        note: approveNote || undefined,
      });
      showToast("Loan approved");
      setApproveNoteModal(null);
      setApproveNote("");
      fetchLoans(loansPagination.page);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to approve loan", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectLoan = async () => {
    if (!rejectModal) return;
    setActionLoading(true);
    try {
      await api.put(`/admin/loans/${rejectModal.id}/reject`, {
        note: rejectReason || undefined,
      });
      showToast("Loan rejected");
      setRejectModal(null);
      setRejectReason("");
      fetchLoans(loansPagination.page);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to reject loan", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // Combined reject handler
  const handleRejectConfirm = () => {
    if (!rejectModal) return;
    if (rejectModal.type === "member") return handleRejectMember();
    if (rejectModal.type === "transaction") return handleRejectTransaction();
    if (rejectModal.type === "loan") return handleRejectLoan();
  };

  // ── Navigation ─────────────────────────────────────────────────────────────

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "pending-members", label: "Pending Members", icon: Clock },
    { id: "users", label: "All Members", icon: Users },
    { id: "transactions", label: "Transactions", icon: PiggyBank },
    { id: "loans", label: "Loans", icon: HandCoins },
    { id: "reports", label: "Reports", icon: BarChart2 },
  ];

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#E4E4E4] border-t-[#96158F] mx-auto mb-4" />
          <p className="text-[#6B6B6B] text-[14px]">Loading admin panel…</p>
        </div>
      </div>
    );
  }

  // ── Section renderers ──────────────────────────────────────────────────────

  const renderSection = () => {
    switch (activeTab) {

      // ── Overview ────────────────────────────────────────────────────────────
      case "overview":
        return (
          <div className="space-y-4">
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total members", value: stats?.totalUsers ?? "—", icon: Users },
                { label: "Verified", value: stats?.verifiedUsers ?? "—", icon: ShieldCheck },
                { label: "Active", value: stats?.activeUsers ?? "—", icon: UserCheck },
                { label: "Admins", value: stats?.admins ?? "—", icon: Shield },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-[#E4E4E4] p-5">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#111111] text-[#111111] mb-4">
                    <s.icon size={16} strokeWidth={1.75} />
                  </span>
                  <p className="font-semibold text-[26px] text-[#111111] leading-none mb-1">
                    {s.value}
                  </p>
                  <p className="text-[12px] text-[#6B6B6B]">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Financial summary */}
            {report && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-3">
                    Savings
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: "Total deposits", value: fmtCurrency(report.savings?.totalDeposits) },
                      { label: "Withdrawals", value: fmtCurrency(report.savings?.totalWithdrawals) },
                      { label: "Net balance", value: fmtCurrency(report.savings?.netBalance), bold: true },
                    ].map((r) => (
                      <div key={r.label} className="flex justify-between">
                        <span className="text-[13px] text-[#6B6B6B]">{r.label}</span>
                        <span className={`text-[13px] ${r.bold ? "font-semibold text-[#111111]" : "text-[#111111]"}`}>
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-3">
                    Contributions
                  </p>
                  <p className="font-semibold text-[26px] text-[#111111] leading-none mb-1">
                    {fmtCurrency(report.contributions?.totalCollected)}
                  </p>
                  <p className="text-[12px] text-[#6B6B6B]">Total collected</p>
                  <p className="text-[12px] text-amber-600 mt-3 flex items-center gap-1">
                    <Clock size={12} />
                    {report.pendingTransactions} pending transactions
                  </p>
                </Card>

                <Card>
                  <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-3">
                    Loans
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: "Pending", value: report.loans?.pending },
                      { label: "Approved", value: report.loans?.approved },
                      { label: "Repaid", value: report.loans?.repaid },
                      { label: "Total disbursed", value: fmtCurrency(report.loans?.totalDisbursed), bold: true },
                    ].map((r) => (
                      <div key={r.label} className="flex justify-between">
                        <span className="text-[13px] text-[#6B6B6B]">{r.label}</span>
                        <span className={`text-[13px] ${r.bold ? "font-semibold text-[#111111]" : "text-[#111111]"}`}>
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Member status */}
            {report && (
              <Card>
                <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-4">
                  Membership pipeline
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: "Total registered", value: report.members?.total },
                    { label: "Pending approval", value: report.members?.pendingApproval },
                    { label: "Active members", value: report.members?.active },
                  ].map((s) => (
                    <div key={s.label} className="border border-[#E4E4E4] rounded-xl p-4">
                      <p className="font-semibold text-[24px] text-[#111111]">{s.value}</p>
                      <p className="text-[12px] text-[#6B6B6B] mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        );

      // ── Pending Members ─────────────────────────────────────────────────────
      case "pending-members":
        return (
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg text-[#111111]">
                Pending approval
              </h3>
              <button
                onClick={() => fetchPendingMembers(1)}
                className="text-[#6B6B6B] hover:text-[#111111] transition-colors"
                aria-label="Refresh"
              >
                <RefreshCw size={15} />
              </button>
            </div>

            {pendingLoading ? (
              <SectionLoader />
            ) : pendingMembers.length === 0 ? (
              <div className="text-center py-12">
                <UserCheck size={36} className="text-[#E4E4E4] mx-auto mb-3" />
                <p className="text-[14px] font-medium text-[#111111]">All caught up</p>
                <p className="text-[13px] text-[#6B6B6B] mt-1">
                  No membership applications waiting for review.
                </p>
              </div>
            ) : (
              <>
                <ul>
                  {pendingMembers.map((m, i) => (
                    <li
                      key={m._id}
                      className={`py-4 ${i !== pendingMembers.length - 1 ? "border-b border-[#EFEFEF]" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="min-w-0">
                          <p className="text-[14px] font-semibold text-[#111111]">{m.name}</p>
                          <p className="text-[12px] text-[#6B6B6B]">{m.email} · {m.phone}</p>
                          <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                            {m.coopId} · Registered {fmtDate(m.createdAt)} · Interest: {m.interest || "not specified"}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <StatusBadge status={m.isVerified ? "verified" : "unverified"} />
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleApproveMember(m._id)}
                            disabled={actionLoading}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium bg-[#96158F] text-white hover:bg-[#7D1278] disabled:opacity-60 transition-colors"
                          >
                            <UserCheck size={14} />
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              setRejectModal({ type: "member", id: m._id, label: m.name });
                              setRejectReason("");
                            }}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium border border-[#E4E4E4] text-[#111111] hover:bg-[#F7F7F7] transition-colors"
                          >
                            <UserX size={14} />
                            Reject
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Pagination
                  page={pendingPagination.page}
                  pages={pendingPagination.pages}
                  onPage={(p) => fetchPendingMembers(p)}
                />
              </>
            )}
          </Card>
        );

      // ── All Users ───────────────────────────────────────────────────────────
      case "users":
        return (
          <div className="space-y-4">
            {/* Filters */}
            <div className="bg-white rounded-2xl border border-[#E4E4E4] p-4">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search by name, email, or coop ID…"
                    className="w-full pl-9 pr-4 py-2.5 border border-[#E4E4E4] rounded-xl text-[13px] text-[#111111] placeholder:text-[#6B6B6B]/60 focus:outline-none focus:border-[#96158F] transition-colors"
                  />
                </div>
                <Select value={userRoleFilter} onChange={(e) => setUserRoleFilter(e.target.value)}>
                  <option value="">All roles</option>
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                  <option value="super-admin">Super admin</option>
                </Select>
                <Select value={userStatusFilter} onChange={(e) => setUserStatusFilter(e.target.value)}>
                  <option value="">All statuses</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Select>
                <button
                  onClick={() => fetchUsers(1)}
                  className="p-2.5 border border-[#E4E4E4] rounded-xl text-[#6B6B6B] hover:bg-[#F7F7F7] transition-colors"
                  aria-label="Refresh"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>

            <Card>
              {usersLoading ? (
                <SectionLoader />
              ) : users.length === 0 ? (
                <p className="text-[13px] text-[#6B6B6B] py-8 text-center">
                  No users match those filters.
                </p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="text-left">
                          {["Name", "Email", "Role", "Status", "Approval", "Joined", "Actions"].map((h) => (
                            <th key={h} className="text-[11px] font-semibold text-[#6B6B6B] uppercase tracking-wide pb-3 pr-4">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u, i) => (
                          <tr
                            key={u._id}
                            className={`${i !== users.length - 1 ? "border-b border-[#EFEFEF]" : ""}`}
                          >
                            <td className="py-3 pr-4">
                              <p className="text-[13px] font-medium text-[#111111]">{u.name}</p>
                              <p className="text-[11px] text-[#6B6B6B]">{u.coopId}</p>
                            </td>
                            <td className="py-3 pr-4 text-[13px] text-[#6B6B6B]">{u.email}</td>
                            <td className="py-3 pr-4">
                              <StatusBadge status={u.role} />
                            </td>
                            <td className="py-3 pr-4">
                              <StatusBadge status={u.isActive ? "active" : "inactive"} />
                            </td>
                            <td className="py-3 pr-4">
                              <StatusBadge status={u.approvalStatus} />
                            </td>
                            <td className="py-3 pr-4 text-[12px] text-[#6B6B6B] tabular-nums">
                              {fmtDate(u.createdAt)}
                            </td>
                            <td className="py-3">
                              <div className="flex items-center gap-1.5">
                                {/* Toggle active */}
                                <button
                                  onClick={() => handleToggleStatus(u._id, u.isActive)}
                                  title={u.isActive ? "Deactivate" : "Activate"}
                                  className="p-1.5 rounded-lg border border-[#E4E4E4] text-[#6B6B6B] hover:bg-[#F7F7F7] transition-colors"
                                >
                                  {u.isActive ? <UserX size={13} /> : <UserCheck size={13} />}
                                </button>
                                {/* Change role (super-admin only) */}
                                {isSuperAdmin && (
                                  <button
                                    onClick={() => {
                                      setRoleModal({ id: u._id, name: u.name, currentRole: u.role });
                                      setNewRole(u.role);
                                    }}
                                    title="Change role"
                                    className="p-1.5 rounded-lg border border-[#E4E4E4] text-[#6B6B6B] hover:bg-[#F7F7F7] transition-colors"
                                  >
                                    <ShieldCheck size={13} />
                                  </button>
                                )}
                                {/* Delete (super-admin only) */}
                                {isSuperAdmin && (
                                  <button
                                    onClick={() => setDeleteModal({ id: u._id, name: u.name })}
                                    title="Delete user"
                                    className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    page={usersPagination.page}
                    pages={usersPagination.pages}
                    onPage={(p) => fetchUsers(p)}
                  />
                </>
              )}
            </Card>
          </div>
        );

      // ── Transactions ────────────────────────────────────────────────────────
      case "transactions":
        return (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl border border-[#E4E4E4] p-4">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <Select value={txStatusFilter} onChange={(e) => setTxStatusFilter(e.target.value)}>
                    <option value="">All statuses</option>
                    <option value="pending">Pending</option>
                    <option value="cleared">Cleared</option>
                    <option value="rejected">Rejected</option>
                  </Select>
                  <Select value={txCategoryFilter} onChange={(e) => setTxCategoryFilter(e.target.value)}>
                    <option value="">All categories</option>
                    <option value="savings">Savings</option>
                    <option value="contribution">Contribution</option>
                  </Select>
                  <button
                    onClick={() => fetchTransactions(1)}
                    className="p-2.5 border border-[#E4E4E4] rounded-xl text-[#6B6B6B] hover:bg-[#F7F7F7] transition-colors"
                    aria-label="Refresh"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
                <button
                  onClick={() => setCreateTxOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-medium bg-[#96158F] text-white hover:bg-[#7D1278] transition-colors"
                >
                  <Plus size={14} />
                  Record transaction
                </button>
              </div>
            </div>

            {/* Create transaction form */}
            {createTxOpen && (
              <Card>
                <h3 className="font-semibold text-[15px] text-[#111111] mb-4">
                  Record a transaction
                </h3>
                <form onSubmit={handleCreateTransaction} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">
                      Member Coop ID or user ID
                    </label>
                    <Input
                      type="text"
                      value={createTxForm.userId}
                      onChange={(e) => setCreateTxForm((f) => ({ ...f, userId: e.target.value }))}
                      placeholder="MongoDB ObjectId of the member"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">Amount (₦)</label>
                    <Input
                      type="text"
                      value={createTxForm.amount}
                      onChange={(e) => setCreateTxForm((f) => ({ ...f, amount: e.target.value }))}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">Category</label>
                    <Select className="w-full" value={createTxForm.category} onChange={(e) => setCreateTxForm((f) => ({ ...f, category: e.target.value }))}>
                      <option value="savings">Savings</option>
                      <option value="contribution">Contribution</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">Type</label>
                    <Select className="w-full" value={createTxForm.type} onChange={(e) => setCreateTxForm((f) => ({ ...f, type: e.target.value }))}>
                      <option value="deposit">Deposit</option>
                      <option value="withdrawal">Withdrawal</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">Method</label>
                    <Select className="w-full" value={createTxForm.method} onChange={(e) => setCreateTxForm((f) => ({ ...f, method: e.target.value }))}>
                      <option value="cash">Cash</option>
                      <option value="bank_transfer">Bank transfer</option>
                      <option value="card">Card</option>
                      <option value="other">Other</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">Status</label>
                    <Select className="w-full" value={createTxForm.status} onChange={(e) => setCreateTxForm((f) => ({ ...f, status: e.target.value }))}>
                      <option value="pending">Pending</option>
                      <option value="cleared">Cleared immediately</option>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">Note (optional)</label>
                    <Input
                      type="text"
                      value={createTxForm.note}
                      onChange={(e) => setCreateTxForm((f) => ({ ...f, note: e.target.value }))}
                      placeholder="Reference or remarks"
                    />
                  </div>
                  <div className="sm:col-span-2 flex gap-2">
                    <button
                      type="submit"
                      disabled={createTxSubmitting}
                      className="px-5 py-2.5 rounded-xl text-[13px] font-medium bg-[#96158F] text-white hover:bg-[#7D1278] disabled:opacity-70 transition-colors"
                    >
                      {createTxSubmitting ? "Saving…" : "Save transaction"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCreateTxOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-[13px] font-medium border border-[#E4E4E4] text-[#111111] hover:bg-[#F7F7F7] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Card>
            )}

            {/* Transaction list */}
            <Card>
              {txLoading ? (
                <SectionLoader />
              ) : transactions.length === 0 ? (
                <p className="text-[13px] text-[#6B6B6B] py-8 text-center">
                  No transactions match those filters.
                </p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                      <thead>
                        <tr className="text-left">
                          {["Member", "Category", "Type", "Method", "Amount", "Status", "Date", "Actions"].map((h) => (
                            <th key={h} className="text-[11px] font-semibold text-[#6B6B6B] uppercase tracking-wide pb-3 pr-4">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((tx, i) => (
                          <tr key={tx._id} className={i !== transactions.length - 1 ? "border-b border-[#EFEFEF]" : ""}>
                            <td className="py-3 pr-4">
                              <p className="text-[13px] font-medium text-[#111111]">
                                {tx.user?.name || "—"}
                              </p>
                              <p className="text-[11px] text-[#6B6B6B]">{tx.user?.coopId}</p>
                            </td>
                            <td className="py-3 pr-4 text-[13px] text-[#111111] capitalize">{tx.category}</td>
                            <td className="py-3 pr-4 text-[13px] text-[#111111] capitalize">{tx.type}</td>
                            <td className="py-3 pr-4 text-[13px] text-[#6B6B6B] capitalize">{tx.method?.replace("_", " ")}</td>
                            <td className="py-3 pr-4 text-[13px] font-semibold text-[#111111] tabular-nums">
                              {fmtCurrency(tx.amount)}
                            </td>
                            <td className="py-3 pr-4"><StatusBadge status={tx.status} /></td>
                            <td className="py-3 pr-4 text-[12px] text-[#6B6B6B] tabular-nums">{fmtDate(tx.createdAt)}</td>
                            <td className="py-3">
                              {tx.status === "pending" && (
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleClearTransaction(tx._id)}
                                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors"
                                  >
                                    Clear
                                  </button>
                                  <button
                                    onClick={() => {
                                      setRejectModal({ type: "transaction", id: tx._id, label: `${tx.type} of ${fmtCurrency(tx.amount)}` });
                                      setRejectReason("");
                                    }}
                                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    page={txPagination.page}
                    pages={txPagination.pages}
                    onPage={(p) => fetchTransactions(p)}
                  />
                </>
              )}
            </Card>
          </div>
        );

      // ── Loans ───────────────────────────────────────────────────────────────
      case "loans":
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#E4E4E4] p-4">
              <div className="flex gap-3">
                <Select value={loansStatusFilter} onChange={(e) => setLoansStatusFilter(e.target.value)}>
                  <option value="">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="repaid">Repaid</option>
                </Select>
                <button
                  onClick={() => fetchLoans(1)}
                  className="p-2.5 border border-[#E4E4E4] rounded-xl text-[#6B6B6B] hover:bg-[#F7F7F7] transition-colors"
                  aria-label="Refresh"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>

            <Card>
              {loansLoading ? (
                <SectionLoader />
              ) : loansList.length === 0 ? (
                <p className="text-[13px] text-[#6B6B6B] py-8 text-center">
                  No loan applications match those filters.
                </p>
              ) : (
                <>
                  <ul>
                    {loansList.map((loan, i) => (
                      <li
                        key={loan._id}
                        className={`py-4 ${i !== loansList.length - 1 ? "border-b border-[#EFEFEF]" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <p className="text-[14px] font-semibold text-[#111111]">
                                {fmtCurrency(loan.amount)}
                              </p>
                              <StatusBadge status={loan.status} />
                            </div>
                            <p className="text-[12px] text-[#6B6B6B]">
                              {loan.user?.name || "Unknown"} · {loan.user?.email}
                            </p>
                            <p className="text-[12px] text-[#6B6B6B] mt-0.5">
                              Purpose: {loan.purpose}
                            </p>
                            <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                              {loan.termMonths} months · Applied {fmtDate(loan.createdAt)}
                            </p>
                            {loan.reviewNote && (
                              <p className="text-[12px] text-[#96158F] mt-1 italic">
                                Note: {loan.reviewNote}
                              </p>
                            )}
                          </div>
                          {loan.status === "pending" && (
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                onClick={() => {
                                  setApproveNoteModal({ id: loan._id });
                                  setApproveNote("");
                                }}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-medium bg-[#96158F] text-white hover:bg-[#7D1278] transition-colors"
                              >
                                <Check size={13} />
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  setRejectModal({ type: "loan", id: loan._id, label: `loan of ${fmtCurrency(loan.amount)}` });
                                  setRejectReason("");
                                }}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-medium border border-[#E4E4E4] text-[#111111] hover:bg-[#F7F7F7] transition-colors"
                              >
                                <UserX size={13} />
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Pagination
                    page={loansPagination.page}
                    pages={loansPagination.pages}
                    onPage={(p) => fetchLoans(p)}
                  />
                </>
              )}
            </Card>
          </div>
        );

      // ── Reports ─────────────────────────────────────────────────────────────
      case "reports":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-[#111111]">Summary report</h3>
              <button
                onClick={fetchStats}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium border border-[#E4E4E4] text-[#111111] hover:bg-[#F7F7F7] transition-colors"
              >
                <RefreshCw size={13} />
                Refresh
              </button>
            </div>

            {!report ? (
              <SectionLoader />
            ) : (
              <>
                {/* Members */}
                <Card>
                  <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-4">Members</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Total registered", value: report.members?.total },
                      { label: "Pending approval", value: report.members?.pendingApproval },
                      { label: "Active & approved", value: report.members?.active },
                    ].map((r) => (
                      <div key={r.label} className="border border-[#E4E4E4] rounded-xl p-4 text-center">
                        <p className="font-semibold text-[28px] text-[#111111]">{r.value}</p>
                        <p className="text-[12px] text-[#6B6B6B] mt-1">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Savings */}
                <Card>
                  <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-4">Savings</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Total deposits (cleared)", value: fmtCurrency(report.savings?.totalDeposits) },
                      { label: "Total withdrawals", value: fmtCurrency(report.savings?.totalWithdrawals) },
                      { label: "Net balance held", value: fmtCurrency(report.savings?.netBalance), highlight: true },
                    ].map((r) => (
                      <div key={r.label} className={`rounded-xl p-4 border ${r.highlight ? "border-[#96158F]/20 bg-[#96158F]/5" : "border-[#E4E4E4]"}`}>
                        <p className={`font-semibold text-[20px] ${r.highlight ? "text-[#96158F]" : "text-[#111111]"}`}>
                          {r.value}
                        </p>
                        <p className="text-[12px] text-[#6B6B6B] mt-1">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Contributions & Transactions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-3">Contributions</p>
                    <p className="font-semibold text-[28px] text-[#111111] leading-none">
                      {fmtCurrency(report.contributions?.totalCollected)}
                    </p>
                    <p className="text-[12px] text-[#6B6B6B] mt-1">Total collected (cleared)</p>
                    <div className="mt-4 pt-4 border-t border-[#EFEFEF]">
                      <p className="text-[13px] text-amber-600 flex items-center gap-1.5">
                        <Clock size={13} />
                        {report.pendingTransactions} transactions awaiting clearance
                      </p>
                    </div>
                  </Card>

                  <Card>
                    <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-3">Loans</p>
                    <div className="space-y-2.5">
                      {[
                        { label: "Pending review", value: report.loans?.pending },
                        { label: "Approved", value: report.loans?.approved },
                        { label: "Repaid", value: report.loans?.repaid },
                        { label: "Rejected", value: report.loans?.rejected },
                      ].map((r) => (
                        <div key={r.label} className="flex justify-between items-center">
                          <span className="text-[13px] text-[#6B6B6B]">{r.label}</span>
                          <span className="text-[13px] font-semibold text-[#111111] tabular-nums">{r.value}</span>
                        </div>
                      ))}
                      <div className="pt-2.5 border-t border-[#EFEFEF] flex justify-between">
                        <span className="text-[13px] font-semibold text-[#111111]">Total disbursed</span>
                        <span className="text-[13px] font-semibold text-[#96158F]">
                          {fmtCurrency(report.loans?.totalDisbursed)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // ── Modals ─────────────────────────────────────────────────────────────────

  const RejectModal = () => (
    <ConfirmModal
      open={!!rejectModal}
      title={`Reject ${rejectModal?.type || ""}`}
      message={`You're about to reject ${rejectModal?.label}. This will notify the member.`}
      confirmLabel="Reject"
      danger
      onConfirm={handleRejectConfirm}
      onCancel={() => { setRejectModal(null); setRejectReason(""); }}
    >
      <div>
        <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">
          Reason (optional)
        </label>
        <textarea
          rows={2}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Provide a reason for the rejection…"
          className="w-full px-3 py-2 border border-[#E4E4E4] rounded-xl text-[13px] text-[#111111] placeholder:text-[#6B6B6B]/60 focus:outline-none focus:border-[#96158F] resize-none"
        />
      </div>
    </ConfirmModal>
  );

  const ApproveLoanModal = () => (
    <ConfirmModal
      open={!!approveNoteModal}
      title="Approve loan"
      message="Approving this loan will notify the member. Add an optional note."
      confirmLabel="Approve"
      onConfirm={handleApproveLoan}
      onCancel={() => { setApproveNoteModal(null); setApproveNote(""); }}
    >
      <div>
        <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">
          Note (optional)
        </label>
        <textarea
          rows={2}
          value={approveNote}
          onChange={(e) => setApproveNote(e.target.value)}
          placeholder="Disbursement details or conditions…"
          className="w-full px-3 py-2 border border-[#E4E4E4] rounded-xl text-[13px] text-[#111111] placeholder:text-[#6B6B6B]/60 focus:outline-none focus:border-[#96158F] resize-none"
        />
      </div>
    </ConfirmModal>
  );

  const DeleteUserModal = () => (
    <ConfirmModal
      open={!!deleteModal}
      title="Delete member"
      message={`This will permanently delete ${deleteModal?.name}. This cannot be undone.`}
      confirmLabel="Delete"
      danger
      onConfirm={handleDeleteUser}
      onCancel={() => setDeleteModal(null)}
    />
  );

  const RoleModal = () => (
    <ConfirmModal
      open={!!roleModal}
      title="Change role"
      message={`Update the role for ${roleModal?.name}.`}
      confirmLabel="Update role"
      onConfirm={handleUpdateRole}
      onCancel={() => { setRoleModal(null); setNewRole(""); }}
    >
      <div>
        <label className="block text-[11px] text-[#6B6B6B] uppercase tracking-wide mb-1.5">
          New role
        </label>
        <Select className="w-full" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
          <option value="super-admin">Super admin</option>
        </Select>
      </div>
    </ConfirmModal>
  );

  // ── Layout ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex font-sans">
      <Toast message={toast.message} type={toast.type} />
      <RejectModal />
      <ApproveLoanModal />
      <DeleteUserModal />
      <RoleModal />

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
                  <h2 className="font-semibold text-[15px] text-white leading-none">PWWE Admin</h2>
                  <p className="text-[10px] text-white/50 tracking-wide uppercase mt-0.5">
                    {adminUser?.role || "Admin panel"}
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
                </button>
              );
            })}
          </nav>

          {/* Admin user */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3 px-1">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                {adminUser?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-white truncate">{adminUser?.name}</p>
                <p className="text-[11px] text-white/45 truncate capitalize">{adminUser?.role}</p>
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
                  {menuItems.find((m) => m.id === activeTab)?.label || "Admin"}
                </h1>
                <p className="text-[12px] text-[#6B6B6B] mt-0.5">Admin control panel</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 border border-[#E4E4E4] rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 bg-[#96158F] rounded-full animate-pulse" />
                <span className="text-[11px] text-[#6B6B6B] font-medium uppercase tracking-wide">
                  {adminUser?.role}
                </span>
              </div>
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

export default AdminDashboard;