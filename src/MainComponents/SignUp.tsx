import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { registerUser } from '../store/authSlice';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-6">
            <Link to="/" className="text-2xl font-extrabold text-black-600">
              Expense Manager
            </Link>
          </div>
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Sign Up</h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter name"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password_confirmation"
                    type="password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Confirm password"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? 'Signing up...' : 'Sign up'}
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
