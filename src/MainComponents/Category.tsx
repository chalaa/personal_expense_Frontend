import React, { useEffect } from "react";
import { useDispatch,useSelector, } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import {fetchCategories} from "../store/categorySlice";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import RightPart from "../components/RightPart";
import { Link } from "react-router-dom";
import {Button} from "@mantine/core";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';

const Expense: React.FC = () =>{

    
    const columns = [
        {
            name: 'ID',
            selector: (row: { id: string }) => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row: { name: string }) => row.name,
            sortable: true,
        },
       {
        name: 'Actions',
        cell: (row: { id: string }) => (
            <>
                <button><FontAwesomeIcon icon={faTrash} color="red"/></button>
                <button><FontAwesomeIcon icon={faTrash} color="red"/></button>
            </>
        ),
        }
    ];

    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.category);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])

    return (
        <>
        <Header />
        <div className="flex flex-col sm:flex-row">
            <SideBar />
            <RightPart>
            <div className="mb-3">
                <Link to = "/category/add" className="mt-3">
                <Button variant="filled">Add new Category</Button>
                </Link>
            </div>
            <DataTable
                columns={columns}
                data={categories}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="300px"
                responsive={true}

            />
        </RightPart>
        </div>
        </>
    );
}

export default Expense;