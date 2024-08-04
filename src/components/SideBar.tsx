import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faGauge, faTags, faReceipt, faBriefcase} from '@fortawesome/free-solid-svg-icons';

const SideBar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        className="sm:hidden bg-cyan-700 p-2 rounded fixed  left-4 z-50 mt-2"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <nav className={`bg-white shadow-lg fixed top-16 left-0 h-full min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:static sm:mt-0 sm:min-h-screen`}>
        <ul className="mt-6">
          <li>
            <div className="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all gap-3">
                <FontAwesomeIcon icon={faGauge}/>
                <Link to="/dashboard">
                Dashboard
                </Link>
            </div>
          </li>
          <li>
            <div className="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all gap-3">
                <FontAwesomeIcon icon={faBriefcase}/>
                <Link to="/income">
                Income
                </Link>
            </div>
          </li>
          <li>
            <div className="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all gap-3">
                <FontAwesomeIcon icon={faReceipt}/>
                <Link to="/expense">
                Expense
                </Link>
            </div>
          </li>
          <li>
            <div className="text-black hover:text-blue-600 text-sm flex items-center hover:bg-blue-50 rounded px-4 py-3 transition-all gap-3">
                <FontAwesomeIcon icon={faTags}/>
                <Link to="/categories">
                Category
                </Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
