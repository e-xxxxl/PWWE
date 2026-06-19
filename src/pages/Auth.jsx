import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Lock, Mail, User, ShieldCheck, AlertCircle, CheckCircle2, 
  HelpCircle, UserCheck, ArrowRight, Wallet, History, BookOpen, LogOut 
} from "lucide-react";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Determine active view from URL params if any (e.g. ?tab=register)
  const initialTab = searchParams.get("tab") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState(initialTab); // "login" | "register" | "forgot"
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [coopId, setCoopId] = useState("");
  
  // Feedback states
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Authenticated state (checked per mount)
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Seed default admin account if not existing
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

    // Check logged in status
    const session = localStorage.getItem("pwwe_active_user");
    if (session) {
      setCurrentUser(JSON.parse(session));
    }
  }, []);

  // Synchronize Tab from Query parameters
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "register") {
      setActiveTab("register");
    } else if (tabParam === "login") {
      setActiveTab("login");
    }
  }, [searchParams]);

  // Handle Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please complete all requested credentials.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("pwwe_registered_users") || "[]");
    const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password);

    if (matchedUser) {
      localStorage.setItem("pwwe_active_user", JSON.stringify(matchedUser));
      setCurrentUser(matchedUser);
      // Trigger native custom event for navbar status synchronization
      window.dispatchEvent(new Event("pwwe_auth_sync"));
      setSuccessMsg(`Welcome back, ${matchedUser.name}! Opening database ledger...`);
    } else {
      setErrorMsg("Invalid credentials. Enter admin@pwwe.com / password to preview quickly.");
    }
  };

  // Handle Register submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim() || !email.trim() || !password.trim() || !phone.trim()) {
      setErrorMsg("Please complete all required field markers (*).");
      return;
    }

    const users = JSON.parse(localStorage.getItem("pwwe_registered_users") || "[]");
    const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase().trim());

    if (userExists) {
      setErrorMsg("This email address is already recorded in the PWWE ledger directory.");
      return;
    }

    // Generate simulated Oyo cooperative ID if not entered
    const finalCoopId = coopId.trim() || `PWWE-[IB]-${Math.floor(Math.random() * 899) + 100}`;
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

    // Sync state
    window.dispatchEvent(new Event("pwwe_auth_sync"));
    setSuccessMsg(`Account registered successfully. Welcome, ${newUser.name}!`);
  };

  // Handle Forgot Password submission
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setForgotSuccess(false);

    if (!email.trim()) {
      setErrorMsg("Please fill out your verified email address.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("pwwe_registered_users") || "[]");
    const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());

    if (matched) {
      // Show recovery success code simulation
      setForgotSuccess(true);
    } else {
      setErrorMsg("The entered email address was not found in our ledger registers.");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("pwwe_active_user");
    setCurrentUser(null);
    window.dispatchEvent(new Event("pwwe_auth_sync"));
  };

  // Simulated Members portal states & records
  const mockFinancialLedger = {
    balance: "₦46,800.00",
    rotatingSavingsPaid: "₦120,000.00",
    unpaidLoanBalance: "₦0.00",
    accountClass: "Oyo State South-West Circle",
    monthlyContribution: "₦5,000.00",
    transactions: [
      { id: "TX-401", type: "Ledger Contribution", date: "June 12, 2026", amount: "+₦5,000.00", status: "Verified" },
      { id: "TX-309", type: "Rotating Multi-Draw", date: "May 28, 2026", amount: "+₦120,000.00", status: "Closed" },
      { id: "TX-289", type: "Ledger Contribution", date: "May 12, 2026", amount: "+₦5,000.00", status: "Verified" },
      { id: "TX-190", type: "Incubation Grant", date: "April 15, 2026", amount: "+₦15,000.00", status: "Credited" },
    ]
  };

  return (
    <div className="bg-brand-light min-h-screen py-16 px-6 md:px-12 flex items-center justify-center font-sans animate-fade-in" id="auth-page">
      {currentUser ? (
        /* ==================== MEMBERS PORTAL DASHBOARD VIEW ==================== */
        <div className="w-full max-w-7xl mx-auto space-y-12" id="member-portal">
          
          {/* Header row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-brand-purple/10 pb-8">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#CC9838] font-bold block">
                [// Active Registry Member Dashboard]
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold text-brand-dark">
                Welcome, {currentUser.name}
              </h1>
              <p className="text-xs text-brand-dark/65 font-mono">
                COOP-ID: <strong className="text-brand-purple">{currentUser.coopId}</strong> • PHONE: <strong>{currentUser.phone}</strong> • EMAIL: <strong>{currentUser.email}</strong>
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 bg-brand-dark hover:bg-red-900 border border-brand-dark text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300"
            >
              <span>Sign Out Ledger</span>
              <LogOut size={13} />
            </button>
          </div>

          {/* Interactive Financial Ledger Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Block: Core Stats cards */}
            <div className="lg:col-span-8 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Balance Card */}
                <div className="bg-white p-6 border border-[#CC9838]/20 shadow-xs relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#CC9838]/10 text-[#CC9838] p-2">
                    <Wallet size={16} />
                  </div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-brand-dark/50">
                    My Ledger Balance
                  </span>
                  <div className="text-2xl sm:text-3xl font-display font-black text-brand-dark mt-2">
                    {mockFinancialLedger.balance}
                  </div>
                  <span className="block text-[10px] text-brand-purple font-mono mt-4 font-semibold">
                    ← Fully interest-free asset
                  </span>
                </div>

                {/* Rotating Draw Card */}
                <div className="bg-white p-6 border border-brand-purple/15 shadow-xs relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-brand-purple-light text-brand-purple p-2">
                    <History size={16} />
                  </div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-brand-dark/50">
                    Rotating Draw History
                  </span>
                  <div className="text-2xl sm:text-3xl font-display font-black text-brand-dark mt-2">
                    {mockFinancialLedger.rotatingSavingsPaid}
                  </div>
                  <span className="block text-[10px] text-[#0B6E4F] font-mono mt-4 font-semibold">
                    Cycle payout finalized
                  </span>
                </div>

                {/* Loan Balance Card */}
                <div className="bg-white p-6 border border-brand-purple/15 shadow-xs relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 p-2">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="block font-mono text-[9px] uppercase tracking-widest text-brand-dark/50">
                    Outstanding Support Loans
                  </span>
                  <div className="text-2xl sm:text-3xl font-display font-black text-brand-dark mt-2">
                    {mockFinancialLedger.unpaidLoanBalance}
                  </div>
                  <span className="block text-[10px] text-brand-dark/50 font-mono mt-4">
                    Zero interest cycles active
                  </span>
                </div>

              </div>

              {/* Transactions Ledger Table */}
              <div className="bg-white border border-brand-purple/15 p-6 md:p-8">
                <span className="block font-mono text-xs uppercase text-brand-purple tracking-widest mb-6 font-bold">
                  // Recent Certified Activities //
                </span>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-brand-purple/10 pb-2 text-[10px] font-mono uppercase text-brand-dark/45">
                        <th className="py-2.5 font-bold">Transaction Ledger ID</th>
                        <th className="py-2.5 font-bold">Category</th>
                        <th className="py-2.5 font-bold">Timestamp</th>
                        <th className="py-2.5 font-bold text-right" style={{ textAlign: "right" }}>Flow Volume</th>
                        <th className="py-2.5 font-bold text-right" style={{ textAlign: "right" }}>Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-purple/5 text-xs font-sans text-brand-dark/80">
                      {mockFinancialLedger.transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-brand-purple-light/20 transition-all">
                          <td className="py-3 font-mono font-bold">{tx.id}</td>
                          <td className="py-3 font-semibold">{tx.type}</td>
                          <td className="py-3 text-brand-dark/60">{tx.date}</td>
                          <td className="py-3 text-right font-mono font-bold text-[#0B6E4F]" style={{ textAlign: "right" }}>{tx.amount}</td>
                          <td className="py-3 text-right" style={{ textAlign: "right" }}>
                            <span className="px-2 py-0.5 bg-brand-purple-light text-brand-purple rounded-full text-[9px] font-mono font-bold uppercase border border-brand-purple/10">
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

            {/* Right Block: Educational Resources & Guidance */}
            <div className="lg:col-span-4 bg-white border border-[#CC9838]/15 p-6 md:p-8 space-y-6">
              <span className="block font-mono text-[10px] uppercase text-[#CC9838] tracking-widest font-black">
                Registry Information & Board Advisory
              </span>
              
              <div className="p-4 bg-brand-light border-l-2 border-[#CC9838] space-y-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-dark">
                  Ibadan Cluster Bi-Weekly Briefings
                </h4>
                <p className="text-xs text-brand-dark/70 font-sans leading-relaxed">
                  Your collective ledger supervisor is available every alternating Thursday at the ANCE Building for cash deposits adjustments or mutual support loan proposals.
                </p>
              </div>

              <div className="space-y-4">
                <span className="block font-mono text-[9px] text-brand-dark/40 uppercase tracking-widest">
                  COOPERATIVE BEST PRACTICES
                </span>
                
                <ul className="space-y-3.5">
                  <li className="flex gap-2.5 items-start text-xs text-brand-dark/70 leading-relaxed font-sans">
                    <BookOpen size={16} className="text-brand-purple shrink-0 mt-0.5" />
                    <span>Always ensure your physical contribution books are matched and stamped by our Oyo registrars during deposits.</span>
                  </li>
                  <li className="flex gap-2.5 items-start text-xs text-brand-dark/70 leading-relaxed font-sans">
                    <ShieldCheck size={16} className="text-[#CC9838] shrink-0 mt-0.5" />
                    <span>Rotating payouts follow sequential queue lines strictly determined by collective circle attendance.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-brand-purple/10 text-center">
                <p className="text-[10px] text-brand-dark/50 font-mono">
                  Locked Section • Complies with Oyo State Social Enterprise Mandate
                </p>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* ==================== GATEKEEPER FORMS (LOGIN / REGISTER / FORGOT) ==================== */
        <div className="w-full max-w-lg bg-white border border-brand-purple/15 p-8 md:p-12 shadow-sm relative">
          
          {/* Tag */}
          <div className="absolute top-0 right-0 bg-[#CC9838] text-white text-[9px] font-mono uppercase tracking-widest font-black py-4 px-6">
            MEMBER LOG DESK
          </div>

          {/* Heading */}
          <div className="space-y-2 mb-8">
            <span className="font-mono text-[10px] uppercase text-brand-purple tracking-widest font-bold block">
              // Power Within Women Empowerment Foundation  //
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-black text-brand-dark leading-tight">
              {activeTab === "login" && "Sign In to Cooperative Account"}
              {activeTab === "register" && "Open New Account"}
              {activeTab === "forgot" && "Recover Cooperative Access"}
            </h1>
            <p className="text-xs text-brand-dark/65 font-sans">
              {activeTab === "login" && "Access your personal savings logs, interest-free rotating credits dashboard, and Ibadan business networks."}
              {activeTab === "register" && "Fill out the required markers to establish your structural savings account. Zero registration fees required."}
              {activeTab === "forgot" && "Enter your verified email. We will simulate sending a recovery authorization token link."}
            </p>
          </div>

          {/* Tab selector (Only if not in forgot page) */}
          {activeTab !== "forgot" && (
            <div className="grid grid-cols-2 border border-brand-purple/10 mb-8 font-mono text-[10px] uppercase font-bold text-center">
              <button
                onClick={() => {
                  setActiveTab("login");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`py-3 transition-colors cursor-pointer ${
                  activeTab === "login" ? "bg-brand-purple text-white font-heavy" : "bg-brand-light text-brand-dark hover:bg-brand-purple-light"
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
                  activeTab === "register" ? "bg-brand-purple text-white font-heavy" : "bg-brand-light text-brand-dark hover:bg-brand-purple-light"
                }`}
              >
                Register
              </button>
            </div>
          )}

          {/* User Feedback */}
          {errorMsg && (
            <div className="mb-6 p-3 bg-red-50 border border-red-300 text-red-700 text-xs flex items-center gap-2 font-mono">
              <AlertCircle size={14} className="flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-purple-50 border border-brand-purple/40 text-brand-purple text-xs flex items-start gap-2.5 leading-relaxed">
              <CheckCircle2 size={16} className="text-brand-purple flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block uppercase font-mono tracking-wider mb-1">Authorization Success</span>
                <p>{successMsg}</p>
              </div>
            </div>
          )}

          {/* Form switch statement equivalents */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-5" id="login-form">
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest font-bold">Email Address *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"><Mail size={14} /></span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., admin@pwwe.com"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none pl-10 pr-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest font-bold">Cooperative Password *</label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("forgot");
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="font-mono text-[9px] uppercase tracking-wider text-brand-purple hover:text-[#CC9838]"
                  >
                    Forgot Code?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"><Lock size={14} /></span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security password"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none pl-10 pr-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all"
                  />
                </div>
              </div>

              <div className="text-[10px] text-brand-dark/60 font-mono py-1">
                👉 Quick Preview Login: <strong className="text-brand-purple">admin@pwwe.com</strong> / <strong className="text-brand-purple">password</strong>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-widest font-extrabold border border-brand-purple transition-all duration-300 shadow-xs cursor-pointer"
              >
                Open Ledger Dashboard
              </button>
            </form>
          )}

          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-5" id="register-form">
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest font-bold">Full Name *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"><User size={14} /></span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Mrs. Margaret Olatunji"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none pl-10 pr-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest font-bold">Email Address *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"><Mail size={14} /></span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none pl-10 pr-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest font-bold">Telephone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., +234..."
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none px-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest">Coop ID (Optional)</label>
                  <input
                    type="text"
                    value={coopId}
                    onChange={(e) => setCoopId(e.target.value)}
                    placeholder="Generate dynamic ID"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none px-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest font-bold">Security Password *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"><Lock size={14} /></span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none pl-10 pr-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-2 items-start text-[10px] text-brand-dark/50 leading-relaxed font-sans pt-1">
                <ShieldCheck size={14} className="text-[#CC9838] shrink-0 mt-0.5" />
                <span>
                  Your registration status automatically links your capital with Oyo State regulatory cooperative audits.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-widest font-extrabold border border-brand-purple transition-all duration-300 shadow-xs cursor-pointer"
              >
                Register Cooperative Ledger Account
              </button>
            </form>
          )}

          {activeTab === "forgot" && (
            <div className="space-y-5" id="forgot-view">
              {forgotSuccess ? (
                <div className="p-6 bg-brand-accent-light border border-brand-accent text-brand-dark space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-[#CC9838]">
                    <CheckCircle2 size={20} />
                    <span className="font-display text-sm font-bold uppercase tracking-wider">Recovery Token Simulation</span>
                  </div>
                  <p className="text-xs leading-relaxed font-sans text-brand-dark/85">
                    An electronic recovery dispatch has simulated standard delivery protocols with your address: <strong>{email}</strong>.
                  </p>
                  
                  <div className="p-4 bg-white/80 border border-[#CC9838]/20 font-mono text-[11px] leading-relaxed text-brand-dark/75 space-y-2">
                    <span className="block font-bold">TEST RECOVERY BYPASS CODE:</span>
                    <span className="block text-brand-purple text-xs font-black select-all">PWWE-RESET-89512</span>
                    <p className="text-[10px] text-brand-dark/50 pt-1">You may now proceed back to Sign In and enter your existing credentials.</p>
                  </div>

                  <button
                    onClick={() => {
                      setForgotSuccess(false);
                      setActiveTab("login");
                    }}
                    className="px-5 py-2.5 bg-brand-purple text-white font-mono text-[10px] uppercase tracking-widest font-bold transition-colors cursor-pointer"
                  >
                    Proceed to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] uppercase text-brand-dark/75 tracking-widest font-bold">Your Verified Email *</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark/40"><Mail size={14} /></span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., admin@pwwe.com"
                        className="w-full bg-brand-light border border-brand-purple/10 focus:border-[#CC9838] focus:outline-none pl-10 pr-4 py-3.5 text-xs sm:text-sm font-sans text-brand-dark transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-widest font-extrabold border border-brand-purple transition-all duration-300 shadow-xs cursor-pointer"
                  >
                    Simulate Recover Access Code
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("login");
                        setErrorMsg("");
                        setSuccessMsg("");
                      }}
                      className="font-mono text-[10px] uppercase tracking-wider text-brand-dark/60 hover:text-brand-purple"
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
