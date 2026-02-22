import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const SummaryCard = ({ title, amount, icon, color, isTotal, income = 0, expense = 0 }) => {
  const isPositive = amount >= 0;

  return (
    <div className={`relative p-8 rounded-[40px] border transition-all duration-500 overflow-hidden group ${
      isTotal 
        ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200 border-indigo-500' 
        : 'bg-white text-slate-800 shadow-sm hover:shadow-xl border-slate-100 hover:border-indigo-100'
    }`}>
      
      {/* Background Decorative Element */}
      <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full blur-3xl opacity-20 transition-all duration-500 group-hover:scale-150 ${
        isTotal ? 'bg-white' : 'bg-indigo-400'
      }`} />

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className={`p-4 rounded-[20px] transition-transform duration-500 group-hover:scale-110 shadow-sm ${
          isTotal ? 'bg-white/10 backdrop-blur-md' : color
        }`}>
          {icon}
        </div>
        <div className="text-right">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] block mb-1 ${
            isTotal ? 'text-indigo-100' : 'text-slate-400'
          }`}>
            {title}
          </span>
          {/* Status Indicator */}
          {!isTotal && (
            <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {isPositive ? "SURPLUS" : "DEFICIT"}
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-baseline gap-1">
          <span className={`text-xl font-bold ${isTotal ? 'text-indigo-200' : 'text-slate-400'}`}>৳</span>
          <h2 className="text-4xl font-black tracking-tighter">
            {(amount || 0).toLocaleString()}
          </h2>
        </div>

        {/* Small Progress Visual for Income/Expense */}
        {!isTotal && (income > 0 || expense > 0) && (
          <div className="mt-6 pt-6 border-t border-slate-50 flex gap-4">
            <div className="flex-1">
              <div className="text-[9px] font-black text-slate-400 uppercase mb-1">In</div>
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[9px] font-black text-slate-400 uppercase mb-1">Out</div>
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-500 rounded-full" 
                  style={{ width: `${Math.min((expense / (income || 1)) * 100, 100)}%` }} 
                />
              </div>
            </div>
          </div>
        )}

        {isTotal && (
          <p className="mt-4 text-xs font-medium text-indigo-100/80">
            Total remaining balance across all records
          </p>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;