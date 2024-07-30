import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../store/index";
import { updateCategory } from "../store/categorySlice";
import Header from "./Header";
import SideBar from "./SideBar";
import RightPart from "./RightPart";

const UpdateCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(`This is the category of ${id}`)
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector((state: RootState) => state.category);
  const category = categories.find((cat) => cat.id === id);

  const [formData, setFormData] = useState({ name: category?.name || "" });

  useEffect(() => {
    if (category) {
      setFormData({ name: category.name });
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(updateCategory({ id, name: formData.name }));
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row">
        <SideBar />
        <RightPart>
          <div className="mb-3">
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter new category"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? 'Updating Category...' : 'Update Category'}
                </button>
              </div>
            </form>
          </div>
        </RightPart>
      </div>
    </>
  );
};

export default UpdateCategory;
