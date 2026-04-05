import React, { useEffect, useState } from "react";
import axios from "axios";

const Userhome = () => {
    const userEmail = localStorage.getItem("user") || "User";
    const userId = localStorage.getItem("userid");
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/getalltasks/${userId}`);
            setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchTasks();
    }, [userId]);

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === "Completed").length,
        pending: tasks.filter(t => t.status === "Pending").length,
    };

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center min-h-screen bg-[#FDFDFF]">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Preparing Node Stats...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-12 font-sans text-slate-900 animate-in fade-in duration-1000">
          <div className="bg-white border border-slate-100 p-16 rounded-[4rem] shadow-2xl shadow-slate-200/20 relative overflow-hidden group transition-all duration-700">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-3 mb-8 bg-indigo-50 border border-indigo-100/50 px-5 py-2 rounded-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                  <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em] italic">Authenticated Access Authority</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] italic mb-10">
                  Mission<br/>
                  <span className="text-indigo-600">Commander</span>
                </h1>
                <p className="text-slate-400 font-bold text-[14px] uppercase tracking-[0.25em] underline underline-offset-8 decoration-slate-100 decoration-4 italic">
                  Operator: {userEmail.split('@')[0]} // Node {userId.slice(-6).toUpperCase()}
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                 <div className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl shadow-indigo-200 group-hover:-rotate-2 transition-transform duration-700">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Sync Status</p>
                    <p className="text-3xl font-black italic tracking-tighter">100% ONLINE</p>
                 </div>
              </div>
            </div>
            
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-50/50 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-[2000ms]"></div>
          </div>
    
          {/* Real Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-14 rounded-[3.5rem] border border-slate-50 flex flex-col items-center text-center group hover:scale-[1.03] transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-600/5">
              <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-4xl mb-10 group-hover:rotate-12 transition-transform shadow-sm">✅</div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 italic">Operations Resolved</p>
              <p className="text-7xl font-black text-slate-900 tracking-tighter italic">{stats.completed.toString().padStart(2, '0')}</p>
            </div>
            
            <div className="bg-slate-900 p-14 rounded-[3.5rem] border border-slate-800 flex flex-col items-center text-center group hover:scale-[1.03] transition-all duration-500 shadow-2xl shadow-slate-200">
              <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-4xl mb-10 group-hover:-rotate-12 transition-transform shadow-lg shadow-indigo-900/20">🎯</div>
              <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-6 italic">Assigned Targets</p>
              <p className="text-7xl font-black text-white tracking-tighter italic">{stats.total.toString().padStart(2, '0')}</p>
            </div>
    
            <div className="bg-white p-14 rounded-[3.5rem] border border-slate-50 flex flex-col items-center text-center group hover:scale-[1.03] transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-600/5">
              <div className="w-24 h-24 bg-orange-50 rounded-[2.5rem] flex items-center justify-center text-4xl mb-10 group-hover:scale-110 transition-transform shadow-sm">⚡</div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 italic">Pending Protocol</p>
              <p className="text-7xl font-black text-indigo-600 tracking-tighter italic">{stats.pending.toString().padStart(2, '0')}</p>
            </div>
          </div>

          <div className="p-16 bg-white border border-slate-100 rounded-[4rem] shadow-sm relative overflow-hidden group italic">
             <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-all duration-1000 group-hover:scale-150">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
             </div>
             <div className="relative z-10">
                <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] mb-8 flex items-center gap-4 italic">
                    <span className="w-12 h-[2px] bg-indigo-600"></span>
                    Operational Broadcast
                </h3>
                <p className="text-slate-500 text-2xl font-bold leading-[1.4] max-w-4xl tracking-tight">
                    Node status <span className="text-emerald-500 px-3 py-1 bg-emerald-50 rounded-xl">OPTIMAL</span>. No fatal exceptions detected. You have <span className="text-indigo-600 font-black underline decoration-indigo-200 underline-offset-8">{stats.pending} active missions</span> awaiting deployment. Synchronize your task module to initiate.
                </p>
             </div>
          </div>
        </div>
      );
};

export default Userhome;