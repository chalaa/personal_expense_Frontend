import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import { addIncome } from "../store/incomeSclice";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import RightPart from "../components/RightPart";
import { useNavigate } from "react-router-dom";

const AddIncome: React.FC = () => {
  const [formData, setFormData] = useState({ amount: 0, date: "", description: "", category: { id: "", name: "" } });
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.income);
  const categories = useSelector((state: RootState) => state.category).categories;
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, category: { ...formData.category, id: e.target.value, name: e.target.options[e.target.selectedIndex].text } });
  };

  const add_income = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addIncome(formData));
    navigate("/income")
  };

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row">
        <SideBar />
        <RightPart>
          <div className="mb-3">
            <p>Add Income</p>
            <form onSubmit={add_income} className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Amount</label>
                <input
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Date</label>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter date"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Description</label>
                <input
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Category</label>
                <select
                  name="category"
                  value={formData.category.id}
                  onChange={handleCategoryChange}
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option value={`${category.id}`} key={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? 'Adding Income...' : 'Add Income'}
                </button>
              </div>
            </form>
          </div>
        </RightPart>
      </div>
    </>
  );
};

export default AddIncome;