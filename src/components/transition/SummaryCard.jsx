import React from "react";

const SummaryCard = ({ title, amount, icon, color, isTotal }) => (
  <div className={`p-8 rounded-[32px] border transition-all duration-300 ${isTotal ? 'bg-slate-900 text-white shadow-2xl' : 'bg-white text-slate-800 shadow-sm'}`}>
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl ${isTotal ? 'bg-white/10' : color}`}>{icon}</div>
      <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${isTotal ? 'text-white/40' : 'text-slate-400'}`}>{title}</span>
    </div>
    <h2 className="text-3xl font-black tracking-tight">৳{(amount || 0).toLocaleString()}</h2>
  </div>
);
export default SummaryCard;