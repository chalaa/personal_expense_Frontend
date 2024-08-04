import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import { fetchIncomes, deleteIncome } from "../store/incomeSlice";
import { fetchCategories } from "../store/categorySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import RightPart from "../components/RightPart";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "mantine-react-table";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface Income {
  id: string;
  category: {
    name: string;
  };
  amount: number;
  date: string;
}

const Income: React.FC = () => {
  const columns = useMemo<MRT_ColumnDef<Income>[]>(
    () => [
      {
        accessorKey: "category.name",
        header: "Category",
        sorting: true,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        sorting: true,
      },
      {
        accessorKey: "date",
        header: "Date",
        sorting: true,
      },
    ],
    []
  );

  const dispatch = useDispatch<AppDispatch>();
  const { incomes, loading, error } = useSelector(
    (state: RootState) => state.income
  );

  useEffect(() => {
    dispatch(fetchIncomes());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleExportPDF = (rows: MRT_Row<Income>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("Income_Report.pdf");
  };

  const handleDeleteIncome = async (id: string) => {
    await dispatch(deleteIncome({ id }));
  };

  const table = useMantineReactTable({
    columns,
    data: incomes,
    enableSorting: true,
    enableRowActions: true,
    positionToolbarAlertBanner: "bottom",
    renderRowActions: ({ row }) => (
      <div className="flex gap-3">
        <Link to={`edit/${row.original.id}`}>
          <button>
            <FontAwesomeIcon icon={faEdit} color="blue" />
          </button>
        </Link>
        <button onClick={() => handleDeleteIncome(row.original.id)}>
          <FontAwesomeIcon icon={faTrash} color="red" />
        </button>
      </div>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <div className="flex flex-row flex-wrap">
        <button
          className="mb-4 py-2 px-4 text-sm tracking-wide rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none"
          onClick={() =>
            handleExportPDF(table.getPrePaginationRowModel().rows)
          }
          disabled={table.getPrePaginationRowModel().rows.length === 0}
        >
          Export as pdf
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
          <h1 className="mb-3">Incomes</h1>
          <Link to="/income/add">
            <button className="mb-4 py-2 px-4 text-sm tracking-wide rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none">
              Add Income
            </button>
          </Link>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {/* <DataTable
            columns={columns}
            data={incomes}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="300px"
            responsive={true}
          /> */}
          <MantineReactTable table={table} />
        </RightPart>
      </div>
    </>
  );
};

export default Income;
