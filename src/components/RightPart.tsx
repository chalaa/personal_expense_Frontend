import React from "react";

interface RightPartProps {
    children: React.ReactNode;
}

const RightPart: React.FC<RightPartProps> = ({children}) => {
  return (
    <div className="p-6 ml-0 w-4/5 h-screen">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg h-full">
        {children}
      </div>
    </div>
  );
};

export default RightPart;
