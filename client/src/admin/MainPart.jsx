import axios from "axios";
import React, { useEffect, useState } from "react";

const MainPart = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalUsers: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/stats`);
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-[#FDFDFF] flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase animate-pulse">Syncing environment...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: "Active Projects", value: stats.totalTasks, color: "text-slate-900", bg: "bg-white", icon: "📁" },
    { title: "Completed Seq", value: stats.completedTasks, color: "text-emerald-500", bg: "bg-emerald-50/30", icon: "✅" },
    { title: "Pending Ops", value: stats.pendingTasks, color: "text-red-500", bg: "bg-red-50/30", icon: "⚠️" },
    { title: "Personnel Nodes", value: stats.totalUsers, color: "text-slate-900", bg: "bg-white", icon: "👥" },
    { title: "In Progress", value: stats.inProgressTasks, color: "text-[#6366F1]", bg: "bg-indigo-50/30", icon: "⚡" },
    { title: "Critical Overdue", value: stats.overdueTasks, color: "text-red-600", bg: "bg-rose-50/40", icon: "⌛" },
  ];

  return (
    <div className="w-full bg-[#FDFDFF] p-8 md:p-16 min-h-screen font-sans text-slate-800 border-l border-slate-50">
      
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-4 bg-white border border-slate-100 px-3 py-1 rounded-full shadow-sm">
             <span className="w-2 h-2 rounded-full bg-[#6366F1]"></span>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin Control Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight italic">
            Operational<br/>
            <span className="text-[#6366F1]">Intelligence.</span>
          </h1>
        </div>
        <div className="text-right hidden md:block">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">System uptime</p>
           <p className="text-xl font-black text-slate-900 italic">99.98% / OPTIMAL</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {statCards.map((card, index) => (
          <div 
            key={index} 
            className={`${card.bg} p-10 border border-slate-100 rounded-[2.5rem] relative group hover:scale-[1.02] transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-600/5`}
          >
            <div className="absolute top-8 right-8 text-2xl opacity-10 group-hover:opacity-100 transition-opacity transform group-hover:rotate-12 duration-500">
              {card.icon}
            </div>
            
            <div className="relative z-10">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 group-hover:text-[#6366F1] transition-colors">{card.title}</h2>
              <div className="flex items-baseline gap-3">
                <p className={`text-6xl font-black tracking-tighter ${card.color}`}>{card.value}</p>
                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Units</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPart;