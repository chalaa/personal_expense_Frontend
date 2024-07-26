import React from "react";
import DataTable, {TableColumn} from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';



const Table: React.FC = () => {

    interface DataRow {
        id: number;
        category: string;
        amount: number;
        date: string;
    }
    const columns: TableColumn<DataRow>[] = [
        {
            name: 'Category',
            selector: row => row.category,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
        },
        {
            name: 'date',
            selector: row => row.date,
        }
        ,{
            name: 'Action',
            cell: row => <button><FontAwesomeIcon icon={faTrash} color="red"/></button>
        }
    ];


    const data = [
        {
            id: 1,
            category: "Grocery Shopping",
            amount: 75.0,
            date: "2023-05-01",
        },
        {
            id: 2,
            category: "Salary",
            amount: 3000.0,
            date: "2023-05-05",
        },
        {
            id: 3,
            category: "Rent",
            amount: 1200.0,
            date: "2023-05-10",
        },
        {
            id: 3,
            category: "Rent",
            amount: 1200.0,
            date: "2023-05-10",
        },
        {
            id: 3,
            category: "Rent",
            amount: 1200.0,
            date: "2023-05-10",
        },
        {
            id: 3,
            category: "Rent",
            amount: 1200.0,
            date: "2023-05-10",
        },
        {
            id: 3,
            category: "Rent",
            amount: 1200.0,
            date: "2023-05-10",
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={data}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="300px"
            responsive={true}

        />
    );
};

export default Table;