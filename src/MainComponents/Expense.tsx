import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import RightPart from "../components/ExpenseRightPart";
const Expense: React.FC = () =>{
    return (
        <>
        <Header />
        <div className="flex flex-col sm:flex-row">
            <SideBar />
            <RightPart />
        </div>
        </>
    );
}

export default Expense;