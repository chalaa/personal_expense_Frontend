import React from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import RightPart from "../components/DashBoardRightPart";

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row">
        <SideBar />
        <RightPart />
      </div>
    </>
  );
};

export default Dashboard;
