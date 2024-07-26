import React from "react";
import LineChart from './LineChart';
import BarChart from './BarChart';
// import Card from './Card'
import RightPart from "./RightPart";
const DashBoardRightPart: React.FC = () => {
  return (
    <RightPart>
      <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ">
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 col-span-1 sm:col-span-1 lg:col-span-2">
            <LineChart />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 col-span-1 sm:col-span-1 lg:col-span-2">
            <BarChart />
          </div>
            {/* <Card title="Line Graph" width="col-span-1 sm:col-span-1 lg:col-span-2">
                <div className="bg-white p-4 rounded-lg shadow-lg mb-6 h-">
                <LineChart />
                </div>
            </Card>
            <Card title="Bar Chart" width="col-span-1 sm:col-span-1 lg:col-span-2">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                <BarChart />
                </div>
            </Card> */}
            
            
        </div>
        
    </RightPart>

  );
};

export default DashBoardRightPart;
