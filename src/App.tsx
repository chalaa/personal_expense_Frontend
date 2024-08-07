import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import LandingPage from './MainComponents/LandingPage';
import Login from './MainComponents/Login';
import SignUp from './MainComponents/SignUp';
import Dashboard from './MainComponents/Dashboard';
import Income from './MainComponents/Income';
import Expense from './MainComponents/Expense';
import Category  from './MainComponents/Category';
import AddExpense from './MainComponents/AddExpense';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import UpdateExpense from './components/UpdateExpense';
import AddIncome from './MainComponents/AddIncome';
import UpdateIncome from './components/UpdateIncome';

const App: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Redirect to dashboard if authenticated and accessing root
    if (user && window.location.pathname === '/') {
      window.location.replace('/dashboard');
    }
  }, [user]);

  return (
    <div className="bg-white">
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/income" element={<PrivateRoute><Income /></PrivateRoute>} />
          <Route path="/income/add" element={<PrivateRoute><AddIncome /></PrivateRoute>} />
          <Route path="/income/edit/:id" element={<PrivateRoute><UpdateIncome /></PrivateRoute>} />
          <Route path="/expense" element={<PrivateRoute><Expense /></PrivateRoute>} />
          <Route path="/expense/add" element={<PrivateRoute><AddExpense /></PrivateRoute>} />
          <Route path="/expense/edit/:id" element={<PrivateRoute><UpdateExpense /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute><Category /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
