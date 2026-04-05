import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userid");

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/getprofile/${userId}`);
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchProfile();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-in slide-in-from-bottom-10 duration-700">
            <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-[4rem] group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 via-indigo-500 to-indigo-300 transform scale-125 group-hover:scale-100 transition-transform duration-[2000ms]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl"></div>
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[3rem] bg-white p-2 shadow-2xl rotate-3 mb-6 transition-all duration-700 group-hover:rotate-0 hover:scale-105 group-hover:rounded-2xl">
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center text-6xl rounded-[2.5rem] group-hover:rounded-xl transition-all duration-700 overflow-hidden relative shadow-inner">
                            <span className="text-9xl absolute -bottom-4 -right-4 opacity-5 pointer-events-none pr-4 pb-4">👤</span>
                            {user?.name?.[0].toUpperCase()}
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter drop-shadow-lg mb-2">{user?.name}</h1>
                    <p className="text-white/80 font-black text-[10px] uppercase tracking-[0.4em] italic drop-shadow-sm transition-all duration-500 group-hover:tracking-[0.5em]">{user?.post} // SEC-LVL: 04</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white border border-slate-100 p-12 rounded-[3.5rem] shadow-sm relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.25em] mb-10 flex items-center gap-3 italic">Identification Data</h3>
                        
                        <div className="space-y-12">
                            <div className="flex items-center gap-6 group/item transition-all duration-300 hover:translate-x-3">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black transition-all group-hover/item:bg-indigo-600 group-hover/item:text-white shadow-sm ring-1 ring-slate-100">📧</div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">Email Address</p>
                                    <p className="text-lg font-bold text-slate-800 tracking-tight transition-colors group-hover/item:text-indigo-600">{user?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group/item transition-all duration-300 hover:translate-x-3">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black transition-all group-hover/item:bg-indigo-600 group-hover/item:text-white shadow-sm ring-1 ring-slate-100">🛡️</div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">Assigned Role</p>
                                    <p className="text-lg font-bold text-slate-800 tracking-tight transition-colors group-hover/item:text-indigo-600">{user?.post}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-slate-100 p-12 rounded-[3.5rem] shadow-sm relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col h-full">
                        <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.25em] mb-10 flex items-center gap-3 italic">Security Protocol</h3>
                        
                        <div className="flex-1 flex flex-col justify-center space-y-8">
                             <div className="p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100/50 relative overflow-hidden group-hover:bg-indigo-50 transition-colors">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest italic">Verification Status: Confirmed</p>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed italic font-medium">Your node is currently operating under authenticated protocols. All task submissions are encrypted and direct-routed to the primary command module.</p>
                             </div>

                             <button className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-red-600 transition-all duration-500 group-hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-200">
                                <span className="text-xs">🔐</span> Reset Credentials
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
