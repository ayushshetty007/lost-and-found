import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, UploadCloud, User, LogOut, PackageSearch } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Lost Items', path: '/dashboard/lost', icon: Search },
    { name: 'Found Items', path: '/dashboard/found', icon: PackageSearch },
    { name: 'Upload Item', path: '/dashboard/upload', icon: UploadCloud },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="w-64 h-[calc(100vh-80px)] glass-panel border-l-0 border-y-0 rounded-none rounded-br-2xl hidden md:flex flex-col sticky top-20">
      <div className="p-6 flex-grow">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-cyberpunk-neonBlue/20 text-cyberpunk-neonBlue border border-cyberpunk-neonBlue/50 shadow-[inset_0_0_10px_rgba(0,245,255,0.2)]'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium tracking-wide">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-cyberpunk-accentPink hover:bg-cyberpunk-accentPink/10 hover:border-cyberpunk-accentPink/30 border border-transparent transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium tracking-wide">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
