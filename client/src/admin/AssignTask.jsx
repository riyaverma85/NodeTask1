import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AssignTask = () => {
    const [mydata, setMydata] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [id, setId] = useState("");
    const [input, setInput] = useState({
        task: "",
        days: "",
    });

    const loaddata = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/getuser`);
            setMydata(res.data);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };

    useEffect(() => {
        loaddata();
    }, []);

    const myEdit = (id) => {
        setId(id);
        setIsEditOpen(true);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/assigntask`, { id, ...input });
            toast.success(res.data.msg || "Task and email successfully ✅");
            setIsEditOpen(false);
            setInput({ task: "", days: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Task update failed ❌");
        }
    };

    return (
        <div className="p-8 md:p-16 bg-[#FDFDFF] min-h-screen w-full font-sans text-slate-800 border-l border-slate-50">
          <ToastContainer position="top-right" autoClose={3000} theme="light" />
          
          <div className="bg-white border border-slate-100 p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200/10 relative overflow-hidden">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 pb-10 border-b border-slate-50">
                <div>
                    <div className="inline-flex items-center gap-2 mb-3 bg-[#6366F1]/10 px-3 py-1 rounded-full">
                      <span className="text-[10px] font-black text-[#6366F1] uppercase tracking-[0.15em]">Registry Management</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Personnel <span className="text-[#6366F1]">Network.</span></h2>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-6 py-4 flex items-center gap-4 animate-in fade-in">
                    <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse"></span>
                    <span className="text-[#6366F1] font-black text-xs uppercase tracking-widest whitespace-nowrap">Node Count // {mydata.length}</span>
                </div>
            </div>
    
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-slate-400">
                    <th className="px-6 py-2 font-black text-[10px] uppercase tracking-[0.2em] opacity-40 italic">Ident</th>
                    <th className="px-6 py-2 font-black text-[10px] uppercase tracking-[0.2em] opacity-40 italic">Entity</th>
                    <th className="px-6 py-2 font-black text-[10px] uppercase tracking-[0.2em] opacity-40 italic">Capability</th>
                    <th className="px-6 py-2 font-black text-[10px] uppercase tracking-[0.2em] opacity-40 text-center italic">Protocol</th>
                  </tr>
                </thead>
    
                <tbody>
                  {mydata.map((item, index) => (
                    <tr
                      key={index}
                      className="group hover:bg-[#6366F1]/[0.02] transition-all duration-300 transition-premium"
                    >
                      <td className="px-6 py-4">
                        <span className="text-slate-300 font-bold text-xs uppercase tracking-widest italic opacity-40 group-hover:opacity-100 group-hover:text-[#6366F1]">{index + 10}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50/50 rounded-2xl flex items-center justify-center text-sm font-black text-[#6366F1] border border-indigo-100 group-hover:scale-110 transition-transform shadow-sm group-hover:shadow-indigo-600/10">
                                {item.name[0]}
                            </div>
                            <div>
                              <p className="font-black text-slate-900 text-sm tracking-tight">{item.name}</p>
                              <p className="text-[10px] text-slate-400 font-bold lowercase tracking-normal italic opacity-60 group-hover:opacity-100">{item.email}</p>
                            </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 grow">
                        <span className="px-4 py-1.5 text-[9px] font-black uppercase tracking-widest bg-white border border-slate-100 text-slate-500 rounded-full shadow-sm group-hover:border-[#6366F1] group-hover:text-[#6366F1] transition-all">
                          {item.post}
                        </span>
                      </td>
    
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => myEdit(item._id)}
                          className="px-6 py-3 text-[10px] font-black uppercase tracking-widest bg-white border border-slate-200 text-slate-900 rounded-2xl hover:bg-[#6366F1] hover:text-white hover:border-[#6366F1] hover:shadow-xl hover:shadow-indigo-600/20 transition-all active:scale-95 italic"
                        >
                          Assign Mission
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    
            {mydata.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 bg-slate-50/30 rounded-[3rem] border-2 border-dashed border-slate-100 mt-8 opacity-40">
                 <p className="text-sm font-black uppercase tracking-[0.4em] text-slate-300 italic animate-pulse">Scanning_Network_Empty</p>
              </div>
            )}
          </div>
    
          {/* Modal */}
          {isEditOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-md z-50 p-6 animate-in fade-in duration-300">
              <div className="w-full max-w-xl bg-white border border-slate-100 p-12 rounded-[3.5rem] relative animate-in slide-in-from-bottom-8 duration-500 shadow-2xl">
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="absolute top-10 right-10 text-slate-300 hover:text-red-500 transition-all p-2 bg-slate-50 rounded-full bg-slate-50/50"
                >
                  ✕
                </button>
    
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Allocate <span className="text-[#6366F1]">Task.</span></h1>
                    <p className="text-slate-400 mt-2 text-sm font-medium italic opacity-60 underline underline-offset-4 pointer-events-none">Define the objective for the assigned node.</p>
                </div>
    
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 italic">Mission Objective</label>
                    <input
                        type="text"
                        name="task"
                        value={input.task}
                        onChange={handleInput}
                        className="w-full bg-[#FDFDFF] border border-slate-100 p-5 rounded-2xl focus:border-[#6366F1] outline-none text-slate-900 font-bold placeholder:opacity-30 shadow-inner"
                        placeholder="Enter objective description..."
                        required
                    />
                  </div>
    
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 italic">Timescale // Days</label>
                    <input
                        type="number"
                        name="days"
                        value={input.days}
                        onChange={handleInput}
                        className="w-full bg-[#FDFDFF] border border-slate-100 p-5 rounded-2xl focus:border-[#6366F1] outline-none text-[#6366F1] font-black text-3xl placeholder:opacity-30 shadow-inner"
                        placeholder="0"
                        required
                    />
                  </div>
    
                  <div className="flex flex-col md:flex-row gap-6 pt-6 font-black uppercase tracking-widest text-xs">
                    <button
                      type="submit"
                      className="flex-1 bg-[#6366F1] text-white py-6 rounded-2xl hover:bg-[#4F46E5] transition-all active:scale-[0.98] shadow-2xl shadow-indigo-600/20"
                    >
                      Commit Mission
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditOpen(false)}
                      className="px-10 bg-slate-50 text-slate-400 py-6 rounded-2xl hover:bg-slate-100 transition-all font-black uppercase italic"
                    >
                      Abort
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      );
};

export default AssignTask;