import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-cyan-500 text-white p-4 flex justify-between items-center px-4 sm:px-10">
      <div className="text-2xl font-bold">
        Personal Expense Tracker
      </div>
      <button
        className="block sm:hidden bg-cyan-700 p-2 rounded"
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`w-full sm:flex sm:items-center sm:w-auto ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col sm:flex-row sm:ml-auto">
          {user ? (
            <>
              <Link to="/dashboard" className="mr-0 sm:mr-4 p-2 sm:p-0">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="mr-0 sm:mr-4 p-2 sm:p-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-0 sm:mr-4 p-2 sm:p-0">
                Sign in
              </Link>
              <Link to="/signup" className="mr-0 sm:mr-4 p-2 sm:p-0">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
