import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Phone, Lock, UserPlus } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setIsLoading(true);
    
    const res = await register({
      name: formData.name,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      password: formData.password
    });

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyberpunk-neonPurple/10 rounded-full blur-[100px] -z-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg glass-panel p-8 my-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-white mb-2">Create Identity</h2>
          <p className="text-white/60">Register for the global network</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-cyberpunk-neonPurple" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Neo Hacker"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-cyberpunk-neonPurple" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="neo@matrix.net"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Mobile Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-cyberpunk-neonPurple" />
              </div>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="+1 234 567 8900"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-cyberpunk-neonPurple" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Confirm</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-cyberpunk-neonPurple" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-neon-purple flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <UserPlus className="w-5 h-5" /> Generate Identity
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-white/60 text-sm">
          Already have an identity?{' '}
          <Link to="/login" className="text-cyberpunk-neonBlue hover:text-cyberpunk-accentPink transition-colors">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
