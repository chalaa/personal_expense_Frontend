import React from "react";
import DataTable, {TableColumn} from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';



const Table: React.FC = () => {

    interface DataRow {
        id: number;
        category: string;
    }
    const columns: TableColumn<DataRow>[] = [
        {
            name: 'ID',
            selector: row => row.id,
        },
        {
            name: 'Category Name',
            selector: row => row.category,
        },
       {
            name: 'Action',
            cell: row => <button><FontAwesomeIcon icon={faTrash} color="red"/></button>
        }
    ];


    const data = [
        {
            id: 1,
            category: "Grocery Shopping",
        },
        {
            id: 2,
            category: "Salary",
        },
        {
            id: 3,
            category: "Rent",
        },
        {
            id: 3,
            category: "Rent",
        },
        {
            id: 3,
            category: "Rent",
        },
        {
            id: 3,
            category: "Rent",
        },
        {
            id: 3,
            category: "Rent",
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