import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  ArrowLeft, Clock, TrendingUp, Landmark, 
  PlusCircle, Loader2, Trash2, Edit3, X 
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
  const [formData, setFormData] = useState({
    title: "", amount: "", type: "income", category: "", paymentMethod: "Cash"
  });

  const categories = {
    expense: ['Utility Bills', 'Salary & Bonus', 'Maintenance', 'Stationery', 'Events & Meetings', 'Marketing', 'Rent', 'Others/Miscellaneous'],
    income: ['Student Fees', 'Donations', 'School Property Rent', 'Sales', 'Government Grant', 'Others/Miscellaneous']
  };

  useEffect(() => {
    dispatch(fetchAllTransactions());
    dispatch(getTransactionSummary());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await dispatch(updateTransaction({ id: editingId, data: formData }));
    } else {
      await dispatch(createTransaction(formData));
    }
    closeModal();
  };

  const handleEdit = (t) => {
    setEditingId(t._id);
    setFormData({
      title: t.title,
      amount: t.amount,
      type: t.type,
      category: t.category,
      paymentMethod: t.paymentMethod || "Cash"
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      dispatch(deleteTransaction(id));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", amount: "", type: "income", category: "", paymentMethod: "Cash" });
  };

  return (
    <div className="p-6 bg-[#f4f7fe] min-h-screen font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <ArrowLeft size={16} /> Back
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-indigo-200 uppercase">
            <PlusCircle size={18} /> Add New Record
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Today's Balance" amount={summary?.today?.balance || 0} icon={<Clock className="text-blue-600"/>} color="bg-blue-50" />
          <SummaryCard title="Monthly Savings" amount={summary?.monthly?.savings || 0} icon={<TrendingUp className="text-emerald-600"/>} color="bg-emerald-50" />
          <SummaryCard title="Net Cash (Joma)" amount={summary?.totalBalance || 0} icon={<Landmark className="text-rose-600"/>} color="bg-rose-50" isTotal={true} />
        </div>

        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-black text-slate-800 uppercase text-lg">Recent Transactions</h3>
            {loading && <Loader2 className="animate-spin text-indigo-600" size={20} />}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400">
                <tr>
                  <th className="p-5">Date</th>
                  <th className="p-5">Title & Category</th>
                  <th className="p-5">Type</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions?.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/30 group">
                    <td className="p-5 text-slate-500 text-sm">
                      {new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-slate-700">{t.title}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{t.category}</div>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className={`p-5 font-black ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {t.type === 'income' ? '+' : '-'} ৳{t.amount?.toLocaleString()}
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(t)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <Edit3 size={16}/>
                        </button>
                        <button onClick={() => handleDelete(t._id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="font-black text-slate-800 uppercase tracking-tight">
                {editingId ? "Update Record" : "Add New Record"}
              </h3>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:text-slate-600"><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400">Title</label>
                <input required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold" placeholder="Reason for transaction" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value, category: ""})} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold cursor-pointer">
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400">Amount (৳)</label>
                  <input required type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
                <select 
                  required 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})} 
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold cursor-pointer"
                >
                  <option value="">-- Choose Category --</option>
                  {formData.type === 'income' 
                    ? categories.income.map(c => <option key={c} value={c}>{c}</option>)
                    : categories.expense.map(c => <option key={c} value={c}>{c}</option>)
                  }
                </select>
              </div>

              <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all">
                {editingId ? "Update Record" : "Confirm Entry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountRecordPage;