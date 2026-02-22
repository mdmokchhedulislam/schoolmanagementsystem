import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  ArrowLeft, Clock, TrendingUp, Landmark, 
  PlusCircle, Loader2, Trash2, Edit3, X, Plus, Save, 
  Search, ChevronLeft, ChevronRight, User
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [bulkData, setBulkData] = useState([{ title: "", amount: "", type: "income", category: "", staffName: "", paymentMethod: "Cash" }]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = {
    expense: ['Utility Bills', 'Salary & Bonus', 'Maintenance', 'Stationery', 'Events & Meetings', 'Marketing', 'Rent', 'Others/Miscellaneous'],
    income: ['Student Fees', 'Donations', 'School Property Rent', 'Sales', 'Government Grant', 'Others/Miscellaneous']
  };

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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Today's Balance" amount={summary?.today?.balance} income={summary?.today?.income} expense={summary?.today?.expense} icon={<Clock className="text-blue-600"/>} color="bg-blue-50" />
          <SummaryCard title="Monthly Savings" amount={summary?.monthly?.savings} income={summary?.monthly?.income} expense={summary?.monthly?.expense} icon={<TrendingUp className="text-emerald-600"/>} color="bg-emerald-50" />
          <SummaryCard title="Net Cash (Joma)" amount={summary?.totalBalance} icon={<Landmark className="text-white"/>} isTotal={true} />
        </div>

        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <h3 className="font-black text-slate-800 uppercase text-lg">Transactions</h3>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search records..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <select className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400">
                <tr>
                  <th className="p-5">Date</th>
                  <th className="p-5">Details</th>
                  <th className="p-5 text-center">Type</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentItems.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/30 group">
                    <td className="p-5 text-slate-500 text-sm">
                      {new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        {t.category === 'Salary & Bonus' && <User size={14} className="text-indigo-500" />}
                        <div className={`font-bold ${t.category === 'Salary & Bonus' ? 'text-indigo-700' : 'text-slate-700'}`}>
                          {t.title}
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{t.category}</div>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className={`p-5 font-black ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      ৳{t.amount?.toLocaleString()}
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(t)} className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg transition-all"><Edit3 size={16}/></button>
                        <button onClick={() => dispatch(deleteTransaction(t._id))} className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-all"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
            <span className="text-xs font-bold text-slate-400">Page {currentPage} of {totalPages || 1}</span>
            <div className="flex gap-1">
              <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="p-2 bg-white border rounded-xl disabled:opacity-30"><ChevronLeft size={18} /></button>
              <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="p-2 bg-white border rounded-xl disabled:opacity-30"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-5xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-slate-800 uppercase tracking-tight">New Financial Record</h3>
              <button onClick={closeModal} className="p-2 hover:bg-white rounded-full transition-colors"><X size={20}/></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-4">
                {bulkData.map((row, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-5 bg-slate-50 rounded-[24px] items-end border border-slate-100">
                    <div className="md:col-span-2">
                      <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Type</label>
                      <select value={row.type} onChange={(e) => {
                        const newData = [...bulkData];
                        newData[index].type = e.target.value;
                        newData[index].category = "";
                        setBulkData(newData);
                      }} className="w-full p-3 bg-white rounded-xl font-bold text-sm outline-none border border-slate-200">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Category</label>
                      <select required value={row.category} onChange={(e) => {
                        const newData = [...bulkData];
                        newData[index].category = e.target.value;
                        setBulkData(newData);
                      }} className="w-full p-3 bg-white rounded-xl font-bold text-sm outline-none border border-slate-200">
                        <option value="">Select Category</option>
                        {categories[row.type].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">
                        {row.category === 'Salary & Bonus' ? 'Staff Name' : 'Title / Description'}
                      </label>
                      <input 
                        required 
                        value={row.category === 'Salary & Bonus' ? row.staffName : row.title} 
                        onChange={(e) => {
                          const newData = [...bulkData];
                          if (row.category === 'Salary & Bonus') newData[index].staffName = e.target.value;
                          else newData[index].title = e.target.value;
                          setBulkData(newData);
                        }} 
                        placeholder={row.category === 'Salary & Bonus' ? "Enter Staff Name" : "Enter Title"}
                        className="w-full p-3 bg-white rounded-xl font-bold text-sm outline-none border border-slate-200" 
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-[9px] font-black uppercase text-slate-400 mb-1 block">Amount</label>
                      <input required type="number" value={row.amount} onChange={(e) => {
                        const newData = [...bulkData];
                        newData[index].amount = e.target.value;
                        setBulkData(newData);
                      }} className="w-full p-3 bg-white rounded-xl font-bold text-sm outline-none border border-slate-200" placeholder="0" />
                    </div>

                    <div className="md:col-span-2 flex gap-2">
                       {!editingId && bulkData.length > 1 && (
                         <button type="button" onClick={() => setBulkData(bulkData.filter((_, i) => i !== index))} className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-colors"><Trash2 size={18}/></button>
                       )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {!editingId && (
                  <button type="button" onClick={() => setBulkData([...bulkData, { title: "", amount: "", type: "income", category: "", staffName: "", paymentMethod: "Cash" }])} className="flex-1 py-4 border-2 border-dashed border-slate-200 text-slate-400 hover:border-indigo-500 hover:text-indigo-500 rounded-2xl font-black uppercase text-xs transition-all">
                    + Add More Records
                  </button>
                )}
                <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-100 transition-all">
                  {editingId ? "Update Record" : `Confirm Save (${bulkData.length})`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountRecordPage;