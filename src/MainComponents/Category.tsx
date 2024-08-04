import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../store/categorySlice";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import RightPart from "../components/RightPart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";
import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
interface Category {
  id: string;
  name: string;
}

const Category: React.FC = () => {

  const columns = useMemo<MRT_ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        sorting: true,
      },
      {
        accessorKey: "name",
        header: "Category",
        sorting: true,
      },
    ],
    []
  );
  const [formData, setFormData] = useState({ name: "" });
  const [updateFormData, setUpdateFormData] = useState({ id: "", name: "" });
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.category
  );
  console.log("our categories are", categories)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const add_category = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addCategory(formData));
  };

  const handleDeleteCategory = async (id: string) => {
    await dispatch(deleteCategory({ id }));
  };

  const openUpdateModal = (category: { id: string; name: string }) => {
    setUpdateFormData(category);
    setShowModal(true);
  };

  const closeUpdateModal = () => {
    setShowModal(false);
  };

  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(updateCategory(updateFormData));
    setShowModal(false);
  };

  const table = useMantineReactTable({
    columns,
    data: categories,
    enableSorting: true,
    enableRowActions: true,
    positionToolbarAlertBanner: "bottom",
    renderRowActions: ({ row }) => (
      
      <div className="flex gap-3">
        <button
          className="cursor-pointer"
          onClick={() => {
            const category = categories.find((cat) => cat.id === row.original.id);
            openUpdateModal({ id: row.original.id, name: category?.name || "" });
          }}
        >
          <FontAwesomeIcon icon={faEdit} color="blue" />
        </button>
        <button
          className="cursor-pointer"
          onClick={() => handleDeleteCategory(row.original.id)}
        >
          <FontAwesomeIcon icon={faTrash} color="red" />
        </button>
      </div>
    ),
  });
  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row">
        <SideBar />
        <RightPart>
          <div className="mb-3">
            <form onSubmit={add_category} className="mt-8 space-y-4">
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
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? "Adding Category..." : "Add Category"}
                </button>
              </div>
            </form>
          </div>
          {loading && <p>Loading...</p>}
          <MantineReactTable table={table} />
        </RightPart>
      </div>
      <Modal show={showModal} onClose={closeUpdateModal}>
        <h3 className="mb-3 text-md text-blue-600">Update Category</h3>

        <form onSubmit={handleUpdateCategory} className="space-y-4">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Name</label>
            <div className="relative flex items-center">
              <input
                name="name"
                type="text"
                value={updateFormData.name}
                onChange={handleUpdateChange}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Update category name"
              />
              
            </div>

          </div>
          <p>{updateFormData.name}</p>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="!mt-8">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Updating Category..." : "Update Category"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Category;
