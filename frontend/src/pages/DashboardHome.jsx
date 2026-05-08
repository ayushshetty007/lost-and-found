import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, PackageSearch, Activity, Bell, CheckCircle } from 'lucide-react';
import api from '../utils/api';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ lost: 0, found: 0 });
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/items/myitems');
        setStats({
          lost: data.lostItems.length,
          found: data.foundItems.length
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/notifications');
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchStats();
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, isRead: true } : n
      ));
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">
            Welcome back, <span className="text-cyberpunk-neonBlue">{user?.name}</span>
          </h2>
          <p className="text-white/60">Here's what's happening today.</p>
        </div>
        
        <div className="relative">
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="glass-panel p-3 rounded-full relative cursor-pointer hover:bg-white/10 transition-colors"
          >
            <Bell className="w-6 h-6 text-cyberpunk-neonPurple" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-cyberpunk-accentPink rounded-full shadow-neon-pink animate-pulse"></span>
            )}
          </div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-3 w-80 glass-panel border border-white/10 shadow-2xl z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center">
                  <h3 className="font-bold text-white">Notifications</h3>
                  {unreadCount > 0 && <span className="text-xs text-cyberpunk-accentPink">{unreadCount} new</span>}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-white/50 text-sm">No notifications yet.</div>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif._id} 
                        className={`p-4 border-b border-white/5 cursor-pointer transition-colors hover:bg-white/5 ${notif.isRead ? 'opacity-70' : 'bg-cyberpunk-neonPurple/5'}`}
                        onClick={() => !notif.isRead && markAsRead(notif._id)}
                      >
                        <p className="text-sm text-white/90 mb-2">{notif.message}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-cyberpunk-neonBlue">{new Date(notif.createdAt).toLocaleDateString()}</span>
                          {!notif.isRead && <CheckCircle className="w-4 h-4 text-cyberpunk-accentPink" />}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-6 border-l-4 border-l-cyberpunk-neonBlue">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/60 mb-1">Your Lost Items</p>
              <h3 className="text-4xl font-bold text-white">{stats.lost}</h3>
            </div>
            <div className="p-3 bg-cyberpunk-neonBlue/20 rounded-lg">
              <Search className="w-6 h-6 text-cyberpunk-neonBlue" />
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-6 border-l-4 border-l-cyberpunk-neonPurple">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/60 mb-1">Your Found Items</p>
              <h3 className="text-4xl font-bold text-white">{stats.found}</h3>
            </div>
            <div className="p-3 bg-cyberpunk-neonPurple/20 rounded-lg">
              <PackageSearch className="w-6 h-6 text-cyberpunk-neonPurple" />
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-6 border-l-4 border-l-cyberpunk-accentPink lg:col-span-1 md:col-span-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/60 mb-1">Recent Activity</p>
              <h3 className="text-xl font-bold text-white mt-2">All systems operational</h3>
            </div>
            <div className="p-3 bg-cyberpunk-accentPink/20 rounded-lg">
              <Activity className="w-6 h-6 text-cyberpunk-accentPink" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Cyberpunk Element */}
      <div className="w-full h-64 glass-panel relative overflow-hidden flex items-center justify-center border border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyberpunk-neonBlue/10 rounded-full blur-[80px]"></div>
        <div className="text-center z-10">
          <RadarAnimation />
          <p className="mt-4 text-white/50 tracking-widest text-sm uppercase">Global Registry Scanning</p>
        </div>
      </div>
    </motion.div>
  );
};

const RadarAnimation = () => (
  <div className="relative w-32 h-32 mx-auto">
    <div className="absolute inset-0 rounded-full border border-cyberpunk-neonBlue/30"></div>
    <div className="absolute inset-4 rounded-full border border-cyberpunk-neonBlue/50"></div>
    <div className="absolute inset-8 rounded-full border border-cyberpunk-neonBlue"></div>
    <motion.div 
      className="absolute inset-0 rounded-full border-t-2 border-cyberpunk-neonBlue shadow-neon-blue"
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    ></motion.div>
  </div>
);

export default DashboardHome;
