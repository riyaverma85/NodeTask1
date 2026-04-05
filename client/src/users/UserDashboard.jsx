import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const UserDashboard = () => {
    const location = useLocation();

    const menuItems = [
        { name: "Overview", path: "/userdashboard", icon: "💎" },
        { name: "My Tasks", path: "/userdashboard/usertask", icon: "📋" },
        { name: "Messages", path: "/userdashboard/messages", icon: "💬" },
        { name: "Profile", path: "/userdashboard/profile", icon: "👤" },
    ];

    return (
        <div className="flex min-h-screen bg-[#EBEDE8]">
            {/* Sidebar */}
            <div className="w-80 bg-white shadow-[20px_0_60px_-15px_rgba(0,0,0,0.05)] border-r border-slate-100 p-10 flex flex-col z-20">
                <div className="mb-14">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-[1rem] flex items-center justify-center text-white font-black italic shadow-lg shadow-indigo-200">N</div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">
                            TASK<span className="text-indigo-600">MANAGEMENT</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p className="text-[10px] uppercase font-black text-slate-300 tracking-[0.2em] italic">System Active</p>
                    </div>
                </div>

                <nav className="flex-1">
                    <ul className="space-y-4">
                        {menuItems.map((item, idx) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={idx}>
                                    <Link 
                                        to={item.path} 
                                        className={`flex items-center gap-4 px-6 py-5 rounded-[1.8rem] transition-all duration-500 font-black text-xs uppercase tracking-widest italic
                                        ${isActive 
                                            ? "bg-slate-900 text-white shadow-2xl shadow-slate-400/20 translate-x-3 scale-[1.02]" 
                                            : "text-slate-400 hover:bg-slate-50 hover:text-indigo-600"}`}
                                    >
                                        <span className={`text-xl transition-transform duration-500 ${isActive ? 'rotate-0' : '-rotate-12 group-hover:rotate-0'}`}>{item.icon}</span>
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="mt-auto pt-10">
                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500 italic">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center font-black text-indigo-600 text-lg shadow-sm group-hover:rotate-6 transition-transform">
                                {localStorage.getItem("user")?.[0].toUpperCase() || "U"}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-black text-slate-800 truncate">{localStorage.getItem("user")?.split('@')[0]}</p>
                                <Link to="/" onClick={() => localStorage.clear()} className="text-[10px] text-indigo-400 font-extrabold hover:text-red-500 transition-colors tracking-widest uppercase">Terminate Session</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <main className="flex-1 p-10 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;