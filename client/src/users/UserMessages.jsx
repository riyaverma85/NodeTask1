import React from "react";

const UserMessages = () => {
    const messages = [
        { 
            id: 1, 
            sender: "Admin Command", 
            type: "System Alert", 
            content: "You have been assigned to the upcoming project deployment. Please review Task TS-0492 for further instructions.", 
            time: "2 hours ago", 
            priority: "High" 
        },
        { 
            id: 2, 
            sender: "Security Node", 
            type: "Security Protocol", 
            content: "Your login attempt was recorded from a new local terminal. Please verify your credentials if this was not you.", 
            time: "1 day ago", 
            priority: "Medium" 
        },
        { 
            id: 3, 
            sender: "System Mainframe", 
            type: "Daily Report", 
            content: "The automated task verification completed successfully. All pending operations have been logged with the head office.", 
            time: "2 days ago", 
            priority: "Low" 
        }
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight italic">System <span className="text-indigo-600 underline">Broadcasts</span></h2>
                    <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest mt-2 italic underline underline-offset-4 decoration-indigo-100">Frequency: Encrypted // Priority: Multi-level</p>
                </div>
            </div>

            <div className="space-y-8">
                {messages.map((msg, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 p-10 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all duration-700 group relative overflow-hidden italic">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                        msg.priority === 'High' ? 'bg-red-50 text-red-600 ring-1 ring-red-100' : 
                                        msg.priority === 'Medium' ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-100' : 
                                        'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100'
                                    }`}>
                                        {msg.priority} Priority
                                    </span>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Type: {msg.type}</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-4 group-hover:text-indigo-600 transition-colors underline decoration-slate-100 underline-offset-8">From: {msg.sender}</h3>
                                <p className="text-slate-500 text-lg leading-relaxed font-semibold max-w-2xl">{msg.content}</p>
                            </div>
                            <div className="flex items-center gap-4 text-right">
                                <div>
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">Timestamp</p>
                                    <p className="text-xs font-bold text-slate-400 mix-blend-multiply">{msg.time}</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all duration-700 group-hover:scale-125 pointer-events-none">
                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserMessages;
