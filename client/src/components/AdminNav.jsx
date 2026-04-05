import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminNav = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
    { 
      name: "Dashboard", 
      path: "/admindashboard/mainpart", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    },
    { 
      name: "Personnel", 
      path: "/admindashboard/createuser", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    },
    { 
      name: "Task Board", 
      path: "/admindashboard/assigntask", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 100-4 2 2 0 000 4z" /></svg>
    },
  ];

  return (
    <>
      <div className="md:hidden flex justify-between items-center px-6 py-4 bg-white border-b border-slate-100 sticky top-0 z-50">
        <h2 className="text-xl font-black text-slate-900 tracking-tight italic">TM.</h2>
        <button onClick={() => setOpen(true)} className="p-2 text-slate-400 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40 md:hidden" onClick={() => setOpen(false)}></div>
      )}

      <div className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-[#F1F5F9] p-8 z-50 transform transition-transform duration-500
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:w-1/5 shadow-2xl md:shadow-none`}>
        
        <div className="mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#6366F1] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20 rotate-3">
            <span className="text-white font-black text-xl italic">T</span>
          </div>
          <h2 className="text-2xl font-black tracking-tighter text-slate-900 italic">Task Management</h2>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={idx}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? "bg-[#6366F1] text-white shadow-xl shadow-indigo-600/20 -translate-y-1" 
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"}`}
              >
                <span className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-[#6366F1]"}`}>
                  {item.icon}
                </span>
                <span className="text-[13px] font-bold tracking-wide uppercase">
                  {item.name}
                </span>
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 group mt-10 border border-dashed border-rose-100 hover:border-rose-200"
          >
            <span className="opacity-60 group-hover:opacity-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </span>
            <span className="text-[13px] font-bold tracking-wide uppercase">
              Logout
            </span>
          </button>
        </nav>

        <div className="absolute bottom-10 left-0 w-full px-8">
            <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#6366F1] font-black text-xs uppercase">AD</div>
                  <div>
                    <p className="text-xs font-black text-slate-900 leading-none">Admin</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Active</p>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default AdminNav;