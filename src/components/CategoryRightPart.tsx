import React from "react";
import RightPart from "./RightPart";
import CategoryTable from "./CategoryTable";
import { Link } from "react-router-dom";
import {Button} from "@mantine/core";


const ExpenseRightPart: React.FC = () =>{
    return (
        <RightPart>
            <div className="mb-3">
                <Link to = "/category/add" className="mt-3">
                <Button variant="filled">Add new Category</Button>
                </Link>
            </div>
          <CategoryTable />

            
        </RightPart>
    );
}

export default ExpenseRightPart;