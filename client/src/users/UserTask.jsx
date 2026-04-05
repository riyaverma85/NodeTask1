import React, { useEffect, useState } from "react";
import axios from "axios";

const UserTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userid");

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

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed": return "bg-emerald-500 text-white shadow-emerald-200";
            case "In Progress": return "bg-amber-500 text-white shadow-amber-200";
            default: return "bg-slate-400 text-white shadow-slate-200";
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight italic">My Mission <span className="text-indigo-600 underline">Goals</span></h2>
                    <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest mt-2">Active direct-assignment protocols</p>
                </div>
                <div className="text-right">
                    <p className="text-4xl font-black text-slate-900 tracking-tighter">{tasks.length.toString().padStart(2, '0')}</p>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest italic">Total Operations</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {tasks.length > 0 ? (
                    tasks.map((task, idx) => (
                        <div key={idx} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:translate-x-2 transition-all duration-500 group relative overflow-hidden">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${getStatusColor(task.status)}`}>
                                            {task.status}
                                        </span>
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">TS-{task._id.slice(-4).toUpperCase()}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{task.task}</h3>
                                    <p className="text-slate-400 text-sm mt-2 font-medium flex items-center gap-2 italic">
                                        <span className="text-indigo-400">⏱</span> Deployment Duration: {task.days} Days
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden md:block">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Assigned On</p>
                                        <p className="text-xs font-bold text-slate-800 italic">{new Date(task.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <button className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all group-hover:scale-110 duration-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                <span className="text-9xl font-black italic">{idx + 1}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center bg-white border-2 border-dashed border-slate-100 rounded-[3rem]">
                        <p className="text-slate-300 text-6xl mb-6 opacity-20">📭</p>
                        <h3 className="text-xl font-bold text-slate-400 italic">No Active Missions</h3>
                        <p className="text-slate-300 text-xs font-black uppercase tracking-widest mt-2">Stand by for upcoming operations</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserTask;