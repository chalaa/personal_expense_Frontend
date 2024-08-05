import React from "react";

interface RightPartProps {
    children: React.ReactNode;
}

const RightPart: React.FC<RightPartProps> = ({children}) => {
  return (
    <div className="p-6 lg:ml-64 w-5/6 mt-20 h-screen bg-white">
      <div className="p-6 rounded-lg shadow-lg min-h-full">
        {children}
      </div>
    </div>
  );
};

export default RightPart;
