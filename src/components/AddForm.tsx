import React from "react";
import RightPart from "./RightPart";

const AddForm: React.FC = () => {
    return (
    <RightPart>
        <form className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif] mt-10 bg-white py-4">
            <div className="flex items-center">
                <label className="text-gray-400 w-36 text-sm">Name</label>
                <input type="text" placeholder="Enter your name"
                className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white" />
            </div>

            <div className="flex items-center">
                <label className="text-gray-400 w-36 text-sm">Email</label>
                <input type="email" placeholder="Enter your email"
                className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white" />
            </div>

            <div className="flex items-center">
                <label className="text-gray-400 w-36 text-sm">Phone No.</label>
                <input type="number" placeholder="Enter your phone no"
                className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white" />
            </div>

            <div className="flex items-center">
                <label className="text-gray-400 w-36 text-sm">State</label>
                <input type="text" placeholder="Enter your state"
                className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white" />
            </div>

            
            <button type="button"
                className="!mt-8 px-8 py-2.5 bg-blue-500 text-sm text-white hover:bg-blue-600 rounded-sm">Submit</button>
        </form>
    </RightPart>
        
    );
}

export default AddForm;