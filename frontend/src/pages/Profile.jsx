import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Trash2 } from 'lucide-react';
import api from '../utils/api';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState({ lost: [], found: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const { data } = await api.get('/items/myitems');
      setItems({ lost: data.lostItems, found: data.foundItems });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await api.delete(`/items/${type}/${id}`);
        fetchMyItems();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto"
    >
      <div className="glass-panel p-8 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-cyberpunk-neonBlue/10 rounded-full blur-[80px]"></div>
        
        <div className="w-32 h-32 rounded-full border-4 border-cyberpunk-neonBlue p-1 shadow-neon-blue z-10">
          <img src={user?.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
        </div>
        
        <div className="flex-1 z-10">
          <h2 className="text-4xl font-display font-bold text-white mb-2">{user?.name}</h2>
          <div className="space-y-2 mt-4 text-white/70">
            <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-cyberpunk-neonBlue" /> {user?.email}</p>
            <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-cyberpunk-neonPurple" /> {user?.mobileNumber}</p>
            <p className="flex items-center gap-3 text-sm mt-4 text-cyberpunk-accentPink">ID: {user?._id}</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-cyberpunk-accentPink rounded"></span> My Lost Reports
          </h3>
          {loading ? <p className="text-white/50">Loading database...</p> : items.lost.length === 0 ? <p className="text-white/50">No records found.</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.lost.map(item => (
                <div key={item._id} className="glass-panel p-4 flex gap-4 items-center">
                  <div className="w-20 h-20 bg-black/50 rounded overflow-hidden flex-shrink-0">
                    {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <User className="w-full h-full p-4 text-white/20"/>}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{item.objectName}</h4>
                    <p className="text-sm text-white/60 text-truncate">{item.description.substring(0, 50)}...</p>
                    <p className="text-xs text-cyberpunk-neonBlue mt-1">Lost on: {new Date(item.dateLost).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => handleDelete(item._id, 'lost')} className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-cyberpunk-neonPurple rounded"></span> My Found Reports
          </h3>
          {loading ? <p className="text-white/50">Loading database...</p> : items.found.length === 0 ? <p className="text-white/50">No records found.</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.found.map(item => (
                <div key={item._id} className="glass-panel p-4 flex gap-4 items-center">
                  <div className="w-20 h-20 bg-black/50 rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{item.objectName}</h4>
                    <p className="text-sm text-white/60 text-truncate">{item.description.substring(0, 50)}...</p>
                    <p className="text-xs text-cyberpunk-neonPurple mt-1">Found on: {new Date(item.dateFound).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => handleDelete(item._id, 'found')} className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
