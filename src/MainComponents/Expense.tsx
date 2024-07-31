import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import { fetchExpenses, deleteExpense } from "../store/expenseSlice";
import { fetchCategories } from "../store/categorySlice";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import RightPart from "../components/RightPart";
import { Link } from "react-router-dom";

const Expense: React.FC = () => {
  const columns = [
    {
      name: 'Category',
      selector: (row: { category: { name: string } }) => row.category.name,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row: { amount: number }) => row.amount.toString(),
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row: { date: string }) => row.date,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: { id: string }) => (
        <div className="flex gap-3">
          <Link to={`edit/${row.id}`}>
            <button>
              <FontAwesomeIcon icon={faEdit} color="blue" />
            </button>
          </Link>
          <button onClick={() => handleDeleteExpense(row.id)}>
            <FontAwesomeIcon icon={faTrash} color="red" />
          </button>
        </div>
      ),
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { expenses, loading, error } = useSelector(
    (state: RootState) => state.expense
  );

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDeleteExpense = async (id: string) => {
    await dispatch(deleteExpense({ id }));
  };

  console.log(expenses)
  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row">
        <SideBar />
        <RightPart>
          <h1 className="mb-3">Expenses</h1>
          <Link to= "/expense/add">
            <button className="mb-4 py-2 px-4 text-sm tracking-wide rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none">
              Add Expense
            </button>
          </Link>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <DataTable
            columns={columns}
            data={expenses}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="300px"
            responsive={true}
          />
        </RightPart>
      </div>
    </>
  );
};

export default Expense;


