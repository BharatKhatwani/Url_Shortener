import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useAuth } from './AuthContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();

  const handleLogout = () => {
    // localStorage.removeItem('token');
    logout();
    navigate('/login');
  };

  return (
    <div className="w-full bg-[#1F2937] shadow-md sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide text-blue-500">
          🔗 URL Shortener
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg cursor-pointer text-white font-medium transition duration-200"
        >
          Logout
          <IoIosLogOut size={22} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
