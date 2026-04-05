import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("admin");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = userType === "admin"
        ? `${import.meta.env.VITE_API_URL}/api/admin/login`
        : `${import.meta.env.VITE_API_URL}/api/user/login`;

      const res = await axios.post(endpoint, { email, password });

      if (res.data.status === "success" || res.data.msg === "Admin successfully Login") {
        toast.success(res.data.message || res.data.msg);
        if (userType === "admin") {
          localStorage.setItem("admin", email);
          navigate("/admindashboard/mainpart");
        } else {
          localStorage.setItem("user", email);
          localStorage.setItem("userid", res.data.user._id); // Storing userID
          navigate("/userdashboard");
        }
      } else {
        toast.error(res.data.message || res.data.msg);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-[#0F172A] flex flex-col font-sans selection:bg-[#6366F1]/20">
      <ToastContainer position="top-right" autoClose={2000} theme="light" />

      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-bl from-[#6366F1]/10 to-transparent blur-[120px] rounded-full"></div>
      </div>

      <div className="flex grow items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-4 bg-white border border-[#F1F5F9] px-3 py-1 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Secure Terminal V4.0</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-none italic uppercase">
              LOGIN<span className="text-[#6366F1]"> PAGE</span>
            </h1>
            <p className="text-slate-400 mt-3 font-medium text-sm">Secure Management Portal Control</p>
          </div>

          <div className="bg-white border border-[#F1F5F9] p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#6366F1] to-[#3B82F6]"></div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest ml-1 opacity-60">Identity // Email</label>
                <input
                  type="email"
                  placeholder="Enter your identifier"
                  className="w-full bg-[#FDFDFF] border border-[#F1F5F9] p-4 rounded-2xl focus:border-[#6366F1] outline-none transition-all placeholder:text-[#94A3B8] font-bold text-[#0F172A]"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest ml-1 opacity-60">Auth // Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#FDFDFF] border border-[#F1F5F9] p-4 rounded-2xl focus:border-[#6366F1] outline-none transition-all placeholder:text-[#94A3B8] font-bold text-[#0F172A]"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#64748B] uppercase tracking-widest ml-1 opacity-60">Access // Level</label>
                <div className="relative">
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-full bg-[#FDFDFF] border border-[#F1F5F9] p-4 rounded-2xl focus:border-[#6366F1] outline-none transition-all appearance-none cursor-pointer font-black text-slate-800"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">▼</div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#6366F1] text-white font-black py-5 rounded-2xl hover:bg-[#4F46E5] transition-all shadow-xl shadow-[#6366F1]/20 active:scale-[0.98] text-lg uppercase tracking-widest"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;