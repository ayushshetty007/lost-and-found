import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Radar } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 glass-panel border-b-0 rounded-none border-x-0 bg-cyberpunk-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Radar className="w-8 h-8 text-cyberpunk-neonBlue group-hover:text-cyberpunk-neonPurple transition-colors" />
            </motion.div>
            <span className="font-display font-bold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyberpunk-neonBlue to-cyberpunk-neonPurple">
              LOST & FOUND
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-cyberpunk-neonBlue transition-colors font-medium tracking-wide">Home</Link>
            <Link to="/about" className="text-white hover:text-cyberpunk-neonBlue transition-colors font-medium tracking-wide">About</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-cyberpunk-neonPurple transition-colors font-medium tracking-wide">Dashboard</Link>
                <div className="flex items-center space-x-4 ml-4">
                  <div className="w-10 h-10 rounded-full border-2 border-cyberpunk-neonBlue overflow-hidden shadow-neon-blue">
                    <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <button onClick={handleLogout} className="text-cyberpunk-accentPink hover:text-white transition-colors font-medium">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-white hover:text-cyberpunk-neonBlue transition-colors font-medium">Login</Link>
                <Link to="/register" className="btn-neon-blue py-2 px-5 text-sm">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
