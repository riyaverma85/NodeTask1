import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const CreateUser = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        post: "",
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/createuser`, input);
            
            if (res.data.status === "success") {
                toast.success(res.data.message || "User Created Successfully! ✅");
                setInput({ name: "", email: "", post: "" });
            } else {
                toast.error(res.data.message || "Something went wrong ❌");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Internal server error ❌");
        }
    };

    return (
        <div className="flex items-center justify-center p-8 md:p-20 bg-[#FDFDFF] w-full min-h-screen font-sans text-slate-900 border-l border-slate-50">
          <ToastContainer position="top-right" autoClose={2000} theme="light" />
    
          <div className="w-full max-w-2xl bg-white border border-slate-100 p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-slate-200/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366F1]/5 rounded-bl-[4rem]"></div>
            
            <div className="mb-12">
                <div className="inline-flex items-center gap-2 mb-4 bg-indigo-50 border border-indigo-100/50 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-black text-[#6366F1] uppercase tracking-[0.1em]">Personnel Management</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">
                  Create New <span className="text-[#6366F1]">Node.</span>
                </h1>
                <p className="text-slate-400 mt-2 text-sm font-medium italic">Register personnel to the network and dispatch credentials.</p>
            </div>
    
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-8">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 italic">Full Legal Name</label>
                  <input
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={handleInput}
                      placeholder="e.g. Alexander Pierce"
                      className="w-full bg-[#FDFDFF] border border-slate-100 p-5 rounded-2xl focus:border-[#6366F1] outline-none transition-all font-bold text-slate-800 placeholder:opacity-30 shadow-inner"
                      required
                  />
                </div>
    
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 italic">Email Identity</label>
                      <input
                          type="email"
                          name="email"
                          value={input.email}
                          onChange={handleInput}
                          placeholder="name@company.com"
                          className="w-full bg-[#FDFDFF] border border-slate-100 p-5 rounded-2xl focus:border-[#6366F1] outline-none transition-all font-bold text-slate-800 placeholder:opacity-30 shadow-inner"
                          required
                      />
                    </div>
    
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 italic">Operational Role</label>
                      <div className="relative">
                        <select
                            name="post"
                            value={input.post}
                            onChange={handleInput}
                            className="w-full bg-[#FDFDFF] border border-slate-100 p-5 rounded-2xl focus:border-[#6366F1] outline-none transition-all font-black text-slate-800 appearance-none cursor-pointer"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="programmer">Programmer</option>
                            <option value="designer">Designer</option>
                            <option value="analyst">Analyst</option>
                            <option value="teamleader">Team Leader</option>
                            <option value="projectmanager">Project Manager</option>
                            <option value="databasedesigner">Database Architect</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">▼</div>
                      </div>
                    </div>
                </div>
              </div>
    
              <div className="pt-10 border-t border-slate-50 text-center">
                 <button className="w-full bg-[#6366F1] text-white py-6 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-[#4F46E5] transition-all transform active:scale-[0.98] shadow-2xl shadow-indigo-600/20" type="submit">
                   Generate Credentials
                </button>
                <p className="mt-8 text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">Automated SMTP notification is active</p>
              </div>
            </form>
          </div>
        </div>
      );
};

export default CreateUser;