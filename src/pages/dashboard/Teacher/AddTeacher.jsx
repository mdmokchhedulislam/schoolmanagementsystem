import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTeacher } from '../../../redux/slices/teacherSlice'; 
import { toast } from 'react-hot-toast';

const AddTeacher = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.teachers);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        teacherId: "",
        designation: "Assistant Teacher",
        department: "",
        qualification: "",
        baseSalary: "",
        bankAccount: "",
        panOrNid: "",
        joiningDate: "",
        previousExperience: "",
        status: "Active"
    });

 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

 
        const finalData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            teacherId: formData.teacherId,
            designation: formData.designation,
            department: formData.department,
            qualification: formData.qualification,
            status: formData.status,
            salaryInfo: {
                baseSalary: Number(formData.baseSalary),
                bankAccount: formData.bankAccount,
                panOrNid: formData.panOrNid
            },
            experience: {
                joiningDate: formData.joiningDate,
                previousExperience: formData.previousExperience
            }
        };

        try {
            const resultAction = await dispatch(createTeacher(finalData));
            if (createTeacher.fulfilled.match(resultAction)) {
                toast.success("Teacher added successfully!");
      
                setFormData({
                    name: "", email: "", password: "", teacherId: "",
                    designation: "Assistant Teacher", department: "",
                    qualification: "", baseSalary: "", bankAccount: "",
                    panOrNid: "", joiningDate: "", previousExperience: "",
                    status: "Active"
                });
            } else {
                toast.error(resultAction.payload || "Failed to add teacher");
            }
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Register New Teacher</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600">Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none" placeholder="John Doe" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none" placeholder="example@mail.com" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600">Temporary Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600">Teacher ID</label>
                            <input type="text" name="teacherId" value={formData.teacherId} onChange={handleChange} required className="mt-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none" placeholder="T-2026-01" />
                        </div>
                    </div>

                    {/* Professional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600">Designation</label>
                            <select name="designation" value={formData.designation} onChange={handleChange} className="mt-1 border rounded-md p-2">
                                <option value="Assistant Teacher">Assistant Teacher</option>
                                <option value="Head Teacher">Head Teacher</option>
                                <option value="Lecturer">Lecturer</option>
                                <option value="Principal">Principal</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600">Department</label>
                            <input type="text" name="department" value={formData.department} onChange={handleChange} className="mt-1 border rounded-md p-2" placeholder="Science" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-600">Qualification</label>
                            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="mt-1 border rounded-md p-2" placeholder="B.Sc, M.Sc" />
                        </div>
                    </div>

                    {/* Salary Info (Object Group) */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-md font-bold text-blue-700 mb-3">Salary & Bank Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input type="number" name="baseSalary" value={formData.baseSalary} onChange={handleChange} placeholder="Base Salary" className="p-2 border rounded shadow-sm" />
                            <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} placeholder="Bank Account No" className="p-2 border rounded shadow-sm" />
                            <input type="text" name="panOrNid" value={formData.panOrNid} onChange={handleChange} placeholder="NID / PAN Number" className="p-2 border rounded shadow-sm" />
                        </div>
                    </div>

                    {/* Experience Info */}
                    <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="text-md font-bold text-green-700 mb-3">Experience & Joining</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className="p-2 border rounded shadow-sm" />
                            <textarea name="previousExperience" value={formData.previousExperience} onChange={handleChange} placeholder="Previous Experience Details" className="p-2 border rounded shadow-sm h-12" />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-3 rounded-md text-white font-bold transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
                    >
                        {loading ? "Processing..." : "Register Teacher"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTeacher;