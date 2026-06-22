import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Lock, Mail, User, ShieldCheck, AlertCircle, CheckCircle2, 
  Wallet, History, BookOpen, LogOut 
} from "lucide-react";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialTab = searchParams.get("tab") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [coopId, setCoopId] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("pwwe_registered_users") || "[]");
    const hasDefault = users.some(u => u.email === "admin@pwwe.com");
    if (!hasDefault) {
      users.push({
        name: "Mrs. Margaret Olatunji",
        email: "admin@pwwe.com",
        password: "password",
        phone: "+2348039001122",
        coopId: "PWWE-IB-001"
      });
      localStorage.setItem("pwwe_registered_users", JSON.stringify(users));
    }

    const session = localStorage.getItem("pwwe_active_user");
    if (session) {
      setCurrentUser(JSON.parse(session));
    }
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "register") {
      setActiveTab("register");
    } else if (tabParam === "login") {
      setActiveTab("login");
    }
  }, [searchParams]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please fill in both your email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("pwwe_registered_users") || "[]");
    const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password);

    if (matchedUser) {
      localStorage.setItem("pwwe_active_user", JSON.stringify(matchedUser));
      setCurrentUser(matchedUser);
      window.dispatchEvent(new Event("pwwe_auth_sync"));
      setSuccessMsg(`Welcome back, ${matchedUser.name}!`);
    } else {
      setErrorMsg("Incorrect email or password. Try admin@pwwe.com / password for a quick preview.");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim() || !email.trim() || !password.trim() || !phone.trim()) {
      setErrorMsg("Please complete all required fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("pwwe_registered_users") || "[]");
    const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase().trim());

    if (userExists) {
      setErrorMsg("An account with this email already exists.");
      return;
    }

    const finalCoopId = coopId.trim() || `PWWE-IB-${Math.floor(Math.random() * 899) + 100}`;
    const newUser = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      phone: phone.trim(),
      coopId: finalCoopId
    };

    users.push(newUser);
    localStorage.setItem("pwwe_registered_users", JSON.stringify(users));
    localStorage.setItem("pwwe_active_user", JSON.stringify(newUser));
    setCurrentUser(newUser);

    window.dispatchEvent(new Event("pwwe_auth_sync"));
    setSuccessMsg(`Account created successfully. Welcome, ${newUser.name}!`);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setForgotSuccess(false);

    if (!email.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("pwwe_registered_users") || "[]");
    const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());

    if (matched) {
      setForgotSuccess(true);
    } else {
      setErrorMsg("We couldn't find an account with that email address.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("pwwe_active_user");
    setCurrentUser(null);
    window.dispatchEvent(new Event("pwwe_auth_sync"));
  };

  const mockFinancialLedger = {
    balance: "₦46,800.00",
    rotatingSavingsPaid: "₦120,000.00",
    unpaidLoanBalance: "₦0.00",
    accountClass: "Oyo State South-West Circle",
    monthlyContribution: "₦5,000.00",
    transactions: [
      { id: "TX-401", type: "Monthly Contribution", date: "June 12, 2026", amount: "+₦5,000.00", status: "Verified" },
      { id: "TX-309", type: "Rotating Payout Received", date: "May 28, 2026", amount: "+₦120,000.00", status: "Completed" },
      { id: "TX-289", type: "Monthly Contribution", date: "May 12, 2026", amount: "+₦5,000.00", status: "Verified" },
      { id: "TX-190", type: "Business Grant", date: "April 15, 2026", amount: "+₦15,000.00", status: "Credited" },
    ]
  };

  return (
    <div className="bg-brand-light min-h-screen py-16 px-6 md:px-12 flex items-center justify-center" id="auth-page">
      {currentUser ? (
        /* ==================== MEMBER DASHBOARD ==================== */
        <div className="w-full max-w-7xl mx-auto space-y-12" id="member-portal">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-brand-purple/10 pb-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#CC9838] font-semibold block">
                Member Dashboard
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-brand-dark">
                Welcome back, {currentUser.name}
              </h1>
              <p className="text-sm text-brand-dark/65">
                Coop ID: <strong className="text-brand-purple">{currentUser.coopId}</strong> · {currentUser.phone} · {currentUser.email}
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 bg-brand-dark hover:bg-red-900 text-white text-xs uppercase tracking-wider font-semibold transition-all duration-300"
            >
              <span>Sign Out</span>
              <LogOut size={13} />
            </button>
          </div>

          {/* Financial Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-8 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Balance */}
                <div className="bg-white p-6 border border-brand-purple/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-brand-purple-light text-brand-purple p-2">
                    <Wallet size={16} />
                  </div>
                  <span className="block text-xs uppercase tracking-widest text-brand-dark/50 font-semibold">
                    Your Balance
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-brand-dark mt-2">
                    {mockFinancialLedger.balance}
                  </div>
                  <span className="block text-xs text-brand-purple mt-4 font-semibold">
                    Interest-free savings
                  </span>
                </div>

                {/* Rotating Savings */}
                <div className="bg-white p-6 border border-brand-purple/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-brand-purple-light text-brand-purple p-2">
                    <History size={16} />
                  </div>
                  <span className="block text-xs uppercase tracking-widest text-brand-dark/50 font-semibold">
                    Rotating Payout Received
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-brand-dark mt-2">
                    {mockFinancialLedger.rotatingSavingsPaid}
                  </div>
                  <span className="block text-xs text-green-700 mt-4 font-semibold">
                    Cycle completed
                  </span>
                </div>

                {/* Loan Balance */}
                <div className="bg-white p-6 border border-brand-purple/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 p-2">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="block text-xs uppercase tracking-widest text-brand-dark/50 font-semibold">
                    Outstanding Loans
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-brand-dark mt-2">
                    {mockFinancialLedger.unpaidLoanBalance}
                  </div>
                  <span className="block text-xs text-brand-dark/50 mt-4">
                    No outstanding loans
                  </span>
                </div>

              </div>

              {/* Transaction History */}
              <div className="bg-white border border-brand-purple/10 p-6 md:p-8">
                <span className="block text-xs uppercase text-brand-purple tracking-widest mb-6 font-semibold">
                  Recent Transactions
                </span>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-brand-purple/10 text-xs uppercase text-brand-dark/45 font-semibold">
                        <th className="py-2.5">Transaction ID</th>
                        <th className="py-2.5">Type</th>
                        <th className="py-2.5">Date</th>
                        <th className="py-2.5 text-right">Amount</th>
                        <th className="py-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-purple/5 text-sm text-brand-dark/80">
                      {mockFinancialLedger.transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-brand-purple-light/20 transition-all">
                          <td className="py-3 font-semibold">{tx.id}</td>
                          <td className="py-3">{tx.type}</td>
                          <td className="py-3 text-brand-dark/60">{tx.date}</td>
                          <td className="py-3 text-right font-semibold text-green-700">{tx.amount}</td>
                          <td className="py-3 text-right">
                            <span className="px-2 py-0.5 bg-brand-purple-light text-brand-purple text-xs font-semibold uppercase">
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Right Sidebar - Tips */}
            <div className="lg:col-span-4 bg-white border border-brand-purple/10 p-6 md:p-8 space-y-6">
              <span className="block text-xs uppercase text-[#CC9838] tracking-widest font-semibold">
                Important Information
              </span>
              
              <div className="p-4 bg-brand-light border-l-2 border-[#CC9838] space-y-2">
                <h4 className="text-sm font-bold text-brand-dark">
                  Ibadan Cluster Meetings
                </h4>
                <p className="text-sm text-brand-dark/70 leading-relaxed">
                  Your savings group supervisor is available every other Thursday at the ANCE Building for deposits, withdrawals, or loan requests.
                </p>
              </div>

              <div className="space-y-4">
                <span className="block text-xs text-brand-dark/40 uppercase tracking-widest font-semibold">
                  Helpful Reminders
                </span>
                
                <ul className="space-y-3">
                  <li className="flex gap-2 items-start text-sm text-brand-dark/70 leading-relaxed">
                    <BookOpen size={16} className="text-brand-purple shrink-0 mt-0.5" />
                    <span>Always make sure your contribution book is stamped during deposits.</span>
                  </li>
                  <li className="flex gap-2 items-start text-sm text-brand-dark/70 leading-relaxed">
                    <ShieldCheck size={16} className="text-[#CC9838] shrink-0 mt-0.5" />
                    <span>Rotating payouts follow the order set by your group's attendance records.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* ==================== LOGIN / REGISTER / FORGOT FORMS ==================== */
        <div className="w-full max-w-lg bg-white border border-brand-purple/10 p-8 md:p-12 relative">
          
          <div className="absolute top-0 right-0 bg-[#CC9838] text-white text-xs uppercase tracking-wider font-semibold py-4 px-6">
            Member Access
          </div>

          <div className="space-y-2 mb-8">
            <span className="text-xs uppercase text-brand-purple tracking-widest font-semibold block">
              The Power Within Women Empowerment Foundation
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark leading-tight">
              {activeTab === "login" && "Sign In"}
              {activeTab === "register" && "Create an Account"}
              {activeTab === "forgot" && "Reset Your Password"}
            </h1>
            <p className="text-sm text-brand-dark/65">
              {activeTab === "login" && "Access your savings, track your rotating payouts, and stay connected with your cooperative group."}
              {activeTab === "register" && "Join a savings cooperative, learn new skills, and start building your business. It's free to register."}
              {activeTab === "forgot" && "Enter your email and we'll help you get back into your account."}
            </p>
          </div>

          {activeTab !== "forgot" && (
            <div className="grid grid-cols-2 border border-brand-purple/10 mb-8 text-xs uppercase font-semibold text-center">
              <button
                onClick={() => {
                  setActiveTab("login");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`py-3 transition-colors cursor-pointer ${
                  activeTab === "login" ? "bg-brand-purple text-white" : "bg-brand-light text-brand-dark hover:bg-brand-purple-light"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab("register");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`py-3 transition-colors cursor-pointer ${
                  activeTab === "register" ? "bg-brand-purple text-white" : "bg-brand-light text-brand-dark hover:bg-brand-purple-light"
                }`}
              >
                Register
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-3 bg-red-50 border border-red-300 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle size={14} className="flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-purple-50 border border-brand-purple/40 text-brand-purple text-sm flex items-start gap-2 leading-relaxed">
              <CheckCircle2 size={16} className="text-brand-purple flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block uppercase tracking-wider mb-1">Success</span>
                <p>{successMsg}</p>
              </div>
            </div>
          )}

          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-5" id="login-form">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase text-brand-dark/75 tracking-widest font-semibold">Email Address *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"><Mail size={14} /></span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none pl-10 pr-4 py-3.5 text-sm text-brand-dark transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs uppercase text-brand-dark/75 tracking-widest font-semibold">Password *</label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("forgot");
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="text-xs uppercase tracking-wider text-brand-purple hover:text-[#CC9838] font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"><Lock size={14} /></span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none pl-10 pr-4 py-3.5 text-sm text-brand-dark transition-all"
                  />
                </div>
              </div>

              <div className="text-xs text-brand-dark/60 py-1">
                Quick preview: <strong className="text-brand-purple">admin@pwwe.com</strong> / <strong className="text-brand-purple">password</strong>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-purple hover:bg-brand-dark text-white text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer"
              >
                Sign In
              </button>
            </form>
          )}

          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-5" id="register-form">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase text-brand-dark/75 tracking-widest font-semibold">Full Name *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"><User size={14} /></span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none pl-10 pr-4 py-3.5 text-sm text-brand-dark transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase text-brand-dark/75 tracking-widest font-semibold">Email Address *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"><Mail size={14} /></span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none pl-10 pr-4 py-3.5 text-sm text-brand-dark transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase text-brand-dark/75 tracking-widest font-semibold">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234..."
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none px-4 py-3.5 text-sm text-brand-dark transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase text-brand-dark/75 tracking-widest">Coop ID (Optional)</label>
                  <input
                    type="text"
                    value={coopId}
                    onChange={(e) => setCoopId(e.target.value)}
                    placeholder="Auto-generated"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none px-4 py-3.5 text-sm text-brand-dark transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase text-brand-dark/75 tracking-widest font-semibold">Password *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"><Lock size={14} /></span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none pl-10 pr-4 py-3.5 text-sm text-brand-dark transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-purple hover:bg-brand-dark text-white text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer"
              >
                Create Account
              </button>
            </form>
          )}

          {activeTab === "forgot" && (
            <div className="space-y-5" id="forgot-view">
              {forgotSuccess ? (
                <div className="p-6 bg-brand-accent-light border border-brand-accent text-brand-dark space-y-4">
                  <div className="flex items-center gap-2 text-[#CC9838]">
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Recovery Email Sent</span>
                  </div>
                  <p className="text-sm leading-relaxed text-brand-dark/85">
                    We've sent a recovery link to <strong>{email}</strong>.
                  </p>
                  
                  <div className="p-4 bg-white/80 border border-[#CC9838]/20 text-sm leading-relaxed text-brand-dark/75 space-y-2">
                    <span className="block font-bold">Test Recovery Code:</span>
                    <span className="block text-brand-purple font-bold select-all">PWWE-RESET-89512</span>
                    <p className="text-xs text-brand-dark/50 pt-1">You can now return to Sign In with your existing credentials.</p>
                  </div>

                  <button
                    onClick={() => {
                      setForgotSuccess(false);
                      setActiveTab("login");
                    }}
                    className="px-5 py-2.5 bg-brand-purple text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase text-brand-dark/75 tracking-widest font-semibold">Email Address *</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"><Mail size={14} /></span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none pl-10 pr-4 py-3.5 text-sm text-brand-dark transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-purple hover:bg-brand-dark text-white text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer"
                  >
                    Send Recovery Link
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("login");
                        setErrorMsg("");
                        setSuccessMsg("");
                      }}
                      className="text-xs uppercase tracking-wider text-brand-dark/60 hover:text-brand-purple font-semibold"
                    >
                      ← Back to Sign In
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}