import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import { fetchIncomes, deleteIncome } from "../store/incomeSclice";
import { fetchCategories } from "../store/categorySlice";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import RightPart from "../components/RightPart";
import { Link } from "react-router-dom";

const Income: React.FC = () => {
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
          <button onClick={() => handleDeleteIncome(row.id)}>
            <FontAwesomeIcon icon={faTrash} color="red" />
          </button>
        </div>
      ),
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { incomes, loading, error } = useSelector(
    (state: RootState) => state.income
  );

  useEffect(() => {
    dispatch(fetchIncomes());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDeleteIncome = async (id: string) => {
    await dispatch(deleteIncome({ id }));
  };

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row">
        <SideBar />
        <RightPart>
          <h1 className="mb-3">Incomes</h1>
          <Link to="/income/add">
            <button className="mb-4 py-2 px-4 text-sm tracking-wide rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none">
              Add Income
            </button>
          </Link>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <DataTable
            columns={columns}
            data={incomes}
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

export default Income;
