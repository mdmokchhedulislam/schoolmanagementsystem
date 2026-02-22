import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  ArrowLeft, Clock, TrendingUp, Landmark, 
  PlusCircle, Loader2, Trash2, Edit3, X, Plus, Save, 
  Search, ChevronLeft, ChevronRight, Filter
} from "lucide-react";
import { 
  fetchAllTransactions, 
  getTransactionSummary, 
  createTransaction, 
  updateTransaction, 
  deleteTransaction 
} from "../../../redux/slices/transition_slice";
import SummaryCard from "../../../components/transition/SummaryCard";

export const AccountRecordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { transactions, summary, loading } = useSelector((state) => state.transactions);

  // Modal & Edit States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [bulkData, setBulkData] = useState([{ title: "", amount: "", type: "income", category: "", staffName: "", paymentMethod: "Cash" }]);

  // Search & Pagination States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Proti page-e koita transaction dekhabe

  const categories = {
    expense: ['Utility Bills', 'Salary & Bonus', 'Maintenance', 'Stationery', 'Events & Meetings', 'Marketing', 'Rent', 'Others/Miscellaneous'],
    income: ['Student Fees', 'Donations', 'School Property Rent', 'Sales', 'Government Grant', 'Others/Miscellaneous']
  };

  useEffect(() => {
    dispatch(fetchAllTransactions());
    dispatch(getTransactionSummary());
  }, [dispatch]);

  // --- Search & Filter Logic ---
  const filteredTransactions = transactions?.filter(t => {
    const matchesSearch = t.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || t.type === filterType;
    return matchesSearch && matchesType;
  }) || [];

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  // Reset pagination when searching
  useEffect(() => { setCurrentPage(1); }, [searchTerm, filterType]);

  // --- Actions ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await dispatch(updateTransaction({ id: editingId, data: bulkData[0] }));
    } else {
      await dispatch(createTransaction({ transactions: bulkData }));
    }
    closeModal();
  };

  const handleEdit = (t) => {
    setEditingId(t._id);
    setBulkData([{ title: t.title, amount: t.amount, type: t.type, category: t.category, paymentMethod: t.paymentMethod || "Cash", staffName: "" }]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setBulkData([{ title: "", amount: "", type: "income", category: "", staffName: "", paymentMethod: "Cash" }]);
  };

  return (
    <div className="p-6 bg-[#f4f7fe] min-h-screen font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <ArrowLeft size={16} /> Back
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-indigo-200 uppercase">
            <PlusCircle size={18} /> New Entry
          </button>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Today's Balance" amount={summary?.today?.balance} income={summary?.today?.income} expense={summary?.today?.expense} icon={<Clock className="text-blue-600"/>} color="bg-blue-50" />
          <SummaryCard title="Monthly Savings" amount={summary?.monthly?.savings} income={summary?.monthly?.income} expense={summary?.monthly?.expense} icon={<TrendingUp className="text-emerald-600"/>} color="bg-emerald-50" />
          <SummaryCard title="Net Cash (Joma)" amount={summary?.totalBalance} icon={<Landmark className="text-white"/>} isTotal={true} />
        </div>

        {/* Search & Table Section */}
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <h3 className="font-black text-slate-800 uppercase text-lg">Transactions</h3>
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Search Input */}
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search title or category..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 ring-indigo-500/10 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Type Filter */}
              <select 
                className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 outline-none"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="income">Income Only</option>
                <option value="expense">Expense Only</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400">
                <tr>
                  <th className="p-5">Date</th>
                  <th className="p-5">Title & Category</th>
                  <th className="p-5 text-center">Type</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentItems.length > 0 ? currentItems.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/30 group transition-colors">
                    <td className="p-5 text-slate-500 text-sm font-medium">
                      {new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-slate-700">{t.title}</div>
                      <div className="text-[10px] text-indigo-500 font-bold uppercase">{t.category}</div>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className={`p-5 font-black text-base ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {t.type === 'income' ? '+' : '-'} ৳{t.amount?.toLocaleString()}
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(t)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Edit3 size={16}/></button>
                        <button onClick={() => dispatch(deleteTransaction(t._id))} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="p-20 text-center text-slate-400 font-medium">No records found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
            <span className="text-xs font-bold text-slate-400">
              Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:border-indigo-500 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${currentPage === i + 1 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-400 border border-slate-200 hover:border-indigo-500'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:border-indigo-500 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Entry Modal (Same as before but integrated) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
           {/* ... Previous Modal Content ... */}
           <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl p-6">
              {/* Reuse the modal logic from previous response here */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black uppercase text-slate-800 tracking-tight">Add / Edit Record</h3>
                <button onClick={closeModal}><X /></button>
              </div>
              <form onSubmit={handleSubmit}>
                {/* Scrollable container for bulk rows */}
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                  {bulkData.map((row, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 bg-slate-50 rounded-2xl relative group">
                      <select value={row.type} onChange={(e) => {
                        const newData = [...bulkData];
                        newData[index].type = e.target.value;
                        setBulkData(newData);
                      }} className="p-3 rounded-xl border-none font-bold text-sm outline-none">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                      <input required placeholder="Title" value={row.title} onChange={(e) => {
                        const newData = [...bulkData];
                        newData[index].title = e.target.value;
                        setBulkData(newData);
                      }} className="p-3 rounded-xl border-none font-bold text-sm outline-none" />
                      <select required value={row.category} onChange={(e) => {
                        const newData = [...bulkData];
                        newData[index].category = e.target.value;
                        setBulkData(newData);
                      }} className="p-3 rounded-xl border-none font-bold text-sm outline-none">
                        <option value="">Category</option>
                        {categories[row.type].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input required type="number" placeholder="Amount" value={row.amount} onChange={(e) => {
                        const newData = [...bulkData];
                        newData[index].amount = e.target.value;
                        setBulkData(newData);
                      }} className="p-3 rounded-xl border-none font-bold text-sm outline-none" />
                      <button type="button" onClick={() => setBulkData(bulkData.filter((_, i) => i !== index))} className="text-rose-500 p-2">Remove</button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-4">
                   {!editingId && <button type="button" onClick={() => setBulkData([...bulkData, { title: "", amount: "", type: "income", category: "", paymentMethod: "Cash" }])} className="flex-1 py-3 border-2 border-dashed rounded-2xl font-bold text-slate-400 hover:text-indigo-600 transition-colors">+ Add Row</button>}
                   <button className="flex-1 py-3 bg-indigo-600 text-white rounded-2xl font-black uppercase">Save Records</button>
                </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AccountRecordPage;