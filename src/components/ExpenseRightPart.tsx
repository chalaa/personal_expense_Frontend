import React from "react";
import RightPart from "./RightPart";
import TableMan from "./TableMan";
import { Link } from "react-router-dom";
import {Button} from "@mantine/core";


const ExpenseRightPart: React.FC = () =>{
    return (
        <RightPart>
          <TableMan />
            <div className=" absolute lg:-bottom-5 mt-3 lg:right-20">
              <Link to = "/expense/add" className="mt-3">
              <Button variant="filled">Add</Button>
              </Link>
            </div>

            
        </RightPart>
    );
}

export default ExpenseRightPart;