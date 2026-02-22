import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  ArrowLeft, Search, Filter, Trash2, Edit3, 
  ChevronLeft, ChevronRight, Download, Calendar,
  ArrowUpCircle, ArrowDownCircle, Clock, TrendingUp, Landmark, TrendingDown,
  History, CircleDollarSign
} from "lucide-react";
import { 
  fetchAllTransactions, 
  getTransactionSummary,
  deleteTransaction 
} from "../../redux/slices/transition_slice";

// Reusable Summary Card Component
const SummaryCard = ({ title, amount, icon, color, isTotal, income = 0, expense = 0 }) => {
  const isPositive = amount >= 0;
  return (
    <div className={`relative p-6 rounded-[32px] border transition-all duration-500 group ${
      isTotal 
        ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200 border-indigo-500' 
        : 'bg-white text-slate-800 shadow-sm border-slate-100 hover:border-indigo-200 hover:shadow-md'
    }`}>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-2xl ${isTotal ? 'bg-white/10 text-white' : `${color}`}`}>
          {icon}
        </div>
        <div className="text-right">
          <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${isTotal ? 'text-indigo-100' : 'text-slate-400'}`}>
            {title}
          </span>
          {!isTotal && (
            <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full w-fit ml-auto shadow-sm ${
              isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {isPositive ? "STABLE" : "LOW"}
            </div>
          )}
        </div>
      </div>
      <div className="relative z-10 flex items-baseline gap-1">
        <span className={`text-lg font-bold ${isTotal ? 'text-indigo-200' : 'text-slate-400'}`}>৳</span>
        <h2 className="text-3xl font-black tracking-tighter">{(amount || 0).toLocaleString()}</h2>
      </div>
      
      {/* Background Decorative Pattern */}
      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
        {icon}
      </div>
    </div>
  );
};

export const TransactionHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { transactions, summary, loading } = useSelector((state) => state.transactions);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAllTransactions());
    dispatch(getTransactionSummary());
  }, [dispatch]);

  const filteredTransactions = transactions?.filter(t => {
    const matchesSearch = t.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || t.type === filterType;
    return matchesSearch && matchesType;
  }) || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this permanent record?")) {
      dispatch(deleteTransaction(id));
    }
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation & Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-all mb-2"
            >
              <ArrowLeft size={14} strokeWidth={3} /> Return to Home
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                <History className="text-indigo-600" size={24} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                Finance <span className="text-indigo-600">Ledger</span>
              </h1>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl text-sm font-black shadow-sm hover:bg-slate-50 hover:border-indigo-200 transition-all uppercase tracking-tighter">
            <Download size={18} className="text-indigo-500" /> Export CSV
          </button>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard 
            title="Current Balance" 
            amount={summary?.today?.balance} 
            icon={<Clock size={24} />} 
            color="bg-blue-50 text-blue-600" 
          />
          <SummaryCard 
            title="Monthly Savings" 
            amount={summary?.monthly?.savings} 
            icon={<TrendingUp size={24} />} 
            color="bg-emerald-50 text-emerald-600" 
          />
          <SummaryCard 
            title="Total Net Cash" 
            amount={summary?.totalBalance} 
            icon={<Landmark size={24} />} 
            isTotal={true} 
          />
        </div>

        {/* Search & Table Wrapper */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Filters Bar */}
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/30">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by title, category..." 
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-4 ring-indigo-500/5 focus:border-indigo-300 transition-all"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex bg-white p-1 rounded-2xl border border-slate-200">
                {['all', 'income', 'expense'].map((type) => (
                  <button
                    key={type}
                    onClick={() => { setFilterType(type); setCurrentPage(1); }}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                      filterType === type 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-[0.1em]">
                  <th className="p-6 border-b border-slate-50">Date</th>
                  <th className="p-6 border-b border-slate-50">Description</th>
                  <th className="p-6 border-b border-slate-50 text-center">Classification</th>
                  <th className="p-6 border-b border-slate-50">Amount</th>
                  <th className="p-6 border-b border-slate-50 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentItems.length > 0 ? (
                  currentItems.map((t) => (
                    <tr key={t._id} className="hover:bg-indigo-50/20 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                          <Calendar size={14} className="text-slate-300" />
                          {new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="font-black text-slate-800 text-base mb-1">{t.title}</div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
                          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-wider">{t.category}</span>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight shadow-sm ${
                          t.type === 'income' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}>
                          {t.type === 'income' ? <ArrowUpCircle size={12}/> : <ArrowDownCircle size={12}/>}
                          {t.type}
                        </div>
                      </td>
                      <td className={`p-6 font-black text-xl tracking-tighter ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {t.type === 'income' ? '+' : '-'} ৳{t.amount?.toLocaleString()}
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          <button 
                            onClick={() => navigate(`/admin/dashboard/transactions/edit/${t._id}`)} 
                            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-indigo-100 rounded-xl transition-all shadow-sm"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(t._id)} 
                            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-white border border-transparent hover:border-rose-100 rounded-xl transition-all shadow-sm"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-24 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="p-6 bg-slate-50 rounded-full text-slate-200">
                          <CircleDollarSign size={48} strokeWidth={1} />
                        </div>
                        <p className="text-slate-400 font-black uppercase text-sm tracking-widest">No financial data found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/20">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Record {indexOfFirstItem + 1}—{Math.min(indexOfLastItem, filteredTransactions.length)} <span className="mx-2 text-slate-200">|</span> Total {filteredTransactions.length}
            </p>
            
            <div className="flex items-center gap-3">
              <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase text-slate-600 disabled:opacity-30 hover:border-indigo-500 transition-all"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
              <button 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase text-slate-600 disabled:opacity-30 hover:border-indigo-500 transition-all"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;